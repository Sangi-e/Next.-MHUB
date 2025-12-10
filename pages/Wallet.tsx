import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownLeft, Wallet as WalletIcon, Clock, Lock, Building, MoreHorizontal, ShieldCheck, Fingerprint, RefreshCcw, AlertTriangle, Eye, EyeOff, CheckCircle, CreditCard } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { UserRole, WalletTransaction, EscrowItem } from '../types';

interface WalletProps {
    role: UserRole;
}

const CUSTOMER_TRANSACTIONS: WalletTransaction[] = [
    { id: '1', type: 'escrow_lock', amount: 5000, date: 'Today, 10:23 AM', status: 'pending', description: 'Escrow Lock - Plumbing', counterparty: 'Adeola J.', reference: 'ESC-88392' },
    { id: '2', type: 'deposit', amount: 50000, date: 'Yesterday, 4:00 PM', status: 'success', description: 'Top Up via Card', reference: 'TOP-11234' },
    { id: '3', type: 'payment', amount: 12000, date: '24 Oct, 2023', status: 'success', description: 'Logo Design Payment', counterparty: 'Sarah Tech', reference: 'PAY-99212' },
];

const FREELANCER_TRANSACTIONS: WalletTransaction[] = [
    { id: '1', type: 'escrow_release', amount: 15000, date: 'Today, 09:00 AM', status: 'success', description: 'Escrow Release - Web Dev', counterparty: 'John Doe', reference: 'ESC-RELEASE-123' },
    { id: '2', type: 'withdrawal', amount: 20000, date: 'Yesterday, 2:15 PM', status: 'pending', description: 'Withdrawal to GTBank', reference: 'WTH-88221' },
    { id: '3', type: 'withdrawal', amount: 50000, date: '20 Oct, 2023', status: 'success', description: 'Withdrawal to GTBank', reference: 'WTH-77332' },
];

const CUSTOMER_ESCROW: EscrowItem[] = [
    { id: 'e1', serviceTitle: 'Kitchen Plumbing Repair', amount: 5000, providerName: 'Adeola Johnson', status: 'locked', date: 'Oct 26, 2023', bookingId: 'b1' }
];

const ANALYTICS_DATA = [
  { name: 'Mon', amount: 4000 },
  { name: 'Tue', amount: 8000 },
  { name: 'Wed', amount: 12000 },
  { name: 'Thu', amount: 9000 },
  { name: 'Fri', amount: 15000 },
  { name: 'Sat', amount: 18000 },
  { name: 'Sun', amount: 22000 },
];

