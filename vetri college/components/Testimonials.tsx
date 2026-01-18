
import React from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Abinaya',
    role: 'UI-UX Designer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    text: 'Ut pharetra ipsum nec leo blandit, sit amet tincidunt eros pharetra. Nam sed imperdiet turpis. In hac habitasse platea dictumst. Praesent nulla massa, hendrerit vestibulum gravida in, feugiat auctor felis.'
  },
  {
    name: 'Sumaya',
    role: 'UI-UX Designer',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150',
    text: 'Ut pharetra ipsum nec leo blandit, sit amet tincidunt eros pharetra. Nam sed imperdiet turpis. In hac habitasse platea dictumst. Praesent nulla massa, hendrerit vestibulum gravida in, feugiat auctor felis.'
  },
  {
    name: 'Mari',
    role: 'UI-UX Designer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    text: 'Ut pharetra ipsum nec leo blandit, sit amet tincidunt eros pharetra. Nam sed imperdiet turpis. In hac habitasse platea dictumst. Praesent nulla massa, hendrerit vestibulum gravida in, feugiat auctor felis.'
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-[#DFF2E3]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-gray-900 lowercase tracking-tight">
            what our students are saying
          </h2>
        </div>

        <div className="relative">
          {/* Navigation Arrows */}
          <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md text-gray-400 hover:text-[#2DAA5F] transition-colors hidden md:flex">
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((item, idx) => (
              <div key={idx} className="bg-white rounded-[32px] p-8 shadow-sm relative group hover:shadow-xl transition-all duration-300">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900 leading-none mb-1">{item.name}</h4>
                      <p className="text-xs text-gray-500 font-medium">{item.role}</p>
                    </div>
                  </div>
                  <Quote className="w-8 h-8 text-[#2DAA5F] opacity-80" />
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-[#2DAA5F] rounded-full flex items-center justify-center shadow-md text-white hover:bg-[#258d4e] transition-colors hidden md:flex">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
