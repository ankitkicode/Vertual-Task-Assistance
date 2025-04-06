const nodemailer = require("nodemailer");

const sendOTPEmail = async (email, otp) => {
  console.log("user: ",process.env.EMAIL_USER)
  console.log("pass: ",process.env.EMAIL_PASS)
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "OTP Verification Code",
    text: `Your OTP code is ${otp}. Please verify your email address.`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("OTP email sent:", info.messageId);
    let messageId =info.messageId;
    return {id:messageId};
  } catch (error) {
    console.error("Error sending OTP email:", error);
    let err = error.message;
    return {error:err};
  }
};

function generateOTP(length = 6) {
    let STRING = "Lqwe9Y0zUXCvbnPASD3QfTMBkjOI4JVRthgH5ZmpoFlWEyr68x7cisGKduNL12Yop";

    if (length < 4 || length > 10) {
        throw new Error('OTP length should be between 4 and 10.');
    }

    // Shuffle the STRING
    const array = STRING.split('');
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    STRING = array.join("");

    // Generate OTP from the shuffled string
    let OTP = '';
    for (let i = 0; i < length; i++) {
        OTP += STRING[Math.floor(Math.random() * STRING.length)];
    }

    return OTP;
};

module.exports = {sendOTPEmail,generateOTP};