import nodemailer from 'nodemailer';
import '../../config/env'

var transport = nodemailer.createTransport({
    host: process.env.host,
    port: Number(process.env.port),
    secure: true,
    auth: {
        user: process.env.user_email,
        pass: process.env.user_password
    }
});

transport.sendMail({
    from: `MJV API <${process.env.user_email}>`,
    to: 'apiteste999@gmail.com',
    subject: 'Token to change password',
    text: 'Email sended by Nodemailer',
    html: 'Olá, estamos testando a API 2'

})
.then(() => { console.log('Email sended')})
.catch((error) => error);

export default (transport);