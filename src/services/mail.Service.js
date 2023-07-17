const nodemailer = require('nodemailer');

const mailer = nodemailer.createTransport({
    host: `${global.config.mail.host}`,
    port: `${global.config.mail.port}`,
    ignoreTLS: true,
    secure: false,
    auth: {
        user: `${global.config.mail.user}`,
        pass: `${global.config.mail.password}`
    }
});

const sendMail = async (to, subject, html_body) => {
    try {
        const mailOptions = {
            from: `${global.config.mail.user}`,
            to: to,
            subject: subject,
            html: html_body
        };
        await mailer.sendMail(mailOptions);
    } catch (error) {
        global.logger.error("Service - Error send mail: " + error);
        throw error;
    }
}
const sendMailWithAttachment = async (to, subject, html_body, attachments) => {
    try {
        const mailOptions = {
            from: `${global.config.mail.account}`,
            to: to,
            subject: subject,
            html: html_body,
            attachments: attachments
        };
        await mailer.sendMail(mailOptions);
    } catch (error) {
        global.logger.error("Service - Error send mail: " + error);
        throw error;
    }
}
module.exports = {
    sendMail,
    sendMailWithAttachment
}