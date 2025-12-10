import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Download, ArrowUpRight, ArrowDownLeft, RefreshCcw, Lock, CheckCircle, Calendar } from 'lucide-react';
import { UserRole, WalletTransaction } from '../types';

interface TransactionsProps {
  role: UserRole;
}

const ALL_TRANSACTIONS: WalletTransaction[] = [
    { id: '1', type: 'escrow_lock', amount: 5000, date: 'Today, 10:23 AM', status: 'pending', description: 'Escrow Lock - Plumbing', counterparty: 'Adeola J.', reference: 'ESC-88392' },
    { id: '2', type: 'deposit', amount: 50000, date: 'Yesterday, 4:00 PM', status: 'success', description: 'Top Up via Card', reference: 'TOP-11234' },
    { id: '3', type: 'payment', amount: 12000, date: '24 Oct, 2023', status: 'success', description: 'Logo Design Payment', counterparty: 'Sarah Tech', reference: 'PAY-99212' },
    { id: '4', type: 'escrow_release', amount: 15000, date: '22 Oct, 2023', status: 'success', description: 'Escrow Release - Web Dev', counterparty: 'John Doe', reference: 'ESC-RELEASE-123' },
    { id: '5', type: 'withdrawal', amount: 20000, date: '20 Oct, 2023', status: 'pending', description: 'Withdrawal to GTBank', reference: 'WTH-88221' },
    { id: '6', type: 'withdrawal', amount: 50000, date: '15 Oct, 2023', status: 'success', description: 'Withdrawal to GTBank', reference: 'WTH-77332' },
];

export const Transactions: React.FC<TransactionsProps> = ({ role }) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'All' | 'In' | 'Out'>('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter logic based on role and tab
  const getFilteredTransactions = () => {
    return ALL_TRANSACTIONS.filter(tx => {
      // Role filtering (Mock logic: Customers see deposits/payments, Freelancers see releases/withdrawals)
      // For demo, we just show everything but visually distinct or simple filtering
      // In a real app, API would filter this.
      
      // Search filter
      const matchesSearch = tx.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            tx.reference.toLowerCase().includes(searchTerm.toLowerCase());
      if (!matchesSearch) return false;

      // Tab filter
      if (filter === 'All') return true;
      if (filter === 'In') {
        return tx.type === 'deposit' || tx.type === 'escrow_release';
      }
      if (filter === 'Out') {
        return tx.type === 'payment' || tx.type === 'withdrawal' || tx.type === 'escrow_lock';
      }
      return true;
    });
  };

  const transactions = getFilteredTransactions();

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm sticky top-0 z-10 space-y-4">
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
                <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-indigo-600">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-lg font-bold text-slate-800">Transaction History</h1>
            </div>
            <button className="text-gray-500 hover:text-indigo-600 bg-gray-50 p-2 rounded-lg">
                <Download size={20} />
            </button>
        </div>
        
        {/* Search & Filter Bar */}
        <div className="flex space-x-3">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-xl text-sm border-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            <button className="bg-gray-100 p-2 rounded-xl text-gray-600 hover:bg-gray-200">
                <Filter size={20} />
            </button>
        </div>

        {/* Tabs */}
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
                    {tab === 'All' ? 'All Transactions' : tab === 'In' ? 'Money In' : 'Money Out'}
                </button>
             ))}
        </div>
      </div>

      <div className="p-4 space-y-4">
          {/* Date Group Header (Mock) */}
          <div className="flex items-center justify-center mb-2">
               <span className="text-xs font-bold text-gray-400 bg-gray-200/50 px-3 py-1 rounded-full flex items-center">
                   <Calendar size={10} className="mr-1" /> Recent
               </span>
          </div>

          <div className="space-y-3">
              {transactions.length > 0 ? (
                  transactions.map(tx => (
                      <TransactionItem key={tx.id} tx={tx} role={role} />
                  ))
              ) : (
                  <div className="text-center py-10 text-gray-400">
                      <p>No transactions found.</p>
                  </div>
              )}
          </div>
      </div>
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

    if (role === 'entrepreneur' && tx.type === 'escrow_release') {
         // For freelancer, escrow release is income
         sign = "+";
    }

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between border border-gray-100 hover:border-indigo-100 transition-colors">
            <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-full ${color}`}>
                    <Icon size={20} />
                </div>
                <div>
                    <p className="font-bold text-sm text-slate-800">{tx.description}</p>
                    <div className="flex items-center text-[10px] text-gray-400 mt-0.5">
                        <span className="mr-2">{tx.date}</span>
                        <span className={`capitalize px-1.5 py-0.5 rounded ${
                            tx.status === 'success' ? 'bg-green-50 text-green-600' :
                            tx.status === 'pending' ? 'bg-yellow-50 text-yellow-600' : 'bg-red-50 text-red-600'
                        }`}>
                            {tx.status}
                        </span>
                    </div>
                </div>
            </div>
            <div className="text-right">
                <p className={`font-bold text-sm ${amountColor}`}>{sign} ₦{tx.amount.toLocaleString()}</p>
                <p className="text-[10px] text-gray-300 font-mono">{tx.reference}</p>
            </div>
        </div>
    );
}