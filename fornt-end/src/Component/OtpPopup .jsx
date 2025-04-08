import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const OtpPopup = ({ isOpen, onClose, onSubmit }) => {
    const [otp, setOtp] = useState(["", "", "", "","",""]);

    const handleChange = (index, value) => {
        if (isNaN(value)) return;
        let newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 6) {
            document.getElementById(`otp-${index + 1}`)?.focus();
        }
    };

    const handleSubmit = () => {
        const otpValue = otp.join("");
        if (otpValue.length === 6) {
            onSubmit(otpValue);
        } else {
            alert("Please enter a valid OTP");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-text-color/5 backdrop-blur-sm  p-5">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-medium">Enter OTP</h2>
                    <FaTimes className="cursor-pointer text-gray-500" onClick={onClose} />
                </div>
                <p className="text-gray-600 text-sm mt-2">Enter the 4-digit OTP sent to your number</p>

                <div className="flex justify-center gap-5 my-4">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            className="sm:w-12 sm:h-12 w-8 h-8 text-center border border-gray-300 rounded-md text-xl focus:outline-none focus:ring-2 focus:ring-bg-color"
                        />
                    ))}
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full bg-bg-color text-white py-2 rounded-lg transition"
                >
                    Verify OTP
                </button>
            </div>
        </div>
    );
};

export default OtpPopup;
