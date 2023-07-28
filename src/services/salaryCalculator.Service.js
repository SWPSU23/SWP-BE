const query = require('../services/query.Service')
const pdf = require('pdfkit')
const fs = require('fs')
const time = require('../utilities/timeHelper')
const salaryModel = require('../models/salaries.Model')
const employeeModel = require('../models/employees.Model')
const e = require('cors')

const calculateSalaryByWorksheet = async () => {
    try {
        // get pay slip of all employee
        const pay_roll = await salaryModel.getPayRoll(time.getNowMonth());
        // get pay slip of each employee
        pay_roll.map(async (paySlip) => {
            // get pay slip details of each employee
            const list_pay_slip_details = await salaryModel.getPaySlipDetails(paySlip.employee_id, time.getNowMonth());
            // set pay index
            const pay_index = {
                employee_id: paySlip.employee_id,
                name: paySlip.employee_name,
                month_year: time.getNowMonth(),
                total_salary: paySlip.total_salary,
                total_working_hour: paySlip.total_hours,
                details: []
            }
            // get pay slip details of each employee
            console.log("list_pay_slip_details", list_pay_slip_details[0].coefficient)
            for (let i = 0; i < list_pay_slip_details.length; i++) {
                for (let j = 0; j < list_pay_slip_details.length; j++) {
                    if (list_pay_slip_details[i].coefficient === pay_index.details[j].coefficient) {
                        pay_index.details[j].working_hour += list_pay_slip_details[i].total_hours
                        pay_index.details[j].salary += list_pay_slip_details[i].total_salary
                        break
                    } else {
                        pay_index.details.push({
                            coefficient: list_pay_slip_details[i].coefficient,
                            working_hour: list_pay_slip_details[i].total_hours,
                            salary: list_pay_slip_details[i].total_salary
                        })
                        break
                    }
                }
            }
            console.log("pay_index", pay_index)
        })

    } catch (error) {
        global.logger.error(error)
        throw error
    }
}
// const exportPayroll = async (pdfStream) => {}
// const calculateTotalSalary = async () => {}
module.exports = {
    calculateSalaryByWorksheet,
}

/**
 * const pay_index = {
                employee_id: employee_detail.id,
                name: 'Nguyen Van A',
                month_year: time.getNowMonth(),
                total_salary: 0,
                total_working_hour: 0,
                details:
                    [
                        {
                            cofficient: 1,
                            working_hour: 0,
                            salary: 0,
                        },
                        {
                            cofficient: 1.5,
                            working_hour: 0,
                            salary: 0,
                        },
                    ]
            }
 */
