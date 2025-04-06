const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { generateOTP, sendOTP } = require('../utils/otpService');
const MESSAGES = require('../constants/messages'); // Apne path ke according adjust kar lena
const { STATUS_CODES, HTTP_STATUS_CODE } = require('../constants/statusCodes');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({ message: MESSAGES.VALIDATION.BODY });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(STATUS_CODES.CONFLICT).json({ message: MESSAGES.ERROR.DUPLICATE_ENTRY });
    }

    const otp =  generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes

    const user = await User.create({
        name,
        email,
        password,
        otp,
        otpExpires,
        isVerified: false
    });

    await sendOTP(email, otp);

    if (user) {
        res.status(STATUS_CODES.CREATED).json({
            message: MESSAGES.SUCCESS.OTP,
            success: HTTP_STATUS_CODE.SUCCESS.TRUE,
        });
    } else {
        res.status(STATUS_CODES.BAD_REQUEST).json({ message: MESSAGES.ERROR.VALIDATION_ERROR });
    }
};

exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(STATUS_CODES.NOT_FOUND).json({ message: MESSAGES.ERROR.DATA_NOT_FOUND });
    }

    if (user.isVerified) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({ message: MESSAGES.ERROR.ALREADY_VERIFIED});
    }

    if (user.otpExpires < Date.now()) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({ message: MESSAGES.ERROR.OTP_EXPIRED });
    }
    
    if (user.otp.toString() !== otp.toString()) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({ message: MESSAGES.ERROR.INVALID_OTP });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;

    await user.save();

    res.status(STATUS_CODES.SUCCESS).json({ message: MESSAGES.SUCCESS.OTP_VERIFIED });
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(STATUS_CODES.NOT_FOUND).json({ message: MESSAGES.ERROR.DATA_NOT_FOUND });
    }

    if (!user.isVerified) {
        return res.status(STATUS_CODES.UNAUTHORIZED).json({ message: MESSAGES.VALIDATION.VERIFY_EMAIL });
    }

    if (user && (await user.matchPassword(password))) {
        const token = generateToken({ _id: user._id, email: user.email });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });
        



        res.status(STATUS_CODES.SUCCESS).json({
            user: user,
            token: token,
            message: MESSAGES.SUCCESS.LOGIN_SUCCESS,
            success: HTTP_STATUS_CODE.SUCCESS.TRUE
        });
    } else {
        res.status(STATUS_CODES.UNAUTHORIZED).json({ message: MESSAGES.VALIDATION.INVALID_PASSWORD });
    }
};

exports.logoutUser = async (req, res) => {
    res.clearCookie('token'); 
    res.status(STATUS_CODES.SUCCESS).json({
        message: MESSAGES.SUCCESS.COOKIE,
        success: HTTP_STATUS_CODE.SUCCESS.TRUE
    });
};

exports.checkAuth = async (req, res) => {
    try {
        console.log("token: ", req.cookies.token)
        const token = req.cookies.token;

        console.log(token)

        if (!token) {
            return res.status(STATUS_CODES.UNAUTHORIZED).json({
                message: MESSAGES.VALIDATION.TOKEN_NOT_FOUND,
                success: false
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
       

        const user = await User.findById(decoded.id._id); 

        if (!user) {
            return res.status(STATUS_CODES.NOT_FOUND).json({
                message: MESSAGES.ERROR.DATA_NOT_FOUND,
                success: MESSAGES.SUCCESS.FALSE
            });
        }

        res.status(STATUS_CODES.SUCCESS).json({
            user,
            message: MESSAGES.SUCCESS.LOGIN_SUCCESS,
            success: MESSAGES.SUCCESS.TRUE
        });

    } catch (error) {
        console.error(error);
        res.status(STATUS_CODES.SERVER_ERROR).json({
            message: MESSAGES.ERROR.INTERNAL_SERVER_ERROR,
            success: false
        });
    }
};




