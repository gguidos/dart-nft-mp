const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

export default function sendMail(mailOptions, origin) {
  const transporter = nodemailer.createTransport(smtpTransport({
    service: process.env.NODEMAILER_SERVICE,
    host: process.env.NODEMAILER_SMTP_SERVER,
    auth: {
      user: process.env.NODEMAILER_ACCOUNT,
      pass: process.env.NODEMAILER_PASSWORD
    }
  }));

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    return { error: 1, message: error };
  } 

    return { error: 0, message: 'Email sent: ' + info.response }
  
});


}