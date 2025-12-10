import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Globe, Bell, AlertCircle, Plus, MessageSquare, CheckCircle } from 'lucide-react';

interface DisputeItem {
  id: string;
  counterparty: string;
  reason: string;
  status: 'in_review' | 'resolved' | 'closed';
  bookingId: string;
  lastUpdated: string;
}

const MOCK_DISPUTES: DisputeItem[] = [
  {
    id: '1',
    counterparty: 'John Designer',
    reason: 'Work not delivered as agreed',
    status: 'in_review',
    bookingId: 'booking-123',
    lastUpdated: '06/12/2025'
  },
  {
    id: '2',
    counterparty: 'Sarah Developer',
    reason: 'Quality below expectations',
    status: 'resolved',
    bookingId: 'booking-456',
    lastUpdated: '02/12/2025'
  }
];

export const DisputeCenter: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'Active' | 'Closed'>('Active');

  const filteredDisputes = MOCK_DISPUTES.filter(d => 
    activeTab === 'Active' ? d.status === 'in_review' : (d.status === 'resolved' || d.status === 'closed')
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm sticky top-0 z-10 flex items-center justify-between">
        <div className="flex items-center space-x-3">
            <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-indigo-600">
                <ArrowLeft size={24} />
            </button>
            <h1 className="text-lg font-bold text-slate-800">Dispute Center</h1>
        </div>
        <div className="flex space-x-4 text-gray-600">
             <Globe size={20} />
             <Bell size={20} />
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Info Card */}
        <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100 shadow-sm">
            <div className="flex items-center space-x-3 mb-3">
                <AlertCircle size={24} className="text-orange-600" />
                <h2 className="text-lg font-bold text-slate-800">How Disputes Work</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                If you have an issue with a booking, you can file a dispute. Our team will review the evidence from both parties and work to find a fair resolution.
            </p>
            <button className="bg-white border border-gray-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-gray-50 transition-colors">
                Learn More
            </button>
        </div>

        {/* Action Button */}
        <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3.5 rounded-xl font-bold flex items-center justify-center shadow-lg shadow-green-200 transition-colors active:scale-[0.99]">
            <Plus size={20} className="mr-2" /> File a Dispute
        </button>

        {/* Dispute List Section */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 min-h-[300px]">
            <h3 className="font-bold text-slate-800 mb-4 ml-1">Your Disputes</h3>
            
            {/* Tabs */}
            <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
                {['Active', 'Closed'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                            activeTab === tab 
                            ? 'bg-white text-slate-800 shadow-sm' 
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        {tab} ({tab === 'Active' ? '1' : '1'})
                    </button>
                ))}
            </div>

            {/* List */}
            <div className="space-y-4">
                {filteredDisputes.length > 0 ? (
                    filteredDisputes.map(dispute => (
                        <div key={dispute.id} className="border border-gray-200 rounded-xl p-4 hover:border-indigo-200 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold text-slate-800">{dispute.counterparty}</h4>
                                {dispute.status === 'in_review' ? (
                                    <span className="flex items-center space-x-1 bg-blue-50 text-blue-600 px-2 py-1 rounded-md border border-blue-100">
                                        <MessageSquare size={12} />
                                        <span className="text-[10px] font-bold">in review</span>
                                    </span>
                                ) : (
                                    <span className="flex items-center space-x-1 bg-green-50 text-green-600 px-2 py-1 rounded-md border border-green-100">
                                        <CheckCircle size={12} />
                                        <span className="text-[10px] font-bold">resolved</span>
                                    </span>
                                )}
                            </div>
                            
                            <p className="text-sm text-gray-600 mb-3">{dispute.reason}</p>
                            
                            <div className="flex justify-between items-center pt-3 border-t border-gray-50 text-xs text-gray-400">
                                <span>Booking #{dispute.bookingId}</span>
                                <span>Last updated: {dispute.lastUpdated}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-10 text-gray-400">
                        <p>No {activeTab.toLowerCase()} disputes found.</p>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};