
import React, { useState } from 'react';
import { ShoppingCart, Plus } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  image: string;
  category: string;
  price?: string;
}

interface CoursesProps {
  onAddToCart?: (id: string) => void;
  cart?: string[];
}

const categories = ['All Courses', 'Design', 'Development', 'Frame Work', 'Business'];

const courseData: Course[] = [
  { id: '1', title: 'Python Fullstack', category: 'Development', image: 'https://cdn-icons-png.flaticon.com/512/5968/5968350.png', price: '₹4,999' },
  { id: '2', title: 'Java Fullstack', category: 'Development', image: 'https://cdn-icons-png.flaticon.com/512/5968/5968282.png', price: '₹4,999' },
  { id: '3', title: 'UI UX Designing', category: 'Design', image: 'https://cdn-icons-png.flaticon.com/512/9371/9371661.png', price: '₹3,499' },
  { id: '4', title: 'Data Analytics', category: 'Business', image: 'https://cdn-icons-png.flaticon.com/512/2621/2621251.png', price: '₹5,999' },
  { id: '5', title: 'Data Science', category: 'Development', image: 'https://cdn-icons-png.flaticon.com/512/2103/2103633.png', price: '₹6,499' },
  { id: '6', title: 'MERN Stack Development', category: 'Development', image: 'https://cdn-icons-png.flaticon.com/512/1126/1126012.png', price: '₹5,499' },
  { id: '7', title: 'Mobile App Development', category: 'Development', image: 'https://cdn-icons-png.flaticon.com/512/2586/2586488.png', price: '₹4,499' },
  { id: '8', title: 'Software Testing', category: 'Frame Work', image: 'https://cdn-icons-png.flaticon.com/512/2103/2103831.png', price: '₹2,999' },
];

const Courses: React.FC<CoursesProps> = ({ onAddToCart, cart = [] }) => {
  const [activeTab, setActiveTab] = useState('All Courses');
  const [recentAdded, setRecentAdded] = useState<string[]>([]);

  const handleAddToCartClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart?.(id);
    
    // Provide temporary visual feedback
    if (!recentAdded.includes(id)) {
      setRecentAdded(prev => [...prev, id]);
      setTimeout(() => {
        setRecentAdded(prev => prev.filter(item => item !== id));
      }, 2000);
    }
  };

  const filteredCourses = activeTab === 'All Courses' 
    ? courseData 
    : courseData.filter(course => course.category === activeTab);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-gray-900">
            Browse Our Courses
          </h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-8 py-2 rounded-lg font-bold transition-all duration-300 border-2 ${
                activeTab === cat
                  ? 'bg-[#2DAA5F] border-[#2DAA5F] text-white shadow-lg shadow-[#2DAA5F]/20'
                  : 'bg-white border-[#2DAA5F] text-[#2DAA5F] hover:bg-[#2DAA5F]/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredCourses.map((course) => {
            const isAdded = cart.includes(course.id);
            const isShowingFeedback = recentAdded.includes(course.id);

            return (
              <div 
                key={course.id}
                className="bg-white border-2 border-[#2DAA5F]/10 rounded-2xl p-6 flex flex-col items-center group hover:border-[#2DAA5F] hover:shadow-2xl transition-all duration-500 relative"
              >
                {/* Add to Cart Floating Button */}
                <button 
                  onClick={(e) => handleAddToCartClick(course.id, e)}
                  disabled={isAdded}
                  className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 z-10 ${
                    isAdded
                      ? 'bg-blue-500 text-white cursor-default'
                      : 'bg-[#2DAA5F]/10 text-[#2DAA5F] hover:bg-[#2DAA5F] hover:text-white'
                  }`}
                >
                  {isAdded ? (
                    <Plus className="w-5 h-5 rotate-45" />
                  ) : (
                    <ShoppingCart className="w-5 h-5" />
                  )}
                </button>

                <div className="w-24 h-24 mb-6 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="text-center flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#2DAA5F] transition-colors px-2">
                    {course.title}
                  </h3>
                  <p className="text-[#2DAA5F] font-black text-lg mb-6">{course.price}</p>
                </div>

                {/* Add to Cart Footer Button */}
                <button 
                  onClick={(e) => handleAddToCartClick(course.id, e)}
                  disabled={isAdded}
                  className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                    isAdded
                      ? 'bg-blue-500 text-white cursor-default'
                      : 'bg-[#2DAA5F] text-white hover:bg-[#258d4e] shadow-lg shadow-[#2DAA5F]/20'
                  }`}
                >
                  {isShowingFeedback ? (
                    <span className="animate-in fade-in zoom-in duration-300">✓ Added!</span>
                  ) : isAdded ? (
                    <>In Cart</>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Courses;
