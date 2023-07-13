const queries = require('../queries/queryModal');
const pool = require('../services/queryHelper').getPool();

const createEmployee = (data) => {
    return new Promise((resolve, reject) => {
        // check if email is existed
        const queryEmail = queries.Employee.searchEmployeeBy('email_address', data.email_address);
        global.logger.info("Validation - Search employee by email: " + queryEmail);
        pool.query(queryEmail,
            (error, results) => {
                if (error) {
                    global.logger.error("Validation - Error search employee by email: " + error);
                    reject(error);
                } else {
                    if (results.length > 0) {
                        global.logger.error("Validation - Email is existed: ");
                        reject({ message: "Validation - Email is existed" });
                    } else {
                        global.logger.info("Validation - Email is not existed: ");
                    }
                }
            })
        // check if phone number is existed
        const queryPhone = queries.Employee.searchEmployeeBy('phone', data.phone);
        global.logger.info("Validation - Search employee by phone: " + queryPhone);
        pool.query(queryPhone,
            (error, results) => {
                if (error) {
                    global.logger.error("Validation - Error search employee by phone: " + error);
                    reject(error);
                } else {
                    if (results.length > 0) {
                        global.logger.error("Validation - Phone number is existed: ");
                        reject({ message: "Validation - Phone number is existed" });
                    } else {
                        global.logger.info("Validation - Phone number is not existed: ");
                    }
                }
            })
        resolve();

    })
}


module.exports = {
    createEmployee
}