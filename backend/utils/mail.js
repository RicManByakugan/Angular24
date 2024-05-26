const nodemailer = require('nodemailer')

const SendMail = async (userEmail, subject, content, DataHTML) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mical.garage266@gmail.com',
            pass: 'bcwshztyoymyavbk',
        },
    });
    const mailOptions = {
        from: 'angular1654@gmail.com',
        to: userEmail,
        subject: subject,
        text: content,
        html: DataHTML
    };
    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = { SendMail };
