
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Calendar, Wallet, ShieldAlert, Tag, Check, Trash2 } from 'lucide-react';

export const Notifications: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'All' | 'Unread'>('All');

  // Mock Data
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'booking', title: 'Booking Confirmed', msg: 'Your plumbing service with Adeola is confirmed for tomorrow.', time: '2 mins ago', read: false },
    { id: 2, type: 'wallet', title: 'Payment Successful', msg: 'You released ₦5,000 to Sarah Tech.', time: '1 hour ago', read: false },
    { id: 3, type: 'security', title: 'New Login Detected', msg: 'We noticed a login from a new device (iPhone 13).', time: 'Yesterday', read: true },
    { id: 4, type: 'promo', title: '20% Off Weekend', msg: 'Get 20% off all cleaning services this weekend!', time: '2 days ago', read: true },
    { id: 5, type: 'booking', title: 'Service Completed', msg: 'How was your experience with Musa Auto?', time: '3 days ago', read: true },
  ]);

  const filtered = filter === 'All' ? notifications : notifications.filter(n => !n.read);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: string) => {
      switch(type) {
          case 'booking': return <Calendar size={18} />;
          case 'wallet': return <Wallet size={18} />;
          case 'security': return <ShieldAlert size={18} />;
          case 'promo': return <Tag size={18} />;
          default: return <Bell size={18} />;
      }
  };

  const getColor = (type: string) => {
      switch(type) {
          case 'booking': return 'bg-blue-100 text-blue-600';
          case 'wallet': return 'bg-green-100 text-green-600';
          case 'security': return 'bg-red-100 text-red-600';
          case 'promo': return 'bg-purple-100 text-purple-600';
          default: return 'bg-gray-100 text-gray-600';
      }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm sticky top-0 z-10">
         <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
                <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-indigo-600">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-lg font-bold text-slate-800">Notifications</h1>
            </div>
            <button onClick={markAllRead} className="text-xs font-bold text-indigo-600 hover:text-indigo-700">
                Mark all read
            </button>
         </div>

         <div className="flex space-x-2">
             {['All', 'Unread'].map(tab => (
                 <button
                    key={tab}
                    onClick={() => setFilter(tab as any)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
                        filter === tab ? 'bg-slate-800 text-white' : 'bg-gray-100 text-gray-500'
                    }`}
                 >
                     {tab}
                 </button>
             ))}
         </div>
      </div>

      <div className="p-4 space-y-3">
          {filtered.length > 0 ? (
              filtered.map(notif => (
                  <div key={notif.id} className={`p-4 rounded-2xl flex items-start space-x-4 transition-colors ${notif.read ? 'bg-white border border-gray-100' : 'bg-indigo-50/50 border border-indigo-100'}`}>
                      <div className={`p-2.5 rounded-full flex-shrink-0 ${getColor(notif.type)}`}>
                          {getIcon(notif.type)}
                      </div>
                      <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                              <h4 className={`text-sm font-bold ${notif.read ? 'text-slate-800' : 'text-indigo-900'}`}>{notif.title}</h4>
                              <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">{notif.time}</span>
                          </div>
                          <p className={`text-xs leading-relaxed ${notif.read ? 'text-gray-500' : 'text-slate-600'}`}>
                              {notif.msg}
                          </p>
                      </div>
                      {!notif.read && (
                          <div className="w-2 h-2 rounded-full bg-red-500 mt-2"></div>
                      )}
                  </div>
              ))
          ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
                      <Bell size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">No Notifications</h3>
                  <p className="text-sm text-gray-500">You're all caught up!</p>
              </div>
          )}
      </div>
    </div>
  );
};
