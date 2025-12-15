
export type UserRole = 'customer' | 'entrepreneur' | 'admin';

export type BadgeType = 
  | 'Top Rated' 
  | 'Fast Responder' 
  | 'Trending' 
  | 'Verified' 
  | 'High Performer' 
  | 'New Star' 
  | 'Premium' 
  | 'Global Seller'
  | 'High Earner'     // New
  | 'Fast Growth'     // New
  | 'Top Seller'      // New
  | 'Repeat Magnet';  // New

export type LevelType = 'Starter' | 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Elite' | 'Grandmaster';

export interface LevelRequirements {
  xp: number;
  earnings: number;
  jobs: number;
  rating: number;
}

export interface LevelConfig {
  name: LevelType;
  color: string;
  perks: string[];
  requirements: LevelRequirements;
}

export interface GamificationStats {
  xp: number;
  level: LevelType;
  nextLevelXp: number;
  score: number; // The calculated ranking score
  loginStreak: number;
  jobStreak: number; // Zero cancellation streak
  badges: BadgeType[];
  rank: {
    global: number;
    local: number;
    category: number;
  };
  monthlyAwards?: string[];
  // New tracking for leveling
  totalEarnings: number;
  lifetimeJobs: number;
  currentRating: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  verified: boolean;
  walletBalance: number;
  location?: string;
  phone?: string;
  skills?: string[];
  bio?: string;
  hourlyRate?: number;
  experience?: string;
  badges?: string[];
  joinedDate?: string;
  stats?: {
    rank?: number;
    totalEarned?: number;
    jobsCompleted?: number;
    hoursResponse?: number;
    rating?: number;
    completionRate?: number; // 0-100
    responseRate?: number; // 0-100
  };
  gamification?: GamificationStats;
  settings?: {
    pushNotifications: boolean;
    showOnLeaderboard: boolean;
  };
  trustScore?: number;
  verificationLevel?: 'New' | 'Verified' | 'Trusted' | 'Low Trust';
}

export interface Service {
  id: string;
  providerId: string;
  providerName: string;
  providerAvatar: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  reviewsCount: number;
  category: string;
  image: string;
  location: { lat: number; lng: number; address: string };
  isOnline: boolean;
  distance?: string;
  hourlyRate?: number;
  gamificationScore?: number;
  badges?: BadgeType[];
  level?: LevelType;
  // New Discovery Fields
  portfolio?: string[]; // For Pinterest Grid
  videoPreview?: string; // For TikTok Feed (Mocked)
  activity?: {
    viewsThisWeek: number;
    bookingsToday: number;
    lastActive: string;
  };
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  type: 'text' | 'image' | 'file' | 'audio' | 'system';
  previewUrl?: string; 
  isWatermarked?: boolean;
  isRead?: boolean;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isOnline: boolean;
}

export interface TimelineStep {
  title: string;
  date?: string;
  status: 'completed' | 'current' | 'pending';
  icon?: any;
}

export interface Booking {
  id: string;
  serviceId: string;
  providerId: string;
  providerName: string;
  providerAvatar: string;
  serviceTitle: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'disputed';
  amount: number;
  paymentStatus?: 'paid' | 'escrow' | 'pending';
  location?: string;
  timeline?: TimelineStep[];
  hasReview?: boolean;
}

export interface WalletTransaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'payment' | 'escrow_lock' | 'escrow_release' | 'refund';
  amount: number;
  date: string;
  status: 'success' | 'pending' | 'failed' | 'frozen';
  description: string;
  counterparty?: string;
  reference: string;
}

export interface EscrowItem {
  id: string;
  serviceTitle: string;
  amount: number;
  providerName: string;
  status: 'locked' | 'released' | 'disputed';
  date: string;
  bookingId: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'booking' | 'payment' | 'system' | 'message';
  read: boolean;
  timestamp: string;
}
