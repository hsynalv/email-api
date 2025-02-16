const nodemailer = require('nodemailer');
const templates = require('../templates/email.templates');

class EmailService {
    static async sendEmail(email, type, data) {
        console.log("Gelen tip:", type);
        try {
            // Veri doğrulama
            if (!email || !type || !data) {
                throw new Error('Geçersiz veri formatı: email, type ve data zorunludur');
            }

            // Template kontrolü
            if (!templates[type]) {
                throw new Error(`Geçersiz email tipi: ${type}`);
            }

            // Transporter oluştur
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASSWORD
                }
            });

            // Email içeriğini oluştur
            const emailContent = templates[type](data);

            // Email gönder
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: emailContent.subject,
                html: emailContent.message
            };

            const result = await transporter.sendMail(mailOptions);
            return result;

        } catch (error) {
            console.error('Email gönderme hatası:', error);
            throw new Error(error.message);
        }
    }
}

module.exports = EmailService; 