// src/services/mailService.ts
import formData from 'form-data';
import Mailgun from 'mailgun.js';

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY || 'key-yourkeyhere'
});

export function sendEmail(
    to: string[],
    subject: string,
    text: string,
    html?: string
): Promise<void> {
    const domain = process.env.MAILGUN_DOMAIN || 'sandbox-123.mailgun.org';  // Cambia a tu dominio
    const from = `Excited User <mailgun@${domain}>`;

    return mg.messages.create(domain, {
        from,
        to,
        subject,
        text,
        html
    })
        .then(msg => console.log('Correo enviado:', msg)) // logs response data
        .catch(err => {
            console.error('Error al enviar correo:', err); // logs any error
            throw err;
        });
}
