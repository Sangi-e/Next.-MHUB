import React, { useState } from 'react';
import { ShieldAlert, Users, DollarSign, Activity, Check, X, LogOut, AlertTriangle, Wallet, Lock, Ban, RotateCcw } from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip } from 'recharts';

const data = [
  { name: 'Mon', revenue: 4000 },
  { name: 'Tue', revenue: 3000 },
  { name: 'Wed', revenue: 5000 },
  { name: 'Thu', revenue: 9000 },
  { name: 'Fri', revenue: 7500 },
  { name: 'Sat', revenue: 11000 },
  { name: 'Sun', revenue: 13000 },
];

export const AdminDashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [tab, setTab] = useState<'overview' | 'financials'>('overview');

  return (
    <div className="p-6 md:pl-72 bg-gray-900 min-h-screen text-gray-100">
      <div className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-400 text-sm">Platform management & analytics</p>
        </div>
        <div className="flex items-center space-x-3">
             <div className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">Admin</div>
             <button 
                onClick={onLogout}
                className="bg-gray-800 text-gray-300 hover:text-white p-2 rounded-lg transition-colors"
             >
                <LogOut size={18} />
             </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-6 border-b border-gray-700 pb-1">
          <button 
            onClick={() => setTab('overview')}
            className={`px-4 py-2 font-bold text-sm rounded-t-lg transition-colors ${tab === 'overview' ? 'bg-gray-800 text-white border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-300'}`}
          >
              Overview
          </button>
          <button 
            onClick={() => setTab('financials')}
            className={`px-4 py-2 font-bold text-sm rounded-t-lg transition-colors ${tab === 'financials' ? 'bg-gray-800 text-white border-b-2 border-green-500' : 'text-gray-500 hover:text-gray-300'}`}
          >
              Wallet & Financials
          </button>
      </div>

      {tab === 'financials' ? (
          <FinancialControls />
      ) : (
          <OverviewTab />
      )}

    </div>
  );
};

