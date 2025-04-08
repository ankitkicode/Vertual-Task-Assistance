import { useState } from "react";
import { IoEyeOffOutline, IoEyeSharp } from "react-icons/io5";

const InputField = ({
    label,
    name,
    value,
    onChange,
    placeholder,
    type = "text",
    maxLength,
    minLength,
    error,
    accept,
    disabled,
    className = "",
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleToggle = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="relative ">
            <label className="block text-sm text-text-color">{label}</label>
            <input
                min={minLength}
                placeholder={placeholder || label}
                type={type === "password" && showPassword ? "text" : type}
                name={name}
                value={type === "file" ? undefined : value}
                onChange={onChange}
                maxLength={maxLength}
                minLength={minLength}
                accept={accept}
                disabled={disabled}
                className={`mt-1 block w-full ${ type === "text" ? "text-sm":"text-xs"} bg-bg-color/50 border-gray-300 rounded shadow-sm border p-2 outline-none pr-10 transition-all duration-300 
                    ${error ? "border-red-500" : "focus:border-bg-color1"}
                    ${disabled ? " cursor-not-allowed opacity-60" : ""}
                    ${className}
                `}
            />
            {type === "password" && (
                <button
                    type="button"
                    onClick={handleToggle}
                    className="absolute right-2 top-[68%] transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                    {showPassword ? <IoEyeSharp /> : <IoEyeOffOutline />}
                </button>
            )}
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};

export default InputField;
