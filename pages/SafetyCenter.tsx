
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Phone, AlertTriangle, CreditCard, UserCheck, Lock, Eye, MessageSquare, ChevronRight, ExternalLink, LifeBuoy } from 'lucide-react';

export const SafetyCenter: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm sticky top-0 z-10 flex items-center justify-between">
        <div className="flex items-center space-x-3">
            <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-indigo-600">
                <ArrowLeft size={24} />
            </button>
            <h1 className="text-lg font-bold text-slate-800">Safety Center</h1>
        </div>
        <div className="text-indigo-600">
            <ShieldCheck size={24} />
        </div>
      </div>

      <div className="p-4 space-y-6">
        
        {/* Hero Section */}
        <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
            <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm border border-white/20">
                    <Lock size={24} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Your Safety is Our Priority</h2>
                <p className="text-indigo-100 text-sm leading-relaxed max-w-xs">
                    Handy is designed with built-in protections to help you stay safe while hiring or working.
                </p>
            </div>
        </div>

        {/* Emergency Actions */}
        <div className="grid grid-cols-2 gap-4">
            <button className="bg-red-50 hover:bg-red-100 border border-red-100 p-4 rounded-2xl flex flex-col items-center text-center transition-colors group">
                <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <Phone size={20} />
                </div>
                <span className="font-bold text-red-700 text-sm">Emergency Numbers</span>
                <span className="text-[10px] text-red-500 mt-1">Police / Ambulance</span>
            </button>
            <button className="bg-orange-50 hover:bg-orange-100 border border-orange-100 p-4 rounded-2xl flex flex-col items-center text-center transition-colors group">
                <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <AlertTriangle size={20} />
                </div>
                <span className="font-bold text-orange-700 text-sm">Report Incident</span>
                <span className="text-[10px] text-orange-500 mt-1">File a safety report</span>
            </button>
        </div>

        {/* Guidelines Section */}
        <div>
            <h3 className="font-bold text-slate-800 mb-4 px-1">Safety Guidelines</h3>
            <div className="space-y-4">
                
                {/* 1. Payment Safety */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <div className="flex items-center space-x-3 mb-3 text-green-600">
                        <CreditCard size={20} />
                        <h4 className="font-bold text-slate-800 text-sm">Safe Payments</h4>
                    </div>
                    <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                        Never pay outside the Handy app. Our Escrow system protects your funds until the job is completed to your satisfaction.
                    </p>
                    <div className="bg-green-50 rounded-xl p-3 flex items-start space-x-3">
                         <ShieldCheck size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                         <span className="text-xs text-green-800 font-medium">Always use Handy Escrow for transactions to ensure you are covered by our Money Back Guarantee.</span>
                    </div>
                </div>

                {/* 2. Meeting in Person */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <div className="flex items-center space-x-3 mb-3 text-blue-600">
                        <UserCheck size={20} />
                        <h4 className="font-bold text-slate-800 text-sm">Meeting in Person</h4>
                    </div>
                     <ul className="space-y-3">
                        <li className="flex items-start space-x-3">
                            <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"></div>
                            <span className="text-xs text-gray-600">Meet in public places whenever possible.</span>
                        </li>
                         <li className="flex items-start space-x-3">
                            <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"></div>
                            <span className="text-xs text-gray-600">Verify the person matches their profile photo.</span>
                        </li>
                         <li className="flex items-start space-x-3">
                            <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"></div>
                            <span className="text-xs text-gray-600">Tell a friend or family member about your location.</span>
                        </li>
                     </ul>
                </div>

                 {/* 3. Account Security */}
                 <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <div className="flex items-center space-x-3 mb-3 text-purple-600">
                        <Lock size={20} />
                        <h4 className="font-bold text-slate-800 text-sm">Account Security</h4>
                    </div>
                    <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                        Protect your account by using strong passwords and enabling Two-Factor Authentication (2FA).
                    </p>
                     <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl cursor-pointer hover:bg-gray-100">
                        <span className="text-xs font-bold text-slate-700">Manage 2FA Settings</span>
                        <ChevronRight size={14} className="text-gray-400" />
                     </div>
                </div>

                 {/* 4. Chat Safety */}
                 <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <div className="flex items-center space-x-3 mb-3 text-indigo-600">
                        <MessageSquare size={20} />
                        <h4 className="font-bold text-slate-800 text-sm">Chat Smart</h4>
                    </div>
                    <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                        Keep all communication inside the Handy app. This serves as evidence in case of disputes and protects your personal contact info.
                    </p>
                    <div className="bg-red-50 border border-red-100 rounded-xl p-3 flex items-start space-x-3">
                         <Eye size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                         <span className="text-xs text-red-800 font-medium">Be wary of anyone asking to chat on WhatsApp or Telegram immediately.</span>
                    </div>
                </div>

            </div>
        </div>

        {/* Support Footer */}
        <div className="bg-slate-800 rounded-2xl p-6 text-white flex items-center justify-between">
            <div>
                <h4 className="font-bold text-sm">Still have questions?</h4>
                <p className="text-xs text-slate-400 mt-1">Our support team is here 24/7</p>
            </div>
            <button className="bg-white text-slate-900 px-4 py-2 rounded-lg text-xs font-bold flex items-center hover:bg-gray-100">
                <LifeBuoy size={16} className="mr-2" /> Contact Support
            </button>
        </div>
        
        <div className="flex justify-center pb-6">
             <button className="text-xs text-gray-400 flex items-center hover:text-indigo-600">
                 Read full Terms of Service <ExternalLink size={10} className="ml-1" />
             </button>
        </div>

      </div>
    </div>
  );
};
