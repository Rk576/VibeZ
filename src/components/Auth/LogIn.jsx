import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function LogIn() {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState('');
    const [email, setEmail] = useState(''); // State for email

    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (role === "Admin" && email === "admin@gmail.com" && password === "admin1234") {
            navigate('/admin');
        } else {
            alert("Invalid credentials for Admin.");
        }
    };

    return (
        <div id="root">
            <div style={{ position: 'fixed', zIndex: 9999, inset: '16px', pointerEvents: 'none' }}></div>
            <div className="min-h-screen flex flex-col">
                <div className="flex-1">
                    <div className="p-4 min-h-screen grid md:grid-cols-2 text-black">
                        <div>
                            <a
                                className="flex gap-1 font-bold items-center group w-max rounded-[18px] transition-all duration-500"
                                href="/"
                            >
                                <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    strokeWidth="0"
                                    viewBox="0 0 24 24"
                                    className="rounded-full group-hover:p-1 group-hover:text-black"
                                    height="24"
                                    width="24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
                                </svg>
                                <p className="text-gray-100 relative text-transparent group-hover:text-black translate-x-16 group-hover:translate-x-0 group-hover:block transition-all">
                                    Go back
                                </p>
                            </a>
                            <div className="flex flex-col items-center md:items-start md:h-full justify-center p-8 md:p-16 gap-4">
                                <a
                                    title="Home"
                                    className="font-extrabold gap-2 capitalize inline-flex text-xl items-center text-primary font-poppins"
                                    href="/"
                                >
                                    <img
                                        alt="Logo"
                                        className="w-16 md:hidden"
                                        src="/static/media/logo_color.c81cd21be83537e526d1b68ca0eb1cea.svg"
                                    />
                                    <span className="hidden">VibeZ</span>
                                </a>
                                <h2 className="text-3xl font-bold">Sign in</h2>
                                <form className="w-full" onSubmit={handleSubmit}>
                                    <div className="flex flex-col">
                                        <label className="text-sm mb-2 text-neutral-500">Role</label>
                                        <div className="p-2 px-1 border border-neutral-300 focus-within:border-neutral-400 bg-transparent w-full inline-flex rounded-[18px] font-poppins">
                                            <select
                                                value={role}
                                                onChange={(e) => setRole(e.target.value)}
                                                className="p-2 w-full bg-transparent focus-within:outline-none focus-within:border-none disabled:text-neutral-500"
                                                required
                                            >
                                                <option value="" disabled hidden>Select role</option>
                                                <option value="User">User</option>
                                                <option value="Admin">Admin</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-sm mb-2 text-neutral-500">Email</label>
                                        <div className="p-2 px-1 border border-neutral-300 focus-within:border-neutral-400 bg-transparent w-full inline-flex rounded-[18px] font-poppins">
                                            <input
                                                min="0"
                                                type="email"
                                                placeholder="example@email.com"
                                                className="p-2 w-full bg-transparent focus-within:outline-none focus-within:border-none disabled:text-neutral-500"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-sm mb-2 text-neutral-500">Password</label>
                                        <div className="p-2 px-1 pr-2 border border-neutral-300 focus-within:border-neutral-400 bg-transparent w-full inline-flex rounded-[18px] font-poppins">
                                            <input
                                                min="0"
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Please pick a strong password"
                                                className="p-2 w-full bg-transparent focus-within:outline-none focus-within:border-none disabled:text-neutral-500"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={togglePasswordVisibility}
                                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                                                className="flex items-center justify-center px-2"
                                            >
                                                {showPassword ? <Eye size={24} /> : <EyeOff size={24} />}
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="p-4 text-white text-center text-lg rounded-[18px] bg-black w-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 my-8"
                                    >
                                        Sign in
                                    </button>
                                </form>
                                <p>
                                    New to VibeZ? Create an account
                                    <a className="underline text-primary" href="/signup"> here</a>
                                </p>
                            </div>
                        </div>
                        <div className="rounded-[18px] hidden md:block relative p-4 bg-purple-700 h-screen overflow-hidden">
                            <a
                                className="absolute bg-black text-white p-4 py-2 rounded-[18px] top-4 right-4"
                                href="/signup"
                            >
                                Sign Up
                            </a>
                            <img
                                alt="Abstract background"
                                src="https://media.istockphoto.com/id/1680372201/photo/flowing-lines-abstract-background-image-waves-copy-space-dark.jpg?s=612x612&w=0&k=20&c=Kb4aCMrhBWYZHpSQ523HS3vm0Vu3AOt0vU3qszJWhik="
                                className="w-full h-full object-cover rounded-[18px]"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LogIn;
