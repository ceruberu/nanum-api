import { createTransport } from 'nodemailer';
import { gmail } from '../credentials.json';

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: gmail.email,
    pass: gmail.password
  }
});

const mailOptions = (mailType, email, token) => ({
    from: "Habby <habbytest@gmail.com>",
    to: "kduckyeon@gmail.com",
    subject: mailType.subject,
    html: mailType.html
});

const welcome = {
  subject: "[Nanum] Complete your registration",
  html: `
    <h1>${email} HTML 보내기 테스트</h1>
    <p><img src="http://www.nodemailer.com/img/logo.png"/></p>
    <h3>회원가입이 거의 완료 되었습니다, 아래의 링크를 클릭하여 회원가입을 마무리 하세요</h3>
    <a href="https://localhost:3000/enroll-account/${token}">
      회원가입 링크
    </a>
  `
};

async function sendMailWelcome(email, token) {
  try {
    const response = await transporter.sendMail(mailOptions(welcome, email, token));
    transporter.close();
    return true
  } catch (err) {
    transporter.close();
    return false
  }
}
export async function sendEmailVerification(token){

}