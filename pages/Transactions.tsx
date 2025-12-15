import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Download, ArrowUpRight, ArrowDownLeft, RefreshCcw, Lock, CheckCircle, Calendar, DollarSign, TrendingUp, TrendingDown, FileText, Clock } from 'lucide-react';
import { UserRole, WalletTransaction } from '../types';

interface TransactionsProps {
  role: UserRole;
}

// Extended Mock Data with more context
const ALL_TRANSACTIONS: WalletTransaction[] = [
    // Entrepreneur Data
    { id: '101', type: 'escrow_release', amount: 15000, date: 'Today, 09:41 AM', status: 'success', description: 'Payment: Logo Design', counterparty: 'Sarah Client', reference: 'JOB-8821' },
    { id: '102', type: 'withdrawal', amount: 45000, date: 'Yesterday', status: 'pending', description: 'Withdrawal to GTBank', reference: 'WTH-9920' },
    { id: '103', type: 'escrow_release', amount: 8000, date: 'Yesterday', status: 'success', description: 'Payment: Brake Repair', counterparty: 'Musa Auto', reference: 'JOB-8819' },
    { id: '104', type: 'escrow_release', amount: 25000, date: 'Oct 24, 2023', status: 'success', description: 'Payment: Kitchen Plumbing', counterparty: 'John Doe', reference: 'JOB-8700' },
    { id: '105', type: 'withdrawal', amount: 20000, date: 'Oct 20, 2023', status: 'success', description: 'Withdrawal to Kuda Bank', reference: 'WTH-8800' },
    
    // Customer Data
    { id: '201', type: 'escrow_lock', amount: 5000, date: 'Today, 10:23 AM', status: 'pending', description: 'Escrow: Pipe Fix', counterparty: 'Adeola J.', reference: 'ESC-88392' },
    { id: '202', type: 'deposit', amount: 50000, date: 'Yesterday', status: 'success', description: 'Top Up via Card', reference: 'TOP-11234' },
    { id: '203', type: 'payment', amount: 12000, date: 'Oct 24, 2023', status: 'success', description: 'Service Payment', counterparty: 'Sarah Tech', reference: 'PAY-99212' },
];

