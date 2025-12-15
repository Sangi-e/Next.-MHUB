
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Star, Filter, Heart, Globe, Bell, Laptop, Palette, Shirt, Wrench, Hammer, ShoppingCart, Trophy, Crown, ShieldCheck, DollarSign, Activity, Eye, Clock, ChevronRight, Briefcase, Zap, Calendar, MessageSquare, Wallet, Lock, Shield, Search as SearchIcon, X, Video, Image as ImageIcon, Flame, TrendingUp, Check, Circle, AlertCircle } from 'lucide-react';
import { Service, BadgeType, UserRole } from '../types';

// --- Types ---
interface HomeProps {
  role: UserRole;
}

// --- Mock Data for Customers ---
export const MOCK_SERVICES: Service[] = [
  {
    id: '1',
    providerId: 'p1',
    providerName: 'Adeola Johnson',
    providerAvatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=150&q=80',
    title: 'Professional Plumbing & Repair',
    description: 'Expert leak fixing and pipe installation. 10 years experience.',
    price: 5000,
    rating: 4.8,
    reviewsCount: 124,
    category: 'Home Services',
    image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80',
    portfolio: [
        'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80'
    ],
    location: { lat: 6.5244, lng: 3.3792, address: 'Lagos, NG' },
    isOnline: false,
    distance: '2.3 km',
    hourlyRate: 4500,
    gamificationScore: 342,
    badges: ['Top Rated', 'Verified'],
    level: 'Platinum',
    activity: { viewsThisWeek: 450, bookingsToday: 2, lastActive: '10m ago' }
  },
  {
    id: '3',
    providerId: 'p3',
    providerName: 'Musa Auto',
    providerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    title: 'Mobile Mechanic - Brake Specialist',
    description: 'I come to you. Specialized in Toyota and Honda.',
    price: 8000,
    rating: 4.5,
    reviewsCount: 42,
    category: 'Mechanics',
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
    portfolio: [
        'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=400&q=80'
    ],
    location: { lat: 6.5300, lng: 3.3800, address: 'Yaba, Lagos' },
    isOnline: false,
    distance: '1.8 km',
    hourlyRate: 8000,
    gamificationScore: 285,
    badges: ['Trending'],
    level: 'Gold',
    activity: { viewsThisWeek: 210, bookingsToday: 1, lastActive: '2h ago' }
  },
  {
    id: '5',
    providerId: 'p5',
    providerName: 'David Cuts',
    providerAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
    title: 'Premium Men\'s Haircut & Grooming',
    description: 'Home service luxury haircut, beard trim, and facial treatment.',
    price: 6000,
    rating: 4.9,
    reviewsCount: 92,
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=800&q=80',
    portfolio: [
        'https://images.unsplash.com/photo-1503951914205-b27cfca5630e?auto=format&fit=crop&w=400&q=80'
    ],
    location: { lat: 6.4500, lng: 3.4000, address: 'VI, Lagos' },
    isOnline: false,
    distance: '5.0 km',
    hourlyRate: 6000,
    gamificationScore: 300,
    badges: ['Top Rated', 'Trending'],
    level: 'Gold',
    activity: { viewsThisWeek: 350, bookingsToday: 6, lastActive: '5m ago' }
  }
];

