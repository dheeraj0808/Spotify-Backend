require('dotenv').config();
const { sendOtpEmail } = require('./src/Services/email.service');

async function testEmail() {
    try {
        console.log('Testing email service...');
        console.log('SMTP_HOST:', process.env.SMTP_HOST);
        console.log('SMTP_USER:', process.env.SMTP_USER);
        console.log('EMAIL_FROM:', process.env.EMAIL_FROM);
        
        const result = await sendOtpEmail('dheeraj94566@gmail.com', '123456', 'Test User');
        console.log('Email test result:', result);
    } catch (error) {
        console.error('Email test failed:', error);
        console.error('Error details:', error.stack);
    }
}

testEmail();
