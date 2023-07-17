const pool = require('../services/query.Service');
const queries = require('../queries/queryModal');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const employeeSchema = Joi.object({
    name: Joi.string().min(3).required(),
    age: Joi.number().min(16).required(),
    email_address: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
    phone: Joi.string().pattern(new RegExp('^[0-9]{10}$')).required(),
    base_salary: Joi.number().min(1000).required(),
    role: Joi.string().required(),
    status: Joi.string().default('working'),
})

const createEmployeeDetail = async (employee_detail) => {
    try {
        const { error, value } = await employeeSchema.validateAsync(employee_detail);
        if (error) {
            global.logger.error(`Model - Error validate : ${error}`);
            throw new Error(error);
        } else {
            // handle send mail to employee

            // hash password
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
                    value.status
                ]
            )
            global.logger.info(`Model - Create employee success: ${results}`)
            return results;
        }
    } catch (error) {
        global.logger.error(`Model - Error createEmployeeDetail: ${error}`);
        throw new Error(error);
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
        throw new Error(error.message);
    }
}

const getEmployeeDetail = async (employee_id) => {
    try {
        const results = await pool
            .getData(
                queries.Employee.getEmployeeDetails,
                [employee_id]
            );
        global.logger.info(`Model - Get employee detail success: ${results[0]}`);
        return results[0];
    } catch (error) {
        global.logger.error(`Model - Error getEmployeeDetail: ${error}`);
        throw new Error(error.message);
    }
}

const updateEmployeeDetail = async (employee_data, employee_id) => {
    try {
        const results = await pool
            .setData(
                queries.Employee.updateEmployeeDetail,
                [
                    employee_data,
                    employee_id
                ]
            );
        global.logger.info(`Model - Update employee success: ${results}`);
        return results;
    } catch (error) {
        global.logger.error(`Model - Error updateEmployeeDetail: ${error}`);
        throw new Error(error.message);
    }
}

const deleteEmployeeDetail = (employee_id) => {
    try {
        const results = pool
            .setData(
                queries.Employee.deleteEmployeeDetail,
                [
                    employee_id
                ]
            );
        global.logger.info(`Model - Delete employee success: ${results}`);
    } catch (error) {
        global.logger.error(`Model - Error deleteEmployeeDetail: ${error}`);
        throw new Error(error.message);
    }
}

const searchEmployeeBy = (searchBy, keywords) => {
    try {
        const results = pool
            .getData(
                queries.Employee.searchEmployeeBy(searchBy, keywords),
                []
            );
        global.logger.info(`Model - Search employee success: ${results}`);
    } catch (error) {
        global.logger.error(`Model - Error searchEmployeeBy: ${error}`);
        throw new Error(error.message);
    }
}

module.exports = {
    createEmployeeDetail,
    getListEmployee,
    getEmployeeDetail,
    updateEmployeeDetail,
    deleteEmployeeDetail,
    searchEmployeeBy
}