const CATEGORIES_DATA = [
  { id: '1', name: 'Digital Services', count: 234, icon: Laptop, color: 'text-blue-500', bg: 'bg-blue-50' },
  { id: '2', name: 'Artisans', count: 156, icon: Palette, color: 'text-pink-500', bg: 'bg-pink-50' },
  { id: '3', name: 'Tailors', count: 89, icon: Shirt, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { id: '4', name: 'Mechanics', count: 112, icon: Wrench, color: 'text-slate-500', bg: 'bg-slate-100' },
  { id: '5', name: 'Repair', count: 145, icon: Hammer, color: 'text-orange-700', bg: 'bg-orange-50' },
  { id: '6', name: 'Vendors', count: 267, icon: ShoppingCart, color: 'text-emerald-500', bg: 'bg-emerald-50' },
];

const SORTED_SERVICES = [...MOCK_SERVICES].sort((a, b) => (b.gamificationScore || 0) - (a.gamificationScore || 0));

// --- Components ---

const EntrepreneurHome: React.FC = () => {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(true);

  // Mock Data for Dashboard State
  const stats = {
      level: 'Gold',
      progress: 75,
      balance: 85000,
      escrow: 25000,
      today: {
          jobs: 2,
          requests: 3,
          messages: 5
      }
  };

  return (
    <div className="p-4 space-y-5 bg-gray-50 min-h-screen pb-24">
      {/* 1. Header (Existing + Status) */}
      <div className="flex justify-between items-center pt-2">
        <div className="flex items-center space-x-3">
          <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=150&q=80" className="w-12 h-12 rounded-full border-2 border-white shadow-sm" alt="Profile" />
          <div>
            <h2 className="text-lg font-bold text-slate-800">Hi, Emmanuel</h2>
            <div className="flex items-center space-x-2">
              <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
              <span className="text-xs text-gray-500">{isOnline ? 'Online' : 'Offline'}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
             <div onClick={() => setIsOnline(!isOnline)} className={`relative w-12 h-7 rounded-full transition-colors cursor-pointer ${isOnline ? 'bg-green-500' : 'bg-gray-300'}`}>
                <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${isOnline ? 'left-6' : 'left-1'}`}></div>
             </div>
             <div onClick={() => navigate('/notifications')} className="p-2 bg-white rounded-full shadow-sm cursor-pointer relative">
                <Bell size={20} className="text-gray-600" />
                <div className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></div>
             </div>
        </div>
      </div>

      {/* 1.5. Action Required (New) */}
      <div 
        onClick={() => navigate('/bookings')}
        className="bg-white rounded-xl p-4 border border-orange-100 shadow-sm relative overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
      >
        <div className="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-bold text-slate-800 flex items-center">
              <AlertCircle size={14} className="mr-1.5 text-orange-500" /> Action Required
            </h3>
            <p className="text-xs text-gray-600 mt-1 font-medium">New booking request from Sarah J.</p>
          </div>
          <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-1 rounded-full animate-pulse">Urgent</span>
        </div>
        <div className="mt-3 flex items-center justify-between">
           <div className="text-[10px] text-slate-500 font-medium flex items-center bg-gray-50 px-2 py-1 rounded">
             <Clock size={10} className="inline mr-1"/> Expires in 1h 45m
           </div>
           <button className="bg-orange-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold shadow-sm hover:bg-orange-700">Review</button>
        </div>
      </div>

      {/* 2. Gamification / Level Strip (Enhanced) */}
      <div className="space-y-3">
        <div onClick={() => navigate('/leaderboard')} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between cursor-pointer active:scale-[0.98]">
            <div className="flex items-center space-x-3 flex-1">
                <div className="bg-yellow-100 p-2 rounded-lg text-yellow-700">
                    <Trophy size={18} />
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">Gold Provider</span>
                        <span className="text-[10px] text-gray-500 font-mono">2,450 / 3,500 XP</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-500 w-3/4 rounded-full"></div>
                    </div>
                </div>
            </div>
            <ChevronRight size={16} className="text-gray-300 ml-2" />
        </div>

        {/* Gamification Action Steps (New) */}
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Next Level Goals (Platinum)</h3>
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-slate-700 font-medium">
                        <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-2 flex-shrink-0"><Check size={10} strokeWidth={3}/></div>
                        Complete 30 Jobs
                    </div>
                    <span className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">Done</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-slate-700 font-medium">
                        <div className="w-5 h-5 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mr-2 flex-shrink-0 border border-gray-200"><Circle size={10} /></div>
                        Earn ₦500k Total
                    </div>
                    <span className="text-[10px] text-slate-500">₦340k / 500k</span>
                </div>
                <div className="w-full bg-gray-50 h-1 rounded-full ml-7 w-[calc(100%-1.75rem)]">
                     <div className="bg-indigo-500 h-1 rounded-full" style={{width: '68%'}}></div>
                </div>
            </div>
        </div>
      </div>

      {/* 3. Wallet Card (Enhanced) */}
      <div className="bg-slate-900 rounded-2xl p-5 text-white shadow-xl relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
        
        <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-slate-400 text-xs font-medium flex items-center">
                        Available Balance <Eye size={12} className="ml-2 opacity-50"/>
                    </p>
                    <h1 className="text-3xl font-bold mt-1">₦ {stats.balance.toLocaleString()}</h1>
                </div>
                <div className="bg-slate-800 p-2 rounded-lg border border-slate-700">
                    <Wallet size={20} className="text-indigo-400" />
                </div>
            </div>

            <div className="flex items-center space-x-2 text-xs text-indigo-200 mb-6 bg-slate-800/50 w-fit px-3 py-1.5 rounded-lg border border-slate-700/50">
                <Lock size={12} />
                <span>₦{stats.escrow.toLocaleString()} in Escrow (Pending)</span>
            </div>

            <div className="flex space-x-3">
                <button onClick={() => navigate('/wallet')} className="flex-1 bg-white text-slate-900 py-2.5 rounded-xl text-xs font-bold hover:bg-gray-100 transition-colors shadow-lg shadow-white/10">
                    Withdraw
                </button>
                <button onClick={() => navigate('/transactions')} className="flex-1 bg-slate-800 text-white border border-slate-700 py-2.5 rounded-xl text-xs font-bold hover:bg-slate-700 transition-colors">
                    History
                </button>
            </div>
        </div>
      </div>

      {/* 4. Visibility & Growth (New) */}
      <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">Performance</h3>
          <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
                  <div>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wide">Profile Views</p>
                      <h4 className="text-xl font-bold text-slate-800 mt-1">1,204</h4>
                  </div>
                  <span className="text-[10px] text-green-600 bg-green-50 px-2 py-1 rounded-full w-fit flex items-center mt-2 font-medium">
                      <TrendingUp size={10} className="mr-1"/> +12% this week
                  </span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
                  <div>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wide">Search Hits</p>
                      <h4 className="text-xl font-bold text-slate-800 mt-1">45</h4>
                  </div>
                  <button className="text-[10px] text-white bg-indigo-600 px-2 py-1.5 rounded-lg w-full mt-2 font-bold hover:bg-indigo-700 flex items-center justify-center">
                      Boost Profile <Zap size={10} className="ml-1 fill-white" />
                  </button>
              </div>
          </div>
      </div>

      {/* 5. Daily Overview */}
      <div>
          <h3 className="text-sm font-bold text-slate-700 mb-3 px-1">Today's Overview</h3>
          <div className="grid grid-cols-3 gap-3">
              <div 
                className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center cursor-pointer hover:border-indigo-200 transition-colors active:scale-[0.98]" 
                onClick={() => navigate('/bookings')}
              >
                  <div className="bg-orange-50 text-orange-600 p-2 rounded-full mb-1">
                      <Briefcase size={18} />
                  </div>
                  <span className="text-lg font-bold text-slate-800">{stats.today.requests}</span>
                  <span className="text-[10px] text-gray-500 font-medium leading-tight">Pending<br/>Orders</span>
              </div>
              <div 
                className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center cursor-pointer hover:border-indigo-200 transition-colors active:scale-[0.98]" 
                onClick={() => navigate('/bookings')}
              >
                  <div className="bg-blue-50 text-blue-600 p-2 rounded-full mb-1">
                      <Calendar size={18} />
                  </div>
                  <span className="text-lg font-bold text-slate-800">{stats.today.jobs}</span>
                  <span className="text-[10px] text-gray-500 font-medium leading-tight">Jobs<br/>Today</span>
              </div>
              <div 
                className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center cursor-pointer hover:border-indigo-200 transition-colors active:scale-[0.98]" 
                onClick={() => navigate('/chat')}
              >
                  <div className="bg-purple-50 text-purple-600 p-2 rounded-full mb-1">
                      <MessageSquare size={18} />
                  </div>
                  <span className="text-lg font-bold text-slate-800">{stats.today.messages}</span>
                  <span className="text-[10px] text-gray-500 font-medium leading-tight">New<br/>Messages</span>
              </div>
          </div>
      </div>

      {/* 6. Suggested Opportunities (New) */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-sm text-blue-900 flex items-center">
                  <Zap size={14} className="mr-1.5 text-yellow-500 fill-yellow-500"/> Opportunity Radar
              </h3>
              <span className="text-[10px] bg-white text-blue-600 px-2 py-0.5 rounded-full border border-blue-100 font-bold">New</span>
          </div>
          <p className="text-xs text-blue-800/80 mb-3 leading-relaxed">
              High demand detected for <b>Plumbing Repairs</b> in <b>Ikeja</b> area right now. Prices are surging.
          </p>
          <button className="w-full bg-white text-blue-600 border border-blue-200 py-2.5 rounded-xl text-xs font-bold shadow-sm hover:bg-blue-50">
              View 12 Open Jobs Nearby
          </button>
      </div>

      {/* 7. Recent Activity Timeline (New) */}
      <div>
          <div className="flex justify-between items-center mb-3 px-1">
              <h3 className="text-sm font-bold text-slate-700">Recent Activity</h3>
              <button className="text-[10px] font-bold text-indigo-600">View All</button>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
              {[
                  { icon: Wallet, color: 'text-green-600', bg: 'bg-green-100', text: 'Payment released for Job #8821', time: '2h ago', amount: '+₦15,000' },
                  { icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-100', text: 'Received 5-star review from Chioma', time: '5h ago', amount: '' },
                  { icon: MessageSquare, color: 'text-purple-600', bg: 'bg-purple-100', text: 'New inquiry regarding Pipe Fix', time: '1d ago', amount: '' },
              ].map((item, i) => (
                  <div key={i} className="p-3 flex items-center">
                      <div className={`w-8 h-8 rounded-full ${item.bg} ${item.color} flex items-center justify-center mr-3 flex-shrink-0`}>
                          <item.icon size={14} />
                      </div>
                      <div className="flex-1 min-w-0">
                          <p className="text-xs text-slate-700 font-medium truncate">{item.text}</p>
                          <p className="text-[10px] text-gray-400">{item.time}</p>
                      </div>
                      {item.amount && <span className="text-xs font-bold text-green-600 ml-2">{item.amount}</span>}
                  </div>
              ))}
          </div>
      </div>

      {/* 8. Trust Reminder (New) */}
      <div className="flex items-center justify-center space-x-2 text-[10px] text-gray-400 py-4 bg-gray-50 rounded-lg">
          <ShieldCheck size={12} className="text-gray-400" />
          <span>Payments secured by Handy Escrow & Trust System</span>
      </div>
    </div>
  );
};

const CustomerHome: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'For You' | 'Explore'>('For You');
  const [searchQuery, setSearchQuery] = useState('');
  const [scopeFilter, setScopeFilter] = useState<'All' | 'Nearby' | 'Remote'>('All');

  // Filter Services
  const filteredServices = useMemo(() => {
      return SORTED_SERVICES.filter(service => {
          const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                service.providerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                service.category.toLowerCase().includes(searchQuery.toLowerCase());
          
          let matchesScope = true;
          if (scopeFilter === 'Nearby') matchesScope = !service.isOnline; // Physical services
          if (scopeFilter === 'Remote') matchesScope = service.isOnline; // Digital services

          return matchesSearch && matchesScope;
      });
  }, [searchQuery, scopeFilter]);

  return (
    <div className="p-4 space-y-4 bg-gray-50 min-h-screen pb-24">
      {/* Header */}
      <div className="flex justify-between items-center pt-2 pb-2 sticky top-0 bg-gray-50 z-20">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center">
            Hello, Divine <span className="ml-2 text-2xl">👋</span>
          </h2>
          <p className="text-xs text-gray-500">Find the perfect service today</p>
        </div>
        <div className="flex items-center space-x-2">
             <div 
               onClick={() => navigate('/notifications')}
               className="relative p-2 bg-white rounded-full shadow-sm cursor-pointer hover:bg-gray-100 transition-colors"
             >
                <Bell size={20} className="text-gray-600" />
                <div className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></div>
             </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search services, skills, or providers..." 
          className="w-full pl-10 pr-10 py-3.5 rounded-xl border-none shadow-sm bg-white text-slate-800 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
        />
        <div className="absolute left-3 top-3.5 text-gray-400">
           <SearchIcon size={20} />
        </div>
      </div>

      {/* Navigation Tabs (Sticky) */}
      <div className="sticky top-16 bg-gray-50 pt-2 pb-2 z-20 flex items-center justify-between">
          <div className="flex space-x-4">
              {['For You', 'Explore'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`text-sm font-bold pb-1 transition-colors relative ${activeTab === tab ? 'text-slate-900' : 'text-gray-400'}`}
                  >
                      {tab}
                      {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full"></div>}
                  </button>
              ))}
          </div>
          
          {/* Scope Filter */}
          <div className="flex bg-white p-1 rounded-lg shadow-sm">
               <button onClick={() => setScopeFilter(scopeFilter === 'Nearby' ? 'All' : 'Nearby')} className={`p-1.5 rounded-md ${scopeFilter === 'Nearby' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400'}`}>
                   <MapPin size={16} />
               </button>
               <button onClick={() => setScopeFilter(scopeFilter === 'Remote' ? 'All' : 'Remote')} className={`p-1.5 rounded-md ${scopeFilter === 'Remote' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}>
                   <Globe size={16} />
               </button>
          </div>
      </div>

      {/* Content Area */}
      {activeTab === 'For You' ? (
          <div className="space-y-4">
              {filteredServices.map((service) => (
                  <ForYouCard key={service.id} service={service} />
              ))}
              {filteredServices.length === 0 && (
                  <div className="text-center py-20 text-gray-400">No services found matching your filters.</div>
              )}
          </div>
      ) : (
          <div className="grid grid-cols-2 gap-3">
              {filteredServices.map((service) => (
                  <ExploreGridItem key={service.id} service={service} />
              ))}
              {filteredServices.length === 0 && (
                  <div className="col-span-2 text-center py-20 text-gray-400">No services found.</div>
              )}
          </div>
      )}
    </div>
  );
};

// --- Sub-Components ---

const ForYouCard: React.FC<{ service: Service }> = ({ service }) => {
    const navigate = useNavigate();
    const isGoldOrHigher = service.level === 'Gold' || service.level === 'Platinum';

    return (
        <div 
            onClick={() => navigate(`/service/${service.id}`)}
            className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex gap-3 h-32 cursor-pointer active:scale-[0.98] transition-transform"
        >
            {/* Image */}
            <div className="w-28 h-full flex-shrink-0 relative">
                <img src={service.image} className="w-full h-full object-cover rounded-xl" alt={service.title} />
                {service.badges?.includes('Trending') && (
                    <div className="absolute top-1 left-1 bg-red-500/90 backdrop-blur text-white text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center">
                        <Flame size={8} className="mr-0.5" /> Hot
                    </div>
                )}
            </div>
            
            {/* Content */}
            <div className="flex-1 flex flex-col relative min-w-0">
                <div className="flex justify-between items-start">
                    <h3 className="text-sm font-bold text-slate-900 leading-tight line-clamp-2 pr-4">{service.title}</h3>
                    <button className="text-gray-300 hover:text-pink-500 transition-colors absolute top-0 right-0 p-1 -mr-1 -mt-1"><Heart size={16}/></button>
                </div>
                
                <div className="flex items-center mt-1 space-x-1">
                    <Star size={12} className="text-yellow-400 fill-current"/>
                    <span className="text-xs font-bold text-slate-700">{service.rating}</span>
                    <span className="text-xs text-gray-400">({service.reviewsCount})</span>
                </div>

                {/* Spacer */}
                <div className="flex-1"></div>

                <div className="flex justify-between items-end mt-1">
                    <div className="min-w-0">
                        <div className="flex items-center space-x-1.5 mb-1">
                            <img src={service.providerAvatar} className="w-4 h-4 rounded-full object-cover" />
                            <span className="text-[10px] text-gray-500 truncate max-w-[80px]">{service.providerName}</span>
                        </div>
                        <p className="text-sm font-bold text-indigo-600">₦{service.price.toLocaleString()}</p>
                    </div>
                    <button 
                        onClick={(e) => { e.stopPropagation(); navigate(`/service/${service.id}`); }}
                        className="bg-slate-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors shadow-sm"
                    >
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    );
};

const ExploreGridItem: React.FC<{ service: Service }> = ({ service }) => {
    const navigate = useNavigate();
    // Use portfolio images if available, else main image
    const displayImage = service.portfolio && service.portfolio.length > 0 ? service.portfolio[0] : service.image;

    return (
        <div 
            onClick={() => navigate(`/service/${service.id}`)}
            className="flex flex-col gap-2 cursor-pointer group"
        >
            <div className="relative rounded-xl overflow-hidden aspect-[3/4]">
                <img src={displayImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <button className="absolute top-2 right-2 p-1.5 bg-black/20 backdrop-blur-sm rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart size={14} />
                </button>
                <div className="absolute bottom-2 left-2 right-2 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                     <p className="font-bold text-sm">₦{service.price.toLocaleString()}</p>
                </div>
            </div>
            <div>
                <h4 className="font-bold text-xs text-slate-800 line-clamp-1">{service.title}</h4>
                <div className="flex items-center space-x-1 mt-0.5">
                    <img src={service.providerAvatar} className="w-4 h-4 rounded-full" />
                    <span className="text-[10px] text-gray-500 truncate">{service.providerName}</span>
                </div>
            </div>
        </div>
    );
};

// --- Main Wrapper Component ---

export const Home: React.FC<HomeProps> = ({ role }) => {
  if (role === 'entrepreneur') {
    return <EntrepreneurHome />;
  }
  return <CustomerHome />;
};
