import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User as UserType } from '../types';
import {
  User, ShieldCheck, Star, Trophy, CreditCard, Heart, Settings,
  HelpCircle, LogOut, ChevronRight, Edit, Download, Activity,
  AlertCircle, Share2, Crown, BadgeCheck, Globe, CheckCircle, TrendingUp
} from 'lucide-react';

interface ProfileProps {
    user: UserType;
    onLogout: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ user, onLogout }) => {
    const isCustomer = user.role === 'customer';
    const navigate = useNavigate();

    return (
        <div className="bg-gray-50 min-h-screen pb-24">
             {/* Header Title */}
             <div className="bg-white p-4 flex justify-between items-center shadow-sm sticky top-0 z-10">
                <h1 className="text-lg font-bold text-slate-800">Profile</h1>
                <Globe size={20} className="text-gray-600" />
            </div>

            <div className="p-4 space-y-4">
                {/* Profile Card */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
                    {/* Avatar */}
                    <div className="relative mb-3">
                        <img 
                            src={user.avatar} 
                            className="w-24 h-24 rounded-full object-cover border-4 border-gray-50" 
                            alt="Profile"
                        />
                    </div>

                    <h2 className="text-xl font-bold text-slate-800">{user.name}</h2>
                    <p className="text-sm text-gray-500 mb-3">{user.email}</p>

                    {/* Role Pills */}
                    <div className="flex space-x-2 mb-6">
                        <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-md text-xs font-bold capitalize">{user.role}</span>
                        <span className="bg-yellow-50 text-yellow-600 px-3 py-1 rounded-md text-xs font-bold">Gold Member</span>
                    </div>

                    {/* Actions */}
                    <div className="flex w-full space-x-3 mb-6">
                        <button 
                            onClick={() => navigate('/edit-profile')}
                            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-lg text-sm font-bold flex items-center justify-center transition-colors shadow-sm shadow-green-100"
                        >
                            <Edit size={16} className="mr-2" /> Edit Profile
                        </button>
                        <button className="w-12 flex items-center justify-center bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 border border-gray-200">
                            <Download size={20} />
                        </button>
                    </div>

                    <div className="w-full h-px bg-gray-100 mb-6"></div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 w-full gap-4">
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-500 mb-2">
                                <CheckCircle size={20} />
                            </div>
                            <span className="text-lg font-bold text-slate-800">{user.stats?.jobsCompleted || 0}</span>
                            <span className="text-xs text-gray-400">Completed</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-500 mb-2">
                                <Star size={20} />
                            </div>
                            <span className="text-lg font-bold text-slate-800">{user.stats?.rating || 'N/A'}</span>
                            <span className="text-xs text-gray-400">Rating</span>
                        </div>
                        <div onClick={() => navigate('/leaderboard')} className="flex flex-col items-center cursor-pointer group">
                            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-500 mb-2 group-hover:bg-green-100 transition-colors">
                                <TrendingUp size={20} />
                            </div>
                            <span className="text-lg font-bold text-slate-800 group-hover:text-green-600">#{user.stats?.rank || '-'}</span>
                            <span className="text-xs text-gray-400">Rank</span>
                        </div>
                    </div>
                </div>

                {/* Menu List */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <MenuItem 
                        icon={User} 
                        label="Edit Profile" 
                        onClick={() => navigate('/edit-profile')}
                    />
                    <MenuItem 
                        icon={ShieldCheck} 
                        label="Verification Center" 
                        value="3/6" 
                        pillColor="bg-blue-100 text-blue-600" 
                        onClick={() => navigate('/verification')} 
                    />
                    <MenuItem 
                        icon={Activity} 
                        label="Trust Score" 
                        value={`${user.trustScore || 71}`} 
                        pillColor="bg-blue-100 text-blue-600" 
                        onClick={() => navigate('/trust-score')} 
                    />
                    
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
                    <MenuItem icon={Crown} label="Rewards & Badges" onClick={() => navigate('/leaderboard')} />
                    
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
                <button onClick={onLogout} className="w-full bg-red-500 hover:bg-red-600 text-white py-3.5 rounded-xl font-bold flex items-center justify-center shadow-lg shadow-red-200 transition-colors">
                    <LogOut size={20} className="mr-2" /> Log Out
                </button>
            </div>
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