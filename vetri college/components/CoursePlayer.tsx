
import React, { useState } from 'react';
import { ChevronLeft, ChevronDown, X, Play, ChevronRight } from 'lucide-react';

interface CoursePlayerProps {
  courseTitle: string;
  onBack: () => void;
}

const CoursePlayer: React.FC<CoursePlayerProps> = ({ courseTitle, onBack }) => {
  const [activeDay, setActiveDay] = useState(0);

  const days = [
    { label: 'Day 01', lessons: [] },
    { label: 'Day 02', lessons: [] },
    { label: 'Day 03', lessons: [] },
    { label: 'Day 04', lessons: [] },
    { label: 'Day 05', lessons: [] },
    { label: 'Day 06', lessons: [] },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col font-['Outfit']">
      {/* Global Header (Navbar) remains from App but CoursePlayer has its own interior header */}
      
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar: Curriculum */}
        <div className="w-[350px] border-r border-gray-100 flex flex-col bg-white">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg text-gray-900">Figma 20 days</h3>
              <button className="px-3 py-1.5 border border-gray-300 rounded-md text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                Take a test
              </button>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-end">
                <span className="text-[10px] font-bold text-[#2DAA5F]">1%</span>
              </div>
              <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className="w-[1%] h-full bg-[#2DAA5F]"></div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {days.map((day, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveDay(idx)}
                className={`w-full px-6 py-5 flex items-center justify-between border-b border-gray-50 transition-colors ${
                  activeDay === idx ? 'bg-gray-50' : 'hover:bg-gray-50/50'
                }`}
              >
                <span className="font-bold text-gray-800">{day.label}</span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${activeDay === idx ? 'rotate-180' : ''}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Right Content: Player */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Internal Player Header - Matching the Mint color from screenshot */}
          <div className="bg-[#A7E6D7] px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={onBack}
                className="p-1.5 bg-black/5 rounded-full hover:bg-black/10 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-800" />
              </button>
              <h2 className="font-bold text-gray-900">Complete UI/UX Design Essentials</h2>
            </div>
            <button onClick={onBack} className="p-1 hover:bg-black/5 rounded-full">
              <X className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          {/* Video Area */}
          <div className="flex-1 relative bg-gray-100 flex items-center justify-center">
            <div className="w-full h-full relative group">
              {/* Main Background Image Mockup */}
              <img 
                src="https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?auto=format&fit=crop&q=80&w=1600" 
                alt="Course Video" 
                className="w-full h-full object-cover"
              />
              
              {/* Video Overlay Matching Screenshot */}
              <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center">
                {/* Large Play Button */}
                <button className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform">
                  <Play className="w-10 h-10 fill-white ml-1" />
                </button>
                
                {/* Text Content matching visual */}
                <div className="mt-8 text-center text-white">
                  <h2 className="text-6xl font-black tracking-tighter drop-shadow-lg">Figma</h2>
                  <h3 className="text-4xl font-bold tracking-tight opacity-90">ESSENTIALS</h3>
                </div>
              </div>

              {/* Top Right Video Controls Mock */}
              <div className="absolute top-6 right-6 flex gap-4 text-white opacity-80">
                <button className="flex items-center gap-1.5 text-xs font-bold hover:opacity-100">
                  <div className="w-5 h-5 border-2 border-white rounded-full flex items-center justify-center text-[10px]">L</div>
                  Watch later
                </button>
                <button className="flex items-center gap-1.5 text-xs font-bold hover:opacity-100">
                  <ChevronRight className="w-5 h-5 rotate-[-45deg]" />
                  Share
                </button>
              </div>
            </div>
          </div>

          {/* Footer Controls */}
          <div className="bg-[#A7E6D7] p-4 flex justify-center gap-4">
            <button className="px-8 py-1.5 bg-white/40 hover:bg-white/60 text-gray-800 rounded-full text-xs font-bold transition-all flex items-center gap-2">
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            <button className="px-8 py-1.5 bg-[#2DAA5F] text-white rounded-full text-xs font-bold shadow-lg shadow-[#2DAA5F]/20 hover:bg-[#258d4e] transition-all flex items-center gap-2">
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;
