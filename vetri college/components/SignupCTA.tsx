
import React from 'react';

interface SignupCTAProps {
  onSignupClick?: () => void;
}

const SignupCTA: React.FC<SignupCTAProps> = ({ onSignupClick }) => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.04)] p-8 md:p-12 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
          {/* Decorative dots/shapes matching screenshot */}
          <div className="absolute top-10 left-[40%] w-3 h-3 bg-red-400 rounded-full"></div>
          <div className="absolute bottom-12 left-[10%] w-3 h-3 bg-[#2DAA5F] rounded-full"></div>
          <div className="absolute bottom-20 right-[45%] w-5 h-5 bg-purple-500 rounded-full"></div>
          
          {/* Image Side */}
          <div className="w-full md:w-1/2 relative">
            <div className="relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" 
                alt="Students learning" 
                className="w-full h-auto rounded-[40px] shadow-xl border-4 border-white object-cover aspect-[4/3]"
              />
              {/* Overlapping shape decoration */}
              <div className="absolute -top-4 -right-4 w-12 h-12 border-2 border-orange-300 rounded-xl -z-10 rotate-12"></div>
            </div>
          </div>

          {/* Content Side */}
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Join <span className="text-[#2DAA5F]">World's largest</span> learning platform today
            </h2>
            <p className="text-gray-500 text-lg">
              Start learning by registering for free
            </p>
            <button 
              onClick={onSignupClick}
              className="px-8 py-3 bg-[#2DAA5F] text-white rounded-lg font-bold hover:bg-[#258d4e] shadow-lg shadow-[#2DAA5F]/20 transition-all transform hover:-translate-y-1 active:scale-95"
            >
              Sign up for Free
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupCTA;
