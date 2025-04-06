const transporter = require("./NodeMailer.util"); // Ensure correct nodemailer setup
const nodemailer = require('nodemailer');
require('dotenv').config();
console.log("user: ",process.env.EMAIL)
console.log("pass: ",process.env.EMAIL_PASSWORD)

// Generate Random OTP
const generateOTP = () => {
    return "123456"; // For testing, use a fixed OTP. In production, uncomment the line below.
    // return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendOTP = async (email , otp) => {
    try {

       
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});


 

        // console.log(`📨 Sending OTP to: ${email} | OTP: ${otp}`);

        await transporter.sendMail({
            from: `"Verification Team" <${process.env.EMAIL}>`, 
            to: email,
            subject: "Your Email Verification Code",
            html: `
                <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; border: 1px solid #ddd; border-radius: 8px; max-width: 400px; margin: auto;">
                    <h2 style="color: #4CAF50;">Email Verification</h2>
                    <p style="font-size: 16px; color: #333;">Your email confirmation code is:</p>
                    <div style="font-size: 22px; font-weight: bold; color: #fff; background: #4CAF50; padding: 10px 20px; display: inline-block; border-radius: 6px;">
                        ${otp}
                    </div>
                    <p style="margin-top: 20px; font-size: 14px; color: #777;">This code is valid for <strong>10 minutes</strong>. Do not share it with anyone.</p>
                    <hr style="margin: 20px 0;">
                    <p style="font-size: 12px; color: #999;">If you did not request this email, please ignore it.</p>
                </div>
            `,
        });

        // console.log(`✅ OTP Email Sent Successfully to: ${email}`);



    } catch (error) {
        console.error("❌ Error sending OTP:", error);
    }
};

module.exports = { generateOTP, sendOTP };
