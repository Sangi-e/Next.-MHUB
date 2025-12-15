
import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, BadgeCheck, Wallet, Scale, 
  Trophy, Building2, FileText, Bell, Search, LogOut, 
  ChevronRight, ArrowUpRight, ArrowDownRight, Check, X, 
  AlertTriangle, Eye, ShieldAlert, Download, Lock, MapPin, 
  CreditCard, MessageSquare, Activity, UserX, UserCheck, Menu
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';

// --- Types & Mock Data ---

const REVENUE_DATA = [
  { name: 'Mon', income: 4500, payout: 2400 },
  { name: 'Tue', income: 5200, payout: 3100 },
  { name: 'Wed', income: 4800, payout: 2900 },
  { name: 'Thu', income: 7100, payout: 4500 },
  { name: 'Fri', income: 8500, payout: 5100 },
  { name: 'Sat', income: 9200, payout: 6000 },
  { name: 'Sun', income: 11000, payout: 7500 },
];

const JOB_SECTOR_DATA = [
  { name: 'Tech', value: 400 },
  { name: 'Artisan', value: 300 },
  { name: 'Domestic', value: 300 },
  { name: 'Transport', value: 200 },
];

const REGIONAL_JOBS_DATA = [
  { name: 'Lagos', jobs: 12450, growth: 12 },
  { name: 'Abuja', jobs: 8300, growth: 8 },
  { name: 'Aba', jobs: 6200, growth: 15 },
  { name: 'PHC', jobs: 4100, growth: 5 },
];

const VERIFICATION_QUEUE = [
  { id: 'v1', name: 'John Doe', type: 'Entrepreneur', docType: 'NIN', riskScore: 12, status: 'pending', date: '2 mins ago', avatar: 'https://picsum.photos/50/50?random=101' },
  { id: 'v2', name: 'Sarah Smith', type: 'Entrepreneur', docType: 'Passport', riskScore: 85, status: 'pending', date: '15 mins ago', avatar: 'https://picsum.photos/50/50?random=102' },
  { id: 'v3', name: 'Mike Johnson', type: 'Customer', docType: 'BVN', riskScore: 5, status: 'pending', date: '1 hour ago', avatar: 'https://picsum.photos/50/50?random=103' },
];

const WITHDRAWAL_REQUESTS = [
  { id: 'w1', user: 'Adeola J.', amount: 45000, bank: 'GTBank', account: '012***882', status: 'pending', risk: 'Low' },
  { id: 'w2', user: 'Musa Auto', amount: 125000, bank: 'Kuda', account: '202***991', status: 'flagged', risk: 'High' },
];

const DISPUTES = [
  { id: 'd1', bookingId: '#BK-9921', complainant: 'Chioma B.', defendant: 'John Fixer', reason: 'Job not completed', amount: 15000, status: 'open' },
  { id: 'd2', bookingId: '#BK-8812', complainant: 'David K.', defendant: 'Tech Solutions', reason: 'Unprofessional conduct', amount: 50000, status: 'investigating' },
];

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444'];

// --- Components ---

