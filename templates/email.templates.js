const fs = require('fs');
const path = require('path');

// Helper function to read HTML templates dynamically
const getHtmlTemplate = (templateName) => {
    const templatePath = path.join(__dirname, `${templateName}.html`);
    if (fs.existsSync(templatePath)) {
        return fs.readFileSync(templatePath, 'utf8');
    } else {
        throw new Error(`Template ${templateName}.html not found`);
    }
};

// Template functions
const templates = {
    welcome: (data) => {
        const html = getHtmlTemplate('welcome-turkish'); 
        return {
            subject: 'Hoş Geldiniz!',
            message: html.replace('{{username}}', data.name)
            .replace('{{username}}', data.name),
        };
    },

    announcement: (data) => {
        const html = getHtmlTemplate('announcement'); 
        return {
            subject: `Sevgili ${data.name}, Yeni Bir Duyurumuz Var!`,
            message: html
                .replace('{{username}}', data.name)
                .replace('{{message}}', data.message),
        };
    },

    purchase: (data) => {
        const html = getHtmlTemplate('purchase-turkish');
        return {
            subject: data.subject,
            message: html
                .replace('{{username}}', data.username)
                .replace('{{title}}', data.title)
                .replace('{{first}}', data.first)
                .replace('{{credit_amount}}', data.credit_amount)
                .replace('{{date}}', data.date),
        };
    },

    resetPassword: (data) => {
        const html = getHtmlTemplate('reset-password');
        return {
            subject: 'Şifre Sıfırlama Talimatları',
            message: html
                .replace('{{username}}', data.username)
                .replace('{{reset_link}}', data.reset_link),
        };
    },
};

module.exports = templates;
