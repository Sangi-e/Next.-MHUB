import { BadgeType, LevelType, User, Service } from '../types';

// Constants
const XP_LEVELS: Record<LevelType, number> = {
  'Starter': 0,
  'Bronze': 500,
  'Silver': 1500,
  'Gold': 3500,
  'Platinum': 7000,
  'Elite': 15000,
  'Grandmaster': 30000
};

export const calculateGamificationScore = (
  rating: number,
  completionRate: number, // 0-100
  responseSpeedHours: number, // Lower is better
  jobsCompleted: number
): number => {
  // Formula: Score = (Rating × 20) + (Completion Rate × 0.3) + (Response Speed × 0.2) + (Jobs Completed × 0.5)
  // Note: Response speed needs to be inverted for the score (faster is higher score). 
  // Let's assume a baseline of 48 hours. Max points if < 1 hour.
  const responseScore = Math.max(0, (48 - responseSpeedHours) * 0.2);
  
  const score = (rating * 20) + (completionRate * 0.3) + responseScore + (jobsCompleted * 0.5);
  return Math.round(score * 10) / 10; // Round to 1 decimal
};

export const determineLevel = (xp: number): { current: LevelType; next: LevelType; nextXp: number } => {
  const levels: LevelType[] = ['Starter', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Elite', 'Grandmaster'];
  
  let current: LevelType = 'Starter';
  let next: LevelType = 'Bronze';
  let nextXp = XP_LEVELS['Bronze'];

  for (let i = 0; i < levels.length; i++) {
    const levelName = levels[i];
    if (xp >= XP_LEVELS[levelName]) {
      current = levelName;
      if (i < levels.length - 1) {
        next = levels[i + 1];
        nextXp = XP_LEVELS[levels[i + 1]];
      } else {
        next = 'Grandmaster'; // Max level
        nextXp = xp; // Cap
      }
    }
  }

  return { current, next, nextXp };
};

export const getBadges = (user: Partial<User>): BadgeType[] => {
  const badges: BadgeType[] = [];
  const stats = user.stats || {};
  
  if (user.trustScore && user.trustScore > 90) badges.push('Verified');
  if (stats.rating && stats.rating >= 4.8) badges.push('Top Rated');
  if (stats.hoursResponse && stats.hoursResponse < 2) badges.push('Fast Responder');
  if (stats.jobsCompleted && stats.jobsCompleted > 50) badges.push('High Performer');
  if (user.gamification?.score && user.gamification.score > 200) badges.push('Premium');
  
  return badges;
};

// Anti-fraud check wrapper
export const awardXp = (currentXp: number, amount: number, isVerified: boolean, trustScore: number): number => {
  if (!isVerified || trustScore < 50) {
    console.warn("XP Award blocked: User not verified or low trust score.");
    return currentXp; // Anti-fraud: prevent unverified spam accounts from leveling up
  }
  return currentXp + amount;
};

// Mock data generator for Leaderboard
export const getLeaderboardData = (category?: string) => {
  return [
    { id: '1', name: 'Adeola Johnson', avatar: 'https://picsum.photos/100/100?random=1', score: 342, level: 'Platinum' as LevelType, badges: ['Top Rated', 'Verified'], change: 2, category: 'Plumbing' },
    { id: '2', name: 'Sarah Tech', avatar: 'https://picsum.photos/100/100?random=2', score: 310, level: 'Gold' as LevelType, badges: ['Fast Responder'], change: -1, category: 'Design' },
    { id: '3', name: 'Musa Auto', avatar: 'https://picsum.photos/100/100?random=3', score: 285, level: 'Gold' as LevelType, badges: ['Trending'], change: 5, category: 'Mechanic' },
    { id: '4', name: 'Chioma Fashion', avatar: 'https://picsum.photos/100/100?random=4', score: 250, level: 'Silver' as LevelType, badges: ['New Star'], change: 0, category: 'Tailoring' },
    { id: '5', name: 'Emmanuel Doe', avatar: 'https://picsum.photos/100/100?random=5', score: 180, level: 'Bronze' as LevelType, badges: [], change: 1, category: 'Plumbing' },
  ].filter(u => !category || category === 'All' || u.category === category)
   .sort((a, b) => b.score - a.score);
};