const FinancialControls = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-green-400 flex items-center"><Wallet className="mr-2" /> Financial Control Center</h2>
            
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
                    <h3 className="font-bold text-gray-300 mb-2 text-sm">Escrow Management</h3>
                    <p className="text-xs text-gray-500 mb-3">5 Active Disputes</p>
                    <button className="w-full bg-orange-600/20 text-orange-500 border border-orange-600/50 py-2 rounded-lg text-xs font-bold hover:bg-orange-600 hover:text-white transition-colors">
                        Review Escrow Locks
                    </button>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
                    <h3 className="font-bold text-gray-300 mb-2 text-sm">Withdrawal Approvals</h3>
                    <p className="text-xs text-gray-500 mb-3">12 Pending Requests</p>
                    <button className="w-full bg-green-600/20 text-green-500 border border-green-600/50 py-2 rounded-lg text-xs font-bold hover:bg-green-600 hover:text-white transition-colors">
                        Approve Withdrawals
                    </button>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
                    <h3 className="font-bold text-gray-300 mb-2 text-sm">User Wallet Control</h3>
                    <p className="text-xs text-gray-500 mb-3">Freeze fraudulent accounts</p>
                    <button className="w-full bg-red-600/20 text-red-500 border border-red-600/50 py-2 rounded-lg text-xs font-bold hover:bg-red-600 hover:text-white transition-colors">
                        Manage Frozen Accounts
                    </button>
                </div>
            </div>

            {/* Audit Log Table */}
            <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
                <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                    <h3 className="font-bold text-gray-200">System Transaction Log</h3>
                    <div className="flex space-x-2">
                        <button className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-gray-300">Export CSV</button>
                    </div>
                </div>
                <table className="w-full text-left text-sm text-gray-400">
                    <thead className="bg-gray-900/50 text-gray-500 font-bold uppercase text-xs">
                        <tr>
                            <th className="p-4">Ref ID</th>
                            <th className="p-4">Type</th>
                            <th className="p-4">User</th>
                            <th className="p-4">Amount</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {[1, 2, 3].map(i => (
                            <tr key={i} className="hover:bg-gray-700/50 transition-colors">
                                <td className="p-4 font-mono text-gray-300">TXN-8829{i}</td>
                                <td className="p-4">Escrow Release</td>
                                <td className="p-4 text-white">John Doe</td>
                                <td className="p-4 text-green-400">₦15,000</td>
                                <td className="p-4"><span className="bg-green-500/10 text-green-500 px-2 py-1 rounded text-xs font-bold">Completed</span></td>
                                <td className="p-4 text-right">
                                    <button className="text-gray-400 hover:text-white mr-2"><RotateCcw size={14}/></button>
                                    <button className="text-gray-400 hover:text-red-500"><Ban size={14}/></button>
                                </td>
                            </tr>
                        ))}
                         <tr className="hover:bg-gray-700/50 transition-colors bg-red-900/10">
                            <td className="p-4 font-mono text-gray-300">TXN-99120</td>
                            <td className="p-4">Withdrawal</td>
                            <td className="p-4 text-white">Suspect User</td>
                            <td className="p-4 text-red-400">₦500,000</td>
                            <td className="p-4"><span className="bg-red-500/10 text-red-500 px-2 py-1 rounded text-xs font-bold">Flagged</span></td>
                            <td className="p-4 text-right">
                                <button className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold hover:bg-red-700">Freeze</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const OverviewTab = () => (
    <>
    {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-800 p-5 rounded-2xl border border-gray-700 flex items-center justify-between">
            <div>
                 <p className="text-gray-400 text-xs font-bold uppercase">Total Users</p>
                 <h3 className="text-3xl font-bold text-white mt-1">12,847</h3>
                 <p className="text-green-500 text-xs mt-1">+127 this week</p>
            </div>
            <div className="bg-blue-500/10 p-3 rounded-xl text-blue-500"><Users size={24} /></div>
        </div>
        <div className="bg-gray-800 p-5 rounded-2xl border border-gray-700 flex items-center justify-between">
            <div>
                 <p className="text-gray-400 text-xs font-bold uppercase">Active Bookings</p>
                 <h3 className="text-3xl font-bold text-white mt-1">342</h3>
            </div>
            <div className="bg-purple-500/10 p-3 rounded-xl text-purple-500"><Activity size={24} /></div>
        </div>
        <div className="bg-gray-800 p-5 rounded-2xl border border-gray-700 flex items-center justify-between">
            <div>
                 <p className="text-gray-400 text-xs font-bold uppercase">Revenue</p>
                 <h3 className="text-3xl font-bold text-white mt-1">$246k</h3>
            </div>
            <div className="bg-green-500/10 p-3 rounded-xl text-green-500"><DollarSign size={24} /></div>
        </div>
      </div>

      {/* Action Alerts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Pending Approvals */}
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-5 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                  <div className="bg-yellow-500/20 p-3 rounded-full text-yellow-500">
                      <AlertTriangle size={24} />
                  </div>
                  <div>
                      <h4 className="text-yellow-500 font-bold text-lg">23 Pending Approvals</h4>
                      <p className="text-yellow-500/70 text-sm">New providers waiting for verification</p>
                  </div>
              </div>
              <button className="bg-yellow-500 text-black font-bold px-4 py-2 rounded-lg text-sm hover:bg-yellow-400 transition-colors">
                  Review
              </button>
          </div>

          {/* Open Disputes */}
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                  <div className="bg-red-500/20 p-3 rounded-full text-red-500">
                      <ShieldAlert size={24} />
                  </div>
                  <div>
                      <h4 className="text-red-500 font-bold text-lg">5 Open Disputes</h4>
                      <p className="text-red-500/70 text-sm">Requires immediate attention</p>
                  </div>
              </div>
              <button className="bg-red-500 text-white font-bold px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition-colors">
                  Handle
              </button>
          </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="md:col-span-2 bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h3 className="font-bold mb-4">Revenue Analytics</h3>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }}
                            itemStyle={{ color: '#fff' }}
                            cursor={{fill: '#374151'}}
                        />
                        <Bar dataKey="revenue" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Recent Activity / Queue */}
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold">Latest Signups</h3>
                <span className="text-blue-400 text-xs hover:underline cursor-pointer">View All</span>
            </div>
            
            <div className="space-y-4">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="flex items-center justify-between p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
                        <div className="flex items-center space-x-3">
                            <img src={`https://picsum.photos/50/50?random=${i+20}`} className="w-10 h-10 rounded-full bg-gray-700" />
                            <div>
                                <p className="font-bold text-sm text-gray-200">User #{8392 + i}</p>
                                <p className="text-xs text-gray-500">Applied 2m ago</p>
                            </div>
                        </div>
                        <div className="text-xs font-bold text-blue-400 bg-blue-400/10 px-2 py-1 rounded">Review</div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </>
)
