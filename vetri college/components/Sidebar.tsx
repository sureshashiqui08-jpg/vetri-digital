
import React from 'react';
import { User, Settings, X, Home, ShoppingBag, LogIn, UserPlus } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: 'landing' | 'dashboard' | 'login', mode?: 'login' | 'signup') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onNavigate }) => {
  const menuItems = [
    { label: 'Home', icon: <Home className="w-5 h-5 text-[#2DAA5F]" />, view: 'landing' as const },
    { label: 'My Purchase', icon: <ShoppingBag className="w-5 h-5 text-[#2DAA5F]" />, view: 'dashboard' as const },
    { label: 'Login', icon: <LogIn className="w-5 h-5 text-[#2DAA5F]" />, view: 'login' as const, mode: 'login' as const },
    { label: 'Sign Up', icon: <UserPlus className="w-5 h-5 text-[#2DAA5F]" />, view: 'login' as const, mode: 'signup' as const },
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[70] transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Content */}
      <div className={`fixed top-0 left-0 h-full w-[320px] bg-white z-[80] shadow-2xl transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Header/Branding */}
        <div className="p-8 flex items-center gap-4 mb-4">
          <div className="w-16 h-16 flex items-center justify-center overflow-hidden">
            <img src="./logo.png" alt="Vetri IT Systems Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h2 className="font-bold text-lg leading-tight text-gray-900">
              Vetri Digital<br />College
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="ml-auto p-2 hover:bg-gray-100 rounded-full md:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col">
          {menuItems.map((item, index) => (
            <button 
              key={index}
              onClick={() => onNavigate(item.view, item.mode)}
              className="flex items-center gap-4 px-8 py-5 hover:bg-gray-50 transition-colors text-left border-b border-gray-100 last:border-b-0 group"
            >
              <div className="w-10 h-10 rounded-full border border-[#2DAA5F] flex items-center justify-center group-hover:bg-[#2DAA5F]/5 transition-colors">
                {item.icon}
              </div>
              <span className="font-bold text-gray-800 text-lg">
                {item.label}
              </span>
            </button>
          ))}
        </div>

        <div className="absolute bottom-8 left-0 w-full px-8">
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-xs font-bold text-[#2DAA5F] uppercase tracking-widest mb-2">Student Status</p>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Premium Member</span>
                    <div className="w-2 h-2 bg-[#2DAA5F] rounded-full animate-pulse"></div>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
