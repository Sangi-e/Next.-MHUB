
import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownLeft, Wallet as WalletIcon, Clock, Lock, Building, MoreHorizontal, ShieldCheck, Fingerprint, RefreshCcw, AlertTriangle, Eye, EyeOff, CheckCircle, CreditCard, Zap, TrendingUp, Trophy, ChevronRight, Lock as LockIcon, Activity, BarChart2, X, Calendar, DollarSign, ArrowDown, ArrowUp, Send, Truck, Flag, Check, Plus } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, ComposedChart, CartesianGrid, Legend } from 'recharts';
import { UserRole, WalletTransaction, EscrowItem } from '../types';
import { getNextLevelInfo } from '../services/gamificationService';

interface WalletProps {
    role: UserRole;
}

// Extended Local Interface for dynamic state management
interface LocalEscrowItem extends Omit<EscrowItem, 'status'> {
    status: 'locked' | 'released' | 'disputed' | 'delivered'; 
    // 'delivered' is a sub-state of locked in backend, but distinct for UI flow
}

const INITIAL_CUSTOMER_ESCROW: LocalEscrowItem[] = [
    { id: 'e1', serviceTitle: 'Kitchen Plumbing Repair', amount: 5000, providerName: 'Adeola Johnson', status: 'delivered', date: 'Oct 26, 2023', bookingId: 'b1' },
    { id: 'e2', serviceTitle: 'Logo Design', amount: 15000, providerName: 'Sarah Tech', status: 'locked', date: 'Oct 28, 2023', bookingId: 'b2' }
];

const INITIAL_ENTREPRENEUR_ESCROW: LocalEscrowItem[] = [
    { id: 'e3', serviceTitle: 'Website Fix', amount: 25000, providerName: 'Client: John Doe', status: 'locked', date: 'Today', bookingId: 'b3' },
    { id: 'e4', serviceTitle: 'Car Maintenance', amount: 8000, providerName: 'Client: Musa', status: 'disputed', date: 'Yesterday', bookingId: 'b4' }
];

const ANALYTICS_DATA = [
  { name: 'Mon', revenue: 45000, jobs: 4, balance: 45000 },
  { name: 'Tue', revenue: 52000, jobs: 5, balance: 52000 },
  { name: 'Wed', revenue: 49000, jobs: 3, balance: 68000 },
  { name: 'Thu', revenue: 62000, jobs: 6, balance: 74000 },
  { name: 'Fri', revenue: 85000, jobs: 8, balance: 95000 },
  { name: 'Sat', revenue: 92000, jobs: 10, balance: 112000 },
  { name: 'Sun', revenue: 88000, jobs: 7, balance: 125000 },
];

