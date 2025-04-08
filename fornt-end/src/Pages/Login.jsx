import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import background from '../assets/images/background.avif';
import { Link, useNavigate } from 'react-router-dom';
import { getProfile, userLogin } from '../api/user.api';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/user/userSlice';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({ email: '', password: '' });

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!validateEmail(email)) {
            newErrors.email = 'Please enter a valid email address.';
        }

        if (!validatePassword(password)) {
            newErrors.password =
                'Password must include at least 1 uppercase, 1 lowercase, 1 number, 1 special character and be 8+ characters long.';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({ email: '', password: '' });
        setLoading(true);
        const payload = { email, password };

        try {
            const response = await userLogin(payload);
            console.log('Login Response:', response);

            if (response?.success) {
                const { user, token } = response;
                dispatch(setUser(user));
                localStorage.setItem('token', token);
                toast.success('Login successful!');
                navigate('/');
                await getProfile()
            } else {
                toast.error(response?.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Login Error:', error);
        } finally {
            setLoading(false);
        }
    };



    return (
        <div
            className="h-screen w-full"
            style={{
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="h-full flex flex-col lg:flex-row bg-bg-color/50 text-text-color">
                <div className="lg:w-1/2 w-full md:p-10 p-5 flex items-center justify-center h-full">
                    <div className="w-full max-w-lg bg-text-color/5 backdrop-blur-lg rounded-xl p-8 text-bg-color h-fit mx-auto">
                        <h2 className="text-2xl font-semibold text-center mb-6 text-text-color">Sign In</h2>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="border rounded-md bg-transparent text-text-color text-sm p-2 w-full outline-none"
                                />
                                {errors.email && (
                                    <p className="text-xs text-red-400 mt-1">{errors.email}</p>
                                )}
                            </div>

                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="border rounded-md bg-transparent text-text-color text-sm p-2 w-full pr-10 outline-none"
                                />
                                <span
                                    className="absolute right-3 top-2.5 text-gray-400 text-sm cursor-pointer"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                                {errors.password && (
                                    <p className="text-xs text-red-400 mt-1">{errors.password}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-2 rounded transition-all ${loading
                                    ? 'bg-bg-color1/60 cursor-not-allowed'
                                    : 'bg-bg-color1 hover:bg-bg-color1/90'
                                    } text-text-color`}
                            >
                                {loading ? 'Signing in...' : 'Sign in'}
                            </button>


                            <p className="text-center text-sm mt-2 text-text-color/70">
                                Don't have an account?{' '}
                                <Link to={'/register'} className="underline">
                                    Sign up{' '}
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
