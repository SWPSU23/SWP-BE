const Joi = require('joi');
const time = require('../utilities/timeHelper');
const queries = require('../queries/queryModal');
const pool = require('../services/query.Service');
const notification = require('../services/notification.Service');
// const mail = require('../services/mail.Service');
// const mailTemplate = require('../templates/emails.Template');

const leaveFormSchema = Joi.object({
    employee_id: Joi.number().integer().required(),
    number_of_leave_days_used: Joi.number().integer().default(0),
    start_date_of_leave: Joi.date().required(),
    end_date_of_leave: Joi.date().required(),
    reason_leave: Joi.string().required(),
    status: Joi.string().default('waiting'),
    manager_replied: Joi.string().default(''),
})


const getAllLeaveForm = async (page_index) => {
    try {
        const results = await pool
            .getData(
                queries.LeaveManagement.getListLeaveForm(page_index),
                []
            );
        const data = {
            info: {},
            leave_form: []
        }
        data.leave_form = results.map((item) => ({
            id: item.id,
            employee_id: item.employee_id,
            number_of_leave_days_used: item.number_of_leave_days_used,
            start_date_of_leave: time.timeStampToDate(item.start_date_of_leave),
            end_date_of_leave: time.timeStampToDate(item.end_date_of_leave),
            reason_leave: item.reason_leave,
            status: item.status,
            manager_replied: item.manager_replied
        }));
        data.info.total_page = Math.ceil(results[0].page / 10);
        return data;
    } catch (error) {
        global.logger.error(`Model - Error occurred when get all leave form ${error.message}`)
        throw new Error(error);
    }
}

const createLeaveForm = async (data) => {
    try {
        const { error, value } = leaveFormSchema.validate(data);
        if (error) {
            throw new Error(error);
        } else {
            // count leave day
            const start_date = time.dateToTimeStamp(value.start_date_of_leave);
            const end_date = time.dateToTimeStamp(value.end_date_of_leave);
            const number_of_leave_days_used = (end_date - start_date) / 86400;
            value.number_of_leave_days_used = number_of_leave_days_used;
            const results = await pool
                .getData(
                    queries.LeaveManagement.createLeaveForm,
                    [
                        value.employee_id,
                        value.number_of_leave_days_used,
                        value.start_date_of_leave,
                        value.end_date_of_leave,
                        value.reason_leave,
                        value.status,
                        value.manager_replied
                    ]
                );
            // list manager
            const list_manager = await pool
                .getData(
                    queries.Employee.searchEmployeeBy('role', 'manager'),
                    []
                );
            // handle send noti to manager
            const noti = {
                title: "New leave form has been created",
                content: "Remember check your leave form",
            }
            list_manager.forEach(async (item) => {
                await notification.addNotification(item.id, noti);
            })
            // handle send mail to manager

            return results;
        }
    } catch (error) {
        global.logger.error(`Model - Error occurred when create leave form ${error.message}`)
        throw error;
    }
}

const updateLeaveForm = async (data, id) => {
    try {
        const results = await pool
            .setData(
                queries.LeaveManagement.updateLeaveForm,
                [
                    data,
                    id
                ]
            );
        // detail leave form
        const leaveForm_detail = await pool
            .getData(
                queries.LeaveManagement.getLeaveFormById,
                [
                    id
                ]
            );
        // detail employee
        const employee_detail = await pool
            .getData(
                queries.Employee.getEmployeeDetails,
                [
                    leaveForm_detail[0].employee_id
                ]
            );
        // delete leave day of employee
        const new_leave_day = employee_detail[0].leave_day_of_year - (leaveForm_detail[0].number_of_leave_days_used * 8);
        if (data.status === 'approved') {
            await pool
                .setData(
                    queries.Employee.updateEmployeeDetail,
                    [
                        { leave_day_of_year: new_leave_day },
                        leaveForm_detail[0].employee_id
                    ]
                );
        }
        // handle send noti to employee
        const noti = {
            title: "Your leave form has been updated",
            content: "Remember check your leave form",
        }
        await notification.addNotification(leaveForm_detail[0].employee_id, noti);
        // handle send mail to employee
        // const content = mailTemplate.managerReplyLeaveDay(
        //     `Manager ${data.status} start` +
        //     ` ${time.timeStampToDate(leaveForm_detail[0].start_date_of_leave)}` +
        //     ` to ${time.timeStampToDate(leaveForm_detail[0].end_date_of_leave)}`,
        //     leaveForm_detail[0].manager_replied,
        //     leaveForm_detail[0].status
        // )
        // await mail.sendMail(employee_detail[0].email_address, 'Your leave form has been updated', content)
        return results;
    } catch (error) {
        global.logger.error(`Model - Error occurred when update leave form ${error.message}`)
        throw error;
    }
}

const getLeaveFormByEmployee = async (employee_id) => {
    try {
        const results = await pool
            .getData(
                queries.LeaveManagement.getLeaveFormByEmployee,
                [
                    employee_id
                ]
            );

        const data = results.map((item) => ({
            id: item.id,
            employee_id: item.employee_id,
            number_of_leave_days_used: item.number_of_leave_days_used,
            start_date_of_leave: time.timeStampToDate(item.start_date_of_leave),
            end_date_of_leave: time.timeStampToDate(item.end_date_of_leave),
            reason_leave: item.reason_leave,
            status: item.status,
            manager_replied: item.manager_replied
        }))

        return data;
    } catch (error) {
        global.logger.error(`Model - Error occurred when get leave form by employee ${error.message}`)
        throw error;
    }
}

module.exports = {
    getAllLeaveForm,
    createLeaveForm,
    updateLeaveForm,
    getLeaveFormByEmployee
}