
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, MessageCircle, Mail, ChevronDown, ChevronUp, FileText, CreditCard, UserCheck, ShieldAlert, LifeBuoy } from 'lucide-react';

export const HelpSupport: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const FAQS = [
    {
      q: "How do I release payment from Escrow?",
      a: "Go to your Wallet, select the active transaction under 'Escrow Locked', and click 'Release Funds'. Only do this after the service is completed to your satisfaction."
    },
    {
      q: "How do I verify my identity?",
      a: "Navigate to Profile > Verification Center. You will need to upload a valid Government ID and complete a facial scan."
    },
    {
      q: "Can I cancel a booking?",
      a: "Yes, you can cancel up to 24 hours before the scheduled time for a full refund. Cancellations within 24 hours may incur a fee."
    },
    {
      q: "What if the provider doesn't show up?",
      a: "If a provider is a no-show, please report it immediately via the booking details page. Your funds in escrow are safe and will be refunded after review."
    }
  ];

  const TOPICS = [
    { icon: CreditCard, label: "Payments", color: "text-green-600", bg: "bg-green-50" },
    { icon: UserCheck, label: "Account", color: "text-blue-600", bg: "bg-blue-50" },
    { icon: FileText, label: "Bookings", color: "text-purple-600", bg: "bg-purple-50" },
    { icon: ShieldAlert, label: "Trust & Safety", color: "text-orange-600", bg: "bg-orange-50" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-indigo-600 p-6 pb-12 rounded-b-[40px] text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
        
        <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-6">
                <button onClick={() => navigate(-1)} className="text-white/80 hover:text-white">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-lg font-bold">Help & Support</h1>
            </div>
            
            <h2 className="text-2xl font-bold mb-2">How can we help?</h2>
            <p className="text-indigo-200 text-sm mb-6">Search for articles or browse topics below.</p>

            <div className="relative">
                <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
                <input 
                    type="text" 
                    placeholder="Search for answers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-white text-slate-800 rounded-xl shadow-lg border-none focus:ring-2 focus:ring-indigo-300 placeholder-gray-400"
                />
            </div>
        </div>
      </div>

      <div className="px-4 -mt-6 relative z-10">
         {/* Quick Topics Grid */}
         <div className="grid grid-cols-4 gap-3 mb-8">
            {TOPICS.map((topic, i) => (
                <div key={i} className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center space-y-2 hover:shadow-md transition-shadow cursor-pointer">
                    <div className={`p-2 rounded-full ${topic.bg} ${topic.color}`}>
                        <topic.icon size={20} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-700 text-center">{topic.label}</span>
                </div>
            ))}
         </div>

         {/* FAQ Section */}
         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
             <div className="p-4 border-b border-gray-50 flex items-center space-x-2">
                 <LifeBuoy size={20} className="text-indigo-600" />
                 <h3 className="font-bold text-slate-800">Frequently Asked Questions</h3>
             </div>
             <div>
                 {FAQS.filter(f => f.q.toLowerCase().includes(searchTerm.toLowerCase())).map((faq, index) => (
                     <div key={index} className="border-b border-gray-50 last:border-0">
                         <button 
                            onClick={() => toggleFaq(index)}
                            className="w-full text-left p-4 flex justify-between items-center focus:outline-none hover:bg-gray-50 transition-colors"
                         >
                             <span className="font-medium text-sm text-slate-700 pr-4">{faq.q}</span>
                             {openFaq === index ? <ChevronUp size={16} className="text-indigo-600" /> : <ChevronDown size={16} className="text-gray-400" />}
                         </button>
                         {openFaq === index && (
                             <div className="px-4 pb-4 text-xs text-gray-500 leading-relaxed bg-gray-50/50">
                                 {faq.a}
                             </div>
                         )}
                     </div>
                 ))}
             </div>
         </div>

         {/* Contact Support */}
         <div className="space-y-3">
             <h3 className="font-bold text-slate-800 px-1">Still need help?</h3>
             <div className="grid grid-cols-2 gap-4">
                 <button className="bg-indigo-600 text-white p-4 rounded-xl shadow-lg shadow-indigo-200 flex flex-col items-center justify-center hover:bg-indigo-700 transition-colors">
                     <MessageCircle size={24} className="mb-2" />
                     <span className="font-bold text-sm">Live Chat</span>
                     <span className="text-[10px] text-indigo-200">Wait time: ~2 min</span>
                 </button>
                 <button className="bg-white text-slate-800 border border-gray-200 p-4 rounded-xl shadow-sm flex flex-col items-center justify-center hover:bg-gray-50 transition-colors">
                     <Mail size={24} className="mb-2 text-gray-600" />
                     <span className="font-bold text-sm">Email Us</span>
                     <span className="text-[10px] text-gray-400">Response: ~24 hrs</span>
                 </button>
             </div>
         </div>
      </div>
    </div>
  );
};
