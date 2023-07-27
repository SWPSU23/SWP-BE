// test send mail to gmail lyhung998877@gmail.com with subject test mail from system and body this is test mail
// const mail = require('../services/mail.Service');

const { redis } = require('../configs')

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
// const salaryCalculator = require('../services/salaryCalculator.Service');
// const testCalculateSalaryByWorksheet = async () => {
//     try {
//         const employee_id = 35;
//         const worksheet_id = 25;
//         await salaryCalculator.calculateSalaryByWorksheet(employee_id, worksheet_id);
//         global.logger.info("Service - Calculate salary by worksheet successfully");
//     } catch (error) {
//         global.logger.error("Service - Error calculate salary by worksheet: " + error);
//         throw error;
//     }
// }
// testCalculateSalaryByWorksheet();

// test random payment code
// const payment = require('../services/payment.Service');
const testRandomPaymentCode = async () => {
    try {
        const paymentCode = payment.generateRandomPaymentCode()
        global.logger.info(
            'Service - Random payment code successfully: ' + paymentCode
        )
    } catch (error) {
        global.logger.error('Service - Error random payment code: ' + error)
        throw error
    }
}
// testRandomPaymentCode();
// test generate momo qr code
const testGenerateMomoQRCode = async () => {
    try {
        const price = 10000
        const paymentCode = payment.generateRandomPaymentCode()
        const qrCode = await payment.generateMomoQRCode(price, paymentCode)
        global.logger.info(
            'Service - Generate momo qr code successfully: ' + qrCode
        )
    } catch (error) {
        global.logger.error('Service - Error generate momo qr code: ' + error)
        throw error
    }
}
// testGenerateMomoQRCode();
// test get momo history
const testGetMomoHistory = async () => {
    try {
        const data = await payment.getMomoHistory()
        global.logger.info(
            'Service - Get momo history successfully: ' +
                JSON.stringify(data.momoMsg.tranList.length)
        )
    } catch (error) {
        global.logger.error('Service - Error get momo history: ' + error)
        throw error
    }
}
// testGetMomoHistory();

// test pay by momo
const testPayByMomo = async () => {
    try {
        const price = 100
        const transaction = await payment.payByMomo(price)
        global.logger.info(
            'Service - Pay by momo successfully: ' + JSON.stringify(transaction)
        )
    } catch (error) {
        global.logger.error('Service - Error pay by momo: ' + error)
        throw error
    }
}
// testPayByMomo();
