const time = require('../utilities/timeHelper');

const validadteCrateLeaveForm = async (values) => {
    try {
        // check day leave is not in the past
        const start_date_of_leave = time.timeStampToDate(values.start_date_of_leave);
        const end_date_of_leave = time.timeStampToDate(values.end_date_of_leave);
        if (start_date_of_leave < time.getNowDate() || end_date_of_leave < time.getNowDate()) {
            global.logger.error(`ValidationError: Leave day is in the past`);
            throw new Error(`ValidationError: Leave day is in the past`);
        } else if (start_date_of_leave > end_date_of_leave) {
            global.logger.error(`ValidationError: Start date is greater than end date`);
            throw new Error(`ValidationError: Start date is greater than end date`);
        }
        return values;
    } catch (error) {
        global.logger.error(`ValidationError: ${error.message}`);
        throw error;
    }
};

const valiateUpdateLeaveForm = async (values) => {
    try {
        // check status valid
        if (values.status !== 'approved' && values.status !== 'rejected') {
            global.logger.error(`ValidationError: Status is not valid`);
            throw new Error(`ValidationError: Status is not valid`);
        }
        return values;
    } catch (error) {
        global.logger.error(`ValidationError: ${error.message}`);
        throw error;
    }
}


module.exports = {
    validadteCrateLeaveForm,
    valiateUpdateLeaveForm
}