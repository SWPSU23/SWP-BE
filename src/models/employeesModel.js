const pool = require('../services/queryHelper').getPool();
const queries = require('../queries/queryModal');
const Joi = require('joi');


const employeeSchema = Joi.object({
    name: Joi.string().min(3).required(),
    age: Joi.number().min(16).required(),
    email_address: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
    phone: Joi.number().min(9).required(),
    base_salary: Joi.number().min(1000).required(),
    role: Joi.string().required()
});

const createEmployeeDetail = (employee_detail) => {
    const query = queries.createEmployeeDetail;
    const { error, value } = employeeSchema.validate(employee_detail);
    if (error) {
        console.error("Error validating employee", error);
        throw error;
    } else {
        return new Promise((resolve, reject) => {
            pool.query(query, [
                value.name,
                value.age,
                value.email_address,
                value.password,
                value.phone,
                value.base_salary,
                value.role
            ], (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            })
        })
    }
}

const getListEmployee = () => {
    const query = queries.getListEmployee;
    return new Promise((resolve, reject) => {
        pool.query(query, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
}

const getEmployeeDetail = (employee_id) => {
    const query = queries.getEmployeeDetails;
    return new Promise((resolve, reject) => {
        pool.query(query, [employee_id], (error, res) => {
            if (error) {
                reject(error);
            } else {
                resolve(res[0]);
            }
        })
    })
}

const updateEmployeeDetail = (employee_data, employee_id) => {
    const query = queries.updateEmployeeDetail;
    return new Promise((resolve, reject) => {
        pool.query(query, [employee_data, employee_id], (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
}

const deleteEmployeeDetail = (employee_id) => {
    const query = queries.deleteEmployeeDetail;
    return new Promise((resolve, reject) => {
        pool.query(query, [employee_id], (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
}

module.exports = { createEmployeeDetail, getListEmployee, getEmployeeDetail, updateEmployeeDetail, deleteEmployeeDetail }