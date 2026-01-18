
import React, { useState, useEffect } from 'react';
import { User, Lock, Mail, ArrowRight } from 'lucide-react';

interface RegistrationProps {
  onLoginSuccess: () => void;
  initialMode?: 'login' | 'signup';
}

const Registration: React.FC<RegistrationProps> = ({ onLoginSuccess, initialMode = 'login' }) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);

  // Sync with initialMode prop if it changes from parent
  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  const isSignUp = mode === 'signup';

  return (
    <div className="min-h-screen bg-white flex flex-col font-['Outfit']">
      {/* Registration Banner */}
      <div className="bg-[#A7E6D7] py-20 text-center">
        <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
          Registration form
        </h2>
      </div>

      {/* Form Container */}
      <div className="flex-1 flex items-center justify-center p-6 bg-gray-50/30">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col md:flex-row max-w-4xl w-full overflow-hidden min-h-[600px]">
          
          {/* Left Side: Illustration/Image */}
          <div className="md:w-1/2 bg-[#DFF2E3] flex items-end justify-center pt-12 overflow-hidden relative">
            <div className="absolute top-10 left-10 opacity-20">
               <div className="w-24 h-24 border-4 border-[#2DAA5F] rounded-full"></div>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800" 
              alt="Student" 
              className="w-full max-w-[320px] object-contain transform translate-y-4 z-10"
            />
          </div>

          {/* Right Side: Form */}
          <div className="md:w-1/2 p-12 flex flex-col justify-center">
            <div className="mb-10">
              <h3 className="text-3xl font-medium text-gray-900">
                {isSignUp ? 'Sign Up' : (<span>log <span className="uppercase">In</span></span>)}
              </h3>
            </div>

            <div className="space-y-5">
              {/* Name Field */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400 group-focus-within:text-[#2DAA5F] transition-colors" />
                </div>
                <input 
                  type="text" 
                  placeholder="Name" 
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2DAA5F] focus:border-transparent outline-none transition-all text-gray-700 font-medium placeholder:text-gray-400"
                />
              </div>

              {/* Email Field (Only for Sign Up) */}
              {isSignUp && (
                <div className="relative group animate-in fade-in slide-in-from-top-2">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-[#2DAA5F] transition-colors" />
                  </div>
                  <input 
                    type="email" 
                    placeholder="Email" 
                    className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2DAA5F] focus:border-transparent outline-none transition-all text-gray-700 font-medium placeholder:text-gray-400"
                  />
                </div>
              )}

              {/* Password Field */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-[#2DAA5F] transition-colors" />
                </div>
                <input 
                  type="password" 
                  placeholder="Password" 
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2DAA5F] focus:border-transparent outline-none transition-all text-gray-700 font-medium placeholder:text-gray-400"
                />
              </div>

              {/* Confirm Password Field (Only for Sign Up) */}
              {isSignUp && (
                <div className="relative group animate-in fade-in slide-in-from-top-2">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-[#2DAA5F] transition-colors" />
                  </div>
                  <input 
                    type="password" 
                    placeholder="Confirm Password" 
                    className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2DAA5F] focus:border-transparent outline-none transition-all text-gray-700 font-medium placeholder:text-gray-400"
                  />
                </div>
              )}

              <button 
                onClick={onLoginSuccess}
                className="w-full bg-[#2DAA5F] text-white font-bold py-4 rounded-lg shadow-lg shadow-[#2DAA5F]/20 hover:bg-[#258d4e] transition-all transform active:scale-[0.98] mt-4 flex items-center justify-center gap-2 group"
              >
                {isSignUp ? 'Sign Up' : 'Login'}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="text-center mt-8">
                <p className="text-gray-500 text-sm">
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                  <button 
                    onClick={() => setMode(isSignUp ? 'login' : 'signup')}
                    className="ml-2 text-[#2DAA5F] font-bold hover:underline"
                  >
                    {isSignUp ? 'Log in' : 'Sign up'}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
