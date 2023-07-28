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
            is_read: false
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
        const totalWorkingHours = caculateCheckInOut(
            time.timeStampToHours(worksheet_detail[0].check_in_at),
            time.timeStampToHours(worksheet_detail[0].check_out_at)
        );
        // create salary for employee
        if (totalWorkingHours > 0) {
            await pool
                .setData(
                    queries.Salary.createSalary,
                    [
                        data.worksheet_id,
                        worksheet_detail[0].base_salary,
                        0,
                        time.getNowDate(),
                        totalWorkingHours,
                        worksheet_detail[0].base_salary * totalWorkingHours * worksheet_detail[0].coefficient,
                        'undisbursed'
                    ]
                );
        }
        // handle send notification
        const noti = {
            title: "Check out successfully at " + time.getNowTime(),
            content: `You have worked ${totalWorkingHours} hours`,
            is_read: false
        }
        await notification.addNotification(employee_id, noti);
        global.logger.info("Model - Update check out successfully");
        return results;
    } catch (error) {
        global.logger.error("Model - Error update check out: " + error);
        throw error;
    }
}

const caculateCheckInOut = (check_in_at, check_out_at) => {
    // caculate total working hours
    let totalWorkingHours = parseInt(check_out_at.split(':')[0]) - parseInt(check_in_at.split(':')[0]);
    // floor total working hours
    if (parseInt(check_out_at.split(':')[1]) < parseInt(check_in_at.split(':')[1])) {
        totalWorkingHours = totalWorkingHours - 1;
    }
    if (totalWorkingHours > 8) {
        return 8;
    }

    return totalWorkingHours;
}

module.exports = {
    updateCheckIn,
    updateCheckOut
}