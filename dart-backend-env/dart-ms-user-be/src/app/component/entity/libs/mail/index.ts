import mailer from '../../../../libs/nodemailer';
import makeSendMail from './mail';

const mail = ({ emailAddress, token }) => {
    const { sendMail } = makeSendMail({ mailer });
    const result = sendMail({ emailAddress, token});

    return result;
}

export default mail