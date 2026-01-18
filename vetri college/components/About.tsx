
import React from 'react';

const About: React.FC = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          {/* Image Side with styled frame */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative">
              <div className="bg-white p-4 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800" 
                  alt="Professional Mentor" 
                  className="rounded-lg w-full max-w-[450px] aspect-[4/5] object-cover"
                />
              </div>
              {/* Decorative accent */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#2DAA5F]/10 rounded-full -z-10 blur-2xl"></div>
            </div>
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="space-y-4">
              <h4 className="text-[#2DAA5F] font-bold tracking-wider uppercase text-sm">
                About Our Platform
              </h4>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-[1.15]">
                We are innovative educational institution to the creation of the student
              </h2>
            </div>
            
            <p className="text-gray-500 text-lg leading-relaxed max-w-xl">
              Our team consists of certified IT professionals with expertise in network security, cloud computing, software development, and technical support. With decades of combined experience, we provide strategic IT guidance and technical support tailored to your business needs.
            </p>

            <div className="pt-4">
              <button className="px-10 py-4 bg-[#2DAA5F] text-white rounded-lg font-bold text-lg hover:bg-[#258d4e] shadow-lg shadow-[#2DAA5F]/20 transition-all transform hover:-translate-y-1 active:scale-95">
                Browse All Courses
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
