
import React from 'react';
import { Menu, Search, LayoutDashboard, ShoppingCart } from 'lucide-react';

interface NavbarProps {
  onMenuClick?: () => void;
  onLogoClick?: () => void;
  onDashboardClick?: () => void;
  onAuthClick?: (mode: 'login' | 'signup') => void;
  cartCount?: number;
}

const Navbar: React.FC<NavbarProps> = ({ 
  onMenuClick, 
  onLogoClick, 
  onDashboardClick, 
  onAuthClick,
  cartCount = 0
}) => {
  return (
    <nav className="w-full bg-white border-b border-gray-100 px-4 md:px-8 py-3 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-6">
        <button 
          onClick={onMenuClick}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={onLogoClick}
        >
          <div className="w-12 h-12 flex items-center justify-center transition-transform group-hover:scale-105">
             <img 
               src="https://vetriitsystems.com/assets/logo-05w9K429.jpg" 
               alt="vetri digital college" 
               className="w-full h-full object-contain"
             />
          </div>
          <span className="font-bold text-xl hidden sm:inline-block text-[#2DAA5F]">
            Vetri Digital College
          </span>
        </div>
      </div>

      <div className="flex-1 max-w-xl mx-4 hidden md:block">
        <div className="relative">
          <input 
            type="text" 
            placeholder="What do you want to learn?" 
            className="w-full bg-gray-50 border border-gray-200 rounded-full py-2 px-4 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-[#2DAA5F] transition-all"
          />
          <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Shopping Cart Icon with Dynamic Badge */}
        <button className="relative p-2 text-gray-600 hover:text-[#2DAA5F] transition-colors group">
          <ShoppingCart className="w-6 h-6" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-in zoom-in duration-300">
              {cartCount}
            </span>
          )}
        </button>

        <button 
          onClick={onDashboardClick}
          className="hidden lg:flex items-center gap-2 px-4 py-2 text-gray-600 font-bold hover:text-[#2DAA5F] transition-colors"
        >
          <LayoutDashboard className="w-5 h-5" />
          My Courses
        </button>
        <button 
          onClick={() => onAuthClick?.('login')}
          className="px-5 py-2 text-[#2DAA5F] border border-[#2DAA5F] rounded-md font-medium hover:bg-[#2DAA5F] hover:text-white transition-all"
        >
          Login
        </button>
        <button 
          onClick={() => onAuthClick?.('signup')}
          className="px-5 py-2 bg-[#2DAA5F] text-white rounded-md font-medium hover:bg-[#258d4e] transition-all"
        >
          SignUp
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
