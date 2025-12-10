
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Star, Filter, Heart, Globe, Bell, Laptop, Palette, Shirt, Wrench, Hammer, ShoppingCart, Trophy, Crown, ShieldCheck, DollarSign, Activity, Eye, Clock, ChevronRight, Briefcase } from 'lucide-react';
import { Service, BadgeType, UserRole } from '../types';

// --- Types ---
interface HomeProps {
  role: UserRole;
}

// --- Mock Data for Customers ---
const MOCK_SERVICES: Service[] = [
  {
    id: '1',
    providerId: 'p1',
    providerName: 'Adeola Johnson',
    providerAvatar: 'https://picsum.photos/100/100?random=1',
    title: 'Professional Plumbing & Repair',
    description: 'Expert leak fixing and pipe installation. 10 years experience.',
    price: 5000,
    rating: 4.8,
    reviewsCount: 124,
    category: 'Home Services',
    image: 'https://picsum.photos/400/300?random=1',
    location: { lat: 6.5244, lng: 3.3792, address: 'Lagos, NG' },
    isOnline: false,
    distance: '2.3 km',
    hourlyRate: 4500,
    gamificationScore: 342,
    badges: ['Top Rated', 'Verified'],
    level: 'Platinum'
  },
  {
    id: '2',
    providerId: 'p2',
    providerName: 'Sarah Tech',
    providerAvatar: 'https://picsum.photos/100/100?random=2',
    title: 'Modern Logo Design & Branding',
    description: 'I will create a stunning logo for your business in 24 hours.',
    price: 15000,
    rating: 5.0,
    reviewsCount: 89,
    category: 'Digital Services',
    image: 'https://picsum.photos/400/300?random=2',
    location: { lat: 0, lng: 0, address: 'Global' },
    isOnline: true,
    hourlyRate: 15000,
    gamificationScore: 310,
    badges: ['Fast Responder'],
    level: 'Gold'
  },
  {
    id: '3',
    providerId: 'p3',
    providerName: 'Musa Auto',
    providerAvatar: 'https://picsum.photos/100/100?random=3',
    title: 'Mobile Mechanic - Brake Specialist',
    description: 'I come to you. Specialized in Toyota and Honda.',
    price: 8000,
    rating: 4.5,
    reviewsCount: 42,
    category: 'Mechanics',
    image: 'https://picsum.photos/400/300?random=3',
    location: { lat: 6.5300, lng: 3.3800, address: 'Yaba, Lagos' },
    isOnline: false,
    distance: '1.8 km',
    hourlyRate: 8000,
    gamificationScore: 285,
    badges: ['Trending'],
    level: 'Gold'
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

  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center pt-2">
        <div className="flex items-center space-x-3">
          <img src="https://picsum.photos/150/150?random=88" className="w-12 h-12 rounded-full border-2 border-white shadow-sm" alt="Profile" />
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

      {/* Wallet Summary Card */}
      <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
        <div className="relative z-10">
          <p className="text-slate-400 text-xs font-medium mb-1">Available for Withdrawal</p>
          <div className="flex justify-between items-end">
             <h1 className="text-3xl font-bold">₦ 85,000</h1>
             <button onClick={() => navigate('/wallet')} className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2 rounded-lg border border-white/10 backdrop-blur-sm transition-colors">
                Wallet
             </button>
          </div>
          <div className="mt-4 flex space-x-6">
             <div>
                <span className="text-green-400 text-sm font-bold flex items-center"><Activity size={14} className="mr-1"/> +12%</span>
                <span className="text-[10px] text-slate-400">vs last week</span>
             </div>
             <div>
                <span className="text-blue-400 text-sm font-bold flex items-center"><Clock size={14} className="mr-1"/> 12h</span>
                <span className="text-[10px] text-slate-400">Avg Response</span>
             </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
         <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
             <div className="bg-blue-50 text-blue-600 p-2 rounded-full mb-2">
                 <Briefcase size={20} />
             </div>
             <span className="text-lg font-bold text-slate-800">3</span>
             <span className="text-[10px] text-gray-500 font-medium">Active Jobs</span>
         </div>
         <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
             <div className="bg-yellow-50 text-yellow-600 p-2 rounded-full mb-2">
                 <Star size={20} />
             </div>
             <span className="text-lg font-bold text-slate-800">4.9</span>
             <span className="text-[10px] text-gray-500 font-medium">Rating</span>
         </div>
         <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
             <div className="bg-purple-50 text-purple-600 p-2 rounded-full mb-2">
                 <Eye size={20} />
             </div>
             <span className="text-lg font-bold text-slate-800">142</span>
             <span className="text-[10px] text-gray-500 font-medium">Profile Views</span>
         </div>
      </div>

      {/* Action Items (To-Do) */}
      <div>
         <h3 className="font-bold text-slate-800 mb-3 px-1">Action Required</h3>
         <div className="space-y-3">
             <div onClick={() => navigate('/bookings')} className="bg-white p-4 rounded-xl border-l-4 border-orange-500 shadow-sm flex justify-between items-center cursor-pointer hover:bg-gray-50">
                 <div>
                    <h4 className="font-bold text-sm text-slate-800">Confirm Booking Request</h4>
                    <p className="text-xs text-gray-500">From Sarah for "Pipe Repair" • 10 mins ago</p>
                 </div>
                 <ChevronRight size={18} className="text-gray-300" />
             </div>
             <div onClick={() => navigate('/chat')} className="bg-white p-4 rounded-xl border-l-4 border-blue-500 shadow-sm flex justify-between items-center cursor-pointer hover:bg-gray-50">
                 <div>
                    <h4 className="font-bold text-sm text-slate-800">2 Unread Messages</h4>
                    <p className="text-xs text-gray-500">New inquiry from John Doe</p>
                 </div>
                 <ChevronRight size={18} className="text-gray-300" />
             </div>
         </div>
      </div>

       {/* Growth/Gamification Banner */}
       <div 
        onClick={() => navigate('/leaderboard')}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-4 text-white shadow-lg relative overflow-hidden"
       >
          <div className="flex items-center space-x-3 relative z-10">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
                 <Trophy size={20} className="text-yellow-300" />
              </div>
              <div>
                  <h3 className="font-bold text-sm">You're ranked #12 locally!</h3>
                  <p className="text-xs text-indigo-100">Complete 2 more jobs to reach Top 10.</p>
              </div>
          </div>
      </div>
    </div>
  );
};

