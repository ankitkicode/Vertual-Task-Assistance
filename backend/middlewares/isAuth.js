const jwt = require('jsonwebtoken');
const MESSAGES = require('../constants/messages');
const { STATUS_CODES } = require('../constants/statusCodes');
const User = require('../models/User'); 

const isAuth = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }
    // 2. Agar wahan nahi mila, to Cookies me check karo
if (!token && req.cookies) {
    token = req.cookies.token;
}

    // console.log(token)
    if (!token) {
        return res.status(STATUS_CODES.UNAUTHORIZED).json({
            message: MESSAGES.VALIDATION.TOKEN_NOT_FOUND
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id._id).select('-password'); 

        if (!req.user) {
            return res.status(STATUS_CODES.UNAUTHORIZED).json({
                message: MESSAGES.ERROR.UNAUTHORIZED
            });
        }

        next(); 
    } catch (error) {
        console.error(error);
        res.status(STATUS_CODES.UNAUTHORIZED).json({
            message: MESSAGES.VALIDATION.EXPIRED_TOKEN
        });
    }
};


module.exports = isAuth;