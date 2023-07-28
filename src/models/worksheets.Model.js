const pool = require('../services/query.Service');
const joi = require('joi');
const queries = require('../queries/queryModal');
const time = require('../utilities/timeHelper');
const moment = require('moment');
const notification = require('../services/notification.Service');

const worksheetSchema = joi.object({
    employee_id: joi.number().required(),
    sheet_id: joi.number().required(),
    date: joi.string().required(),
    coefficient: joi.number().default(0),
    status: joi.string().default('not started')
})

const createWorksheet = async (data) => {
    try {
        const { error, value } = worksheetSchema.validate(data.worksheet);
        if (error) {
            global.logger.error(`Model - Error validate worksheet: ${error}`)
            throw error;
        } else {
            // create worksheet
            const results = await pool
                .setData(
                    queries.Worksheet.createWorksheet,
                    [
                        value.employee_id,
                        value.sheet_id,
                        value.date,
                        value.status
                    ]
                );
            global.logger.info(`Model - Create worksheet successfully: ${JSON.stringify(results)}`)
            // get coefficient
            const results_coffiecitent = await pool
                .getData(
                    queries.Worksheet.getCoefficient,
                    [
                        value.sheet_id,
                        results.insertId,
                        data.role
                    ],
                );
            value.coefficient = results_coffiecitent[0].coefficient;
            // check sheet is sheet 3
            if (value.sheet_id === 3) {
                // check day is sunday
                if (time.getDayOfWeek(value.date) === 'Sunday') {
                    value.coefficient = 2;
                }
                // check day is holiday
                if (results_coffiecitent[0].isSpecialDay === 'yes') {
                    value.coefficient = 3;
                }
            }
            // update coefficient
            await pool.
                setData(
                    queries.Worksheet.updateWorksheet,
                    [
                        { coefficient: value.coefficient },
                        results.insertId
                    ],
                )
            // create check in out
            await pool
                .setData(
                    queries.CheckInOut.createCheckInOut,
                    [
                        value.employee_id,
                        results.insertId
                    ]
                )

            // handle sent notification
            const noti = {
                title: 'Notification',
                content: `You have a new worksheet on ${value.date}`,
                is_read: false
            }
            await notification.addNotification(value.employee_id, noti);
            return results;

        }
    } catch (error) {
        global.logger.error(`Model - Error validate worksheet: ${error}`)
        throw error;
    }

}

const getWorkSheetOfWeek = async (start_date, end_date, role) => {
    try {
        const results = await pool
            .getData(
                queries.Worksheet.getWorkSheetOfWeek(start_date, end_date, role),
                []
            );
        const data = [];
        // if role is cashier, create 3 sheet
        if (role === 'cashier') {
            data.length = 3;
        }
        // if role is guard, create 2 sheet
        if (role === 'guard') {
            data.length = 2;
        }

        for (let i = 0; i < data.length; i++) {
            // create sheet
            data[i] = {
                [`sheet_${i + 1}`]: []
            };
            // create date
            for (let currentDay = moment(start_date); currentDay <= moment(end_date); currentDay.add(1, 'day')) {
                let detail = [];
                // create detail of date
                results.map((element) => {
                    if (time.timeStampToDate(currentDay) === time.timeStampToDate(element.date) && element.sheet_id === i + 1) {
                        detail.push({
                            worksheet_id: element.id,
                            employee_id: element.employee_id,
                            employee_name: element.employee_name,
                            coefficient: element.coefficient,
                            status: element.status
                        })
                    }
                })
                // set data
                data[i][`sheet_${i + 1}`].push({
                    date: time.timeStampToDate(currentDay),
                    detail: detail
                })
            }
        }
        return data;
    } catch (error) {
        global.logger.error(`Model - Error query get worksheet of week: ${error}`);
        throw error;
    }
}

const getWorkSheetOfWeekEmployee = async (start_date, end_date, employee_id) => {
    try {
        const results = await pool
            .getData(
                queries.Worksheet.getWorkSheetOfWeekEmployee(start_date, end_date, employee_id),
                []
            );
        const employee_detail = await pool
            .getData(
                queries.Employee.getEmployeeDetails,
                [
                    employee_id
                ]
            );

        const data = [];
        // create sheet
        if (employee_detail[0].role === 'cashier') {
            data.length = 3;
        }
        if (employee_detail[0].role === 'guard') {
            data.length = 2;
        }
        for (let i = 0; i < data.length; i++) {
            // create sheet
            data[i] = {
                [`sheet_${i + 1}`]: []
            };
            // create date
            for (let currentDay = moment(start_date); currentDay <= moment(end_date); currentDay.add(1, 'day')) {
                let detail = [];
                // create detail of date
                results.map((element) => {
                    if (time.timeStampToDate(currentDay) === time.timeStampToDate(element.date) && element.sheet_id === i + 1) {
                        detail.push({
                            worksheet_id: element.id,
                            employee_id: element.employee_id,
                            employee_name: element.employee_name,
                            coefficient: element.coefficient,
                            status: element.status
                        })
                    }
                })
                // set data
                data[i][`sheet_${i + 1}`].push({
                    date: time.timeStampToDate(currentDay),
                    detail: detail
                })
            }
        }
        return data;
    } catch (error) {
        global.logger.error(`Model - Error query get worksheet of week: ${error}`);
        throw error;
    }
}

const updateWorksheet = async (data, id) => {
    try {
        const results = await pool
            .setData(
                queries.Worksheet.updateWorksheet,
                [
                    data,
                    id
                ]
            );
        global.logger.info(`Model - Update worksheet successfully: ${JSON.stringify(results)}`);
        return results;
    } catch (error) {
        global.logger.error(`Model - Error query update worksheet: ${error}`);
        throw error;
    }
}

const deleteWorksheet = async (id) => {
    try {
        // delete check in out
        await pool
            .setData(
                queries.CheckInOut.deleteCheckInOut,
                [id]
            );
        // delete worksheet
        const results = await pool
            .setData(
                queries.Worksheet.deleteWorksheet,
                [id]
            );
        global.logger.info(`Model - Delete worksheet successfully: ${JSON.stringify(results)}`);
        return results;
    } catch (error) {
        global.logger.error(`Model - Error query delete worksheet: ${error}`);
        throw error;
    }
}

const getWorksheetDetail = async (id) => {
    try {
        const results = await pool
            .getData(
                queries.Worksheet.getWorksheetDetail,
                [id]
            );
        const data = [];
        // convert time stamp to date
        results.forEach(element => {
            data.push({
                id: element.id,
                employee_id: element.employee_id,
                employee_name: element.employee_name,
                sheet_id: element.sheet_id,
                date: time.timeStampToDate(element.date),
                coefficient: element.coefficient,
                check_in_at: time.timeStampToHours(element.check_in_at),
                check_out_at: time.timeStampToHours(element.check_out_at),
                status: element.status
            })
        });
        return data[0];
    } catch (error) {
        global.logger.error(`Model - Error query get worksheet detail: ${error}`);
        throw error;
    }
}




module.exports = {
    createWorksheet,
    getWorkSheetOfWeek,
    updateWorksheet,
    deleteWorksheet,
    getWorksheetDetail,
    getWorkSheetOfWeekEmployee
}