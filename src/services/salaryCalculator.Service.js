const pdf = require('pdf-lib')
const fontkit = require('@pdf-lib/fontkit')
const fs = require('fs')
const time = require('../utilities/timeHelper')
const salaryModel = require('../models/salaries.Model')
const mail = require('../services/mail.Service')
const employeeModel = require('../models/employees.Model')
const calculateSalaryByWorksheet = async () => {
    // get pay slip of all employee
    const pay_roll = await salaryModel.getPayRoll(time.getNowMonth())
    // get pay slip detail of all employee
    let pay_slip_details = []
    for (const salary_list of pay_roll) {
        pay_slip_details.push(
            await salaryModel.getPaySlipDetails(
                salary_list.employee_id,
                time.getNowMonth()
            )
        )
    }
    // console.log(pay_slip_details)
    // calculate salary
    const summary = []
    for (const pay_slip of pay_slip_details) {
        const pay_index = {
            employee_id: pay_slip[0].employee_id,
            name: pay_slip[0].employee_name,
            month_year: time.getNowMonth(),
            total_salary: 0,
            total_working_hour: 0,
            details: [],
        }
        for (const detail of pay_slip) {
            pay_index.total_salary += detail.total_salary_of_sheet
            pay_index.total_working_hour += detail.total_hours
            pay_index.details.push({
                cofficient: detail.coefficient,
                working_hour: detail.total_hours,
                salary: detail.total_salary_of_sheet,
            })
        }
        summary.push(pay_index)
    }
    // combine details where coefficient is the same
    for (const pay_slip of summary) {
        for (let i = 0; i < pay_slip.details.length; i++) {
            for (let j = i + 1; j < pay_slip.details.length; j++) {
                if (
                    pay_slip.details[i].cofficient ===
                    pay_slip.details[j].cofficient
                ) {
                    pay_slip.details[i].working_hour +=
                        pay_slip.details[j].working_hour
                    pay_slip.details.splice(j, 1)
                    j--
                }
            }
        }
    }
    // export per employee to pdf and upload to redis
    for (const pay_slip of summary) {
        const pdfBytes = await exportToPDF(pay_slip)
        const key = `PaySlip_${pay_slip.employee_id}_${time.getNowMonth()}`
        await uploadToRedis(key, pdfBytes)
        await sendToEmail(pay_slip)
    }
}
const exportToPDF = async (pay_slip) => {
    // load template
    const template = fs.readFileSync('./src/templates/Salary_Template.pdf')

    const doc = await pdf.PDFDocument.load(template)
    // get page
    const pages = doc.getPages()
    // get page 1
    const page = pages[0]
    // get font
    const arialFont = fs.readFileSync('./src/templates/fonts/arial.ttf')
    doc.registerFontkit(fontkit)
    const arial = await doc.embedFont(arialFont, { subset: true })
    // write employee name
    page.drawText(pay_slip.name, {
        x: 600,
        y: 477,
        size: 10,
        font: arial,
        color: pdf.rgb(0, 0, 0),
    })
    // write employee id
    page.drawText(`${pay_slip.employee_id}`, {
        x: 600,
        y: 461,
        size: 10,
        font: arial,
        color: pdf.rgb(0, 0, 0),
    })
    // write payment period
    const payment_period = `10/${time.getNowMonth()}/${time.getNowYear()}`
    page.drawText(payment_period, {
        x: 600,
        y: 406,
        size: 10,
        font: arial,
        color: pdf.rgb(0, 0, 0),
    })
    let no = 1
    let y_pos = 327
    for (const detail of pay_slip.details) {
        // write No.
        page.drawText(`${no++}`, {
            x: 70,
            y: y_pos,
            size: 10,
            font: arial,
            color: pdf.rgb(0, 0, 0),
        })
        // write total working hour
        page.drawText(`${detail.working_hour}`, {
            x: 255,
            y: y_pos,
            size: 10,
            font: arial,
            color: pdf.rgb(0, 0, 0),
        })
        // write base salary
        page.drawText(`${detail.salary} VNĐ`, {
            x: 380,
            y: y_pos,
            size: 10,
            font: arial,
            color: pdf.rgb(0, 0, 0),
        })
        // write coefficient
        page.drawText(`${detail.cofficient}`, {
            x: 540,
            y: y_pos,
            size: 10,
            font: arial,
            color: pdf.rgb(0, 0, 0),
        })
        // write provisional amount
        page.drawText(`${detail.salary} VNĐ`, {
            x: 610,
            y: y_pos,
            size: 10,
            font: arial,
            color: pdf.rgb(0, 0, 0),
        })
        y_pos -= 16
    }
    page.drawText(`${pay_slip.total_salary} VNĐ`, {
        x: 645,
        y: 212,
        size: 16,
        font: arial,
        color: pdf.rgb(1, 1, 1),
    })
    // save pdf
    const pdfBytes = await doc.save()
    return pdfBytes
    // fs.writeFileSync(`./output.pdf`, pdfBytes)
}
const uploadToRedis = async (key, pdfBytes) => {
    const redis = require('redis')
    const client = redis.createClient({
        url: `redis://${global.config.redis.host}:${global.config.redis.port}`,
        password: global.config.redis.password,
        database: global.config.redis.fileDB,
    })
    client.connect()
    client.hSet(key, 'data', Buffer.from(pdfBytes))
    client.quit()
}
const sendToEmail = async (pay_slip) => {
    // get employee email from employee id
    const employee = await employeeModel.getEmployeeDetail(pay_slip.employee_id)
    const employee_email = employee.email_address

    const pdfurl = `http://${global.config.url}:${global.config.port}/v1/asset/salary/pdf/${
        pay_slip.employee_id
    }/${time.getNowMonth()}`
    const mail_body = `
    <p>Dear ${pay_slip.name},</p>
    <p>Here is your pay slip for month ${time.getNowMonth()}.</p>
    
    <p>${pdfurl}</p>


    <p>Best regards,</p>
    <p>HR Department</p>
    `
    await mail.sendMail(employee_email, 'Pay slip', mail_body)
}
module.exports = {
    calculateSalaryByWorksheet,
    exportToPDF,
}
