import { resend } from './index';
import nodemailer from 'nodemailer'


// Looking to send emails in production? Check out our Email API/SMTP product!
var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "1f33b370ad18b2",
        pass: "64d036d138266d"
    }
});


export async function sendEmail(to: string, body: string) {
    try {
        const data = await transport.sendMail({
            from: "chakrobortypritam1@gmail.com",
            sender: "chakrobortypritam1@gmail.com",
            to,
            subject: "Hello from Zapier",
            text: body
        })
        console.log(data)
    } catch (error) {
        console.log(error)
    }

}
