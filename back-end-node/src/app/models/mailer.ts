import nodemailer from 'nodemailer';


var transport = nodemailer.createTransport({
    host: process.env.host,
    port: Number(process.env.port),
    secure: true,
    auth: {
        user: process.env.user_email,
        pass: process.env.user_password
    }
});


export default (transport);