"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
// Looking to send emails in production? Check out our Email API/SMTP product!
var transport = nodemailer_1.default.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "1f33b370ad18b2",
        pass: "64d036d138266d"
    }
});
async function sendEmail(to, body) {
    try {
        const data = await transport.sendMail({
            from: "chakrobortypritam1@gmail.com",
            sender: "chakrobortypritam1@gmail.com",
            to,
            subject: "Hello from Zapier",
            text: body
        });
        console.log(data);
    }
    catch (error) {
        console.log(error);
    }
}
exports.sendEmail = sendEmail;