export const Wallet: React.FC<WalletProps> = ({ role }) => {
  const [activeTab, setActiveTab] = useState<'transactions' | 'escrow' | 'analytics'>('transactions');
  const [showBalance, setShowBalance] = useState(true);
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  // Mock State
  const balance = role === 'customer' ? 145200 : 85000;
  const escrowBalance = 5000; // Only relevant for customers
  const withdrawableBalance = 80000; // Only relevant for freelancers
  const isKycVerified = true;

  return (
    <div className="p-4 space-y-6 pb-24 bg-gray-50 min-h-screen">
      
      {/* HEADER */}
      <div className="flex justify-between items-center">
         <div>
            <h2 className="text-xl font-bold text-slate-900">{role === 'customer' ? 'My Wallet' : 'Earnings Dashboard'}</h2>
            <p className="text-xs text-gray-500">{role === 'customer' ? 'Manage your funds & security' : 'Track revenue & withdrawals'}</p>
         </div>
         <div className="bg-white p-2 rounded-full shadow-sm">
             <ShieldCheck size={20} className={role === 'customer' ? 'text-indigo-600' : 'text-green-600'} />
         </div>
      </div>

      {/* 1. BALANCE CARD */}
      <div className={`rounded-2xl p-6 text-white shadow-xl relative overflow-hidden ${role === 'customer' ? 'bg-gradient-to-br from-indigo-900 to-indigo-700' : 'bg-gradient-to-br from-slate-900 to-slate-800'}`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
        
        <div className="flex justify-between items-start mb-6">
            <div>
                <div className="flex items-center space-x-2">
                    <p className="text-white/70 text-sm font-medium">{role === 'customer' ? 'Available Balance' : 'Total Earnings'}</p>
                    <button onClick={() => setShowBalance(!showBalance)} className="text-white/50 hover:text-white">
                        {showBalance ? <Eye size={14} /> : <EyeOff size={14} />}
                    </button>
                </div>
                <h1 className="text-3xl font-bold mt-1">
                    {showBalance ? `₦ ${balance.toLocaleString()}` : '••••••••'}
                </h1>
                {role === 'customer' && (
                     <div className="flex items-center mt-2 text-xs bg-indigo-800/50 w-fit px-2 py-1 rounded-lg border border-white/10">
                        <Lock size={10} className="mr-1 text-orange-400" />
                        <span className="text-orange-200">Escrow Locked: ₦{escrowBalance.toLocaleString()}</span>
                     </div>
                )}
            </div>
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                <WalletIcon size={24} className="text-white" />
            </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
            {role === 'customer' ? (
                // CUSTOMER ACTIONS
                <>
                    <button 
                        onClick={() => setShowTopUpModal(true)}
                        className="flex-1 bg-white text-indigo-900 py-3 rounded-xl font-bold text-sm flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                        <ArrowDownLeft size={16} className="mr-2" /> Add Money
                    </button>
                    <button className="flex-1 bg-indigo-600/50 border border-white/20 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center hover:bg-indigo-600/70">
                        <Fingerprint size={16} className="mr-2" /> Security
                    </button>
                </>
            ) : (
                // FREELANCER ACTIONS
                <>
                    <button 
                         onClick={() => setShowWithdrawModal(true)}
                         disabled={!isKycVerified}
                         className="flex-1 bg-green-500 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center hover:bg-green-600 shadow-lg shadow-green-900/20 disabled:bg-gray-600 disabled:opacity-50"
                    >
                        <ArrowUpRight size={16} className="mr-2" /> Withdraw
                    </button>
                    <div className="flex-1 flex flex-col justify-center items-end">
                        <span className="text-[10px] text-gray-400">Available to withdraw</span>
                        <span className="text-sm font-bold">₦{withdrawableBalance.toLocaleString()}</span>
                    </div>
                </>
            )}
        </div>
      </div>

      {/* 2. FREELANCER ANALYTICS OR CUSTOMER ESCROW */}
      {role === 'entrepreneur' && (
           <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-slate-800 text-sm">Revenue Growth</h3>
                    <select className="text-xs bg-gray-50 border-none rounded p-1 text-gray-500">
                        <option>This Week</option>
                    </select>
                </div>
                <div className="h-32 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={ANALYTICS_DATA}>
                        <defs>
                            <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <Tooltip />
                        <Area type="monotone" dataKey="amount" stroke="#22c55e" fillOpacity={1} fill="url(#colorAmt)" strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
      )}

      {role === 'customer' && (
          <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100">
              <div className="flex justify-between items-center mb-3">
                   <h3 className="font-bold text-orange-900 text-sm flex items-center"><Lock size={16} className="mr-2"/> Active Escrow</h3>
                   <span className="text-xs font-bold text-orange-700 bg-orange-100 px-2 py-1 rounded-full">{CUSTOMER_ESCROW.length} Active</span>
              </div>
              <div className="space-y-3">
                  {CUSTOMER_ESCROW.map(escrow => (
                      <div key={escrow.id} className="bg-white p-3 rounded-xl shadow-sm flex justify-between items-center">
                          <div>
                              <p className="font-bold text-sm text-slate-800">{escrow.serviceTitle}</p>
                              <p className="text-[10px] text-gray-500">Provider: {escrow.providerName}</p>
                          </div>
                          <div className="text-right">
                              <p className="font-bold text-sm text-slate-800">₦{escrow.amount.toLocaleString()}</p>
                              <button className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded mt-1 border border-green-100">Release Funds</button>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      )}

      {/* 3. TRANSACTION HISTORY */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
            <h3 className="font-bold text-slate-800">Recent Activity</h3>
            <button className="text-indigo-600 text-xs font-medium bg-indigo-50 px-2 py-1 rounded">View All</button>
        </div>

        <div className="space-y-3">
             {(role === 'customer' ? CUSTOMER_TRANSACTIONS : FREELANCER_TRANSACTIONS).map((tx) => (
                 <TransactionItem key={tx.id} tx={tx} role={role} />
             ))}
        </div>
      </div>

      {/* MODALS */}
      {showTopUpModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white w-full max-w-sm rounded-2xl p-6 space-y-4">
                  <h3 className="text-lg font-bold text-slate-800">Add Money to Wallet</h3>
                  <div className="space-y-3">
                      <div className="p-4 border border-indigo-100 bg-indigo-50 rounded-xl flex items-center space-x-3 cursor-pointer ring-2 ring-indigo-500">
                          <CreditCard size={24} className="text-indigo-600"/>
                          <div>
                              <p className="font-bold text-sm text-indigo-900">Pay with Card</p>
                              <p className="text-xs text-indigo-600">Instant deposit</p>
                          </div>
                      </div>
                      <div className="p-4 border border-gray-100 rounded-xl flex items-center space-x-3 cursor-pointer hover:bg-gray-50">
                          <Building size={24} className="text-gray-500"/>
                          <div>
                              <p className="font-bold text-sm text-gray-700">Bank Transfer</p>
                              <p className="text-xs text-gray-500">30 mins processing</p>
                          </div>
                      </div>
                  </div>
                  <button onClick={() => setShowTopUpModal(false)} className="w-full bg-gray-100 text-gray-600 font-bold py-3 rounded-xl mt-2">Cancel</button>
              </div>
          </div>
      )}

      {showWithdrawModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white w-full max-w-sm rounded-2xl p-6 space-y-4">
                  <div className="text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 text-green-600">
                          <Building size={24} />
                      </div>
                      <h3 className="text-lg font-bold text-slate-800">Withdraw Earnings</h3>
                      <p className="text-xs text-gray-500">Funds will be sent to your verified bank account.</p>
                  </div>
                  
                  {!isKycVerified ? (
                       <div className="bg-red-50 p-3 rounded-lg flex items-center space-x-2 text-red-700 text-xs">
                           <AlertTriangle size={16} />
                           <span>KYC Verification Required. Please upload ID.</span>
                       </div>
                  ) : (
                      <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                           <div className="flex justify-between text-sm">
                               <span className="text-gray-500">Bank</span>
                               <span className="font-bold text-slate-800">GTBank •• 4422</span>
                           </div>
                           <div className="flex justify-between text-sm">
                               <span className="text-gray-500">Account Name</span>
                               <span className="font-bold text-slate-800">Emmanuel Doe</span>
                           </div>
                      </div>
                  )}

                  <div className="pt-2">
                      <label className="text-xs font-bold text-gray-500 mb-1 block">Amount to Withdraw</label>
                      <input type="number" placeholder="Min 1000" className="w-full p-3 border border-gray-200 rounded-xl text-lg font-bold" />
                  </div>

                  <button onClick={() => setShowWithdrawModal(false)} className="w-full bg-green-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-green-200">
                      Confirm Withdrawal
                  </button>
                  <button onClick={() => setShowWithdrawModal(false)} className="w-full text-gray-400 font-bold py-2 text-xs">Cancel</button>
              </div>
          </div>
      )}
    </div>
  );
};

const TransactionItem = ({ tx, role }: { tx: WalletTransaction; role: UserRole }) => {
    let Icon = RefreshCcw;
    let color = "bg-gray-100 text-gray-600";
    let amountColor = "text-slate-900";
    let sign = "";

    switch (tx.type) {
        case 'deposit':
            Icon = ArrowDownLeft;
            color = "bg-indigo-100 text-indigo-600";
            amountColor = "text-green-600";
            sign = "+";
            break;
        case 'withdrawal':
            Icon = ArrowUpRight;
            color = "bg-slate-100 text-slate-600";
            amountColor = "text-slate-900";
            sign = "-";
            break;
        case 'payment':
            Icon = ArrowUpRight;
            color = "bg-orange-100 text-orange-600";
            amountColor = "text-slate-900";
            sign = "-";
            break;
        case 'escrow_lock':
            Icon = Lock;
            color = "bg-orange-100 text-orange-600";
            amountColor = "text-orange-600";
            sign = "";
            break;
        case 'escrow_release':
            Icon = CheckCircle;
            color = "bg-green-100 text-green-600";
            amountColor = "text-green-600";
            sign = "+";
            break;
    }

    if (role === 'entrepreneur' && tx.type === 'escrow_release') {
         // For freelancer, escrow release is income
         sign = "+";
    }

    return (
        <div className="bg-white p-3 rounded-xl shadow-sm flex items-center justify-between border border-gray-50">
            <div className="flex items-center space-x-3">
                <div className={`p-2.5 rounded-full ${color}`}>
                    <Icon size={18} />
                </div>
                <div>
                    <p className="font-bold text-sm text-slate-800">{tx.description}</p>
                    <p className="text-[10px] text-gray-400">{tx.date} • {tx.status}</p>
                </div>
            </div>
            <div className="text-right">
                <p className={`font-bold text-sm ${amountColor}`}>{sign} ₦{tx.amount.toLocaleString()}</p>
                <p className="text-[10px] text-gray-300">{tx.reference}</p>
            </div>
        </div>
    );
}