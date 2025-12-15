
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Bell, Lock, Globe, Moon, ChevronRight, LogOut, Trash2, Smartphone, Shield, Mail, MapPin, X, Check } from 'lucide-react';

const LANGUAGES = [
  { code: 'en', name: 'English (UK)' },
  { code: 'ig', name: 'Igbo' },
  { code: 'ha', name: 'Hausa' },
  { code: 'yo', name: 'Yoruba' },
  { code: 'es', name: 'Spanish' },
  { code: 'zh', name: 'Chinese' },
];

export const Settings: React.FC = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState({
    push: true,
    email: false,
    promo: true
  });
  
  // Theme State
  const [darkMode, setDarkMode] = useState(false);
  
  // Language State
  const [language, setLanguage] = useState('English (UK)');
  const [showLangModal, setShowLangModal] = useState(false);

  // Initialize Settings
  useEffect(() => {
    // Check Theme
    const isDark = document.documentElement.classList.contains('dark');
    setDarkMode(isDark);

    // Check Language
    const savedLang = localStorage.getItem('language');
    if (savedLang) setLanguage(savedLang);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const selectLanguage = (name: string) => {
    setLanguage(name);
    localStorage.setItem('language', name);
    setShowLangModal(false);
  };

  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <div 
      onClick={onChange}
      className={`w-11 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 ${checked ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-slate-600'}`}
    >
      <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-300 ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pb-24 transition-colors duration-200">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 p-4 shadow-sm sticky top-0 z-10 flex items-center space-x-3 border-b border-gray-100 dark:border-slate-700">
        <button onClick={() => navigate(-1)} className="text-gray-600 dark:text-slate-300 hover:text-indigo-600">
            <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-slate-800 dark:text-white">Settings</h1>
      </div>

      <div className="p-4 space-y-6">
        
        {/* Account Section */}
        <section>
             <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-3 px-1 text-sm uppercase tracking-wide">Account</h3>
             <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
                 <div className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer border-b border-gray-50 dark:border-slate-700" onClick={() => navigate('/profile')}>
                      <div className="flex items-center space-x-3">
                          <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-full text-blue-600 dark:text-blue-400"><User size={20} /></div>
                          <span className="font-medium text-slate-700 dark:text-slate-200 text-sm">Personal Information</span>
                      </div>
                      <ChevronRight size={16} className="text-gray-300 dark:text-slate-500" />
                 </div>
                 <div className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer border-b border-gray-50 dark:border-slate-700">
                      <div className="flex items-center space-x-3">
                          <div className="bg-green-50 dark:bg-green-900/30 p-2 rounded-full text-green-600 dark:text-green-400"><Shield size={20} /></div>
                          <span className="font-medium text-slate-700 dark:text-slate-200 text-sm">Password & Security</span>
                      </div>
                      <ChevronRight size={16} className="text-gray-300 dark:text-slate-500" />
                 </div>
                 <div className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer" onClick={() => navigate('/verification')}>
                      <div className="flex items-center space-x-3">
                          <div className="bg-purple-50 dark:bg-purple-900/30 p-2 rounded-full text-purple-600 dark:text-purple-400"><User size={20} /></div>
                          <span className="font-medium text-slate-700 dark:text-slate-200 text-sm">Verification Status</span>
                      </div>
                      <div className="flex items-center">
                          <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-[10px] font-bold px-2 py-0.5 rounded mr-2">Level 2</span>
                          <ChevronRight size={16} className="text-gray-300 dark:text-slate-500" />
                      </div>
                 </div>
             </div>
        </section>

        {/* Preferences */}
        <section>
             <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-3 px-1 text-sm uppercase tracking-wide">Preferences</h3>
             <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
                 {/* Notifications */}
                 <div className="p-4 border-b border-gray-50 dark:border-slate-700">
                      <div className="flex items-center space-x-3 mb-4">
                          <div className="bg-orange-50 dark:bg-orange-900/30 p-2 rounded-full text-orange-600 dark:text-orange-400"><Bell size={20} /></div>
                          <span className="font-medium text-slate-700 dark:text-slate-200 text-sm">Notifications</span>
                      </div>
                      <div className="space-y-4 pl-11">
                          <div className="flex justify-between items-center">
                              <span className="text-xs text-gray-500 dark:text-slate-400">Push Notifications</span>
                              <Toggle checked={notifications.push} onChange={() => setNotifications({...notifications, push: !notifications.push})} />
                          </div>
                          <div className="flex justify-between items-center">
                              <span className="text-xs text-gray-500 dark:text-slate-400">Email Updates</span>
                              <Toggle checked={notifications.email} onChange={() => setNotifications({...notifications, email: !notifications.email})} />
                          </div>
                      </div>
                 </div>

                 {/* Appearance */}
                 <div className="p-4 flex items-center justify-between border-b border-gray-50 dark:border-slate-700">
                      <div className="flex items-center space-x-3">
                          <div className="bg-indigo-50 dark:bg-indigo-900/30 p-2 rounded-full text-indigo-600 dark:text-indigo-400"><Moon size={20} /></div>
                          <span className="font-medium text-slate-700 dark:text-slate-200 text-sm">Dark Mode</span>
                      </div>
                      <Toggle checked={darkMode} onChange={toggleDarkMode} />
                 </div>

                 {/* Language */}
                 <div 
                    onClick={() => setShowLangModal(true)}
                    className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer"
                 >
                      <div className="flex items-center space-x-3">
                          <div className="bg-pink-50 dark:bg-pink-900/30 p-2 rounded-full text-pink-600 dark:text-pink-400"><Globe size={20} /></div>
                          <span className="font-medium text-slate-700 dark:text-slate-200 text-sm">Language</span>
                      </div>
                      <div className="flex items-center text-gray-400 dark:text-slate-500 text-xs font-medium">
                          {language} <ChevronRight size={16} className="ml-1" />
                      </div>
                 </div>
             </div>
        </section>

        {/* Privacy & Devices */}
        <section>
             <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-3 px-1 text-sm uppercase tracking-wide">Privacy & Devices</h3>
             <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
                 <div className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer border-b border-gray-50 dark:border-slate-700">
                      <div className="flex items-center space-x-3">
                          <div className="bg-gray-100 dark:bg-slate-700 p-2 rounded-full text-gray-600 dark:text-slate-400"><Smartphone size={20} /></div>
                          <span className="font-medium text-slate-700 dark:text-slate-200 text-sm">Active Devices</span>
                      </div>
                      <span className="text-xs text-gray-400 dark:text-slate-500 font-bold">2 Active</span>
                 </div>
                 <div className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer">
                      <div className="flex items-center space-x-3">
                          <div className="bg-gray-100 dark:bg-slate-700 p-2 rounded-full text-gray-600 dark:text-slate-400"><MapPin size={20} /></div>
                          <span className="font-medium text-slate-700 dark:text-slate-200 text-sm">Location Services</span>
                      </div>
                      <span className="text-xs text-green-500 font-bold">On</span>
                 </div>
             </div>
        </section>

        {/* Danger Zone */}
        <section>
             <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-100 dark:border-red-900/30 overflow-hidden mt-6">
                 <div className="p-4 flex items-center justify-between hover:bg-red-100/50 dark:hover:bg-red-900/40 cursor-pointer transition-colors">
                      <div className="flex items-center space-x-3">
                          <div className="bg-white dark:bg-red-900/20 p-2 rounded-full text-red-500"><Trash2 size={20} /></div>
                          <span className="font-bold text-red-600 dark:text-red-400 text-sm">Delete Account</span>
                      </div>
                      <ChevronRight size={16} className="text-red-300 dark:text-red-500/50" />
                 </div>
             </div>
        </section>

        <div className="text-center pt-6 pb-2">
            <p className="text-xs text-gray-400 dark:text-slate-600">Handy App v1.0.3</p>
            <button onClick={() => navigate('/')} className="text-sm font-bold text-indigo-600 dark:text-indigo-400 mt-2 flex items-center justify-center w-full hover:text-indigo-700">
                <LogOut size={16} className="mr-1" /> Log Out
            </button>
        </div>
      </div>

      {/* Language Modal */}
      {showLangModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-800 w-full sm:max-w-sm rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl slide-in-from-bottom duration-300">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">Select Language</h3>
                <button onClick={() => setShowLangModal(false)} className="text-gray-400 hover:text-gray-600 dark:text-slate-400 dark:hover:text-slate-200">
                   <X size={24} />
                </button>
             </div>
             
             <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                {LANGUAGES.map((lang) => (
                   <button
                      key={lang.code}
                      onClick={() => selectLanguage(lang.name)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                         language === lang.name 
                         ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-500 dark:border-indigo-400' 
                         : 'bg-white dark:bg-slate-700 border-gray-100 dark:border-slate-600 hover:border-gray-200 dark:hover:border-slate-500'
                      }`}
                   >
                      <span className={`font-medium ${language === lang.name ? 'text-indigo-700 dark:text-indigo-300' : 'text-slate-700 dark:text-slate-200'}`}>
                         {lang.name}
                      </span>
                      {language === lang.name && <Check size={20} className="text-indigo-600 dark:text-indigo-400" />}
                   </button>
                ))}
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
