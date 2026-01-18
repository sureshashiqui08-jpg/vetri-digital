
import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const benefits = [
  'Flexible Learning Options',
  'Premium Quality Courses',
  'Career-Focused Programs',
  'Personalized Mentorship'
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Pagination Dots Decorative Element */}
        <div className="flex justify-center gap-1.5 mb-8">
          <div className="w-2 h-2 rounded-full bg-[#2DAA5F]"></div>
          <div className="w-2 h-2 rounded-full bg-gray-200"></div>
          <div className="w-2 h-2 rounded-full bg-gray-200"></div>
          <div className="w-2 h-2 rounded-full bg-gray-200"></div>
          <div className="w-2 h-2 rounded-full bg-gray-200"></div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-gray-900 mb-4">
            Why Choose Us?
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
            Get instant Mentorship and a supportive learning community.
          </p>
        </div>

        {/* Highlighted Benefits Box */}
        <div className="max-w-4xl mx-auto">
          <div className="border-2 border-[#2DAA5F]/40 rounded-2xl p-8 md:p-12 bg-[#F4FBF7]/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-4 group">
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="w-8 h-8 text-[#2DAA5F] fill-[#2DAA5F]/10 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-xl font-bold text-gray-800 tracking-tight">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
