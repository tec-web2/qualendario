import nodemailer from 'nodemailer';

export async function sendEmail(to: string | undefined, subject: string, text:string, html:string) {
    let transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST ?? 'smtp.gmail.com',
        port: Number(process.env.MAIL_PORT) ?? 587,
        secure: false,
        auth: {
            user: process.env.MAIL_USER ?? 'seu-email@example.com',
            pass: process.env.MAIL_PASS ?? 'sua-senha'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let mailOptions = {
        from: process.env.MAIL_NAME + " "+ process.env.MAIL_USER,
        to: to,
        subject: subject,
        text: text,
        html: html
    };

    try {
        // Envio do e-mail
        let info = await transporter.sendMail(mailOptions);
        console.log('E-mail enviado: %s', info.messageId);
        return info.messageId;
    } catch (error) {
        console.error('Erro ao enviar e-mail: %s', error);
        throw error;
    }
}
