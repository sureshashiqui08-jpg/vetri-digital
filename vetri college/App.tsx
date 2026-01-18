
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import Courses from './components/Courses';
import SignupCTA from './components/SignupCTA';
import Instructors from './components/Instructors';
import WhyChooseUs from './components/WhyChooseUs';
import Certificate from './components/Certificate';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Assistant from './components/Assistant';
import Sidebar from './components/Sidebar';
import MyPurchase from './components/MyPurchase';
import CoursePlayer from './components/CoursePlayer';
import Registration from './components/Registration';
import AiLabs from './components/AiLabs';

type ViewState = 'landing' | 'dashboard' | 'course-player' | 'login';
type AuthMode = 'login' | 'signup';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [cart, setCart] = useState<string[]>([]);

  const handleStartLearning = (course: any) => {
    setSelectedCourse(course.title);
    setCurrentView('course-player');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (courseId: string) => {
    setCart(prev => {
      if (prev.includes(courseId)) return prev;
      return [...prev, courseId];
    });
  };

  const navigateTo = (view: ViewState, mode: AuthMode = 'login') => {
    setCurrentView(view);
    setAuthMode(mode);
    setIsSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  // The Course Player is a focused, full-screen experience
  if (currentView === 'course-player') {
    return <CoursePlayer courseTitle={selectedCourse} onBack={() => navigateTo('dashboard')} />;
  }

  // Handle distinct page layouts
  const renderMainContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <MyPurchase onStartLearning={handleStartLearning} />;
      case 'login':
        return <Registration initialMode={authMode} onLoginSuccess={() => navigateTo('dashboard')} />;
      case 'landing':
      default:
        return (
          <>
            <Hero onEnrollClick={() => navigateTo('login', 'signup')} />
            <Features />
            <About />
            <Courses onAddToCart={handleAddToCart} cart={cart} />
            <AiLabs />
            <SignupCTA onSignupClick={() => navigateTo('login', 'signup')} />
            <Instructors />
            <WhyChooseUs />
            <Certificate />
            <Testimonials />
            <FAQ />
            
            {/* Landing Page Stats */}
            <section className="py-24 bg-gray-50">
               <div className="container mx-auto px-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                     <div className="space-y-2">
                        <h4 className="text-5xl font-black text-[#2DAA5F]">15K+</h4>
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Active Students</p>
                     </div>
                     <div className="space-y-2">
                        <h4 className="text-5xl font-black text-[#2DAA5F]">200+</h4>
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Expert Mentors</p>
                     </div>
                     <div className="space-y-2">
                        <h4 className="text-5xl font-black text-[#2DAA5F]">50+</h4>
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Digital Courses</p>
                     </div>
                     <div className="space-y-2">
                        <h4 className="text-5xl font-black text-[#2DAA5F]">100%</h4>
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Satisfaction</p>
                     </div>
                  </div>
               </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        onMenuClick={() => setIsSidebarOpen(true)} 
        onLogoClick={() => navigateTo('landing')}
        onDashboardClick={() => navigateTo('dashboard')}
        onAuthClick={(mode) => navigateTo('login', mode)}
        cartCount={cart.length}
      />
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onNavigate={(view, mode) => navigateTo(view, mode)}
      />
      
      <main className="flex-1">
        {renderMainContent()}
      </main>

      <footer className="bg-gray-950 text-white py-16 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 border-b border-white/10 pb-12 mb-12">
            <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigateTo('landing')}>
               <div className="w-16 h-16 flex items-center justify-center overflow-hidden">
                 <img src="./logo.png" alt="Vetri IT Systems Logo" className="w-full h-full object-contain" />
               </div>
               <span className="font-black text-3xl tracking-tighter">Vetri Digital</span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-16">
              <div className="space-y-4">
                <h5 className="font-bold text-gray-400 uppercase text-xs tracking-widest">Platform</h5>
                <ul className="space-y-2 text-sm">
                  <li onClick={() => navigateTo('landing')} className="cursor-pointer hover:text-[#2DAA5F] transition-colors">Home</li>
                  <li onClick={() => navigateTo('dashboard')} className="cursor-pointer hover:text-[#2DAA5F] transition-colors">My Courses</li>
                  <li><a href="#" className="hover:text-[#2DAA5F] transition-colors">Mentors</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h5 className="font-bold text-gray-400 uppercase text-xs tracking-widest">Support</h5>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-[#2DAA5F] transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-[#2DAA5F] transition-colors">Contact</a></li>
                  <li><a href="#" className="hover:text-[#2DAA5F] transition-colors">FAQ</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-500 text-sm">
              © 2024 Vetri Digital College. All rights reserved.
            </p>
            <div className="flex gap-8 text-sm font-medium text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>

      <Assistant />
    </div>
  );
};

export default App;
