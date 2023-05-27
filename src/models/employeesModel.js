const pool = require('../services/queryHelper');
const queries = require('../queries/queryModal');
const Joi = require('joi');


const employeeSchema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().required(),
    email_address: Joi.string().email().required(),
    password: Joi.string().required(),
    phone: Joi.number().required(),
    base_salary: Joi.number().required(),
    role: Joi.string().required()
});

const createEmployeeDetail = (employee_detail) => {
    pool.getPool();
    const { err, value } = employeeSchema.validate(employee_detail);
    if (err) {
        throw new Error(err.details[0].message);
    } else {
        const query = queries.createEmployeeDetail;
        const check = pool.setData(query, [
            value.name,
            value.age,
            value.email_address,
            value.password,
            value.phone,
            value.base_salary,
            value.role
        ])
        if (check) return true;
        return false;
    }
}

const getListEmployee = () => {
    pool.getPool();
    try {
        const query = queries.getListEmployee;
        const listProduct = pool.getListData(query);
        console.log(listProduct);
        return listProduct;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = { createEmployeeDetail, getListEmployee }