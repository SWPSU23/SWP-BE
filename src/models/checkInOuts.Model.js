const queries = require('../queries/queryModal');
const pool = require('../services/query.Service');

const updateCheckIn = async (data) => {
    try {
        console.log(data)
        // update check in
        const results = await pool
            .setData(
                queries.CheckInOut.updateCheckInOut,
                [
                    { check_in_at: data.check_in },
                    data.worksheet_id
                ]
            );
        // update status worksheet
        await pool
            .setData(
                queries.Worksheet.updateWorksheet,
                [
                    { status: "working" },
                    data.worksheet_id
                ]
            );
        return results;
    } catch (error) {
        global.logger.error("Model - Error update check in: " + error);
        throw error;
    }

}

const updateCheckOut = async (data) => {
    try {
        // update check out
        const results = await pool
            .setData(
                queries.CheckInOut.updateCheckInOut,
                [
                    { check_out_at: data.check_out },
                    data.worksheet_id
                ]
            );
        // update status worksheet
        await pool
            .setData(
                queries.Worksheet.updateWorksheet,
                [
                    { status: "present" },
                    data.worksheet_id
                ]
            );
        // // get detail worksheet
        // const detail_worksheet = await pool
        //     .getData(
        //         queries,
        //         [data.worksheet_id]
        //     );
        // create salary
        // await pool
        //     .setData(
        //         queries.Salary.createSalary,
        //         [
        //             data.worksheet_id,
        //             detail_worksheet[0].base_salary,
        //             0,
        //             detail_worksheet[0].date,
        //             'undisbursed',
        //             detail_worksheet[0].coefficients * detail_worksheet[0].base_salary
        //         ],
        //     );
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