export const AdminDashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [activeModule, setActiveModule] = useState<'overview' | 'verification' | 'finance' | 'disputes' | 'gamification' | 'government'>('overview');
  const [selectedUser, setSelectedUser] = useState<any>(null); // For modals
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const SidebarItem = ({ id, icon: Icon, label, alert }: any) => (
    <button
      onClick={() => {
        setActiveModule(id);
        setIsSidebarOpen(false);
      }}
      className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-all mb-1 ${
        activeModule === id 
        ? 'bg-slate-800 text-white shadow-lg shadow-slate-900/20' 
        : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
      }`}
    >
      <div className="flex items-center">
        <Icon size={18} className={`mr-3 ${activeModule === id ? 'text-indigo-400' : 'text-slate-500'}`} />
        {label}
      </div>
      {alert && <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{alert}</span>}
    </button>
  );

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 font-sans overflow-hidden relative">
      
      {/* 1. Command Sidebar (Responsive) */}
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-slate-950 border-r border-slate-800 flex flex-col 
        transform transition-transform duration-300 ease-in-out
        md:translate-x-0 md:static md:flex
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 flex items-center justify-between border-b border-slate-800/50">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Lock size={16} className="text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white tracking-wide">NEXUS ADMIN</h1>
              <p className="text-[10px] text-indigo-400 font-mono">CEO CLEARANCE</p>
            </div>
          </div>
          {/* Close Button Mobile */}
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden text-slate-500 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Platform Control</p>
          <SidebarItem id="overview" icon={LayoutDashboard} label="Executive Overview" />
          <SidebarItem id="verification" icon={BadgeCheck} label="Verification Queue" alert="3" />
          <SidebarItem id="finance" icon={Wallet} label="Financial Oversight" alert="2" />
          <SidebarItem id="disputes" icon={Scale} label="Dispute Center" alert="1" />
          
          <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 mt-6">Growth & Policy</p>
          <SidebarItem id="gamification" icon={Trophy} label="Gamification Logic" />
          <SidebarItem id="government" icon={Building2} label="Gov. Analytics" />
        </div>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center px-4 py-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors text-sm font-bold"
          >
            <LogOut size={16} className="mr-2" /> Secure Logout
          </button>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <main className="flex-1 bg-slate-900 overflow-y-auto relative w-full">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 md:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            {/* Hamburger Mobile */}
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden mr-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
            >
              <Menu size={24} />
            </button>

            <div>
              <h2 className="text-lg md:text-xl font-bold text-white capitalize truncate">{activeModule.replace('-', ' ')}</h2>
              <p className="hidden md:flex text-xs text-slate-400 items-center mt-1">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                System Operational • Last Audit: 12s ago
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell size={20} className="text-slate-400 hover:text-white cursor-pointer" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </div>
            <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold border border-indigo-400">
              CEO
            </div>
          </div>
        </header>

        <div className="p-4 md:p-8 pb-24">
          {activeModule === 'overview' && <OverviewModule />}
          {activeModule === 'verification' && <VerificationModule onSelect={setSelectedUser} />}
          {activeModule === 'finance' && <FinancialModule />}
          {activeModule === 'disputes' && <DisputeModule />}
          {activeModule === 'gamification' && <GamificationModule />}
          {activeModule === 'government' && <GovernmentModule />}
        </div>
      </main>

      {/* 3. Global Modals (e.g. Verification Detail) */}
      {selectedUser && (
        <VerificationModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}

    </div>
  );
};

// --- SUB-MODULES ---

const OverviewModule = () => (
  <div className="space-y-6">
    {/* KPI Cards */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      <KPICard title="Total Users" value="12,847" sub="+127 today" icon={Users} color="text-blue-400" />
      <KPICard title="Active Escrow" value="₦45.2M" sub="Secured Funds" icon={Lock} color="text-emerald-400" />
      <KPICard title="Platform Revenue" value="₦8.4M" sub="+15% vs last week" icon={Activity} color="text-indigo-400" />
      <KPICard title="Fraud Alerts" value="3" sub="Requires Attention" icon={ShieldAlert} color="text-red-400" bg="bg-red-500/10 border-red-500/50" />
    </div>

    {/* Charts Row */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-slate-800 rounded-2xl p-4 md:p-6 border border-slate-700">
        <h3 className="text-sm font-bold text-slate-300 mb-6">Revenue Trajectory</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={REVENUE_DATA}>
              <defs>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
              <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
              <YAxis stroke="#9CA3AF" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#fff' }} />
              <Area type="monotone" dataKey="income" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-slate-800 rounded-2xl p-4 md:p-6 border border-slate-700 flex flex-col">
        <h3 className="text-sm font-bold text-slate-300 mb-6">Job Categories</h3>
        <div className="flex-1 min-h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={JOB_SECTOR_DATA}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {JOB_SECTOR_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {JOB_SECTOR_DATA.map((entry, index) => (
            <div key={index} className="flex items-center text-xs text-slate-400">
              <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
              {entry.name}
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Recent Audit Log */}
    <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-700 flex justify-between items-center">
        <h3 className="text-sm font-bold text-slate-300">Security Audit Log</h3>
        <button className="text-xs text-indigo-400 hover:text-indigo-300">View Full Log</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-400">
          <thead className="bg-slate-900/50 text-slate-500 font-bold uppercase">
            <tr>
              <th className="px-6 py-3">Time</th>
              <th className="px-6 py-3">Admin</th>
              <th className="px-6 py-3">Action</th>
              <th className="px-6 py-3">Target</th>
              <th className="px-6 py-3">IP Address</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {[1, 2, 3].map((i) => (
              <tr key={i} className="hover:bg-slate-700/30">
                <td className="px-6 py-3">10:4{i} AM</td>
                <td className="px-6 py-3 text-white">CEO_Main</td>
                <td className="px-6 py-3"><span className="bg-blue-500/10 text-blue-400 px-2 py-1 rounded">Approved Withdrawal</span></td>
                <td className="px-6 py-3">User #8821</td>
                <td className="px-6 py-3 font-mono">192.168.1.{i}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const VerificationModule = ({ onSelect }: { onSelect: (u: any) => void }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-bold text-white">Verification Queue</h3>
      <div className="flex space-x-2">
        <button className="bg-slate-800 text-slate-300 px-3 py-2 rounded-lg text-xs font-bold border border-slate-700 hover:bg-slate-700">Filters</button>
        <button className="bg-indigo-600 text-white px-3 py-2 rounded-lg text-xs font-bold hover:bg-indigo-700">Auto-Process</button>
      </div>
    </div>

    <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-400 min-w-[600px]">
          <thead className="bg-slate-900/50 text-slate-500 font-bold uppercase text-xs">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Document</th>
              <th className="px-6 py-4">Risk Score</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {VERIFICATION_QUEUE.map((item) => (
              <tr key={item.id} className="hover:bg-slate-700/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img src={item.avatar} className="w-8 h-8 rounded-full mr-3" />
                    <div>
                      <div className="font-bold text-white">{item.name}</div>
                      <div className="text-xs">{item.date}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">{item.type}</td>
                <td className="px-6 py-4 font-mono text-xs bg-slate-700/50 px-2 py-1 rounded w-fit">{item.docType}</td>
                <td className="px-6 py-4">
                  <div className={`flex items-center font-bold ${item.riskScore > 50 ? 'text-red-400' : 'text-green-400'}`}>
                    {item.riskScore > 50 ? <AlertTriangle size={14} className="mr-1" /> : <ShieldAlert size={14} className="mr-1" />}
                    {item.riskScore}/100
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded text-xs font-bold">Pending Review</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => onSelect(item)}
                    className="bg-slate-700 hover:bg-white hover:text-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                  >
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const FinancialModule = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase">Pending Withdrawals</p>
            <h3 className="text-2xl font-bold text-white mt-1">₦2.4M</h3>
          </div>
          <div className="bg-orange-500/10 p-2 rounded-lg text-orange-500"><ArrowUpRight size={20} /></div>
        </div>
        <div className="mt-4 w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
          <div className="bg-orange-500 h-full w-[45%]"></div>
        </div>
        <p className="text-xs text-slate-500 mt-2">12 requests awaiting approval</p>
      </div>
      
      <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase">Escrow Locked</p>
            <h3 className="text-2xl font-bold text-white mt-1">₦45.2M</h3>
          </div>
          <div className="bg-blue-500/10 p-2 rounded-lg text-blue-500"><Lock size={20} /></div>
        </div>
        <div className="mt-4 w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
          <div className="bg-blue-500 h-full w-[75%]"></div>
        </div>
        <p className="text-xs text-slate-500 mt-2">342 active jobs secured</p>
      </div>

      <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase">Commission Revenue</p>
            <h3 className="text-2xl font-bold text-white mt-1">₦8.4M</h3>
          </div>
          <div className="bg-green-500/10 p-2 rounded-lg text-green-500"><Wallet size={20} /></div>
        </div>
        <div className="mt-4 w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
          <div className="bg-green-500 h-full w-[12%]"></div>
        </div>
        <p className="text-xs text-slate-500 mt-2">This month so far</p>
      </div>
    </div>

    {/* Withdrawal Table */}
    <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-700 flex justify-between items-center">
        <h3 className="font-bold text-white">Withdrawal Requests</h3>
        <button className="text-xs bg-slate-700 px-3 py-1 rounded text-slate-300">Export CSV</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-400 min-w-[600px]">
          <thead className="bg-slate-900/50 text-slate-500 font-bold uppercase text-xs">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Destination</th>
              <th className="px-6 py-4">Risk</th>
              <th className="px-6 py-4 text-right">Decision</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {WITHDRAWAL_REQUESTS.map((req) => (
              <tr key={req.id} className={`hover:bg-slate-700/30 ${req.risk === 'High' ? 'bg-red-500/5' : ''}`}>
                <td className="px-6 py-4 font-bold text-white">{req.user}</td>
                <td className="px-6 py-4 font-mono text-white">₦{req.amount.toLocaleString()}</td>
                <td className="px-6 py-4 text-xs">
                  <div className="text-slate-300">{req.bank}</div>
                  <div className="text-slate-500 font-mono">{req.account}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${req.risk === 'High' ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
                    {req.risk} Risk
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button className="bg-green-600 text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-green-500">Approve</button>
                  <button className="bg-red-600 text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-red-500">Decline</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const DisputeModule = () => (
  <div className="space-y-6">
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        {DISPUTES.map(d => (
            <div key={d.id} className="bg-slate-800 rounded-xl p-5 border border-slate-700 flex-1 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>
                <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-mono text-slate-500">{d.bookingId}</span>
                    <span className="bg-orange-500/10 text-orange-500 px-2 py-0.5 rounded text-[10px] font-bold uppercase">{d.status}</span>
                </div>
                <h3 className="text-white font-bold text-lg mb-1">₦{d.amount.toLocaleString()}</h3>
                <p className="text-sm text-slate-400 mb-4">{d.reason}</p>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-4 bg-slate-900/50 p-2 rounded-lg">
                    <span>{d.complainant}</span>
                    <span className="text-red-500 font-bold">VS</span>
                    <span>{d.defendant}</span>
                </div>
                <div className="flex space-x-2">
                    <button className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded text-xs font-bold flex items-center justify-center">
                        <MessageSquare size={14} className="mr-2" /> Chats
                    </button>
                    <button className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded text-xs font-bold">
                        Resolve
                    </button>
                </div>
            </div>
        ))}
    </div>
  </div>
);

const GovernmentModule = () => (
  <div className="space-y-6">
    <div className="flex flex-col md:flex-row justify-between items-center bg-indigo-900/20 p-4 rounded-xl border border-indigo-500/30 gap-4">
        <div>
            <h2 className="text-indigo-400 font-bold text-lg">Government Reporting Portal</h2>
            <p className="text-xs text-indigo-300">Generate economic impact reports compliant with federal standards.</p>
        </div>
        <button className="w-full md:w-auto bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center justify-center hover:bg-indigo-500">
            <Download size={16} className="mr-2" /> Export Report (PDF)
        </button>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
            <h3 className="font-bold text-slate-300 mb-6 flex items-center"><MapPin size={16} className="mr-2" /> Jobs Created by Region</h3>
            <div className="space-y-4">
                {REGIONAL_JOBS_DATA.map((region, idx) => (
                    <div key={idx}>
                        <div className="flex justify-between text-xs mb-1">
                            <span className="text-white font-bold">{region.name}</span>
                            <span className="text-green-400">+{region.growth}% Growth</span>
                        </div>
                        <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                            <div className="bg-blue-500 h-full rounded-full" style={{ width: `${(region.jobs / 15000) * 100}%` }}></div>
                        </div>
                        <p className="text-right text-[10px] text-slate-500 mt-1">{region.jobs.toLocaleString()} Jobs</p>
                    </div>
                ))}
            </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
             <h3 className="font-bold text-slate-300 mb-6 flex items-center"><Building2 size={16} className="mr-2" /> Key Economic Indicators</h3>
             <div className="grid grid-cols-2 gap-4">
                 <div className="bg-slate-900 p-4 rounded-xl">
                     <p className="text-xs text-slate-500 uppercase">Youth Employment</p>
                     <h4 className="text-xl font-bold text-white mt-1">4,203</h4>
                     <p className="text-[10px] text-green-500 mt-1">Ages 18-25</p>
                 </div>
                 <div className="bg-slate-900 p-4 rounded-xl">
                     <p className="text-xs text-slate-500 uppercase">Avg. Hourly Wage</p>
                     <h4 className="text-xl font-bold text-white mt-1">₦3,500</h4>
                     <p className="text-[10px] text-green-500 mt-1">+12% vs Nat. Avg</p>
                 </div>
                 <div className="bg-slate-900 p-4 rounded-xl">
                     <p className="text-xs text-slate-500 uppercase">Taxable Income Generated</p>
                     <h4 className="text-xl font-bold text-white mt-1">₦245M</h4>
                     <p className="text-[10px] text-slate-500 mt-1">YTD Total</p>
                 </div>
                 <div className="bg-slate-900 p-4 rounded-xl">
                     <p className="text-xs text-slate-500 uppercase">Training Completed</p>
                     <h4 className="text-xl font-bold text-white mt-1">1,500 hrs</h4>
                     <p className="text-[10px] text-blue-500 mt-1">Skill Development</p>
                 </div>
             </div>
        </div>
    </div>
  </div>
);

const GamificationModule = () => (
    <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 text-center">
        <Trophy size={48} className="text-yellow-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white">Gamification Control Center</h2>
        <p className="text-slate-400 mt-2 max-w-md mx-auto">Adjust XP algorithms, leaderboard weighting, and visibility boosts for top performers.</p>
        <button className="mt-6 bg-slate-700 text-white px-6 py-2 rounded-lg font-bold hover:bg-slate-600">Access Configuration</button>
    </div>
);

// --- SHARED COMPONENTS ---

const KPICard = ({ title, value, sub, icon: Icon, color, bg = "bg-slate-800 border-slate-700" }: any) => (
  <div className={`${bg} p-4 md:p-5 rounded-2xl border flex items-center justify-between`}>
    <div>
      <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{title}</p>
      <h3 className="text-xl md:text-2xl font-bold text-white mt-1">{value}</h3>
      <p className={`text-[10px] md:text-xs mt-1 ${color}`}>{sub}</p>
    </div>
    <div className={`p-3 rounded-xl bg-slate-900 ${color} hidden md:block`}>
      <Icon size={24} />
    </div>
  </div>
);

const VerificationModal = ({ user, onClose }: { user: any, onClose: () => void }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
    <div className="bg-slate-900 w-full max-w-4xl rounded-2xl border border-slate-700 shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[90vh]">
      
      {/* Sidebar Info */}
      <div className="w-full md:w-1/3 bg-slate-950 p-6 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col">
        <div className="flex flex-col items-center text-center mb-6">
          <img src={user.avatar} className="w-24 h-24 rounded-full border-4 border-slate-800 mb-3" />
          <h2 className="text-xl font-bold text-white">{user.name}</h2>
          <span className="text-indigo-400 text-xs uppercase font-bold tracking-wider mt-1">{user.type} Applicant</span>
        </div>
        
        <div className="space-y-4 flex-1">
          <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
            <p className="text-[10px] text-slate-500 uppercase">Risk Score</p>
            <div className={`text-xl font-bold flex items-center ${user.riskScore > 50 ? 'text-red-500' : 'text-green-500'}`}>
              <Activity size={20} className="mr-2" /> {user.riskScore}/100
            </div>
          </div>
          <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
            <p className="text-[10px] text-slate-500 uppercase">Document Type</p>
            <div className="text-sm font-bold text-white">{user.docType}</div>
          </div>
          <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
            <p className="text-[10px] text-slate-500 uppercase">Applied</p>
            <div className="text-sm font-bold text-white">{user.date}</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 flex flex-col overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-white flex items-center"><FileText size={20} className="mr-2 text-indigo-500"/> Document Review</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-white"><X size={24} /></button>
        </div>

        <div className="flex-1 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center relative group min-h-[300px]">
           {/* Mock Document View */}
           <div className="text-slate-600 flex flex-col items-center">
              <CreditCard size={64} className="mb-4 opacity-20" />
              <p className="font-mono text-sm">SECURE DOCUMENT VIEWER</p>
              <p className="text-xs mt-2 text-slate-700">Watermarked for CEO Review</p>
           </div>
           <div className="absolute top-4 right-4 bg-green-500/20 text-green-500 px-3 py-1 rounded-full text-xs font-bold border border-green-500/50 flex items-center">
              <Check size={12} className="mr-1" /> Face Match Verified
           </div>
        </div>

        <div className="pt-6 flex space-x-4">
          <button onClick={onClose} className="flex-1 bg-red-500/10 text-red-500 border border-red-500/50 py-3 rounded-xl font-bold hover:bg-red-500 hover:text-white transition-all flex items-center justify-center">
            <UserX size={18} className="mr-2" /> Reject Application
          </button>
          <button onClick={onClose} className="flex-1 bg-green-500 text-white py-3 rounded-xl font-bold shadow-lg shadow-green-900/20 hover:bg-green-600 transition-all flex items-center justify-center">
            <UserCheck size={18} className="mr-2" /> Approve & Verify
          </button>
        </div>
      </div>

    </div>
  </div>
);
