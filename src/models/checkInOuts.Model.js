const queries = require('../queries/queryModal');
const pool = require('../services/queryHelper').getPool();
const time = require('../utilities/timeHelper');


const updateCheckIn = (worksheet_id) => {
    // get current time
    const checkIn = {
        check_in_at: time.getNow()
    }
    // update check in time
    return new Promise((resolve, reject) => {
        pool.query(queries.CheckInOut.updateCheckInOut,
            [checkIn, worksheet_id],
            (error, results) => {
                if (error) {
                    global.logger.error(error);
                    reject(error);
                } else {
                    global.logger.info("Update check in successfully");
                    resolve(results);
                }
            })
    })
}

const updateCheckOut = (worksheet_id) => {
    // get current time 
    const checkOut = {
        check_out_at: time.getNow()
    }
    // update check out time
    return new Promise((resolve, reject) => {
        pool.query(queries.CheckInOut.updateCheckInOut,
            [checkOut, worksheet_id],
            (error, results) => {
                if (error) {
                    global.logger.error(error);
                    reject(error);
                } else {
                    global.logger.info("Update check out successfully");
                    resolve(results);
                }
            })
    })
}

const deleteCheckInOut = (worksheet_id) => {
    const query = queries.CheckInOut.deleteCheckInOut;
    return new Promise((resolve, reject) => {
        pool.query(query, [worksheet_id], (error, results) => {
            if (error) {
                global.logger.error("Error delete check in out: " + error);
                reject(error);
            } else {
                global.logger.info("Delete check in out successfully");
                resolve(results);
            }
        })
    })
}



module.exports = {
    updateCheckIn,
    updateCheckOut,
    deleteCheckInOut
}