export default function makeSendMail({ mailer }) {
  return Object.freeze({ sendMail });

  function sendMail({ emailAddress,  token }) {
    const origin = 'mail-confirmation'
    const link = `${ process.env.NODE_FE_HOST }registration/confirm?email=${ emailAddress }&token=${ token }`
    const mailOptions = {
      to: emailAddress,
      from: process.env.NODEMAILER_NO_REPLY_EMAIL,
      subject: 'Confirm your email',
      html: `<a href="${link}">Please confirm your email address</a>`
    };
    const results = mailer(mailOptions, origin);

    return results
  }
}