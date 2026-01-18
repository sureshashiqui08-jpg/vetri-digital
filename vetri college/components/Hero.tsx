
import React from 'react';

interface HeroProps {
  onEnrollClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onEnrollClick }) => {
  return (
    <section id="hero" className="relative bg-[#3DBE94] min-h-[450px] overflow-hidden flex items-center">
      {/* Abstract Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-3/4 -translate-y-1/2 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -top-20 -left-20 w-[400px] h-[400px] border-[60px] border-white/5 rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between relative z-10">
        <div className="w-full md:w-1/2 text-white py-12">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Your Journey to Knowledge <br />
            <span className="text-gray-900">Starts Here - Explore, Enroll, Excel!</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-lg">
            Join thousands of students mastering the future of technology with our expert-led digital courses.
          </p>
          <button 
            onClick={onEnrollClick}
            className="px-8 py-4 bg-[#2DAA5F] text-white rounded-md font-bold text-lg shadow-lg hover:bg-[#258d4e] transform transition-transform hover:scale-105 active:scale-95"
          >
            Enroll Now
          </button>
        </div>

        <div className="w-full md:w-1/2 flex justify-center md:justify-end mt-8 md:mt-0">
          <div className="relative">
             {/* Decorative circles behind the man */}
             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] md:w-[450px] md:h-[450px] bg-[#2DAA5F]/20 rounded-full -z-10"></div>
             <img 
               src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800" 
               alt="Professional Student" 
               className="w-full max-w-[400px] md:max-w-[500px] object-contain drop-shadow-2xl"
             />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
