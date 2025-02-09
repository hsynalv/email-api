const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validateEmailData = (type, data) => {
    switch (type) {
        case 'welcome':
            return data.name ? true : false;
        case 'invoice':
            return data.name && data.invoiceNumber && data.total ? true : false;
        default:
            return false;
    }
};

module.exports = {
    validateEmail,
    validateEmailData
}; 