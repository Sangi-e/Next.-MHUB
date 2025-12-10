
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Bell, Lock, Globe, Moon, ChevronRight, LogOut, Trash2, Smartphone, Shield, Mail, MapPin } from 'lucide-react';

export const Settings: React.FC = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState({
    push: true,
    email: false,
    promo: true
  });
  const [darkMode, setDarkMode] = useState(false);

  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <div 
      onClick={onChange}
      className={`w-11 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 ${checked ? 'bg-indigo-600' : 'bg-gray-200'}`}
    >
      <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-300 ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm sticky top-0 z-10 flex items-center space-x-3">
        <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-indigo-600">
            <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-slate-800">Settings</h1>
      </div>

      <div className="p-4 space-y-6">
        
        {/* Account Section */}
        <section>
             <h3 className="font-bold text-slate-800 mb-3 px-1 text-sm uppercase tracking-wide">Account</h3>
             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                 <div className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer border-b border-gray-50" onClick={() => navigate('/profile')}>
                      <div className="flex items-center space-x-3">
                          <div className="bg-blue-50 p-2 rounded-full text-blue-600"><User size={20} /></div>
                          <span className="font-medium text-slate-700 text-sm">Personal Information</span>
                      </div>
                      <ChevronRight size={16} className="text-gray-300" />
                 </div>
                 <div className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer border-b border-gray-50">
                      <div className="flex items-center space-x-3">
                          <div className="bg-green-50 p-2 rounded-full text-green-600"><Shield size={20} /></div>
                          <span className="font-medium text-slate-700 text-sm">Password & Security</span>
                      </div>
                      <ChevronRight size={16} className="text-gray-300" />
                 </div>
                 <div className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer" onClick={() => navigate('/verification')}>
                      <div className="flex items-center space-x-3">
                          <div className="bg-purple-50 p-2 rounded-full text-purple-600"><User size={20} /></div>
                          <span className="font-medium text-slate-700 text-sm">Verification Status</span>
                      </div>
                      <div className="flex items-center">
                          <span className="bg-yellow-100 text-yellow-700 text-[10px] font-bold px-2 py-0.5 rounded mr-2">Level 2</span>
                          <ChevronRight size={16} className="text-gray-300" />
                      </div>
                 </div>
             </div>
        </section>

        {/* Preferences */}
        <section>
             <h3 className="font-bold text-slate-800 mb-3 px-1 text-sm uppercase tracking-wide">Preferences</h3>
             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                 {/* Notifications */}
                 <div className="p-4 border-b border-gray-50">
                      <div className="flex items-center space-x-3 mb-4">
                          <div className="bg-orange-50 p-2 rounded-full text-orange-600"><Bell size={20} /></div>
                          <span className="font-medium text-slate-700 text-sm">Notifications</span>
                      </div>
                      <div className="space-y-4 pl-11">
                          <div className="flex justify-between items-center">
                              <span className="text-xs text-gray-500">Push Notifications</span>
                              <Toggle checked={notifications.push} onChange={() => setNotifications({...notifications, push: !notifications.push})} />
                          </div>
                          <div className="flex justify-between items-center">
                              <span className="text-xs text-gray-500">Email Updates</span>
                              <Toggle checked={notifications.email} onChange={() => setNotifications({...notifications, email: !notifications.email})} />
                          </div>
                      </div>
                 </div>

                 {/* Appearance */}
                 <div className="p-4 flex items-center justify-between border-b border-gray-50">
                      <div className="flex items-center space-x-3">
                          <div className="bg-indigo-50 p-2 rounded-full text-indigo-600"><Moon size={20} /></div>
                          <span className="font-medium text-slate-700 text-sm">Dark Mode</span>
                      </div>
                      <Toggle checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                 </div>

                 {/* Language */}
                 <div className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center space-x-3">
                          <div className="bg-pink-50 p-2 rounded-full text-pink-600"><Globe size={20} /></div>
                          <span className="font-medium text-slate-700 text-sm">Language</span>
                      </div>
                      <div className="flex items-center text-gray-400 text-xs font-medium">
                          English (UK) <ChevronRight size={16} className="ml-1" />
                      </div>
                 </div>
             </div>
        </section>

        {/* Privacy & Devices */}
        <section>
             <h3 className="font-bold text-slate-800 mb-3 px-1 text-sm uppercase tracking-wide">Privacy & Devices</h3>
             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                 <div className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer border-b border-gray-50">
                      <div className="flex items-center space-x-3">
                          <div className="bg-gray-100 p-2 rounded-full text-gray-600"><Smartphone size={20} /></div>
                          <span className="font-medium text-slate-700 text-sm">Active Devices</span>
                      </div>
                      <span className="text-xs text-gray-400 font-bold">2 Active</span>
                 </div>
                 <div className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center space-x-3">
                          <div className="bg-gray-100 p-2 rounded-full text-gray-600"><MapPin size={20} /></div>
                          <span className="font-medium text-slate-700 text-sm">Location Services</span>
                      </div>
                      <span className="text-xs text-green-500 font-bold">On</span>
                 </div>
             </div>
        </section>

        {/* Danger Zone */}
        <section>
             <div className="bg-red-50 rounded-2xl border border-red-100 overflow-hidden mt-6">
                 <div className="p-4 flex items-center justify-between hover:bg-red-100/50 cursor-pointer transition-colors">
                      <div className="flex items-center space-x-3">
                          <div className="bg-white p-2 rounded-full text-red-500"><Trash2 size={20} /></div>
                          <span className="font-bold text-red-600 text-sm">Delete Account</span>
                      </div>
                      <ChevronRight size={16} className="text-red-300" />
                 </div>
             </div>
        </section>

        <div className="text-center pt-6 pb-2">
            <p className="text-xs text-gray-400">Nexus App v1.0.2 (Build 204)</p>
            <button onClick={() => navigate('/')} className="text-sm font-bold text-indigo-600 mt-2 flex items-center justify-center w-full">
                <LogOut size={16} className="mr-1" /> Log Out
            </button>
        </div>

      </div>
    </div>
  );
};