export const Wallet: React.FC<WalletProps> = ({ role }) => {
  // UI State
  const [showBalance, setShowBalance] = useState(true);
  const [activeTab, setActiveTab] = useState<'Transactions' | 'Escrow'>('Escrow');
  
  // Modals
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showSendMoneyModal, setShowSendMoneyModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [showEscrowCreateModal, setShowEscrowCreateModal] = useState(false);
  
  // Action Modals
  const [selectedEscrow, setSelectedEscrow] = useState<LocalEscrowItem | null>(null);
  const [modalAction, setModalAction] = useState<'release' | 'dispute' | 'deliver' | null>(null);
  const [disputeReason, setDisputeReason] = useState('');

  // Data State
  const [escrowItems, setEscrowItems] = useState<LocalEscrowItem[]>(role === 'customer' ? INITIAL_CUSTOMER_ESCROW : INITIAL_ENTREPRENEUR_ESCROW);
  const [balance, setBalance] = useState(role === 'customer' ? 145200 : 85000);
  
  // Gamification Mock
  const currentXp = 2450;
  const totalEarnings = 85000;
  const jobsCount = 24;
  const rating = 4.9;
  const levelInfo = getNextLevelInfo(currentXp, totalEarnings, jobsCount, rating);
  const nextConfig = levelInfo.nextConfig;

  // Calculated State
  const escrowLockedAmount = escrowItems
    .filter(i => i.status === 'locked' || i.status === 'delivered' || i.status === 'disputed')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const availableBalance = balance; // Simplified for prototype

  // --- Handlers ---

  const handleCreateEscrow = (provider: string, service: string, amount: number) => {
      const newItem: LocalEscrowItem = {
          id: Date.now().toString(),
          serviceTitle: service,
          amount: amount,
          providerName: provider,
          status: 'locked',
          date: 'Just now',
          bookingId: `NEW-${Date.now()}`
      };
      setEscrowItems([newItem, ...escrowItems]);
      setBalance(prev => prev - amount); // Deduct from main balance
      setShowEscrowCreateModal(false);
  };

  const handleActionSubmit = () => {
      if (!selectedEscrow || !modalAction) return;

      const updatedItems = escrowItems.map(item => {
          if (item.id === selectedEscrow.id) {
              if (modalAction === 'release') return { ...item, status: 'released' as const };
              if (modalAction === 'deliver') return { ...item, status: 'delivered' as const };
              if (modalAction === 'dispute') return { ...item, status: 'disputed' as const };
          }
          return item;
      });

      // If releasing, technically logic would move money to entrepreneur, 
      // but for this view (Customer or Entr), we just update the status list.
      
      setEscrowItems(updatedItems);
      setModalAction(null);
      setSelectedEscrow(null);
      setDisputeReason('');
  };

  const openActionModal = (item: LocalEscrowItem, action: 'release' | 'dispute' | 'deliver') => {
      setSelectedEscrow(item);
      setModalAction(action);
  };

  return (
    <div className="p-4 space-y-6 pb-24 bg-gray-50 min-h-screen">
      
      {/* HEADER */}
      <div className="flex justify-between items-center">
         <div>
            <h2 className="text-xl font-bold text-slate-900">{role === 'customer' ? 'My Wallet' : 'Earnings Dashboard'}</h2>
            <p className="text-xs text-gray-500">{role === 'customer' ? 'Manage funds & escrow' : 'Track revenue & growth'}</p>
         </div>
         <div className="bg-white p-2 rounded-full shadow-sm text-indigo-600">
             <ShieldCheck size={20} />
         </div>
      </div>

      {/* 1. MAIN BALANCE CARD */}
      <div className={`rounded-2xl p-6 text-white shadow-xl relative overflow-hidden ${role === 'customer' ? 'bg-gradient-to-br from-indigo-900 to-indigo-700' : 'bg-gradient-to-br from-slate-900 to-slate-800'}`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
        
        <div className="flex justify-between items-start mb-6">
            <div>
                <div className="flex items-center space-x-2">
                    <p className="text-white/70 text-sm font-medium">{role === 'customer' ? 'Available Balance' : 'Withdrawable Cash'}</p>
                    <button onClick={() => setShowBalance(!showBalance)} className="text-white/50 hover:text-white">
                        {showBalance ? <Eye size={14} /> : <EyeOff size={14} />}
                    </button>
                </div>
                <h1 className="text-3xl font-bold mt-1">
                    {showBalance ? `₦ ${availableBalance.toLocaleString()}` : '••••••••'}
                </h1>
                
                {/* Escrow Status Pill */}
                <div className="flex items-center mt-3 bg-black/20 backdrop-blur-sm w-fit px-3 py-1.5 rounded-lg border border-white/10">
                    <Lock size={12} className="mr-2 text-orange-300" />
                    <span className="text-xs text-orange-100">
                        {role === 'customer' ? 'Held in Escrow:' : 'Pending Clearance:'} 
                        <span className="font-bold ml-1">₦{escrowLockedAmount.toLocaleString()}</span>
                    </span>
                </div>
            </div>
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                <WalletIcon size={24} className="text-white" />
            </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 mt-4">
            {role === 'customer' ? (
                <>
                    <button 
                        onClick={() => setShowTopUpModal(true)}
                        className="flex-1 bg-white text-indigo-900 py-3 rounded-xl font-bold text-sm flex items-center justify-center hover:bg-gray-100 shadow-lg"
                    >
                        <ArrowDownLeft size={16} className="mr-2" /> Top Up
                    </button>
                    <button 
                        onClick={() => setShowEscrowCreateModal(true)}
                        className="flex-1 bg-indigo-500 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center hover:bg-indigo-600 shadow-lg border border-white/20"
                    >
                        <Lock size={16} className="mr-2" /> New Escrow
                    </button>
                </>
            ) : (
                <>
                    <button 
                         onClick={() => setShowWithdrawModal(true)}
                         className="flex-1 bg-green-500 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center hover:bg-green-600 shadow-lg shadow-green-900/20"
                    >
                        <ArrowUpRight size={16} className="mr-2" /> Withdraw
                    </button>
                    <button 
                         onClick={() => setShowAnalyticsModal(true)}
                         className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center hover:bg-white/20"
                    >
                        <Activity size={16} className="mr-2 text-indigo-300" /> Trends
                    </button>
                </>
            )}
        </div>
      </div>

      {/* 2. TABS */}
      <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-100">
          <button 
            onClick={() => setActiveTab('Escrow')}
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'Escrow' ? 'bg-slate-800 text-white shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
          >
              Active Escrow
          </button>
          <button 
            onClick={() => setActiveTab('Transactions')}
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'Transactions' ? 'bg-slate-800 text-white shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
          >
              History
          </button>
      </div>

      {/* 3. ESCROW LIST (Interactive) */}
      {activeTab === 'Escrow' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {escrowItems.length === 0 ? (
                  <div className="text-center py-10 text-gray-400">
                      <Lock size={32} className="mx-auto mb-2 opacity-50"/>
                      <p>No active escrow transactions.</p>
                  </div>
              ) : (
                  escrowItems.map((item) => (
                      <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
                          {/* Status Strip */}
                          <div className={`absolute top-0 left-0 bottom-0 w-1.5 ${
                              item.status === 'released' ? 'bg-green-500' : 
                              item.status === 'disputed' ? 'bg-red-500' :
                              item.status === 'delivered' ? 'bg-blue-500' :
                              'bg-orange-400'
                          }`}></div>

                          <div className="pl-3">
                              <div className="flex justify-between items-start mb-2">
                                  <div>
                                      <h4 className="font-bold text-slate-800 text-sm">{item.serviceTitle}</h4>
                                      <p className="text-[10px] text-gray-500 flex items-center mt-0.5">
                                          {item.providerName} • {item.date}
                                      </p>
                                  </div>
                                  <div className="text-right">
                                      <span className="block font-bold text-indigo-600">₦{item.amount.toLocaleString()}</span>
                                      
                                      {/* Status Badge */}
                                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center mt-1 ${
                                          item.status === 'released' ? 'bg-green-100 text-green-700' :
                                          item.status === 'disputed' ? 'bg-red-100 text-red-700' :
                                          item.status === 'delivered' ? 'bg-blue-100 text-blue-700' :
                                          'bg-orange-100 text-orange-700'
                                      }`}>
                                          {item.status === 'released' && <Check size={10} className="mr-1" />}
                                          {item.status === 'disputed' && <AlertTriangle size={10} className="mr-1" />}
                                          {item.status === 'delivered' && <Truck size={10} className="mr-1" />}
                                          {item.status === 'locked' && <Lock size={10} className="mr-1" />}
                                          {item.status.toUpperCase()}
                                      </span>
                                  </div>
                              </div>

                              {/* Action Buttons based on Role & Status */}
                              <div className="flex space-x-2 mt-3 pt-3 border-t border-gray-50">
                                  {role === 'customer' ? (
                                      // CUSTOMER ACTIONS
                                      <>
                                          {item.status === 'locked' && (
                                              <>
                                                  <button className="flex-1 py-2 bg-gray-50 text-gray-400 text-xs font-bold rounded-lg cursor-not-allowed">Wait for Delivery</button>
                                                  <button onClick={() => openActionModal(item, 'dispute')} className="px-3 py-2 bg-red-50 text-red-600 text-xs font-bold rounded-lg border border-red-100">Dispute</button>
                                              </>
                                          )}
                                          {item.status === 'delivered' && (
                                              <>
                                                  <button onClick={() => openActionModal(item, 'release')} className="flex-1 py-2 bg-green-600 text-white text-xs font-bold rounded-lg shadow-md shadow-green-200">Approve & Release</button>
                                                  <button onClick={() => openActionModal(item, 'dispute')} className="px-3 py-2 bg-red-50 text-red-600 text-xs font-bold rounded-lg border border-red-100">Dispute</button>
                                              </>
                                          )}
                                          {item.status === 'disputed' && (
                                              <button className="flex-1 py-2 bg-red-50 text-red-600 text-xs font-bold rounded-lg border border-red-100">In Dispute Resolution</button>
                                          )}
                                          {item.status === 'released' && (
                                              <button className="flex-1 py-2 bg-green-50 text-green-600 text-xs font-bold rounded-lg border border-green-100 flex items-center justify-center"><CheckCircle size={12} className="mr-1"/> Completed</button>
                                          )}
                                      </>
                                  ) : (
                                      // ENTREPRENEUR ACTIONS
                                      <>
                                          {item.status === 'locked' && (
                                              <button onClick={() => openActionModal(item, 'deliver')} className="flex-1 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg shadow-md shadow-blue-200">Mark Delivered</button>
                                          )}
                                          {item.status === 'delivered' && (
                                              <button className="flex-1 py-2 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg border border-blue-100">Waiting for Approval</button>
                                          )}
                                          {item.status === 'disputed' && (
                                              <button className="flex-1 py-2 bg-red-50 text-red-600 text-xs font-bold rounded-lg border border-red-100">View Dispute</button>
                                          )}
                                          {item.status === 'released' && (
                                              <button className="flex-1 py-2 bg-green-50 text-green-600 text-xs font-bold rounded-lg border border-green-100">Funds Available</button>
                                          )}
                                      </>
                                  )}
                              </div>
                          </div>
                      </div>
                  ))
              )}
          </div>
      )}

      {/* 4. TRANSACTION LIST */}
      {activeTab === 'Transactions' && (
          <div className="space-y-3">
              <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 text-center text-gray-400">
                  <p className="text-sm">Transaction history from {role === 'customer' ? 'deposits and payments' : 'withdrawals'} will appear here.</p>
              </div>
          </div>
      )}

      {/* --- MODALS --- */}

      {/* Create Escrow Modal (Customer) */}
      {showEscrowCreateModal && (
          <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
              <div className="bg-white w-full max-w-sm rounded-2xl p-6">
                  <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-lg text-slate-800">Create Secure Payment</h3>
                      <button onClick={() => setShowEscrowCreateModal(false)}><X size={20} className="text-gray-400"/></button>
                  </div>
                  <div className="space-y-4">
                      <div>
                          <label className="text-xs font-bold text-gray-500 mb-1 block">Recipient (Provider)</label>
                          <input type="text" placeholder="Username or Email" className="w-full p-3 bg-gray-50 rounded-xl text-sm border-none" />
                      </div>
                      <div>
                          <label className="text-xs font-bold text-gray-500 mb-1 block">Service Description</label>
                          <input type="text" placeholder="e.g. Website Design" className="w-full p-3 bg-gray-50 rounded-xl text-sm border-none" />
                      </div>
                      <div>
                          <label className="text-xs font-bold text-gray-500 mb-1 block">Amount (₦)</label>
                          <input type="number" placeholder="0.00" className="w-full p-3 bg-gray-50 rounded-xl text-lg font-bold text-indigo-700 border-none" />
                      </div>
                      <div className="bg-orange-50 p-3 rounded-xl flex items-start space-x-2">
                          <Lock size={16} className="text-orange-500 mt-0.5 flex-shrink-0" />
                          <p className="text-[10px] text-orange-700 leading-relaxed">Funds will be held securely in escrow until you approve the work. You are protected by our Money Back Guarantee.</p>
                      </div>
                      <button 
                        onClick={() => handleCreateEscrow('Custom Provider', 'Direct Service', 5000)}
                        className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-indigo-200"
                      >
                          Secure Funds
                      </button>
                  </div>
              </div>
          </div>
      )}

      {/* Action Confirmation Modal */}
      {modalAction && selectedEscrow && (
          <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
              <div className="bg-white w-full max-w-sm rounded-2xl p-6 text-center">
                  {modalAction === 'release' && (
                      <>
                          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                              <CheckCircle size={32} />
                          </div>
                          <h3 className="text-xl font-bold text-slate-800 mb-2">Release Payment?</h3>
                          <p className="text-sm text-gray-500 mb-6">
                              Are you sure the work is completed? <b>₦{selectedEscrow.amount.toLocaleString()}</b> will be transferred to {selectedEscrow.providerName}.
                          </p>
                          <button onClick={handleActionSubmit} className="w-full bg-green-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-green-200 mb-3">Yes, Release Funds</button>
                      </>
                  )}

                  {modalAction === 'deliver' && (
                      <>
                          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                              <Truck size={32} />
                          </div>
                          <h3 className="text-xl font-bold text-slate-800 mb-2">Mark as Delivered?</h3>
                          <p className="text-sm text-gray-500 mb-6">
                              This will notify the customer to review and approve the work.
                          </p>
                          <button onClick={handleActionSubmit} className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-blue-200 mb-3">Confirm Delivery</button>
                      </>
                  )}

                  {modalAction === 'dispute' && (
                      <>
                          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
                              <Flag size={32} />
                          </div>
                          <h3 className="text-xl font-bold text-slate-800 mb-2">Raise a Dispute</h3>
                          <p className="text-sm text-gray-500 mb-4">
                              Please describe the issue. Funds will remain locked during investigation.
                          </p>
                          <textarea 
                              value={disputeReason}
                              onChange={(e) => setDisputeReason(e.target.value)}
                              className="w-full p-3 bg-gray-50 rounded-xl text-sm border border-gray-200 mb-4 h-24 resize-none"
                              placeholder="Reason for dispute..."
                          />
                          <button onClick={handleActionSubmit} className="w-full bg-red-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-red-200 mb-3">File Dispute</button>
                      </>
                  )}

                  <button onClick={() => { setModalAction(null); setSelectedEscrow(null); }} className="text-gray-400 font-bold text-sm">Cancel</button>
              </div>
          </div>
      )}

      {/* Top Up Modal (Placeholder) */}
      {showTopUpModal && (
          <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4">
              <div className="bg-white w-full max-w-sm rounded-2xl p-6">
                  <h3 className="font-bold text-lg mb-4">Top Up Wallet</h3>
                  <button onClick={() => setShowTopUpModal(false)} className="w-full bg-gray-100 py-3 rounded-xl font-bold text-sm">Close</button>
              </div>
          </div>
      )}
      
      {/* Withdraw Modal (Placeholder) */}
      {showWithdrawModal && (
          <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4">
              <div className="bg-white w-full max-w-sm rounded-2xl p-6">
                  <h3 className="font-bold text-lg mb-4">Withdraw Funds</h3>
                  <button onClick={() => setShowWithdrawModal(false)} className="w-full bg-gray-100 py-3 rounded-xl font-bold text-sm">Close</button>
              </div>
          </div>
      )}

    </div>
  );
};
