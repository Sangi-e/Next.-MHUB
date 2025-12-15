
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, Calendar, MessageSquare, User, ShieldCheck, Wallet, Trophy, Briefcase } from 'lucide-react';
import { UserRole } from '../types';
import { Logo } from './Logo';

interface BottomNavProps {
  role: UserRole;
}

export const MobileContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return (
    <div className={`min-h-screen bg-gray-50 pb-20 md:pb-0 md:pl-64 transition-colors duration-200 ${className}`}>
      {children}
    </div>
  );
};

export const DesktopSidebar: React.FC<{ role: UserRole }> = ({ role }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const NavItem = ({ to, icon: Icon, label }: { to: string, icon: any, label: string }) => {
    const isActive = location.pathname === to;
    return (
      <button
        onClick={() => navigate(to)}
        className={`flex items-center w-full px-4 py-3 mb-2 rounded-lg transition-colors ${isActive ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
      >
        <Icon size={20} className="mr-3" />
        <span className="font-medium">{label}</span>
      </button>
    );
  }

  return (
    <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 z-50">
      <div className="p-6 flex items-center space-x-3">
        <Logo size={36} theme="light" />
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Handy</h1>
      </div>
      <div className="flex-1 px-4">
        {role === 'admin' ? (
           <>
            <NavItem to="/admin" icon={ShieldCheck} label="Admin Dashboard" />
            <NavItem to="/search" icon={Search} label="Search Users" />
           </>
        ) : (
          <>
            <NavItem to="/home" icon={Home} label={role === 'entrepreneur' ? 'Dashboard' : 'Home'} />
            <NavItem to="/chat" icon={MessageSquare} label="Messages" />
            <NavItem to="/wallet" icon={Wallet} label="Wallet" />
            {/* Different Label for Entrepreneurs */}
            <NavItem 
              to="/bookings" 
              icon={role === 'entrepreneur' ? Briefcase : Calendar} 
              label={role === 'entrepreneur' ? 'Orders' : 'Bookings'} 
            />
            <NavItem to="/leaderboard" icon={Trophy} label="Leaderboard" />
            <NavItem to="/profile" icon={User} label="Profile" />
          </>
        )}
      </div>
    </div>
  );
};

export const BottomNav: React.FC<BottomNavProps> = ({ role }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const NavItem = ({ to, icon: Icon, label }: { to: string, icon: any, label: string }) => {
    const isActive = location.pathname === to;
    return (
      <button 
        onClick={() => navigate(to)}
        className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${isActive ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
      >
        <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
        <span className="text-[10px] font-medium">{label}</span>
      </button>
    );
  };

  if (role === 'admin') return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex items-center justify-around z-50 safe-area-bottom shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <NavItem to="/home" icon={Home} label="Home" />
      <NavItem to="/chat" icon={MessageSquare} label="Messages" />
      <NavItem to="/wallet" icon={Wallet} label="Wallet" />
      
      {/* Conditional Rendering for Role */}
      {role === 'entrepreneur' ? (
         <NavItem to="/bookings" icon={Briefcase} label="Orders" />
      ) : (
         <NavItem to="/bookings" icon={Calendar} label="Bookings" />
      )}
      
      <NavItem to="/profile" icon={User} label="Profile" />
    </div>
  );
};
