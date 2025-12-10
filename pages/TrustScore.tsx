import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Globe, Bell, ShieldCheck, TrendingUp, Info, ChevronRight, CheckCircle, AlertCircle } from 'lucide-react';

export const TrustScore: React.FC = () => {
  const navigate = useNavigate();
  const score = 71;
  const maxScore = 100;

  // Mock Data based on the image
  const breakdown = [
    { title: 'Identity Verification', score: 14, max: 25, desc: 'Government ID, phone, email, facial, address, business' },
    { title: 'Job Completion Rate', score: 18, max: 20, desc: '18/20 jobs completed successfully' },
    { title: 'Dispute History', score: 9, max: 15, desc: 'Low dispute rate – excellent track record' },
    { title: 'Responsiveness', score: 10, max: 15, desc: 'Average response time: 25 minutes' },
    { title: 'Profile Completeness', score: 10, max: 10, desc: 'All profile sections completed' },
    { title: 'Repeat Client Rate', score: 5, max: 10, desc: '8/15 clients returned for more work' },
    { title: 'Review Rating', score: 5, max: 5, desc: '4.7/5 average rating' },
  ];

  // Circular Progress Calculation
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm sticky top-0 z-10 flex items-center justify-between">
        <div className="flex items-center space-x-3">
            <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-indigo-600">
                <ArrowLeft size={24} />
            </button>
            <h1 className="text-lg font-bold text-slate-800">Trust Score</h1>
        </div>
        <div className="flex space-x-4 text-gray-600">
             <Globe size={20} />
             <Bell size={20} />
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* 1. Main Score Card */}
        <div className="bg-blue-50/50 p-6 rounded-2xl shadow-sm border border-blue-100 flex flex-col items-center text-center relative overflow-hidden">
            {/* Circular Indicator */}
            <div className="relative w-40 h-40 mb-4 flex items-center justify-center">
                {/* Background Circle */}
                <svg className="transform -rotate-90 w-full h-full">
                    <circle
                        cx="80"
                        cy="80"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-blue-200"
                    />
                    {/* Progress Circle */}
                    <circle
                        cx="80"
                        cy="80"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className="text-blue-500 transition-all duration-1000 ease-out"
                    />
                </svg>
                {/* Center Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-blue-600">{score}</span>
                    <span className="text-xs text-gray-400 font-medium">/100</span>
                </div>
            </div>

            <h2 className="text-xl font-bold text-slate-800 mb-2">Very Good</h2>
            <p className="text-sm text-gray-500 mb-6 max-w-xs">
                Your trust score helps clients choose reliable providers
            </p>

            <div className="w-full bg-blue-100 text-blue-800 py-3 rounded-xl flex items-center justify-center font-bold text-sm border border-blue-200">
                <ShieldCheck size={18} className="mr-2" />
                Trust Score: {score}/100
            </div>
        </div>

        {/* 2. Improvement Card */}
        <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-100 shadow-sm">
             <div className="flex items-center space-x-2 mb-4 text-yellow-700">
                <TrendingUp size={20} />
                <h3 className="font-bold text-sm">How to Improve Your Score</h3>
            </div>
            <ul className="space-y-3">
                {[
                    'Complete all identity verification steps (+11 points)',
                    'Complete more jobs successfully (+2 points potential)',
                    'Respond to messages faster (+5 points)',
                    'Encourage satisfied clients to return (+5 points)'
                ].map((item, i) => (
                    <li key={i} className="flex items-start space-x-2 text-xs text-yellow-800">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-600 flex-shrink-0"></span>
                        <span className="leading-relaxed">{item}</span>
                    </li>
                ))}
            </ul>
        </div>

        {/* 3. Score Breakdown */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-50">
                <h3 className="font-bold text-slate-800">Score Breakdown</h3>
            </div>
            
            <div className="divide-y divide-gray-50">
                {breakdown.map((item, index) => (
                    <div key={index} className="p-5 hover:bg-gray-50 transition-colors cursor-pointer group">
                        <div className="flex justify-between items-center mb-2">
                             <h4 className="font-medium text-slate-700 text-sm">{item.title}</h4>
                             <span className="font-bold text-slate-900 text-sm">{item.score}/{item.max}</span>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="w-full bg-green-100 rounded-full h-2.5 mb-2">
                            <div 
                                className="bg-green-500 h-2.5 rounded-full" 
                                style={{ width: `${(item.score / item.max) * 100}%` }}
                            ></div>
                        </div>

                        <div className="flex justify-between items-start">
                             <p className="text-xs text-gray-400 leading-tight pr-4">{item.desc}</p>
                             <ChevronRight size={16} className="text-gray-300 flex-shrink-0 group-hover:text-gray-500 transition-colors" />
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* 4. About Info Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
             <div className="flex items-center space-x-2 mb-3 text-blue-600">
                <Info size={20} />
                <h3 className="font-bold text-sm text-slate-800">About Trust Score</h3>
            </div>
            <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                Your Trust Score is calculated based on multiple factors including identity verification, job completion rate, reviews, responsiveness, and dispute history. A higher score increases your visibility to clients and helps you win more projects.
            </p>
            <button className="text-green-500 text-sm font-bold flex items-center hover:underline">
                Learn more about Trust Framework <ChevronRight size={14} className="ml-1" />
            </button>
        </div>
      </div>
    </div>
  );
};
