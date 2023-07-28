const time = require('../utilities/timeHelper')
const pool = require('../services/query.Service')
const queries = require('../queries/queryModal')

const getPaySlipDetails = async (employee_id, month_year) => {
    try {
        // get list day in month of year
        const list_day_in_month_of_year = await pool.getData(
            queries.Calendar.getListDayOfMonthYear(month_year),
            []
        )
        const max_day_in_month = time.timeStampToDate(
            list_day_in_month_of_year[list_day_in_month_of_year.length - 1].date
        )
        const first_day_in_month = time.timeStampToDate(
            list_day_in_month_of_year[0].date
        )
        // get pay slip details
        const pay_slip_details = await pool.getData(
            queries.Salary.getPaySlipDetails(
                employee_id,
                first_day_in_month,
                max_day_in_month
            ),
            []
        )
        // format data
        const data = pay_slip_details.map((item) => ({
            employee_id: item.employee_id,
            employee_name: item.name,
            employee_role: item.role,
            base_salary: item.base_salary,
            tax: item.tax,
            coefficient: item.coefficient,
            total_hours: item.hours,
            total_salary_of_sheet: item.total,
            date: time.timeStampToDate(item.date),
            status: item.status,
        }))
        return data
    } catch (error) {
        global.logger.error(
            `Model: getPaySlipDetails function has error ${error}`
        )
        throw error
    }
}

const getPaySlip = async (employee_id, month_year) => {
    try {
        // get list day in month of year
        const list_salary_of_employee = await getPaySlipDetails(
            employee_id,
            month_year
        )
        const data = {
            employee_id: '',
            employee_name: '',
            employee_role: '',
            base_salary: 0,
            total_hours: 0,
            total_salary: 0,
            month_year: '',
        }
        // format data
        list_salary_of_employee.map((salary_of_employee) => {
            data.employee_id = salary_of_employee.employee_id;
            data.employee_name = salary_of_employee.employee_name;
            data.employee_role = salary_of_employee.employee_role;
            data.base_salary = salary_of_employee.base_salary;
            data.total_hours += salary_of_employee.total_hours;
            data.total_salary += salary_of_employee.total_salary_of_sheet;
            data.month_year = time.timeStampToMonthYear(salary_of_employee.date);
        })
        return data
    } catch (error) {
        global.logger.error(`Model: getPaySlip function has error ${error}`)
        throw error
    }
}

const getPayRoll = async (month_year) => {
    try {
        const data = []
        const list_day_in_month_of_year = await pool.getData(
            queries.Calendar.getListDayOfMonthYear(month_year),
            []
        )
        const max_day_in_month = time.timeStampToDate(
            list_day_in_month_of_year[list_day_in_month_of_year.length - 1].date
        )
        const first_day_in_month = time.timeStampToDate(
            list_day_in_month_of_year[0].date
        )

        const pay_roll = await pool.getData(
            queries.Salary.getPayRoll(first_day_in_month, max_day_in_month),
            []
        )
        // get list employee id
        let list_employee_id = pay_roll.map((item) => item.employee_id)
        // remove duplicate employee id
        list_employee_id = Array.from(new Set(list_employee_id))
        // get list pay slip of employee
        for (const employee_id of list_employee_id) {
            const pay_slip = await getPaySlip(employee_id, month_year)
            data.push(pay_slip)
        }
        return data
    } catch (error) {
        global.logger.error(`Model: getPayRoll function has error ${error}`)
        throw error
    }
}

module.exports = {
    getPaySlipDetails,
    getPaySlip,
    getPayRoll,
}
