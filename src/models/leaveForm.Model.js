const Joi = require('joi');
const time = require('../utilities/timeHelper');
const queries = require('../queries/queryModal');
const pool = require('../services/query.Service')

const leaveFormSchema = Joi.object({
    employee_id: Joi.number().integer().required(),
    number_of_leave_days_used: Joi.number().integer().required(),
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
            // handle send noti to manager
            // handle send mail to manager
            return results;
        }
    } catch (error) {
        global.logger.error(`Model - Error occurred when create leave form ${error.message}`)
        throw new Error(error);
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
        // handle send noti to employee
        // handle send mail to employee
        return results;
    } catch (error) {
        global.logger.error(`Model - Error occurred when update leave form ${error.message}`)
        throw new Error(error);
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
        throw new Error(error);
    }
}

module.exports = {
    getAllLeaveForm,
    createLeaveForm,
    updateLeaveForm,
    getLeaveFormByEmployee
}
