
import React from 'react';
import { GraduationCap } from 'lucide-react';

const featureData = [
  { 
    id: '1', 
    number: '01', 
    title: '80+ Online Courses', 
    description: 'Unlock your future with 80+ online courses tailored for digital education. Learn, grow, and excel from anywhere!' 
  },
  { 
    id: '2', 
    number: '02', 
    title: 'Top Instructors', 
    description: 'Learn from the best! Our digital education courses are led by top instructors to ensure your success.' 
  },
  { 
    id: '3', 
    number: '03', 
    title: 'Online Certificates', 
    description: 'Earn industry-recognized digital education certificates that showcase your skills and boost your career prospects.' 
  },
  { 
    id: '4', 
    number: '04', 
    title: '50+ Members', 
    description: 'Join our thriving community of 50+ members and elevate your skills with our digital education platform.' 
  },
];

const Features: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Explore Yourself All Over The World
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureData.map((item) => (
            <div 
              key={item.id} 
              className="relative p-8 rounded-2xl border border-[#2DAA5F]/30 bg-white flex flex-col items-center text-center group hover:shadow-lg transition-all duration-300"
            >
              {/* Numbering */}
              <span className="absolute top-4 left-6 text-4xl font-black text-[#2DAA5F]/20 group-hover:text-[#2DAA5F]/40 transition-colors">
                {item.number}
              </span>

              {/* Icon in Circle */}
              <div className="mt-6 mb-6 w-16 h-16 rounded-full border border-[#2DAA5F] flex items-center justify-center p-3">
                <GraduationCap className="w-full h-full text-[#2DAA5F]" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-4 px-2">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-gray-500 text-sm leading-relaxed px-2">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
