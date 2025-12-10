import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MobileContainer, BottomNav, DesktopSidebar } from './components/Layout';
import { Auth } from './pages/Auth';
import { Home } from './pages/Home';
import { Chat } from './pages/Chat';
import { Wallet } from './pages/Wallet';
import { Bookings } from './pages/Bookings';
import { Profile } from './pages/Profile';
import { EditProfile } from './pages/EditProfile';
import { Leaderboard } from './pages/Leaderboard';
import { AdminDashboard } from './pages/Admin';
import { VerificationCenter } from './pages/VerificationCenter';
import { TrustScore } from './pages/TrustScore';
import { DisputeCenter } from './pages/DisputeCenter';
import { Transactions } from './pages/Transactions';
import { ReferFriends } from './pages/ReferFriends';
import { Favorites } from './pages/Favorites';
import { SafetyCenter } from './pages/SafetyCenter';
import { Settings } from './pages/Settings';
import { HelpSupport } from './pages/HelpSupport';
import { ServiceDetails } from './pages/ServiceDetails';
import { Notifications } from './pages/Notifications';
import { UserRole, User } from './types';

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole | null>(null);
  
  // Default mock user
  const [user, setUser] = useState<User>({
    id: '1',
    name: 'Emmanuel Doe',
    email: 'emmanuel.doe@example.com',
    role: 'entrepreneur',
    avatar: 'https://picsum.photos/150/150?random=88',
    verified: true,
    walletBalance: 85000,
    location: 'Yaba, Lagos',
    phone: '+234 812 345 6789',
    bio: 'Experienced plumber and technician dedicated to delivering high-quality repairs and installations.',
    skills: ['Plumbing', 'Pipe Repair', 'Leak Detection', 'Installation'],
    hourlyRate: 5000,
    experience: '5 years',
    stats: {
        rating: 4.9,
        jobsCompleted: 24,
        rank: 12
    }
  });

  // Reset user mock data when role changes
  useEffect(() => {
    if (role === 'customer') {
        setUser({
            id: '2',
            name: 'Sarah Client',
            email: 'sarah.client@example.com',
            role: 'customer',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
            verified: true,
            walletBalance: 145000,
            location: 'Lagos, Nigeria',
            phone: '+234 800 123 4567',
            bio: 'Looking for reliable professionals for home improvement projects.',
            stats: { rating: 5.0, jobsCompleted: 12 }
        })
    } else if (role === 'entrepreneur') {
        setUser({
            id: '1',
            name: 'Emmanuel Doe',
            email: 'emmanuel.doe@example.com',
            role: 'entrepreneur',
            avatar: 'https://picsum.photos/150/150?random=88',
            verified: true,
            walletBalance: 85000,
            location: 'Yaba, Lagos',
            phone: '+234 812 345 6789',
            bio: 'Experienced plumber and technician dedicated to delivering high-quality repairs and installations.',
            skills: ['Plumbing', 'Pipe Repair', 'Leak Detection', 'Installation'],
            hourlyRate: 5000,
            experience: '5 years',
            stats: { rating: 4.9, jobsCompleted: 24, rank: 12 }
        })
    }
  }, [role]);

  const handleUpdateUser = (updatedUser: User) => {
      setUser(updatedUser);
  };

  const handleLogout = () => {
    setRole(null);
  };

  return (
    <Router>
      {!role ? (
        <Auth setRole={setRole} />
      ) : (
        <div className="flex">
          {role !== 'admin' && <DesktopSidebar role={role} />}
          
          <main className="flex-1 w-full relative">
            <Routes>
              {role === 'admin' ? (
                 <Route path="*" element={<AdminDashboard onLogout={handleLogout} />} />
              ) : (
                <>
                  <Route path="/" element={<Navigate to="/home" replace />} />
                  <Route path="/home" element={<MobileContainer><Home role={role} /></MobileContainer>} />
                  <Route path="/leaderboard" element={<MobileContainer><Leaderboard /></MobileContainer>} />
                  <Route path="/wallet" element={<MobileContainer><Wallet role={role} /></MobileContainer>} />
                  <Route path="/bookings" element={<MobileContainer><Bookings role={role} /></MobileContainer>} />
                  <Route path="/chat" element={<MobileContainer><Chat /></MobileContainer>} />
                  <Route path="/profile" element={<MobileContainer><Profile user={user} onLogout={handleLogout} /></MobileContainer>} />
                  <Route path="/edit-profile" element={<MobileContainer><EditProfile user={user} onUpdateUser={handleUpdateUser} /></MobileContainer>} />
                  <Route path="/verification" element={<MobileContainer><VerificationCenter /></MobileContainer>} />
                  <Route path="/trust-score" element={<MobileContainer><TrustScore /></MobileContainer>} />
                  <Route path="/disputes" element={<MobileContainer><DisputeCenter /></MobileContainer>} />
                  <Route path="/transactions" element={<MobileContainer><Transactions role={role} /></MobileContainer>} />
                  <Route path="/refer" element={<MobileContainer><ReferFriends /></MobileContainer>} />
                  <Route path="/favorites" element={<MobileContainer><Favorites /></MobileContainer>} />
                  <Route path="/safety" element={<MobileContainer><SafetyCenter /></MobileContainer>} />
                  <Route path="/settings" element={<MobileContainer><Settings /></MobileContainer>} />
                  <Route path="/help" element={<MobileContainer><HelpSupport /></MobileContainer>} />
                  <Route path="/service/:id" element={<MobileContainer><ServiceDetails /></MobileContainer>} />
                  <Route path="/notifications" element={<MobileContainer><Notifications /></MobileContainer>} />
                </>
              )}
            </Routes>
            {role !== 'admin' && <BottomNav role={role} />}
          </main>
        </div>
      )}
    </Router>
  );
};

export default App;