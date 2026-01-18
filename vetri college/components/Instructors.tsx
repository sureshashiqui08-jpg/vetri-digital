
import React from 'react';

const instructors = [
  { name: 'Dr. Sarah Wilson', role: 'Full Stack Developer', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400' },
  { name: 'James Chen', role: 'UI/UX Lead', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400' },
  { name: 'Elena Rodriguez', role: 'Data Scientist', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400' },
  { name: 'Marcus Bell', role: 'Cloud Architect', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400' },
];

const Instructors: React.FC = () => {
  return (
    <section className="py-24 bg-white border-t border-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-left mb-16">
          <h2 className="text-4xl font-black text-gray-900">
            Our Best <span className="text-[#2DAA5F]">Instructor</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {instructors.map((person, idx) => (
            <div key={idx} className="group">
              <div className="relative aspect-square overflow-hidden rounded-2xl mb-4 bg-gray-100 border border-gray-100">
                <img 
                  src={person.image} 
                  alt={person.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900">{person.name}</h3>
              <p className="text-[#2DAA5F] font-medium">{person.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Instructors;
