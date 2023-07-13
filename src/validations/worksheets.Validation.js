const queries = require('../queries/queryModal');
const pool = require('../services/queryHelper').getPool();

const deleteWorksheet = (id) => {
    return new Promise((resolve, reject) => {
        // get status to check can delete or not
        pool.query(queries.Worksheet.getWorksheetDetail,
            [id],
            (error, results) => {
                if (error) {
                    global.logger.info(`Validation - Error query get worksheet detail: ${error}`);
                    return reject(error);
                } else {
                    const status = results[0].status;
                    global.logger.info(`Validation - Status of worksheet: ${status}`);
                    if (status === 'not started') {
                        global.logger.info('Validation - Can delete worksheet');
                        resolve();
                    } else if (status === 'working') {
                        global.logger.info('Validation - Can not delete worksheet which is working');
                        reject({ message: 'Can not delete worksheet which is started' });
                    } else {
                        global.logger.info('Validation - Can not delete worksheet which is finished');
                        reject({ message: 'Can not delete worksheet which is finished' });
                    }
                }

            })
    })
}

module.exports = {
    deleteWorksheet
}