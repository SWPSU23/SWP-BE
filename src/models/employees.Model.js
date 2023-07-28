const pool = require('../services/query.Service');
const queries = require('../queries/queryModal');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const generatePassWord = require(`generate-password`);
const notification = require('../services/notification.Service');
const mail = require('../services/mail.Service');
const mailTemplate = require('../templates/emails.Template');

const employeeSchema = Joi.object({
    name: Joi.string().min(3).required().trim(),
    age: Joi.number().min(16).required(),
    email_address: Joi.string().email().required().trim(),
    phone: Joi.string().pattern(new RegExp('^[0-9]{10}$')).required(),
    base_salary: Joi.number().min(20000).required(),
    role: Joi.string().required().trim(),
    status: Joi.string().default('working'),
    leave_day_of_year: Joi.number().default(96),
});

const createEmployeeDetail = async (employee_detail) => {
    try {
        // validate data
        const { error, value } = employeeSchema.validate(employee_detail);
        if (error) {
            global.logger.error(`Model - Error validate : ${error}`);
            throw new Error(error);
        } else {
            // generate password
            value.password = generatePassWord.generate({
                length: 10,
                numbers: true
            });
            // password
            const password = value.password;
            value.password = await bcrypt.hash(value.password, 10);
            const results = await pool.setData(
                queries.Employee.createEmployeeDetail,
                [
                    value.name,
                    value.age,
                    value.email_address,
                    value.password,
                    value.phone,
                    value.base_salary,
                    value.role,
                    value.status,
                    value.leave_day_of_year
                ]
            )
            global.logger.info(`Model - Create employee success id: ${results.insertId}`)
            // handle send mail to employee
            global.logger.info(`Model - Employee pass: ${password}`)
            const content = mailTemplate.createAccount(value.name, value.phone, password, value.role);
            await mail.sendMail(value.email_address, "Account to login system", content);
            // handle send noti to employee
            const noti = {
                title: "Welcome to our ministore",
                content: "Remember check in everyday",
                is_read: false
            }
            await notification.addNotification(results.insertId, noti);
            return results;
        }
    } catch (error) {
        global.logger.error(`Model - Error createEmployeeDetail: ${error}`);
        throw error;
    }
}

const getListEmployee = async (page_index) => {
    try {
        const results = await pool
            .getData(
                queries.Employee.getListEmployee(page_index),
                []
            );
        const data = {
            info: {},
            employee: []
        }
        results.map((item) => {
            data.employee.push({
                id: item.id,
                name: item.name,
                age: item.age,
                phone: item.phone,
                email_address: item.email_address,
                base_salary: item.base_salary,
                role: item.role,
                status: item.status
            })
        })
        data.info = {
            total_page: Math.ceil(results[0].page / 10),
        }
        return data;
    } catch (error) {
        global.logger.error(`Model - Error getListEmployee: ${error}`);
        throw error;
    }
}

const getEmployeeDetail = async (employee_id) => {
    try {
        const results = await pool
            .getData(
                queries.Employee.getEmployeeDetails,
                [employee_id]
            );
        global.logger.info(`Model - Get employee detail success: ${JSON.stringify(results[0])}`);
        return results[0];
    } catch (error) {
        global.logger.error(`Model - Error getEmployeeDetail: ${error}`);
        throw error;
    }
}

const updateEmployeeDetail = async (employee_data, employee_id) => {
    try {
        const { error, value } = employeeSchema.validate(employee_data);
        if (error) {
            global.logger.error(`Model - Error validate : ${error}`);
            throw new Error(error);
        } else {
            const results = await pool
                .setData(
                    queries.Employee.updateEmployeeDetail,
                    [
                        value,
                        employee_id
                    ]
                );
            global.logger.info(`Model - Update employee success: ${results}`);
            // handle send noti to employee
            const noti = {
                title: "Your information has been updated",
                content: "Remember check your information",
            }
            await notification.addNotification(employee_id, noti);
            // handle send mail to employee

            return results;
        }
    } catch (error) {
        global.logger.error(`Model - Error updateEmployeeDetail: ${error}`);
        throw error;
    }
}

const updatePassWord = async (email) => {
    try {
        const employee_detail = await pool
            .getData(
                queries.Validate.checkEmail,
                [email]
            );
        if (employee_detail.length === 0) {
            throw new Error(`ValidationError: Email is not exist`);
        } else {
            // generate password
            const password = generatePassWord.generate({
                length: 10,
                numbers: true
            });
            // hash password
            const hashPassword = await bcrypt.hash(password, 10);
            // update password in database
            const results = await pool
                .setData(
                    queries.Employee.updateEmployeeDetail,
                    [
                        { password: hashPassword },
                        employee_detail[0].id
                    ]
                )
            // handle send mail to employee
            return results;
        }
    } catch (error) {
        global.logger.error(`Model - Error updatePassWord: ${error}`);
        throw error;
    }
}

const deleteEmployeeDetail = async (employee_id) => {
    try {
        const results = await pool
            .setData(
                queries.Employee.deleteEmployeeDetail,
                [
                    employee_id
                ]
            );
        global.logger.info(`Model - Delete employee success: ${results}`);
        return results;
    } catch (error) {
        global.logger.error(`Model - Error deleteEmployeeDetail: ${error}`);
        throw error;
    }
}

const searchEmployeeBy = async (searchBy, keywords) => {
    try {
        global.logger.info(`Model - Search employee by ${searchBy} key: ${keywords}`)
        const results = await pool
            .getData(
                queries.Employee.searchEmployeeBy(searchBy, keywords),
                []
            );
        return results;
    } catch (error) {
        global.logger.error(`Model - Error searchEmployeeBy: ${error}`);
        throw error;
    }
}

module.exports = {
    createEmployeeDetail,
    getListEmployee,
    getEmployeeDetail,
    updateEmployeeDetail,
    deleteEmployeeDetail,
    searchEmployeeBy,
    updatePassWord
}
