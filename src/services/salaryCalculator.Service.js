const query = require('../services/query.Service')
const pdf = require('pdfkit')
const fs = require('fs')
const time = require('../utilities/timeHelper')
const calculateSalaryByWorksheet = async (employee_id, worksheet_id) => {
    try {
        // get base salary from employee table
        const baseSalary = await query.getData(
            'SELECT base_salary FROM Employee WHERE id = ?',
            [employee_id]
        )
        // get all from worksheet table where id = worksheet_id and employee_id = employee_id
        const worksheet = await query.getData(
            'SELECT * FROM Worksheet WHERE id = ? AND employee_id = ?',
            [worksheet_id, employee_id]
        )
        // get total working hours from checkInOut table that get check_in_at and check_out_at, calculate total working hours
        const checkInOut = await query.getData(
            'SELECT check_in_at, check_out_at FROM CheckInOut WHERE employee_id = ? AND worksheet_id = ?',
            [employee_id, worksheet_id]
        )
        const check_in_at = new Date(checkInOut[0].check_in_at).getTime()
        const check_out_at = new Date(checkInOut[0].check_out_at).getTime()
        // calculate total working hours
        const totalWorkingHours = parseInt(
            (time.timeStampToHours(check_out_at - check_in_at).split(':')
        )[0])

        global.logger.info(totalWorkingHours)
        // calculate employee salary
        const employeeSalary =
            baseSalary[0].base_salary * totalWorkingHours
        // build payrolls pdf file
        const doc = new pdf()
        doc.pipe(fs.createWriteStream('payrolls.pdf'))
        // print header
        doc.fontSize(25)
            .text('Payrolls', { align: 'center' })
            .moveDown()
            .fontSize(15)
            .text('Employee ID: ' + employee_id)
            .moveDown()
            .text('Worksheet ID: ' + worksheet_id)
            .moveDown()
            .text('Employee Salary: ' + employeeSalary)
            .moveDown()
            .text('Total Working Hours: ' + totalWorkingHours)
            .moveDown()
            .text('Base Salary: ' + baseSalary[0].base_salary)
            .moveDown()
            .text('Total Salary: ' + employeeSalary)
            .moveDown()
            .text('Created At: ' + time.getNow())
            .moveDown()
            .text('Status: ' + worksheet[0].status)
            .moveDown()
            .text('')
        // print table header
        doc.fontSize(15)
            .text('Check In At', 50, 200)
            .text('Check Out At', 200, 200)
            .text('Working Hours', 350, 200)
            .text('Status', 500, 200)
            .moveDown()
        // print table body
        for (let i = 0; i < totalWorkingHours.length; i++) {
            doc.fontSize(15)
                .text(totalWorkingHours[i].check_in_at, 50, 200 + (i + 1) * 30)
                .text(
                    totalWorkingHours[i].check_out_at,
                    200,
                    200 + (i + 1) * 30
                )
                .text(
                    totalWorkingHours[i].check_out_at -
                        totalWorkingHours[i].check_in_at,
                    350,
                    200 + (i + 1) * 30
                )
                .text('Approved', 500, 200 + (i + 1) * 30)
                .moveDown()
        }
        // print table footer
        doc.fontSize(15)
            .text(
                'Total Working Hours: ' + totalWorkingHours,
                50,
                200 + (totalWorkingHours + 1) * 30
            )
            .text(
                'Base Salary: ' + baseSalary[0].base_salary,
                200,
                200 + (totalWorkingHours + 1) * 30
            )
            .text(
                'Total Salary: ' + employeeSalary,
                350,
                200 + (totalWorkingHours + 1) * 30
            )
            .text(
                'Status: ' + worksheet[0].status,
                500,
                200 + (totalWorkingHours + 1) * 30
            )
            .moveDown()
        // print footer
        doc.fontSize(15)
            .text(
                'Created At: ' + worksheet[0].created_at,
                50,
                200 + (totalWorkingHours + 2) * 30
            )
            .text(
                'Updated At: ' + worksheet[0].updated_at,
                200,
                200 + (totalWorkingHours + 2) * 30
            )
            .text(
                'Status: ' + worksheet[0].status,
                350,
                200 + (totalWorkingHours + 2) * 30
            )
            .moveDown()
        // end and save pdf file
        doc.end()
        // save pdf file to redis
        // const pdfFile = fs.readFileSync('payrolls.pdf')
        // await global

        // send mail to employee
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
