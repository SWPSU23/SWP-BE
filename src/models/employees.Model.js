const pool = require('../services/queryHelper').getPool()
const queries = require('../queries/queryModal');
const Joi = require('joi')

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
        console.error('Error validating employee', error)
        throw error
    } else {
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
                (err, res) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(res)
                    }
                }
            )
        })
    }
}

const getListEmployee = (page_index) => {
    const query = queries.Employee.getListEmployee(page_index)
    return new Promise((resolve, reject) => {
        pool.query(query, (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}

const getEmployeeDetail = (employee_id) => {
    const query = queries.Employee.getEmployeeDetails
    return new Promise((resolve, reject) => {
        pool.query(query, [employee_id], (error, res) => {
            if (error) {
                reject(error)
            } else {
                resolve(res[0])
            }
        })
    })
}

const updateEmployeeDetail = (employee_data, employee_id) => {
    const query = queries.Employee.updateEmployeeDetail
    return new Promise((resolve, reject) => {
        pool.query(query, [employee_data, employee_id], (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}

const deleteEmployeeDetail = (employee_id) => {
    const query = queries.Employee.deleteEmployeeDetail
    return new Promise((resolve, reject) => {
        pool.query(query, [employee_id], (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}

const searchEmployeeBy = (searchBy, keywords) => {
    const query = queries.Employee.searchEmployeeBy(searchBy, keywords);
    return new Promise((resolve, reject) => {
        pool.query(query, (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
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
