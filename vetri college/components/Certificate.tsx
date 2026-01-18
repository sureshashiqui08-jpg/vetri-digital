
import React from 'react';
import { Download, ExternalLink } from 'lucide-react';

const Certificate: React.FC = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#2DAA5F]/5 rounded-full blur-3xl -z-10 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl -z-10 translate-x-1/3 translate-y-1/3"></div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Content Side */}
          <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <span className="text-[#2DAA5F] font-bold tracking-widest uppercase text-xs px-3 py-1 bg-[#2DAA5F]/10 rounded-full inline-block">
                Industry Recognized
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-[1.15]">
                Get Certified by <br />
                <span className="text-[#2DAA5F]">Vetri Technology Solutions</span>
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                Showcase your expertise with our ISO 9001:2015 certified credentials. Our certificates are industry-recognized and serve as a testament to your professional growth and mastery of modern technology.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="px-8 py-4 bg-[#2DAA5F] text-white rounded-xl font-bold text-lg hover:bg-[#258d4e] shadow-xl shadow-[#2DAA5F]/20 transition-all flex items-center justify-center gap-2 group">
                <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                Download Sample
              </button>
              <button className="px-8 py-4 bg-white border-2 border-gray-100 text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                <ExternalLink className="w-5 h-5" />
                Verify Certificate
              </button>
            </div>

            <div className="pt-6 grid grid-cols-2 gap-8 border-t border-gray-100">
               <div>
                  <p className="text-2xl font-black text-gray-900">ISO 9001</p>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Certified Org</p>
               </div>
               <div>
                  <p className="text-2xl font-black text-gray-900">100%</p>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Authentic</p>
               </div>
            </div>
          </div>

          {/* Certificate Image Side */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative group max-w-md w-full">
              {/* Outer glow/shadow */}
              <div className="absolute inset-0 bg-[#2DAA5F]/10 rounded-2xl blur-3xl -z-10 transform scale-105 group-hover:bg-[#2DAA5F]/20 transition-all duration-700"></div>
              
              {/* Certificate Frame */}
              <div className="bg-white p-2 md:p-4 rounded-xl shadow-2xl border border-gray-100 transition-all duration-500 transform hover:scale-[1.02] hover:-rotate-1">
                <div className="relative overflow-hidden rounded-lg bg-gray-50">
                  <img 
                    src="./certificate.png" 
                    alt="Vetri Technology Solutions ISO Certificate" 
                    className="w-full h-auto shadow-inner"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                </div>
              </div>

              {/* Decorative Seal Icon hanging off */}
              <div className="absolute -bottom-6 -left-6 bg-white p-3 rounded-full shadow-xl border border-gray-50 hidden md:block animate-bounce [animation-duration:3s]">
                 <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-black text-sm shadow-inner">
                    ISO
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certificate;
