import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function CreateAcc() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
  
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        setError(`Error creating user: ${errorText}`);
        console.error('Error creating user:', errorText);
        return;
      }
  
      const data = await response.json();
      const userId = data.id; // Assuming the response contains the userId (id of the newly created user)
  
      setSuccess('Account created successfully. Redirecting to mobile verification...');
  
      setTimeout(() => {
        navigate('/VerifyMobile', { state: { uId: userId } });  // Pass the userId to VerifyMobile
      }, 2000);
    } catch (error) {
      setError(`Error creating user: ${error.message}`);
      console.error('Error creating user:', error);
    }
  };
  

  return (
    <div id="root">
      <div className="min-h-screen flex flex-col">
        <div className="flex-1">
          <div className="p-4 min-h-screen grid md:grid-cols-2 text-black">
            <div>
              <a className="flex gap-1 font-bold items-center group w-max rounded-[18px] transition-all duration-500" href="/">
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
                <a title="Home" className="font-extrabold gap-2 capitalize inline-flex text-xl items-center text-primary font-poppins" href="/">
                  <img
                    alt="Logo"
                    className="w-16 md:hidden"
                    src="/static/media/logo_color.c81cd21be83537e526d1b68ca0eb1cea.svg"
                  />
                  <span className="hidden">VibeZ</span>
                </a>
                <h2 className="text-3xl font-bold">Create an account</h2>

                {error && <p className="text-red-600">{error}</p>}
                {success && <p className="text-green-600">{success}</p>}

                <form onSubmit={handleSubmit} className="w-full">
                  <div className="flex flex-col">
                    <label className="text-sm mb-2 text-neutral-500">Name<span className="text-red-600">*</span></label>
                    <div className="p-2 px-1 border border-neutral-300 focus-within:border-neutral-400 bg-transparent w-full inline-flex rounded-[18px] font-poppins">
                      <input
                        min="0"
                        placeholder="John Doe"
                        className="p-2 w-full bg-transparent focus:outline-none focus:border-none disabled:text-neutral-500"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm mb-2 text-neutral-500">Email<span className="text-red-600">*</span></label>
                    <div className="p-2 px-1 border border-neutral-300 focus-within:border-neutral-400 bg-transparent w-full inline-flex rounded-[18px] font-poppins">
                      <input
                        min="0"
                        type="email"
                        placeholder="example@email.com"
                        className="p-2 w-full bg-transparent focus:outline-none focus:border-none disabled:text-neutral-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm mb-2 text-neutral-500">Password<span className="text-red-600">*</span></label>
                    <div className="p-2 px-1 pr-2 border border-neutral-300 focus-within:border-neutral-400 bg-transparent w-full inline-flex rounded-[18px] font-poppins relative">
                      <input
                        min="0"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Please pick a strong password"
                        className="p-2 w-full bg-transparent focus:outline-none focus:border-none disabled:text-neutral-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <Eye size={24} /> : <EyeOff size={24} />}
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm mb-2 text-neutral-500">Confirm Password<span className="text-red-600">*</span></label>
                    <div className="p-2 px-1 pr-2 border border-neutral-300 focus-within:border-neutral-400 bg-transparent w-full inline-flex rounded-[18px] font-poppins relative">
                      <input
                        min="0"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Please retype password"
                        className="p-2 w-full bg-transparent focus:outline-none focus:border-none disabled:text-neutral-500"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                      >
                        {showConfirmPassword ? <Eye size={24} /> : <EyeOff size={24} />}
                      </button>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="p-4 text-white text-center text-lg rounded-[18px] bg-black w-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 my-2"
                  >
                    Sign up
                  </button>
                </form>
                <p>
                  Already have an account?{' '}
                  <a className="text-primary underline" href="/login">
                    Login
                  </a>
                </p>
              </div>
            </div>
            <div className="rounded-[18px] hidden md:block relative p-4 bg-purple-700 h-screen overflow-hidden">
              <a
                className="absolute bg-black text-white p-4 py-2 rounded-[18px] top-4 right-4"
                href="/login"
              >
                Login
              </a>
              <img
                alt="Abstract background"
                src="https://img.freepik.com/free-vector/abstract-blue-light-pipe-speed-zoom-black-background-technology_1142-9530.jpg?ga=GA1.1.291504104.1724005560&semt=ais_hybrid"
                className="w-full h-full object-cover rounded-[18px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAcc;
