import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import img from '../assets/images/svg.png';
import { Link, useNavigate } from 'react-router-dom';
import { userRegister, verifyOtp } from '../api/user.api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OtpPopup from '../Component/OtpPopup ';

const Register = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        password: '',
    });
    const [emailForOtp, setEmailForOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isOtpOpen, setIsOtpOpen] = useState(false);
    const navigate = useNavigate();

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$/;
        return regex.test(password);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
    
        let newErrors = {};
    
        if (!validatePassword(formData.password)) {
            newErrors.password = 'Password must contain at least 8 characters including letters, numbers & a symbol.';
        }
    
        if (!formData.email.includes('@')) {
            newErrors.email = 'Please enter a valid email address.';
        }
    
        setErrors(newErrors);
    
        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await userRegister(formData);
                console.log('Register Success:', response);
    
                if (response.success === true) {
                    toast.success("Registration successful! Please verify your email.");
                    setEmailForOtp(formData.email);
                    setIsOtpOpen(true);
                } else {
                    toast.error(response.message || "Something went wrong.");
                }
    
                setFormData({
                    firstname: '',
                    lastname: '',
                    email: '',
                    phone: '',
                    password: '',
                });
            } catch (error) {
                toast.error("Registration failed. Please try again.");
                console.error('Register Error:', error);
            }
        }
    
        setLoading(false); // Stop loading
    };

    const handleOtpSubmit = async ( otp ) => {
        const payload = {
            email: emailForOtp,
            otp: otp,
        };
        
        try {
            const response = await verifyOtp(payload);
            console.log('OTP Verification Response:', response);

            if (response.success) {
                toast.success("OTP Verified! Redirecting...");
                navigate('/login');
            } else {
                toast.error(response.message || "Invalid OTP");
            }
        } catch (error) {
            toast.error("OTP verification failed.");
            console.error('OTP Error:', error);
        }
    };


    return (
        <>
            <div className="h-screen flex flex-col lg:flex-row bg-bg-color text-text-color">
                <div className="lg:w-1/2 hidden lg:flex flex-col justify-center items-center p-10 space-y-4">
                    <h1 className="text-4xl font-bold">Design with us</h1>
                    <p className="text-lg text-center max-w-md">
                        Access to thousands of design resources and templates
                    </p>
                    <img src={img} className='h-96 object-cover' alt="Design Illustration" />
                </div>

                <div className="lg:w-1/2 w-full md:p-10 p-5 flex items-center justify-center h-full">
                    <div className='w-full max-w-xl bg-text-color/5 backdrop-blur-lg rounded-xl p-8 text-bg-color h-fit mx-auto'>
                        <h2 className="text-2xl font-semibold mb-6 text-text-color">Sign up now</h2>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="flex flex-col lg:flex-row gap-4">
                                <input type="text" name="firstname" placeholder="First name" value={formData.firstname} onChange={handleChange}
                                    className="border rounded-md p-2 w-full outline-none bg-transparent text-text-color text-sm" />
                                <input type="text" name="lastname" placeholder="Last name" value={formData.lastname} onChange={handleChange}
                                    className="border rounded-md p-2 w-full outline-none bg-transparent text-text-color text-sm" />
                            </div>

                            <div>
                                <input type="email" name="email" placeholder="Email address" value={formData.email} onChange={handleChange}
                                    className="border rounded-md p-2 w-full outline-none bg-transparent text-text-color text-sm" />
                                {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                            </div>

                            <input type="tel" name="phone" placeholder="Phone number" value={formData.phone} onChange={handleChange}
                                className="border rounded-md p-2 w-full outline-none bg-transparent text-text-color text-sm" />

                            <div className="relative">
                                <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={formData.password}
                                    onChange={handleChange}
                                    className="border rounded-md p-2 w-full outline-none pr-10 bg-transparent text-text-color text-sm" />
                                <span className="absolute right-3 top-3 text-gray-400 text-sm cursor-pointer"
                                    onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                                {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password}</p>}
                            </div>

                            <div className="space-y-2 text-sm text-text-color">
                                <label className="flex items-start gap-2">
                                    <input type="checkbox" className="mt-1" required />
                                    <span>
                                        By creating an account, I agree to our <a href="#" className="underline">Terms of Use</a> and <a href="#" className="underline">Privacy Policy</a>.
                                    </span>
                                </label>
                                <label className="flex items-start gap-2">
                                    <input type="checkbox" className="mt-1" />
                                    <span>
                                        I consent to receive SMS and emails including updates, events, and promotions.
                                    </span>
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-2 rounded transition-all ${loading
                                    ? 'bg-bg-color1/60 cursor-not-allowed'
                                    : 'bg-bg-color1 hover:bg-bg-color1/90'
                                    } text-text-color`}
                            >
                                {loading ? 'Sign up...' : 'Sign up'}
                            </button>

                            <p className="text-center text-sm mt-2 text-text-color/70">
                                Already have an account? <Link to={'/login'} className="underline">Log in</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            <OtpPopup
                isOpen={isOtpOpen}
                onClose={() => setIsOtpOpen(false)}
                onSubmit={handleOtpSubmit}
            />
        </>
    );
};

export default Register;
