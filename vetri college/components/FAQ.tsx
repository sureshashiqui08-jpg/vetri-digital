
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqData = [
  {
    question: "How do I enroll in a course?",
    answer: "You can enroll in any course by clicking the 'Enroll Now' button on the course details page. Follow the registration steps and complete the payment to get instant access."
  },
  {
    question: "Are the certificates industry-recognized?",
    answer: "Yes, our VTS certificates are recognized by leading tech companies. We focus on skill-based learning that prepares you for real-world roles."
  },
  {
    question: "Can I access the courses offline?",
    answer: "While our primary platform is online, many resources and video transcripts can be downloaded for offline study through our mobile application."
  },
  {
    question: "Do you offer job placement assistance?",
    answer: "Absolutely! We have a dedicated placement cell that helps students with resume building, mock interviews, and connections to our hiring partners."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900">
            Frequently asked questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqData.map((item, idx) => (
            <div 
              key={idx} 
              className={`border rounded-2xl transition-all duration-300 ${
                openIndex === idx ? 'border-[#2DAA5F] bg-[#F4FBF7]/30 shadow-sm' : 'border-gray-100 hover:border-gray-200'
              }`}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full px-8 py-6 flex items-center justify-between text-left"
              >
                <span className={`text-lg font-bold ${openIndex === idx ? 'text-[#2DAA5F]' : 'text-gray-900'}`}>
                  {item.question}
                </span>
                {openIndex === idx ? (
                  <Minus className="w-5 h-5 text-[#2DAA5F]" />
                ) : (
                  <Plus className="w-5 h-5 text-gray-400" />
                )}
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ${openIndex === idx ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-8 pb-6 text-gray-600 leading-relaxed">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
