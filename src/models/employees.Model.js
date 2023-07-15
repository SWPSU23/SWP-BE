const pool = require('../services/queryHelper').getPool()
const queries = require('../queries/queryModal');
const Joi = require('joi');

const employeeSchema = Joi.object({
    name: Joi.string().min(3).required(),
    age: Joi.number().min(16).required(),
    email_address: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
    phone: Joi.number().min(9).required(),
    base_salary: Joi.number().min(1000).required(),
    role: Joi.string().required(),
    status: Joi.string().default('working'),
})

const createEmployeeDetail = (employee_detail) => {
    const query = queries.Employee.createEmployeeDetail
    const { error, value } = employeeSchema.validate(employee_detail)
    if (error) {
        global.logger.error(`Model - Error validate employee: ${error}`)
        throw error({ message: error })
    } else {
        // insert employee
        return new Promise((resolve, reject) => {
            pool.query(
                query,
                [
                    value.name,
                    value.age,
                    value.email_address,
                    value.password,
                    value.phone,
                    value.base_salary,
                    value.role,
                    value.status
                ],
                (error, ressults) => {
                    if (error) {
                        global.logger.error(`Model - Error query createEmployeeDetail: ${error}`);
                        reject(error)
                    } else {
                        global.logger.info(`Model - Create employee success: ${ressults}`)
                        resolve(ressults)
                    }
                }
            )
        })
    }
}

const getListEmployee = (page_index) => {
    const query = queries.Employee.getListEmployee(page_index);
    global.logger.info(`Model - Get list employee query: ${query}`)
    return new Promise((resolve, reject) => {
        pool.query(query, (error, results) => {
            if (error) {
                global.logger.error(`Model - Error query getListEmployee: ${error}`);
                reject(error)
            } else {
                const data = {
                    info: {},
                    employee: []
                }
                // detail employee
                results.forEach((employee) => {
                    data.employee.push({
                        id: employee.id,
                        name: employee.name,
                        age: employee.age,
                        email_address: employee.email_address,
                        phone: employee.phone,
                        base_salary: employee.base_salary,
                        password: employee.password,
                        role: employee.role,
                        status: employee.status
                    })
                })
                global.logger.info(`Model - Employee detail: ${data.employee}`)
                // add info page
                data.info = {
                    total_page: Math.ceil(results[0].page / 10)
                }
                global.logger.info(`Model - Info of employee: ${data.info}`)
                global.logger.info(`Model - Get list employee success: ${data}`)
                resolve(data);
            }
        })
    })
}

const getEmployeeDetail = (employee_id) => {
    const query = queries.Employee.getEmployeeDetails
    return new Promise((resolve, reject) => {
        pool.query(query, [employee_id], (error, res) => {
            if (error) {
                global.logger.error(`Model - Error query getEmployeeDetail: ${error}`);
                reject(error)
            } else {
                global.logger.info(`Model - Get employee detail success: ${res[0]}`)
                resolve(res[0])
            }
        })
    })
}

const updateEmployeeDetail = (employee_data, employee_id) => {
    const query = queries.Employee.updateEmployeeDetail
    return new Promise((resolve, reject) => {
        pool.query(query,
            [employee_data, employee_id],
            (error, ressults) => {
                if (error) {
                    global.logger.error(`Model - Error query updateEmployeeDetail: ${error}`);
                    reject(error)
                } else {
                    global.logger.info(`Model - Update employee success: ${ressults}`)
                    resolve(ressults)
                }
            })
    })
}

const deleteEmployeeDetail = (employee_id) => {
    const query = queries.Employee.deleteEmployeeDetail
    return new Promise((resolve, reject) => {
        pool.query(query,
            [employee_id],
            (error, ressults) => {
                if (error) {
                    global.logger.error(`Model - Error query deleteEmployeeDetail: ${error}`);
                    reject(error)
                } else {
                    global.logger.info(`Model - Delete employee success: ${ressults}`)
                    resolve(ressults)
                }
            })
    })
}

const searchEmployeeBy = (searchBy, keywords) => {
    const query = queries.Employee.searchEmployeeBy(searchBy, keywords);
    global.logger.info(`Model - Search employee query: ${query}`)
    return new Promise((resolve, reject) => {
        pool.query(query, (error, ressults) => {
            if (error) {
                global.logger.error(`Model - Error query searchEmployeeBy: ${error}`);
                reject(error)
            } else {
                global.logger.info(`Model - Search employee success: ${ressults}`)
                resolve(ressults)
            }
        })
    })
}

module.exports = {
    createEmployeeDetail,
    getListEmployee,
    getEmployeeDetail,
    updateEmployeeDetail,
    deleteEmployeeDetail,
    searchEmployeeBy
}
