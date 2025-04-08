const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const defaultProfilePictures = [
    'https://i.pinimg.com/736x/6d/42/89/6d42893c93d32cf18e5e56ede1627595.jpg',
    'https://imgcdn.stablediffusionweb.com/2024/4/12/d943c47e-5c42-4ff9-8440-00b3eb919e67.jpg',
    'https://t4.ftcdn.net/jpg/09/43/48/93/360_F_943489384_zq3u5kkefFjPY3liE6t81KrX8W3lvxSz.jpg',
    'https://imgcdn.stablediffusionweb.com/2025/1/3/d22f41e0-718b-41a0-a580-937554580eff.jpg',
    'https://imgcdn.stablediffusionweb.com/2025/1/3/d22f41e0-718b-41a0-a580-937554580eff.jpg'
];

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'Please provide a Firstname']
    },
    lastname: {
        type: String,
        required: [true, 'Please provide a Lastname']
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: [true, 'Please provide a Mobile']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 6
    },
    otp: {
        type: String,
        default: null
    },
    otpExpires: {
        type: Date,
        default: null
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    onEmailNotification: {
        type: Boolean,
        default: false
    },
    profilePicture: {
        type: String,
        default: function () {
            const randomIndex = Math.floor(Math.random() * defaultProfilePictures.length);
            return defaultProfilePictures[randomIndex];
        }
    },
}, { timestamps: true });

// Password hash karne ka middleware
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Password match karne ka method
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
