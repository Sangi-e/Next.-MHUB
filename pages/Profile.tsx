
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User as UserType } from '../types';
import {
  User, ShieldCheck, Star, Trophy, CreditCard, Heart, Settings,
  HelpCircle, LogOut, ChevronRight, Edit, Download, Activity,
  AlertCircle, Share2, Crown, BadgeCheck, Globe, CheckCircle, TrendingUp,
  Zap, Info, X
} from 'lucide-react';
import { getNextLevelInfo } from '../services/gamificationService';

interface ProfileProps {
    user: UserType;
    onLogout: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ user, onLogout }) => {
    const isCustomer = user.role === 'customer';
    const navigate = useNavigate();
    const [showLevelInfo, setShowLevelInfo] = useState(false);

    // Mock data for gamification stats if not present in user object
    const xp = 2450;
    const earnings = 85000;
    const jobs = 24;
    const rating = 4.9;
    
    const levelInfo = getNextLevelInfo(xp, earnings, jobs, rating);

    // Visual styles for levels
    const getLevelStyle = (level: string) => {
        switch(level) {
            case 'Gold': return 'border-yellow-400 ring-4 ring-yellow-100';
            case 'Platinum': return 'border-cyan-400 ring-4 ring-cyan-100';
            case 'Elite': return 'border-indigo-600 ring-4 ring-indigo-100';
            default: return 'border-gray-200';
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen pb-24">
             {/* Header Title */}
             <div className="bg-white p-4 flex justify-between items-center shadow-sm sticky top-0 z-10">
                <h1 className="text-lg font-bold text-slate-800">Profile</h1>
                <Globe size={20} className="text-gray-600" />
            </div>

            <div className="p-4 space-y-4">
                {/* Profile Card */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center relative overflow-hidden">
                    {/* Background Pattern for High Levels */}
                    {!isCustomer && levelInfo.currentLevel !== 'Starter' && (
                        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-gray-50 to-white -z-10"></div>
                    )}

                    {/* Avatar with Gamification Border */}
                    <div className="relative mb-3 group cursor-pointer" onClick={() => !isCustomer && setShowLevelInfo(true)}>
                        <img 
                            src={user.avatar} 
                            className={`w-28 h-28 rounded-full object-cover border-4 ${!isCustomer ? getLevelStyle(levelInfo.currentLevel) : 'border-gray-50'}`} 
                            alt="Profile"
                        />
                        {user.verified && (
                             <div className="absolute bottom-1 right-2 bg-blue-500 rounded-full p-1 border-2 border-white">
                                 <ShieldCheck size={14} className="text-white" />
                             </div>
                        )}
                        {!isCustomer && (
                             <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                 View Level
                             </div>
                        )}
                    </div>

                    <h2 className="text-xl font-bold text-slate-800">{user.name}</h2>
                    <p className="text-sm text-gray-500 mb-3">{user.email}</p>

                    {/* Role & Level Pills */}
                    <div className="flex space-x-2 mb-6">
                        <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-md text-xs font-bold capitalize">{user.role}</span>
                        {!isCustomer && (
                            <span 
                                onClick={() => setShowLevelInfo(true)}
                                className={`px-3 py-1 rounded-md text-xs font-bold ${levelInfo.config.color} text-white cursor-pointer flex items-center`}
                            >
                                {levelInfo.currentLevel} Level <Info size={10} className="ml-1 opacity-70"/>
                            </span>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex w-full space-x-3 mb-6">
                        <button 
                            onClick={() => navigate('/edit-profile')}
                            className="flex-1 bg-slate-900 hover:bg-slate-800 text-white py-2.5 rounded-lg text-sm font-bold flex items-center justify-center transition-colors shadow-lg shadow-slate-200"
                        >
                            <Edit size={16} className="mr-2" /> Edit Profile
                        </button>
                        <button className="w-12 flex items-center justify-center bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 border border-gray-200">
                            <Download size={20} />
                        </button>
                    </div>

                    <div className="w-full h-px bg-gray-100 mb-6"></div>

                    {/* Public Stats Row (New Feature) */}
                    {!isCustomer && (
                        <div className="grid grid-cols-2 w-full gap-2 mb-6 text-left">
                             <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                                 <p className="text-[10px] text-gray-400 uppercase font-bold">Response Rate</p>
                                 <p className="text-sm font-bold text-slate-800">98% <span className="text-[10px] text-green-500 font-normal">(&lt; 1hr)</span></p>
                             </div>
                             <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                                 <p className="text-[10px] text-gray-400 uppercase font-bold">Completion Rate</p>
                                 <p className="text-sm font-bold text-slate-800">100% <span className="text-[10px] text-gray-400 font-normal">(24 jobs)</span></p>
                             </div>
                        </div>
                    )}

                    {/* Basic Stats */}
                    <div className="grid grid-cols-3 w-full gap-4">
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-500 mb-2">
                                <CheckCircle size={20} />
                            </div>
                            <span className="text-lg font-bold text-slate-800">{user.stats?.jobsCompleted || 0}</span>
                            <span className="text-xs text-gray-400">Completed</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-500 mb-2">
                                <Star size={20} />
                            </div>
                            <span className="text-lg font-bold text-slate-800">{user.stats?.rating || 'N/A'}</span>
                            <span className="text-xs text-gray-400">Rating</span>
                        </div>
                        <div onClick={() => navigate('/leaderboard')} className="flex flex-col items-center cursor-pointer group">
                            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-500 mb-2 group-hover:bg-purple-100 transition-colors">
                                <TrendingUp size={20} />
                            </div>
                            <span className="text-lg font-bold text-slate-800 group-hover:text-purple-600">#{user.stats?.rank || '-'}</span>
                            <span className="text-xs text-gray-400">Rank</span>
                        </div>
                    </div>
                </div>

                {/* Level Progress Card (Entrepreneur Only) */}
                {!isCustomer && (
                    <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                        <div className="relative z-10">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-bold text-sm flex items-center"><Crown size={16} className="text-yellow-400 mr-2"/> Level Progress</h3>
                                <span className="text-xs text-slate-300">{Math.round(levelInfo.overallProgress)}% to {levelInfo.nextLevel}</span>
                            </div>
                            
                            {/* XP Progress Bar */}
                            <div className="w-full bg-slate-700 rounded-full h-2 mb-3">
                                <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${levelInfo.overallProgress}%` }}></div>
                            </div>
                            
                            <div className="bg-slate-700/50 rounded-lg p-2 text-xs flex items-center justify-between">
                                <div className="flex items-center">
                                    <Zap size={14} className="text-yellow-400 mr-2 flex-shrink-0" />
                                    <span className="truncate">{levelInfo.bottleneck}</span>
                                </div>
                                <button onClick={() => setShowLevelInfo(true)} className="text-[10px] font-bold underline">Details</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Menu List */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <MenuItem 
                        icon={ShieldCheck} 
                        label="Verification Center" 
                        value="3/6" 
                        pillColor="bg-blue-100 text-blue-600" 
                        onClick={() => navigate('/verification')} 
                    />
                    
                    {!isCustomer && (
                        <MenuItem 
                            icon={Activity} 
                            label="Trust Score" 
                            value={`${user.trustScore || 71}`} 
                            pillColor="bg-blue-100 text-blue-600" 
                            onClick={() => navigate('/trust-score')} 
                        />
                    )}
                    
                    <div className="h-px bg-gray-50 mx-4"></div>
                    
                    <MenuItem 
                        icon={AlertCircle} 
                        label="Disputes" 
                        onClick={() => navigate('/disputes')} 
                    />
                    <MenuItem 
                        icon={CreditCard} 
                        label="Transactions" 
                        onClick={() => navigate('/transactions')}
                    />
                    
                    <div className="h-px bg-gray-50 mx-4"></div>
                    
                    {/* Leaderboard / Rewards Link */}
                    <MenuItem icon={Trophy} label="Leaderboard & Rewards" onClick={() => navigate('/leaderboard')} />
                    
                    <div className="bg-green-50">
                       <MenuItem 
                          icon={Share2} 
                          label="Refer Friends" 
                          className="bg-transparent" 
                          onClick={() => navigate('/refer')}
                       />
                    </div>

                    <div className="h-px bg-gray-50 mx-4"></div>

                    <MenuItem 
                        icon={Heart} 
                        label="Favorites" 
                        onClick={() => navigate('/favorites')}
                    />
                    <MenuItem 
                        icon={ShieldCheck} 
                        label="Safety Center" 
                        onClick={() => navigate('/safety')}
                    />
                    <MenuItem 
                        icon={Settings} 
                        label="Settings" 
                        onClick={() => navigate('/settings')}
                    />
                    <MenuItem 
                        icon={HelpCircle} 
                        label="Help & Support" 
                        onClick={() => navigate('/help')}
                    />
                </div>

                {/* Logout Button */}
                <button onClick={onLogout} className="w-full bg-red-50 hover:bg-red-100 text-red-600 py-3.5 rounded-xl font-bold flex items-center justify-center border border-red-200 transition-colors">
                    <LogOut size={20} className="mr-2" /> Log Out
                </button>
            </div>

            {/* Level Info Modal */}
            {showLevelInfo && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white rounded-3xl w-full max-w-sm p-6 relative">
                        <button onClick={() => setShowLevelInfo(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                            <X size={20} />
                        </button>
                        <div className="text-center mb-4">
                            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3 text-yellow-600">
                                <Trophy size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800">Why {levelInfo.currentLevel}?</h3>
                            <p className="text-sm text-gray-500">Your level determines your visibility and fees.</p>
                        </div>
                        
                        <div className="space-y-4 mb-6">
                            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                                <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Current Perks</h4>
                                <ul className="space-y-2">
                                    {levelInfo.config.perks.map(perk => (
                                        <li key={perk} className="flex items-center text-sm font-medium text-slate-700">
                                            <CheckCircle size={14} className="text-green-500 mr-2" />
                                            {perk}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            
                            <div className="bg-indigo-50 p-3 rounded-xl border border-indigo-100">
                                <h4 className="text-xs font-bold text-indigo-400 uppercase mb-2">Next Level: {levelInfo.nextLevel}</h4>
                                <ul className="space-y-2">
                                    {levelInfo.nextConfig.perks.slice(0, 2).map(perk => (
                                        <li key={perk} className="flex items-center text-sm font-medium text-indigo-800">
                                            <Lock size={14} className="text-indigo-400 mr-2" />
                                            {perk}
                                        </li>
                                    ))}
                                    <li className="text-xs text-indigo-500 italic pl-6">+ More</li>
                                </ul>
                            </div>
                        </div>

                        <button 
                            onClick={() => { setShowLevelInfo(false); navigate('/leaderboard'); }}
                            className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-bold"
                        >
                            View Leaderboard
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

interface MenuItemProps {
    icon: any;
    label: string;
    value?: string;
    pillColor?: string;
    onClick?: () => void;
    className?: string;
}

const MenuItem = ({ icon: Icon, label, value, pillColor, onClick, className = '' }: MenuItemProps) => (
    <div onClick={onClick} className={`p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition-colors ${className}`}>
        <div className="flex items-center space-x-3 text-slate-600">
            <Icon size={20} />
            <span className="font-medium text-sm text-slate-700">{label}</span>
        </div>
        <div className="flex items-center">
            {value && (
                <span className={`text-[10px] font-bold px-2 py-1 rounded-md mr-2 ${pillColor || 'bg-gray-100 text-gray-600'}`}>
                    {value}
                </span>
            )}
            <ChevronRight size={16} className="text-gray-300" />
        </div>
    </div>
);
