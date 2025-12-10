import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Clock, ChevronRight, ShieldCheck, AlertCircle, Phone, Mail, Camera, MapPin, Briefcase, FileText, Bell, Globe } from 'lucide-react';

export const VerificationCenter: React.FC = () => {
  const navigate = useNavigate();

  // Mock Data mimicking the screenshot
  const [verifications] = useState([
    { id: 'phone', title: 'Phone Number', desc: 'Verify your phone number with OTP', status: 'verified', icon: Phone },
    { id: 'email', title: 'Email Address', desc: 'Verify your email address', status: 'verified', icon: Mail },
    { id: 'face', title: 'Facial Verification', desc: 'Selfie verification for identity matching', status: 'unverified', icon: Camera },
    { id: 'address', title: 'Proof of Address', desc: 'Utility bill, bank statement, or rental agreement', status: 'unverified', icon: MapPin },
    { id: 'govid', title: 'Government ID', desc: 'NIN, BVN, Driver\'s License, Passport, or Voter\'s Card', status: 'pending', icon: ShieldCheck },
    { id: 'business', title: 'Business Registration', desc: 'Optional - for registered businesses', status: 'unverified', icon: Briefcase, optional: true },
  ]);

  const completedCount = verifications.filter(v => v.status === 'verified').length;
  const totalCount = verifications.length;
  const progress = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm sticky top-0 z-10 flex items-center justify-between">
        <div className="flex items-center space-x-3">
            <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-indigo-600">
                <ArrowLeft size={24} />
            </button>
            <h1 className="text-lg font-bold text-slate-800">Verification Center</h1>
        </div>
        <div className="flex space-x-4 text-gray-600">
             <Globe size={20} />
             <Bell size={20} />
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Progress Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-2 text-indigo-600">
                    <div className="p-1.5 bg-transparent">
                         <ShieldCheck size={20} className="text-green-500" />
                    </div>
                    <span className="font-bold text-sm text-slate-800">Verification Progress</span>
                </div>
                <span className="text-2xl font-bold text-green-500">{progress}%</span>
            </div>
            
            <div className="w-full bg-green-50 rounded-full h-3 mb-3">
                <div 
                    className="bg-green-500 h-3 rounded-full transition-all duration-500" 
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            
            <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">{completedCount} of {totalCount} verifications complete</span>
                <button className="text-green-500 font-bold hover:underline">Why verify?</button>
            </div>
        </div>

        {/* Benefits Card */}
        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
             <div className="flex items-center space-x-2 mb-4 text-blue-700">
                <ShieldCheck size={20} />
                <h3 className="font-bold text-sm">Why Complete Verification?</h3>
            </div>
            <ul className="space-y-3">
                {[
                    'Build trust with European and global clients',
                    'Unlock higher-paying projects and premium features',
                    'Increase your Trust Score and visibility',
                    'Get verified badge on your profile'
                ].map((item, i) => (
                    <li key={i} className="flex items-start space-x-2 text-xs text-blue-800">
                        <CheckCircle size={14} className="mt-0.5 flex-shrink-0 text-blue-600" />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </div>

        {/* Verification List */}
        <div>
             <h3 className="font-bold text-slate-800 mb-4">Complete Your Verification</h3>
             <div className="space-y-3">
                 {verifications.map((item) => (
                     <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group cursor-pointer hover:border-indigo-100 transition-colors">
                         <div className="flex items-center space-x-4">
                             <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                                 item.status === 'verified' ? 'bg-green-50 text-green-600' : 
                                 item.status === 'pending' ? 'bg-yellow-50 text-yellow-600' : 'bg-gray-50 text-green-600'
                             }`}>
                                 <item.icon size={20} />
                             </div>
                             <div>
                                 <div className="flex items-center space-x-2 mb-0.5">
                                     <h4 className="font-bold text-slate-800 text-sm">{item.title}</h4>
                                     {item.status === 'verified' && <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded">verified</span>}
                                     {item.status === 'pending' && <span className="bg-yellow-100 text-yellow-700 text-[10px] font-bold px-2 py-0.5 rounded">pending</span>}
                                 </div>
                                 <p className="text-xs text-gray-500 line-clamp-1">{item.desc}</p>
                             </div>
                         </div>
                         <div className="flex-shrink-0 ml-2">
                             {item.status === 'verified' ? (
                                 <CheckCircle size={20} className="text-green-500" />
                             ) : item.status === 'pending' ? (
                                  <Clock size={20} className="text-yellow-500" />
                             ) : (
                                  <AlertCircle size={20} className="text-gray-300" />
                             )}
                         </div>
                     </div>
                 ))}
             </div>
        </div>

        {/* Need Help */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
             <div className="flex items-center space-x-2 mb-2 text-indigo-600">
                <AlertCircle size={20} className="text-blue-600" />
                <h3 className="font-bold text-sm text-slate-800">Need Help?</h3>
            </div>
            <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                If you're having trouble with verification or have questions about the process, visit our Safety Center or contact support.
            </p>
            <div className="flex space-x-3">
                <button className="flex-1 py-2.5 bg-gray-50 text-slate-700 text-xs font-bold rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">Safety Center</button>
                <button className="flex-1 py-2.5 bg-gray-50 text-slate-700 text-xs font-bold rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">Contact Support</button>
            </div>
        </div>
      </div>
    </div>
  );
};
