const queries = require('../queries/queryModal');
const pool = require('../services/queryHelper').getPool();
const bcrypt = require('bcrypt');

const createEmployee = (data) => {

    return new Promise((resolve, reject) => {
        // check if email is existed
        const queryEmail = queries.Employee.searchEmployeeBy('email_address', data.email_address);
        global.logger.info(`Validation - Search employee by email: ${queryEmail}`);
        // query to database
        pool.query(queryEmail,
            (error, results) => {
                if (error) {
                    global.logger.error(`Validation - Error search employee by email: ${error}`);
                    reject(error);
                } else {
                    if (results.length > 0) {
                        global.logger.error("Validation - Email is existed: ");
                        reject({ message: "Email is existed" });
                    } else {
                        global.logger.info("Validation - Email is not existed: ");
                    }
                }
            })
        // check if phone number is existed
        const queryPhone = queries.Employee.searchEmployeeBy('phone', data.phone);
        // query to database
        pool.query(queryPhone,
            (error, results) => {
                if (error) {
                    global.logger.error(`Validation - Error search employee by phone: ${error}`);
                    reject(error);
                } else {
                    if (results.length > 0) {
                        global.logger.error("Validation - Phone number is existed: ");
                        reject({ message: " Phone number is existed" });
                    } else {
                        global.logger.info("Validation - Phone number is not existed: ");
                        // hash password
                        bcrypt.hash(data.password, 10, (err, hash) => {
                            if (err) {
                                global.logger.error(`Validation - Error hashing password: ${err}`);
                                reject(err);
                            } else {
                                global.logger.info(`Validation - Hashed password: ${hash}`);
                                data.password = hash;
                                resolve(data);
                            }
                        })
                    }
                }
            })

    })
}

const updateEmployee = (data, id) => {
    return new Promise((resolve, reject) => {
        const validationPromises = [];
        // check if email is existed
        if (data.email_address) {
            const query = queries.Employee.searchEmployeeBy('email_address', data.email_address);
            validationPromises.push(
                new Promise((resolve, reject) => {
                    global.logger.info(`Validation - Search employee by email: ${query}`);
                    pool.query(query, (error, results) => {
                        if (error) {
                            global.logger.error(`Validation - Error search employee by email: ${error}`);
                            reject(error);
                        } else {
                            // filter employee by id
                            const resultMail = results.filter((item) => item.id !== parseInt(id))
                            global.logger.info(`Validation - Filter employee by id: ${JSON.stringify(resultMail)}`)
                            if (resultMail.length > 0) {
                                global.logger.error("Validation - Email is existed: ");
                                reject({ message: "Email is existed" });
                            } else {
                                global.logger.info("Validation - Email is not existed: ");
                                resolve();
                            }
                        }
                    });
                })
            );
        }
        // check if phone number is existed
        if (data.phone) {
            const query = queries.Employee.searchEmployeeBy('phone', data.phone);
            validationPromises.push(
                new Promise((resolve, reject) => {
                    global.logger.info(`Validation - Search employee by phone: ${query}`);
                    pool.query(query, (error, results) => {
                        if (error) {
                            global.logger.error(`Validation - Error search employee by phone: ${error}`);
                            reject(error);
                        } else {
                            // filter employee by id
                            const resultPhone = results.filter(item => item.id !== parseInt(id))
                            global.logger.info(`Validation - Filter employee by id: ${JSON.stringify(resultPhone)}`)
                            if (resultPhone.length > 0) {
                                global.logger.error("Validation - Phone number is existed: ");
                                reject({ message: "Phone number is existed" });
                            } else {
                                global.logger.info("Validation - Phone number is not existed: ");
                                resolve();
                            }
                        }
                    });
                })
            );
        }

        if (data.password) {
            validationPromises.push(
                new Promise((resolve, reject) => {
                    bcrypt.hash(data.password, 10, (err, hash) => {
                        if (err) {
                            global.logger.error(`Validation - Error hashing password: ${err}`);
                            reject({ message: "Error hashing password" });
                        } else {
                            global.logger.info(`Validation - Hashed password: ${hash}`);
                            data.password = hash;
                            resolve();
                        }
                    });
                })
            );
        }

        Promise.all(validationPromises)
            .then(() => {
                resolve(data); // All validations passed, resolve the promise with the updated data
            })
            .catch((error) => {
                reject(error); // At least one validation failed, reject the promise with the corresponding error
            });
    });
};



module.exports = {
    createEmployee,
    updateEmployee
}