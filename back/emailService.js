const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ayan.serikkan@narxoz.kz',
        pass: 'Ayan2004'
    }
});


async function sendEmail(email, subject, text) {
    try {
        const mailOptions = {
            from: 'ayan.serikkan@narxoz.kz',
            to: email,
            subject: subject,
            text: text
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

module.exports = sendEmail;
