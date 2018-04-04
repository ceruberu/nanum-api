import { createTransport } from 'nodemailer';
import { gmail } from '../credentials.json';

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: gmail.email,
    pass: gmail.password
  }
});

const mailOptions = email => ({
    from: "Habby <habbytest@gmail.com>",
    to: "kduckyeon@gmail.com",
    subject: "[Nanum] Complete your registration",
    html: `<h1>${email} HTML 보내기 테스트</h1><p><img src="http://www.nodemailer.com/img/logo.png"/></p>`
});

async function sendMailWelcome(email) {
  try {
    const response = await transporter.sendMail(mailOptions(email));
    transporter.close();
    return true
  } catch (err) {
    transporter.close();
    return false
  }
}
export async function sendEmailVerification(token){

}