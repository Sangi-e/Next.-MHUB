
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Share2, Gift, Users, ChevronRight, CheckCircle, Clock, Smartphone, Globe, MessageCircle, Twitter, Facebook } from 'lucide-react';

export const ReferFriends: React.FC = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const referralCode = "NEXUS-8829";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const referrals = [
    { id: 1, name: 'David O.', date: '2 mins ago', status: 'Pending', reward: '₦0' },
    { id: 2, name: 'Sarah J.', date: 'Yesterday', status: 'Completed', reward: '₦2,000' },
    { id: 3, name: 'Mike T.', date: '24 Oct', status: 'Completed', reward: '₦2,000' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm sticky top-0 z-10 flex items-center justify-between">
        <div className="flex items-center space-x-3">
            <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-indigo-600">
                <ArrowLeft size={24} />
            </button>
            <h1 className="text-lg font-bold text-slate-800">Refer & Earn</h1>
        </div>
        <div className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold flex items-center">
            <Gift size={14} className="mr-1" /> Rewards
        </div>
      </div>

      <div className="p-4 space-y-6">
        
        {/* Hero Card */}
        <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 text-white text-center shadow-xl">
            {/* Decorative circles */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-x-10 -translate-y-10"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl translate-x-10 translate-y-10"></div>
            
            <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20 shadow-lg rotate-12">
                    <Gift size={32} className="text-yellow-300" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Earn ₦2,000</h2>
                <p className="text-indigo-100 text-sm max-w-[250px] mx-auto leading-relaxed">
                    For every friend who signs up and completes their first booking.
                </p>
            </div>
        </div>

        {/* Code Section */}
        <div className="-mt-10 mx-4 relative z-20 bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Your Referral Code</p>
            <div 
                onClick={handleCopy}
                className="bg-gray-50 border-2 border-dashed border-indigo-200 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-indigo-50 hover:border-indigo-300 transition-colors group"
            >
                <span className="text-xl font-mono font-bold text-slate-800 tracking-wider select-all">{referralCode}</span>
                <div className="flex items-center text-indigo-600 text-xs font-bold bg-white px-3 py-1.5 rounded-lg shadow-sm group-hover:scale-105 transition-transform">
                    {copied ? <CheckCircle size={14} className="mr-1"/> : <Copy size={14} className="mr-1"/>}
                    {copied ? 'Copied!' : 'Copy'}
                </div>
            </div>

            {/* Share Buttons */}
            <div className="mt-6">
                <p className="text-xs font-medium text-gray-400 mb-3">Share via</p>
                <div className="flex justify-center space-x-4">
                    <button className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center hover:bg-green-200 transition-colors">
                        <MessageCircle size={24} />
                    </button>
                     <button className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 transition-colors">
                        <Twitter size={24} />
                    </button>
                     <button className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center hover:bg-indigo-200 transition-colors">
                        <Facebook size={24} />
                    </button>
                     <button className="w-12 h-12 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition-colors">
                        <Share2 size={24} />
                    </button>
                </div>
            </div>
        </div>

        {/* How it Works */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-slate-800 mb-6">How it works</h3>
            <div className="space-y-6 relative">
                {/* Connecting Line */}
                <div className="absolute left-[19px] top-2 bottom-4 w-0.5 bg-gray-100"></div>

                <div className="flex items-start relative z-10">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-4 flex-shrink-0 border-4 border-white">
                        <Share2 size={18} />
                    </div>
                    <div>
                        <h4 className="font-bold text-sm text-slate-800">Invite Friends</h4>
                        <p className="text-xs text-gray-500 mt-1">Share your unique link or code with friends via social media or text.</p>
                    </div>
                </div>
                 <div className="flex items-start relative z-10">
                    <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-4 flex-shrink-0 border-4 border-white">
                        <Users size={18} />
                    </div>
                    <div>
                        <h4 className="font-bold text-sm text-slate-800">They Sign Up</h4>
                        <p className="text-xs text-gray-500 mt-1">Friends create an account and verify their identity on Nexus.</p>
                    </div>
                </div>
                 <div className="flex items-start relative z-10">
                    <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-4 flex-shrink-0 border-4 border-white">
                        <Gift size={18} />
                    </div>
                    <div>
                        <h4 className="font-bold text-sm text-slate-800">You Get Paid</h4>
                        <p className="text-xs text-gray-500 mt-1">Receive ₦2,000 in your wallet once they complete their first service.</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Referral History */}
        <div>
            <div className="flex justify-between items-center mb-4 px-1">
                <h3 className="font-bold text-slate-800">Your Referrals</h3>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">Total Earned: ₦4,000</span>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {referrals.map((ref, idx) => (
                    <div key={ref.id} className={`p-4 flex items-center justify-between ${idx !== referrals.length -1 ? 'border-b border-gray-50' : ''}`}>
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xs">
                                {ref.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                                <p className="font-bold text-sm text-slate-800">{ref.name}</p>
                                <p className="text-[10px] text-gray-400">{ref.date}</p>
                            </div>
                        </div>
                        <div className="text-right">
                             {ref.status === 'Completed' ? (
                                 <span className="text-xs font-bold text-green-600 flex items-center justify-end">
                                    <CheckCircle size={12} className="mr-1" /> {ref.reward}
                                 </span>
                             ) : (
                                  <span className="text-xs font-bold text-yellow-600 flex items-center justify-end">
                                    <Clock size={12} className="mr-1" /> Pending
                                 </span>
                             )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};
