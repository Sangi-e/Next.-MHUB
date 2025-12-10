import React, { useState } from 'react';
import { Trophy, Medal, MapPin, Globe, Filter, TrendingUp, Flame, Star, ChevronUp, ChevronDown, Award } from 'lucide-react';
import { getLeaderboardData } from '../services/gamificationService';
import { LevelType } from '../types';

export const Leaderboard: React.FC = () => {
  const [scope, setScope] = useState<'Global' | 'Local' | 'Category'>('Global');
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  const leaderboardData = getLeaderboardData(scope === 'Category' ? categoryFilter : undefined);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-indigo-600 text-white p-6 rounded-b-[40px] shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold flex items-center">
            <Trophy className="mr-2 text-yellow-300" /> Leaderboard
          </h1>
          <div className="bg-indigo-500/50 p-2 rounded-full">
            <Award className="text-white" size={24} />
          </div>
        </div>

        {/* Weekly Competition Banner */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-4 shadow-inner mb-2 border border-white/20">
          <div className="flex justify-between items-start">
            <div>
               <h3 className="font-bold text-sm uppercase tracking-wider text-white/80 flex items-center"><Flame size={14} className="mr-1 text-orange-300"/> Weekly Contest</h3>
               <h2 className="text-xl font-bold mt-1">Top Responder ⚡</h2>
               <p className="text-xs text-white/90 mt-1">Reply to 95% of messages under 1 hr to win!</p>
            </div>
            <div className="text-right">
               <span className="block text-2xl font-bold">2d 14h</span>
               <span className="text-[10px] text-white/80">Time Left</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 mt-6">
        <div className="flex bg-white p-1 rounded-xl shadow-sm mb-6">
            {['Global', 'Local', 'Category'].map((tab) => (
                <button
                    key={tab}
                    onClick={() => setScope(tab as any)}
                    className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center ${
                        scope === tab 
                        ? 'bg-indigo-50 text-indigo-600 shadow-sm border border-indigo-100' 
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                >
                    {tab === 'Global' && <Globe size={14} className="mr-1"/>}
                    {tab === 'Local' && <MapPin size={14} className="mr-1"/>}
                    {tab === 'Category' && <Filter size={14} className="mr-1"/>}
                    {tab}
                </button>
            ))}
        </div>
        
        {scope === 'Category' && (
           <div className="flex overflow-x-auto space-x-2 mb-4 pb-2 no-scrollbar">
              {['All', 'Plumbing', 'Design', 'Mechanic', 'Tailoring', 'Tech'].map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${categoryFilter === cat ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-200 text-gray-600'}`}
                  >
                      {cat}
                  </button>
              ))}
           </div>
        )}

        {/* Top 3 Podium (Visual) */}
        {leaderboardData.length >= 3 && (
            <div className="flex justify-center items-end space-x-4 mb-8 pt-4">
                {/* 2nd Place */}
                <div className="flex flex-col items-center">
                    <div className="relative mb-2">
                        <img src={leaderboardData[1].avatar} className="w-14 h-14 rounded-full border-2 border-gray-300" />
                        <div className="absolute -bottom-2 -right-0 bg-gray-300 text-gray-700 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">2</div>
                    </div>
                    <div className="h-20 w-16 bg-gradient-to-t from-gray-200 to-gray-50 rounded-t-lg flex items-end justify-center pb-2 shadow-sm">
                        <span className="font-bold text-gray-400 text-xs">{leaderboardData[1].score}</span>
                    </div>
                    <p className="text-[10px] font-bold mt-1 text-slate-700 w-16 truncate text-center">{leaderboardData[1].name.split(' ')[0]}</p>
                </div>

                {/* 1st Place */}
                <div className="flex flex-col items-center">
                     <div className="relative mb-2">
                         <Globe className="absolute -top-6 text-yellow-500 animate-bounce" size={20} />
                        <img src={leaderboardData[0].avatar} className="w-20 h-20 rounded-full border-4 border-yellow-400 shadow-xl" />
                        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full text-xs font-bold whitespace-nowrap">
                            Grandmaster
                        </div>
                    </div>
                    <div className="h-28 w-20 bg-gradient-to-t from-yellow-200 to-yellow-50 rounded-t-lg flex items-end justify-center pb-2 shadow-md">
                        <span className="font-bold text-yellow-700 text-sm">{leaderboardData[0].score}</span>
                    </div>
                    <p className="text-xs font-bold mt-1 text-slate-900">{leaderboardData[0].name.split(' ')[0]}</p>
                </div>

                {/* 3rd Place */}
                <div className="flex flex-col items-center">
                     <div className="relative mb-2">
                        <img src={leaderboardData[2].avatar} className="w-14 h-14 rounded-full border-2 border-orange-300" />
                        <div className="absolute -bottom-2 -right-0 bg-orange-300 text-orange-800 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">3</div>
                    </div>
                    <div className="h-16 w-16 bg-gradient-to-t from-orange-200 to-orange-50 rounded-t-lg flex items-end justify-center pb-2 shadow-sm">
                         <span className="font-bold text-orange-700 text-xs">{leaderboardData[2].score}</span>
                    </div>
                     <p className="text-[10px] font-bold mt-1 text-slate-700 w-16 truncate text-center">{leaderboardData[2].name.split(' ')[0]}</p>
                </div>
            </div>
        )}

        {/* List */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {leaderboardData.map((user, index) => (
                <div key={user.id} className={`flex items-center p-4 border-b border-gray-50 last:border-0 ${index < 3 ? 'bg-indigo-50/10' : ''}`}>
                    <div className="w-8 text-center font-bold text-gray-400 mr-2">{index + 1}</div>
                    <div className="relative mr-3">
                        <img src={user.avatar} className="w-10 h-10 rounded-full object-cover" />
                        {user.badges.includes('Verified') && <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-0.5 border border-white"><Star size={8} className="text-white fill-white"/></div>}
                    </div>
                    <div className="flex-1">
                        <h4 className="font-bold text-sm text-slate-800 flex items-center">
                            {user.name}
                            {user.badges.includes('Top Rated') && <span className="ml-2 text-[8px] bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded-full">TOP</span>}
                        </h4>
                        <div className="flex items-center text-xs text-gray-500 mt-0.5">
                            <span className="mr-2 text-indigo-600 font-medium">{user.level}</span>
                            <span>• {user.category}</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="block font-bold text-slate-800">{user.score}</span>
                        <div className="flex items-center justify-end text-[10px]">
                            {user.change > 0 ? (
                                <span className="text-green-500 flex items-center"><ChevronUp size={10}/> {user.change}</span>
                            ) : user.change < 0 ? (
                                <span className="text-red-500 flex items-center"><ChevronDown size={10}/> {Math.abs(user.change)}</span>
                            ) : (
                                <span className="text-gray-400">-</span>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};