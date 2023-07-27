const queries = require('../queries/queryModal');
const pool = require('../services/query.Service');
const time = require('../utilities/timeHelper');
const notification = require('../services/notification.Service');

const updateCheckIn = async (data, employee_id) => {
    try {
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
        // handle send notification
        const noti = {
            title: "Check in successfully at " + time.getNowTime(),
            content: "Remember check out",
        }
        await notification.addNotification(employee_id, noti);
        return results;
    } catch (error) {
        global.logger.error("Model - Error update check in: " + error);
        throw error;
    }

}

const updateCheckOut = async (data, employee_id) => {
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
        // caculate total working hours
        const worksheet_detail = await pool
            .getData(
                queries.Worksheet.getWorksheetDetail,
                [data.worksheet_id]
            );
        const totalWorkingHours = await caculateCheckInOut(
            time.timeStampToHours(worksheet_detail[0].check_in_at),
            time.timeStampToHours(worksheet_detail[0].check_out_at)
        );
        // create salary for employee
        await pool
            .setData(
                queries.Salary.createSalary,
                [
                    data.worksheet_id,
                    worksheet_detail[0].base_salary,
                    0,
                    time.getNowDate(),
                    totalWorkingHours,
                    worksheet_detail[0].base_salary * totalWorkingHours,
                    'undisbursed'
                ]
            );
        // handle send notification
        const noti = {
            title: "Check out successfully at " + time.getNowTime(),
            content: `You have worked ${totalWorkingHours} hours`,
        }
        await notification.addNotification(employee_id, noti);

        return results;
    } catch (error) {
        global.logger.error("Model - Error update check out: " + error);
        throw error;
    }
}

const caculateCheckInOut = async (check_in_at, check_out_at) => {
    // caculate total working hours
    const totalWorkingHours = parseInt(
        ((check_out_at - check_in_at).split(':')[0])
    )
    if (totalWorkingHours > 8) {
        return 8;
    }

    return totalWorkingHours;
}

module.exports = {
    updateCheckIn,
    updateCheckOut
}