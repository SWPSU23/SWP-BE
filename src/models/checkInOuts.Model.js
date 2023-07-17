const queries = require('../queries/queryModal');
const pool = require('../services/query.Service');

const updateCheckIn = async (worksheet_id, check_in_at) => {
    try {
        const check_in = {
            check_in_at: check_in_at
        };
        // update check in time
        const results = await pool
            .setData(queries.CheckInOut.updateCheckInOut,
                [check_in, worksheet_id]
            );
        // update worksheet status to present
        await pool.setData(
            queries.Worksheet.updateWorksheet,
            [
                { status: 'working' },
                worksheet_id
            ]);
        return results;

    } catch (error) {
        global.logger.error("Model - Error update check in: " + error);
        throw error;
    }
    // get current time
    // update check in 

}

const updateCheckOut = async (worksheet_id, check_out_at) => {
    try {
        // get current time 
        const check_out = {
            check_out_at: check_out_at
        }
        // update check out time
        const results = await pool
            .setData(
                queries.CheckInOut.updateCheckInOut,
                [check_out, worksheet_id]
            );
        // update worksheet status to done
        await pool
            .setData(queries.Worksheet.updateWorksheet,
                [
                    { status: 'present' }, worksheet_id
                ]);
        return results;
    } catch (error) {
        global.logger.error("Model - Error update check out: " + error);
        throw error;
    }
}



module.exports = {
    updateCheckIn,
    updateCheckOut
}