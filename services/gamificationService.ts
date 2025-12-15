

import { BadgeType, LevelType, LevelConfig, User } from '../types';

// Configuration for Levels
export const LEVEL_CONFIGS: Record<LevelType, LevelConfig> = {
  'Starter': {
    name: 'Starter',
    color: 'bg-gray-400',
    perks: ['Basic Profile'],
    requirements: { xp: 0, earnings: 0, jobs: 0, rating: 0 }
  },
  'Bronze': {
    name: 'Bronze',
    color: 'bg-orange-700',
    perks: ['Search Boost (Low)', 'Verified Badge'],
    requirements: { xp: 500, earnings: 50000, jobs: 5, rating: 4.0 }
  },
  'Silver': {
    name: 'Silver',
    color: 'bg-slate-300',
    perks: ['Search Boost (Med)', 'Lower Fees (1%)'],
    requirements: { xp: 1500, earnings: 150000, jobs: 15, rating: 4.2 }
  },
  'Gold': {
    name: 'Gold',
    color: 'bg-yellow-400',
    perks: ['Search Boost (High)', 'Lower Fees (2%)', 'Priority Support'],
    requirements: { xp: 3500, earnings: 500000, jobs: 30, rating: 4.5 }
  },
  'Platinum': {
    name: 'Platinum',
    color: 'bg-cyan-400',
    perks: ['Featured Profile', 'Lower Fees (3%)', 'Dedicated Agent'],
    requirements: { xp: 7000, earnings: 1500000, jobs: 75, rating: 4.7 }
  },
  'Elite': {
    name: 'Elite',
    color: 'bg-indigo-600',
    perks: ['Homepage Feature', 'Zero Withdrawal Fees', 'Enterprise Access'],
    requirements: { xp: 15000, earnings: 5000000, jobs: 150, rating: 4.8 }
  },
  'Grandmaster': {
    name: 'Grandmaster',
    color: 'bg-gradient-to-r from-purple-600 to-pink-600',
    perks: ['Global Visibility', 'Partner Status', 'Equity Options'],
    requirements: { xp: 30000, earnings: 10000000, jobs: 300, rating: 4.9 }
  }
};

const LEVELS_ORDER: LevelType[] = ['Starter', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Elite', 'Grandmaster'];

export const calculateJobXP = (amount: number, rating: number, isRepeat: boolean): number => {
  // Formula: 
  // Base: 20 XP per job
  // Revenue: 1 XP per ₦100 earned
  // Rating: 5 stars = 15 XP, 4 stars = 10 XP
  // Repeat: 25 XP bonus
  
  const revenueXP = Math.floor(amount / 100);
  const ratingXP = rating === 5 ? 15 : rating >= 4 ? 10 : 0;
  const repeatBonus = isRepeat ? 25 : 0;
  const baseXP = 20;

  return baseXP + revenueXP + ratingXP + repeatBonus;
};

export const getNextLevelInfo = (
  currentXp: number, 
  totalEarnings: number, 
  jobs: number, 
  rating: number
) => {
  // Find current level based on ALL criteria being met
  let currentLevelIndex = 0;

  for (let i = LEVELS_ORDER.length - 1; i >= 0; i--) {
    const lvl = LEVELS_ORDER[i];
    const req = LEVEL_CONFIGS[lvl].requirements;
    if (
      currentXp >= req.xp &&
      totalEarnings >= req.earnings &&
      jobs >= req.jobs &&
      rating >= req.rating
    ) {
      currentLevelIndex = i;
      break;
    }
  }

  const currentLevel = LEVELS_ORDER[currentLevelIndex];
  const nextLevel = LEVELS_ORDER[Math.min(currentLevelIndex + 1, LEVELS_ORDER.length - 1)];
  const nextReq = LEVEL_CONFIGS[nextLevel].requirements;
  
  // Calculate Progress percentage towards next level (weighted average of all requirements)
  const xpProg = Math.min(100, (currentXp / nextReq.xp) * 100);
  const earnProg = Math.min(100, (totalEarnings / nextReq.earnings) * 100);
  const jobsProg = Math.min(100, (jobs / nextReq.jobs) * 100);
  
  // Rating is a hard gate, not a progress bar usually, but we can treat it as check
  const ratingMet = rating >= nextReq.rating;

  // Primary bottleneck
  let bottleneck = '';
  if (totalEarnings < nextReq.earnings) bottleneck = `Need ₦${(nextReq.earnings - totalEarnings).toLocaleString()} more earnings`;
  else if (currentXp < nextReq.xp) bottleneck = `Need ${nextReq.xp - currentXp} more XP`;
  else if (jobs < nextReq.jobs) bottleneck = `Need ${nextReq.jobs - jobs} more jobs`;
  else if (!ratingMet) bottleneck = `Need rating of ${nextReq.rating}`;

  return {
    currentLevel,
    nextLevel,
    nextRequirements: nextReq,
    bottleneck,
    overallProgress: (xpProg + earnProg + jobsProg) / 3,
    config: LEVEL_CONFIGS[currentLevel],
    nextConfig: LEVEL_CONFIGS[nextLevel]
  };
};

export const getBadges = (user: User): BadgeType[] => {
  const badges: BadgeType[] = [];
  const stats = user.stats || {};
  const game = user.gamification || { totalEarnings: 0, lifetimeJobs: 0, currentRating: 0 };
  
  // Earnings Badges
  if (game.totalEarnings > 1000000) badges.push('High Earner');
  if (game.totalEarnings > 5000000) badges.push('Premium');
  
  // Performance Badges
  if (game.currentRating >= 4.8 && game.lifetimeJobs > 10) badges.push('Top Rated');
  if (stats.hoursResponse && stats.hoursResponse < 1) badges.push('Fast Responder');
  if (game.lifetimeJobs > 50) badges.push('High Performer');
  if (user.trustScore && user.trustScore > 90) badges.push('Verified');
  
  // Logic for 'Repeat Magnet' would go here (requires analyzing booking history)
  
  return badges;
};

// Mock Data generator
export const getLeaderboardData = (category?: string) => {
  return [
    { id: '1', name: 'Adeola Johnson', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=150&q=80', score: 342, level: 'Platinum' as LevelType, badges: ['Top Rated', 'Verified', 'High Earner'], change: 2, category: 'Plumbing', earnings: 1800000 },
    { id: '2', name: 'Sarah Tech', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80', score: 310, level: 'Gold' as LevelType, badges: ['Fast Responder', 'Fast Growth'], change: -1, category: 'Design', earnings: 750000 },
    { id: '3', name: 'Musa Auto', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', score: 285, level: 'Gold' as LevelType, badges: ['Trending'], change: 5, category: 'Mechanic', earnings: 620000 },
    { id: '4', name: 'Chioma Fashion', avatar: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=150&q=80', score: 250, level: 'Silver' as LevelType, badges: ['New Star'], change: 0, category: 'Tailoring', earnings: 210000 },
    { id: '5', name: 'Emmanuel Doe', avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=150&q=80', score: 180, level: 'Bronze' as LevelType, badges: [], change: 1, category: 'Plumbing', earnings: 85000 },
  ].filter(u => !category || category === 'All' || u.category === category)
   .sort((a, b) => b.score - a.score);
};
