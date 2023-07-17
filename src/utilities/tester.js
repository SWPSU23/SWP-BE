// test send mail to gmail lyhung998877@gmail.com with subject test mail from system and body this is test mail
const mail = require('../services/mail.Service');


const testSendMail = async () => {
    try {
        const to = 'lyhung998877@gmail.com';
        const subject = 'test mail from system';
        const html_body = 'this is test mail';
        await mail.sendMail(to, subject, html_body);
    } catch (error) {
        global.logger.error("Service - Error send mail: " + error);
        throw error;
    }
}
testSendMail();
