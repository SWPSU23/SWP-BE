// test send mail to gmail lyhung998877@gmail.com with subject test mail from system and body this is test mail
// const mail = require('../services/mail.Service');


// const testSendMail = async () => {
//     try {
//         const to = 'lyhung998877@gmail.com';
//         const subject = 'test mail from system';
//         const html_body = 'this is test mail';
//         await mail.sendMail(to, subject, html_body);
//     } catch (error) {
//         global.logger.error("Service - Error send mail: " + error);
//         throw error;
//     }
// }
// testSendMail();

// test calculate salary by worksheet
const salaryCalculator = require('../services/salaryCalculator.Service');
const testCalculateSalaryByWorksheet = async () => {
    try {
        const employee_id = 35;
        const worksheet_id = 25;
        await salaryCalculator.calculateSalaryByWorksheet(employee_id, worksheet_id);
        global.logger.info("Service - Calculate salary by worksheet successfully");
    } catch (error) {
        global.logger.error("Service - Error calculate salary by worksheet: " + error);
        throw error;
    }
}
testCalculateSalaryByWorksheet();