const User = require('../models/User');
const { STATUS_CODES, HTTP_STATUS_CODE } = require('../constants/statusCodes');
const { success } = require('../constants/responseFun');
const MESSAGES = require('../constants/messages');
const Task = require('../models/Tasks');


exports.getProfile = async (req, res) => {
    try{
        const user = await User.findById(req.user._id).select('-password -otp -otpExpires -__v');
        if (!user) {
            return res.status(STATUS_CODES.NOT_FOUND).json({
                message: MESSAGES.ERROR.DATA_NOT_FOUND,
                success: MESSAGES.SUCCESS.FALSE
            });
        }
        res.status(STATUS_CODES.SUCCESS).json({
            user,
            message: MESSAGES.SUCCESS.PROFILE_SUCCESS,
            success: MESSAGES.SUCCESS.TRUE
        });

    } catch (error) {
        console.error(error);
        res.status(STATUS_CODES.SERVER_ERROR).json({
            message: MESSAGES.ERROR.INTERNAL_SERVER_ERROR,
            success: false
        });
    }
}

exports.updateProfile = async (req, res) => {
    try {
        const { firstname, lastname, phone, email  } = req.body;
        const user = await User.findByIdAndUpdate(req.user._id, { firstname, lastname, phone, email }, { new: true }).select('-password -otp -otpExpires -__v');
        if (!user) {
            return res.status(STATUS_CODES.NOT_FOUND).json({
                message: MESSAGES.ERROR.DATA_NOT_FOUND,
                success: MESSAGES.SUCCESS.FALSE
            });
        }
        res.status(STATUS_CODES.SUCCESS).json({
            user,
            message: MESSAGES.SUCCESS.PROFILE_SUCCESS,
            success: MESSAGES.SUCCESS.TRUE
        });
    } catch (error) {
        console.error(error);
        res.status(STATUS_CODES.SERVER_ERROR).json({
            message: MESSAGES.ERROR.INTERNAL_SERVER_ERROR,
            success: false
        });
    }
}

exports.getDashboard = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password -otp -otpExpires -__v');
        if (!user) {
            return res.status(STATUS_CODES.NOT_FOUND).json({
                message: MESSAGES.ERROR.DATA_NOT_FOUND,
                success: MESSAGES.SUCCESS.FALSE
            });
        }

        const tasks = await Task.find({ user: req.user._id });
        const today = new Date();




        res.status(STATUS_CODES.SUCCESS).json({
            user,
            message: MESSAGES.SUCCESS.PROFILE_SUCCESS,
            success: MESSAGES.SUCCESS.TRUE
        });
    } catch (error) {
        console.error(error);
        res.status(STATUS_CODES.SERVER_ERROR).json({
            message: MESSAGES.ERROR.INTERNAL_SERVER_ERROR,
            success: false
        });
    }
}

exports.updateEmailNotification = async (req, res) => {
    // console.log(req.body);
    try {
        const user = await User.findOne(req.user._id).select('-password -otp -otpExpires -__v');
        if (!user) {
            return res.status(STATUS_CODES.NOT_FOUND).json({
                message: MESSAGES.ERROR.DATA_NOT_FOUND,
                success: MESSAGES.SUCCESS.FALSE
            });
        }
        user.onEmailNotification = req.body.onEmailNotification;
        await user.save();



        res.status(STATUS_CODES.SUCCESS).json({
            user,
            message: MESSAGES.SUCCESS.PROFILE_SUCCESS,
            success: MESSAGES.SUCCESS.TRUE
        });
    }
    catch (error) {
        console.error(error);
        res.status(STATUS_CODES.SERVER_ERROR).json({
            message: MESSAGES.ERROR.INTERNAL_SERVER_ERROR,
            success: false
        });
    }
}