const CustomerHome: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  return (
    <div className="p-4 space-y-4 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center pt-2 pb-2">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center">
            Hello, Divine <span className="ml-2 text-2xl">👋</span>
          </h2>
          <p className="text-xs text-gray-500">Find the perfect service today</p>
        </div>
        <div className="flex items-center space-x-2">
             <div 
               onClick={() => navigate('/notifications')}
               className="relative p-2 bg-white rounded-full shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
             >
                <Bell size={20} className="text-gray-600" />
                <div className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></div>
             </div>
             <div className="p-2 bg-white rounded-full shadow-sm cursor-pointer hover:bg-gray-50">
                <Globe size={20} className="text-gray-600" />
             </div>
        </div>
      </div>

      {/* Monthly Award Banner - Linked to Leaderboard */}
      <div 
        onClick={() => navigate('/leaderboard')}
        className="bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-2xl p-4 text-white shadow-lg relative overflow-hidden cursor-pointer active:scale-[0.98] transition-transform group"
      >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
          <div className="flex items-center space-x-4 relative z-10">
              <div className="relative">
                 <img src="https://picsum.photos/100/100?random=1" className="w-14 h-14 rounded-full border-2 border-white shadow-md" />
                 <div className="absolute -top-3 -right-2 text-2xl animate-bounce">👑</div>
              </div>
              <div>
                  <h3 className="font-bold text-sm uppercase text-yellow-100 tracking-wider">Entrepreneur of the Month</h3>
                  <p className="font-bold text-lg">Adeola Johnson</p>
                  <div className="flex items-center text-xs text-yellow-100 mt-1">
                      <Star size={12} className="fill-white text-white mr-1" /> 5.0 Rating • 120 Jobs
                  </div>
              </div>
          </div>
          <div className="absolute bottom-2 right-4 flex items-center text-[10px] font-bold bg-white/20 px-2 py-1 rounded backdrop-blur-sm group-hover:bg-white/30 transition-colors">
             View Leaderboard <Trophy size={10} className="ml-1" />
          </div>
      </div>

      {/* Search Bar */}
      <div className="relative mt-4">
        <input 
          type="text" 
          placeholder="Search services, skills, or providers..." 
          className="w-full pl-10 pr-10 py-3.5 rounded-xl border-none shadow-sm bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
        />
        <div className="absolute left-3 top-3.5 text-gray-400">
           {/* Search Icon */}
           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </div>
         <div className="absolute right-3 top-3 text-gray-400 cursor-pointer">
          <Filter size={20} />
        </div>
      </div>

      {/* Categories Grid */}
      <div>
         <div className="flex justify-between items-center mb-3 mt-4">
             <h3 className="font-bold text-slate-800 text-lg">Categories</h3>
             <button className="text-green-500 text-sm font-medium">See All</button>
         </div>
         <div className="grid grid-cols-3 gap-3">
            {CATEGORIES_DATA.map((cat) => (
                <div key={cat.id} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center space-y-2 hover:shadow-md transition-shadow cursor-pointer">
                    <div className={`mb-1`}>
                        {/* Using large colored icons to mimic the visual weight of emojis/illustrations */}
                        <cat.icon size={28} className={cat.color} strokeWidth={1.5} />
                    </div>
                    <span className="text-xs font-medium text-center text-slate-700 leading-tight">{cat.name}</span>
                    <span className="text-[10px] font-bold text-slate-500 bg-blue-50 px-2.5 py-1 rounded-md">{cat.count}</span>
                </div>
            ))}
         </div>
      </div>

      {/* Featured Header & Map Toggle */}
      <div className="flex justify-between items-center mt-6">
         <h3 className="font-bold text-slate-800 text-lg">Featured Providers</h3>
         <div 
            onClick={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}
            className="flex items-center text-indigo-600 text-xs font-bold cursor-pointer bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors"
         >
            {viewMode === 'list' ? <><MapPin size={14} className="mr-1"/> Map View</> : 'List View'}
         </div>
      </div>

      {/* Main Content */}
      {viewMode === 'map' ? (
        <div className="h-[50vh] bg-gray-200 rounded-2xl relative overflow-hidden flex items-center justify-center shadow-inner">
            {/* Simulated Map */}
            <div className="absolute inset-0 opacity-60 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/OpenStreetMap_Logo_2010.svg/1024px-OpenStreetMap_Logo_2010.svg.png')] bg-cover bg-center"></div>
            
            {/* Mock Pins */}
            <div className="absolute top-1/3 left-1/4">
                <div className="w-12 h-12 rounded-full bg-indigo-600 border-4 border-white flex items-center justify-center shadow-xl animate-bounce">
                    <img src="https://picsum.photos/100/100?random=1" className="w-full h-full rounded-full object-cover" />
                </div>
            </div>
            <div className="absolute bottom-1/3 right-1/3">
                 <div className="w-12 h-12 rounded-full bg-emerald-500 border-4 border-white flex items-center justify-center shadow-xl">
                    <img src="https://picsum.photos/100/100?random=3" className="w-full h-full rounded-full object-cover" />
                </div>
            </div>
             {/* Floating Search in Map */}
            <div className="absolute top-4 left-4 right-4 bg-white p-3 rounded-xl shadow-lg flex items-center">
                 <MapPin size={18} className="text-indigo-600 mr-2" />
                 <span className="text-sm font-medium text-gray-700">Searching near Yaba, Lagos...</span>
            </div>
        </div>
      ) : (
        <div className="space-y-4 pb-20">
            {SORTED_SERVICES.map(service => (
                <div 
                    key={service.id} 
                    onClick={() => navigate(`/service/${service.id}`)}
                    className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col space-y-3 relative overflow-hidden cursor-pointer active:scale-[0.99] transition-transform"
                >
                     {/* Highlight Effect for Top Ranked */}
                    {service.gamificationScore && service.gamificationScore > 300 && (
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-yellow-400/20 to-transparent rounded-bl-3xl"></div>
                    )}
                    
                    {/* Top Row: Avatar & Basic Info */}
                    <div className="flex items-start space-x-3 relative z-10">
                        <div className="relative w-14 h-14 flex-shrink-0">
                             <img src={service.providerAvatar} alt={service.providerName} className="w-full h-full object-cover rounded-full border border-gray-100" />
                             {service.isOnline && <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>}
                        </div>
                        <div className="flex-1 min-w-0">
                             <div className="flex justify-between items-start">
                                 <div>
                                    <h4 className="font-bold text-slate-800 text-base truncate flex items-center">
                                        {service.providerName}
                                        {service.badges?.includes('Verified') && <ShieldCheck size={12} className="ml-1 text-blue-500" />}
                                    </h4>
                                    <p className="text-xs text-gray-500 truncate">{service.title}</p>
                                 </div>
                                 <div className="flex flex-col items-end">
                                    <div className="flex items-center bg-indigo-50 px-2 py-1 rounded-lg">
                                        <Star size={12} className="text-indigo-600 fill-indigo-600 mr-1" />
                                        <span className="text-xs font-bold text-indigo-700">{service.rating}</span>
                                        <span className="text-[10px] text-indigo-400 ml-1">({service.reviewsCount})</span>
                                    </div>
                                    {service.gamificationScore && (
                                        <span className="text-[10px] text-gray-400 mt-1 flex items-center">
                                            <Trophy size={10} className="mr-1"/> Score: {service.gamificationScore}
                                        </span>
                                    )}
                                 </div>
                             </div>
                        </div>
                    </div>

                    {/* Middle Row: Tags & Badges */}
                    <div className="flex flex-wrap gap-2 relative z-10">
                        {service.badges?.map(badge => (
                            <span key={badge} className="text-[10px] font-bold bg-yellow-50 text-yellow-700 px-2 py-1 rounded-md border border-yellow-100 flex items-center">
                                {badge === 'Top Rated' && <Star size={10} className="mr-1"/>}
                                {badge === 'Fast Responder' && <Crown size={10} className="mr-1"/>}
                                {badge}
                            </span>
                        ))}
                        {service.isOnline ? (
                             <span className="text-[10px] font-medium bg-blue-50 text-blue-600 px-2 py-1 rounded-md border border-blue-100">Remote</span>
                        ) : (
                             <span className="text-[10px] font-medium bg-orange-50 text-orange-600 px-2 py-1 rounded-md border border-orange-100">On-Site</span>
                        )}
                    </div>

                    {/* Bottom Row: Location & Price & Action */}
                    <div className="flex justify-between items-center pt-2 border-t border-gray-50 relative z-10">
                        <div className="flex items-center text-xs text-gray-500">
                             <MapPin size={14} className="mr-1 text-gray-400" />
                             {service.isOnline ? 'Global' : service.distance || 'Nearby'}
                        </div>
                        <div className="text-right">
                             <span className="block text-xs text-gray-400">Starting at</span>
                             <span className="font-bold text-indigo-600 text-sm">₦{service.hourlyRate?.toLocaleString()}<span className="text-xs font-normal text-gray-500">/hr</span></span>
                        </div>
                    </div>
                     <button 
                       onClick={(e) => {
                           e.stopPropagation();
                           navigate(`/service/${service.id}`);
                       }}
                       className="w-full bg-indigo-600 text-white py-2.5 rounded-xl text-sm font-bold shadow-md shadow-indigo-100 active:scale-[0.99] transition-transform relative z-10 hover:bg-indigo-700"
                     >
                        Book Now
                    </button>
                </div>
            ))}
        </div>
      )}
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