export const Transactions: React.FC<TransactionsProps> = ({ role }) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'All' | 'In' | 'Out'>('All');
  const [searchTerm, setSearchTerm] = useState('');

  // 1. Filter Transactions based on Role & Search
  const getFilteredTransactions = () => {
    return ALL_TRANSACTIONS.filter(tx => {
      // Role Filter (Mocking backend filtering)
      if (role === 'entrepreneur') {
          if (!['escrow_release', 'withdrawal', 'refund'].includes(tx.type)) return false;
      } else {
          if (['escrow_release', 'withdrawal'].includes(tx.type) && !tx.description.includes('Top Up')) return false; 
          // Simplified logic for prototype: Customers usually see deposits/payments
          if (['escrow_release'].includes(tx.type)) return false;
      }

      // Text Search
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = tx.description.toLowerCase().includes(searchLower) || 
                            tx.reference.toLowerCase().includes(searchLower) ||
                            tx.counterparty?.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;

      // Tab Filter
      if (filter === 'All') return true;
      if (filter === 'In') {
        // For Freelancer: Money IN is Escrow Release
        // For Customer: Money IN is Deposit
        return role === 'entrepreneur' ? tx.type === 'escrow_release' : tx.type === 'deposit';
      }
      if (filter === 'Out') {
        // For Freelancer: Money OUT is Withdrawal
        // For Customer: Money OUT is Payment/Escrow Lock
        return role === 'entrepreneur' ? tx.type === 'withdrawal' : ['payment', 'escrow_lock'].includes(tx.type);
      }
      return true;
    });
  };

  const transactions = getFilteredTransactions();

  // 2. Calculate Stats for the top cards (Freelancer Only)
  const stats = {
      earned: transactions.filter(t => t.type === 'escrow_release').reduce((acc, curr) => acc + curr.amount, 0),
      withdrawn: transactions.filter(t => t.type === 'withdrawal').reduce((acc, curr) => acc + curr.amount, 0),
  };

  // 3. Group by Date Helper
  const groupedTransactions = transactions.reduce((groups, tx) => {
      const dateKey = tx.date.includes('Today') ? 'Today' : 
                      tx.date.includes('Yesterday') ? 'Yesterday' : 
                      tx.date; // Simplified grouping for prototype
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(tx);
      return groups;
  }, {} as Record<string, WalletTransaction[]>);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      
      {/* Header */}
      <div className="bg-white p-4 shadow-sm sticky top-0 z-10 space-y-4">
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
                <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-indigo-600 transition-colors">
                    <ArrowLeft size={24} />
                </button>
                <div>
                    <h1 className="text-lg font-bold text-slate-800">
                        {role === 'entrepreneur' ? 'Financial History' : 'Transactions'}
                    </h1>
                    {role === 'entrepreneur' && <p className="text-xs text-gray-500">Track earnings & withdrawals</p>}
                </div>
            </div>
            <button className="text-indigo-600 bg-indigo-50 px-3 py-2 rounded-lg text-xs font-bold flex items-center hover:bg-indigo-100 transition-colors">
                <FileText size={16} className="mr-1" /> Statement
            </button>
        </div>

        {/* Freelancer Stats Summary */}
        {role === 'entrepreneur' && filter === 'All' && (
            <div className="grid grid-cols-2 gap-3">
                <div className="bg-green-50 border border-green-100 p-3 rounded-xl">
                    <div className="flex items-center text-green-600 mb-1">
                        <TrendingUp size={16} className="mr-1" />
                        <span className="text-xs font-bold uppercase">Money In</span>
                    </div>
                    <span className="text-lg font-bold text-slate-800">₦{stats.earned.toLocaleString()}</span>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl">
                    <div className="flex items-center text-slate-500 mb-1">
                        <TrendingDown size={16} className="mr-1" />
                        <span className="text-xs font-bold uppercase">Withdrawn</span>
                    </div>
                    <span className="text-lg font-bold text-slate-800">₦{stats.withdrawn.toLocaleString()}</span>
                </div>
            </div>
        )}
        
        {/* Search & Tabs */}
        <div className="flex space-x-3">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input 
                    type="text" 
                    placeholder={role === 'entrepreneur' ? "Search jobs, clients..." : "Search transactions..."}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-xl text-sm border-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
            </div>
            <button className="bg-gray-100 p-2 rounded-xl text-gray-600 hover:bg-gray-200">
                <Filter size={20} />
            </button>
        </div>

        <div className="flex bg-gray-100 p-1 rounded-xl">
             {['All', 'In', 'Out'].map((tab) => (
                <button
                    key={tab}
                    onClick={() => setFilter(tab as any)}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                        filter === tab 
                        ? 'bg-white text-slate-800 shadow-sm' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    {tab === 'All' ? 'All Activity' : tab === 'In' ? (role === 'entrepreneur' ? 'Earnings' : 'Money In') : (role === 'entrepreneur' ? 'Withdrawals' : 'Money Out')}
                </button>
             ))}
        </div>
      </div>

      {/* List Content */}
      <div className="p-4 space-y-6">
          {Object.keys(groupedTransactions).length > 0 ? (
              Object.entries(groupedTransactions).map(([date, txs]) => (
                  <div key={date}>
                      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 ml-1">{date}</h3>
                      <div className="space-y-3">
                          {txs.map(tx => (
                              <TransactionItem key={tx.id} tx={tx} role={role} />
                          ))}
                      </div>
                  </div>
              ))
          ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
                      <RefreshCcw size={32} />
                  </div>
                  <h3 className="font-bold text-slate-800">No Transactions</h3>
                  <p className="text-xs text-gray-500 mt-1">No activity found for this filter.</p>
              </div>
          )}
      </div>
    </div>
  );
};

const TransactionItem: React.FC<{ tx: WalletTransaction; role: UserRole }> = ({ tx, role }) => {
    let Icon = RefreshCcw;
    let color = "bg-gray-100 text-gray-600";
    let amountColor = "text-slate-900";
    let sign = "";
    let statusColor = "text-gray-400"; // Default status color

    // Status Badge Logic
    const isPending = tx.status === 'pending';
    const StatusIcon = isPending ? Clock : CheckCircle;
    const statusBg = isPending ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700';

    // Type Logic
    switch (tx.type) {
        case 'deposit':
            Icon = ArrowDownLeft;
            color = "bg-green-100 text-green-600";
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

    // Role Overrides
    if (role === 'entrepreneur' && tx.type === 'escrow_release') {
         // Earnings are the most important visual for freelancers
         sign = "+";
         amountColor = "text-green-600";
         color = "bg-green-100 text-green-600";
    }

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between border border-gray-100 active:scale-[0.99] transition-transform cursor-pointer">
            <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-full ${color}`}>
                    <Icon size={20} />
                </div>
                <div>
                    <p className="font-bold text-sm text-slate-800">{tx.description}</p>
                    <div className="flex items-center text-[10px] text-gray-400 mt-1">
                        {tx.counterparty && <span className="mr-1 font-medium text-slate-600">{tx.counterparty} •</span>}
                        <span className="font-mono">{tx.reference}</span>
                    </div>
                </div>
            </div>
            <div className="text-right">
                <p className={`font-bold text-sm ${amountColor}`}>{sign} ₦{tx.amount.toLocaleString()}</p>
                <div className="flex items-center justify-end mt-1">
                    {isPending ? (
                        <span className="text-[10px] font-bold text-yellow-600 bg-yellow-50 px-1.5 py-0.5 rounded flex items-center">
                            <Clock size={10} className="mr-1" /> Pending
                        </span>
                    ) : (
                        <span className="text-[10px] text-gray-400">Success</span>
                    )}
                </div>
            </div>
        </div>
    );
}