require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');
const EmailService = require('./services/email.service');
const path = require('path');

const app = express();

// Middleware'ler
app.use(express.json());
app.use(express.static('public'));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 dakika
    max: 10000 // IP başına maksimum istek
});
app.use('/send-email', limiter);

// E-posta gönderim API'si
app.post('/send-email', async (req, res) => {
    const { email, type, data } = req.body;

    try {
        await EmailService.sendEmail(email, type, data);
        res.status(200).json({ 
            success: true, 
            message: 'E-posta başarıyla gönderildi' 
        });
    } catch (error) {
        res.status(400).json({ 
            success: false, 
            message: error.message 
        });
    }
});

// test sayfasını çekme yapıyoruz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Sunucuyu çalıştır
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log('Email server is running on port 3000');
});

