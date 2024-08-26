import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail', // Usa el servicio específico de Gmail
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
    secure: true, // Usa TLS/SSL
    port: 465, // Puerto para SSL
});

export const sendMail = async (to: string, subject: string, text: string, html?: string) => {
    try {
        const info = await transporter.sendMail({
            from: `"Your Name" <${process.env.MAIL_USER}>`, // Dirección de correo del remitente
            to,
            subject,
            text,
            html,
        });
        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
