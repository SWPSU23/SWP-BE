const queries = require('../queries/queryModal');
const pool = require('../services/query.Service');

const validateCreateEmployee = async (data) => {
    try {
        // check email if existed
        const results_email = await pool
            .getData(
                queries.Validate.checkEmail,
                [data.email_address]
            );
        console.log(JSON.stringify(results_email))
        if (results_email.length > 0) {
            global.logger.error(`Validation - Email already exists: ${results_email[0].email_address} of ${results_email[0].name}`);
            throw new Error(`Email already exists: ${results_email[0].email_address} of ${results_email[0].name}`);
        }
        // check phone if existed
        const results_phone = await pool
            .getData(
                queries.Validate.checkPhone,
                [data.phone]
            );
        if (results_phone.length > 0) {
            global.logger.error(`Validation - Phone already exists: ${results_phone[0].phone} of ${results_phone[0].name}`);
            throw new Error(`Phone already exists: ${results_phone[0].phone} of ${results_phone[0].name}`);
        }

        return data;
    } catch (error) {
        global.logger.error(`Validation - Error create employee: ${error}`);
        throw new Error(error.message);
    }
}

const validateUpdateEmployee = async (data, id) => {
    try {
        // check if email is existed
        const results_email = await pool
            .getData(
                queries.Validate.checkEmail,
                [data.email_address]
            );
        // filter email not inclue employee
        const check_email = results_email.filter((item) => item.id !== parseInt(id));
        if (check_email.length > 0) {
            global.logger.error(`Validation - Email already exists: ${check_email[0].email_address} of ${check_email[0].name}`);
            throw new Error(`Email already exists: ${check_email[0].email_address} of ${check_email[0].name}`);
        }
        // check if phone is existed
        const results_phone = await pool
            .getData(
                queries.Validate.checkPhone,
                [data.phone]
            );
        // filter phone not inclue employee
        const check_phone = results_phone.filter((item) => item.id !== parseInt(id));
        if (check_phone.length > 0) {
            global.logger.error(`Validation - Phone already exists: ${check_phone[0].phone} of ${check_phone[0].name}`);
            throw new Error(`Phone already exists: ${check_phone[0].phone} of ${check_phone[0].name}`);
        }
        // check if password is existed
        return data;
    } catch (error) {
        global.logger.error(`Validation - Error update employee: ${error}`);
        throw new Error(error.message);
    }
};



module.exports = {
    validateCreateEmployee,
    validateUpdateEmployee
}