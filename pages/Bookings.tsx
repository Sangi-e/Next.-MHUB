import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, CheckCircle, Star, X, ThumbsUp, MessageSquare, Briefcase, AlertCircle, ChevronRight, Filter } from 'lucide-react';
import { Booking, UserRole } from '../types';

interface BookingsProps {
  role: UserRole;
}

const MOCK_BOOKINGS: Booking[] = [
    {
        id: '1',
        serviceId: 's1',
        providerId: 'p1',
        providerName: 'Sarah Johnson',
        providerAvatar: 'https://picsum.photos/100/100?random=2',
        serviceTitle: 'Logo Design Package',
        date: '2025-11-27',
        time: '14:00',
        status: 'confirmed',
        amount: 350
    },
    {
        id: '2',
        serviceId: 's3',
        providerId: 'p3',
        providerName: 'Michael Chen',
        providerAvatar: 'https://picsum.photos/100/100?random=3',
        serviceTitle: 'Car Engine Inspection',
        date: '2024-03-22',
        time: '14:00',
        status: 'completed',
        amount: 60
    },
    // Entrepreneur specific mocks (Incoming requests)
    {
        id: '3',
        serviceId: 's4',
        providerId: 'me', // assigned to me
        providerName: 'Customer: John Doe', // In Entrep view, providerName acts as Client Name
        providerAvatar: 'https://picsum.photos/100/100?random=4',
        serviceTitle: 'Plumbing Repair - Kitchen',
        date: '2025-12-01',
        time: '09:00',
        status: 'pending',
        amount: 5000
    },
    {
        id: '4',
        serviceId: 's4',
        providerId: 'me',
        providerName: 'Customer: Alice Smith',
        providerAvatar: 'https://picsum.photos/100/100?random=5',
        serviceTitle: 'Pipe Maintenance',
        date: '2025-11-28',
        time: '11:00',
        status: 'confirmed', // In progress
        amount: 12000
    }
];

export const Bookings: React.FC<BookingsProps> = ({ role }) => {
    // If Entrepreneur, show "Order Management" view
    if (role === 'entrepreneur') {
        return <EntrepreneurOrderView />;
    }
    // If Customer, show "My Bookings" view
    return <CustomerBookingView />;
};

// --- Entrepreneur View Components ---

const EntrepreneurOrderView: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'Requests' | 'Active' | 'History'>('Requests');

    // Filter logic for Entrepreneur
    const getOrders = () => {
        if (activeTab === 'Requests') return MOCK_BOOKINGS.filter(b => b.status === 'pending');
        if (activeTab === 'Active') return MOCK_BOOKINGS.filter(b => b.status === 'confirmed' || b.status === 'in-progress');
        return MOCK_BOOKINGS.filter(b => b.status === 'completed' || b.status === 'cancelled');
    };

    const orders = getOrders();

    return (
        <div className="min-h-screen bg-gray-50 p-4 pb-24">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Manage Orders</h1>
                    <p className="text-sm text-gray-500">Track jobs and incoming requests</p>
                </div>
                <div className="bg-indigo-50 p-2 rounded-full text-indigo-600">
                    <Briefcase size={24} />
                </div>
            </div>

            {/* Entrepreneur Tabs */}
            <div className="flex bg-white p-1 rounded-xl shadow-sm mb-6">
                {['Requests', 'Active', 'History'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
                            activeTab === tab 
                            ? 'bg-slate-900 text-white shadow-md' 
                            : 'text-gray-400 hover:text-gray-600'
                        }`}
                    >
                        {tab} {tab === 'Requests' && <span className="ml-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">1</span>}
                    </button>
                ))}
            </div>

            {/* Orders List */}
            <div className="space-y-4">
                {orders.length > 0 ? (
                    orders.map(order => (
                        <EntrepreneurOrderCard key={order.id} order={order} />
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                        <Briefcase size={48} className="mb-4 opacity-20" />
                        <p className="font-medium">No {activeTab.toLowerCase()} orders</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const EntrepreneurOrderCard: React.FC<{ order: Booking }> = ({ order }) => {
    const isPending = order.status === 'pending';

    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 relative overflow-hidden">
            {isPending && <div className="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>}
            
            <div className="flex justify-between items-start mb-4 pl-2">
                <div className="flex items-center space-x-3">
                    <img src={order.providerAvatar} className="w-10 h-10 rounded-full object-cover border border-gray-100" alt="Client" />
                    <div>
                        <h4 className="font-bold text-slate-800 text-sm">{order.providerName}</h4>
                        <p className="text-xs text-gray-500">Client</p>
                    </div>
                </div>
                <span className="text-lg font-bold text-indigo-600">₦{order.amount.toLocaleString()}</span>
            </div>

            <div className="bg-gray-50 p-3 rounded-xl mb-4 pl-4">
                <h5 className="font-bold text-sm text-slate-700 mb-1">{order.serviceTitle}</h5>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center">
                        <CalendarIcon size={14} className="mr-1" /> {order.date}
                    </div>
                    <div className="flex items-center">
                        <Clock size={14} className="mr-1" /> {order.time}
                    </div>
                </div>
            </div>

            <div className="flex space-x-3 pl-2">
                {isPending ? (
                    <>
                        <button className="flex-1 py-2.5 border border-red-200 text-red-600 rounded-lg text-xs font-bold hover:bg-red-50 transition-colors">
                            Decline
                        </button>
                        <button className="flex-1 py-2.5 bg-indigo-600 text-white rounded-lg text-xs font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors">
                            Accept Request
                        </button>
                    </>
                ) : (
                    <>
                        <button className="flex-1 py-2.5 bg-gray-100 text-gray-600 rounded-lg text-xs font-bold hover:bg-gray-200 transition-colors flex items-center justify-center">
                            <MessageSquare size={16} className="mr-2"/> Message
                        </button>
                        {order.status !== 'completed' && (
                            <button className="flex-1 py-2.5 bg-green-600 text-white rounded-lg text-xs font-bold shadow-lg shadow-green-200 hover:bg-green-700 transition-colors flex items-center justify-center">
                                <CheckCircle size={16} className="mr-2"/> Mark Done
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};


// --- Customer View Components ---

const QUICK_TAGS = [
    "Punctual", 
    "Professional", 
    "Great Value", 
    "Expert Service", 
    "Friendly", 
    "Clean Work",
    "Fast Delivery",
    "Creative"
];

const CustomerBookingView: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'Upcoming' | 'Past'>('Upcoming');
    
    // Review Modal State
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const handleOpenReview = (booking: Booking) => {
        setSelectedBooking(booking);
        setRating(0);
        setComment('');
        setSelectedTags([]);
        setIsReviewModalOpen(true);
    };

    const toggleTag = (tag: string) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const submitReview = () => {
        setIsReviewModalOpen(false);
    };

    // Filter Logic for Customer
    const filteredBookings = activeTab === 'Upcoming' 
        ? MOCK_BOOKINGS.filter(b => b.status === 'confirmed' && b.providerId.startsWith('p')) // filtering out entrepreneur mocks
        : MOCK_BOOKINGS.filter(b => b.status === 'completed' && b.providerId.startsWith('p'));

    return (
        <div className="min-h-screen bg-gray-50 p-4 pb-24">
            <h1 className="text-2xl font-bold text-slate-900 mb-1">My Bookings</h1>
            <p className="text-sm text-gray-500 mb-6">Track and manage your appointments</p>

            {/* Tabs */}
            <div className="flex bg-white p-1 rounded-xl shadow-sm mb-6">
                {['Upcoming', 'Past'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                            activeTab === tab 
                            ? 'bg-white text-slate-900 shadow-sm border border-gray-100 font-bold' 
                            : 'text-gray-400 hover:text-gray-600'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="space-y-4">
                {filteredBookings.length > 0 ? (
                    filteredBookings.map(booking => (
                        <CustomerBookingCard key={booking.id} booking={booking} onReview={() => handleOpenReview(booking)} />
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                        <CalendarIcon size={48} className="mb-4 opacity-20" />
                        <p className="font-medium">No {activeTab.toLowerCase()} bookings</p>
                    </div>
                )}
            </div>

            {/* Review Modal */}
            {isReviewModalOpen && selectedBooking && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
                        {/* Modal Header */}
                        <div className="bg-indigo-600 p-6 text-white relative">
                            <button 
                                onClick={() => setIsReviewModalOpen(false)}
                                className="absolute top-4 right-4 text-white/70 hover:text-white"
                            >
                                <X size={24} />
                            </button>
                            <h3 className="text-lg font-bold">Rate Experience</h3>
                            <p className="text-indigo-100 text-sm opacity-90">How was your service with {selectedBooking.providerName}?</p>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Star Rating */}
                            <div className="flex flex-col items-center space-y-2">
                                <div className="flex space-x-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button 
                                            key={star}
                                            onClick={() => setRating(star)}
                                            className="transition-transform hover:scale-110 focus:outline-none"
                                        >
                                            <Star 
                                                size={32} 
                                                className={`${rating >= star ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                                                strokeWidth={rating >= star ? 0 : 2}
                                            />
                                        </button>
                                    ))}
                                </div>
                                <span className="text-sm font-medium text-slate-600">
                                    {rating === 0 ? 'Select a rating' : 
                                     rating === 5 ? 'Excellent!' : 
                                     rating === 4 ? 'Very Good' : 
                                     rating === 3 ? 'Average' : 'Could be better'}
                                </span>
                            </div>

                            {/* Quick Tags */}
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3 block">Quick Tags</label>
                                <div className="flex flex-wrap gap-2">
                                    {QUICK_TAGS.map(tag => (
                                        <button
                                            key={tag}
                                            onClick={() => toggleTag(tag)}
                                            className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${
                                                selectedTags.includes(tag)
                                                ? 'bg-indigo-600 text-white border-indigo-600'
                                                : 'bg-white text-gray-500 border-gray-200 hover:border-indigo-300'
                                            }`}
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Comment */}
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2 block">Remarks</label>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Share details about your experience..."
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none h-24"
                                />
                            </div>

                            {/* Action Buttons */}
                            <button 
                                onClick={submitReview}
                                disabled={rating === 0}
                                className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-indigo-200 disabled:bg-gray-300 disabled:shadow-none hover:bg-indigo-700 transition-all flex items-center justify-center"
                            >
                                <ThumbsUp size={18} className="mr-2" /> Submit Review
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const CustomerBookingCard: React.FC<{ booking: Booking; onReview: () => void }> = ({ booking, onReview }) => {
    const isCompleted = booking.status === 'completed';

    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                    <img src={booking.providerAvatar} className="w-12 h-12 rounded-full object-cover border border-gray-100" />
                    <div>
                        <h4 className="font-bold text-slate-800 text-sm">{booking.providerName}</h4>
                        <p className="text-xs text-gray-500">{booking.serviceTitle}</p>
                    </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                    isCompleted ? 'bg-green-50 text-green-600' : 'bg-green-100 text-green-700'
                }`}>
                    {booking.status}
                </span>
            </div>

            <div className="flex items-center space-x-6 mb-4">
                <div className="flex items-center text-sm text-slate-600">
                    <CalendarIcon size={16} className="mr-2 text-gray-400" />
                    {new Date(booking.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </div>
                <div className="flex items-center text-sm text-slate-600">
                    <Clock size={16} className="mr-2 text-gray-400" />
                    {booking.time}
                </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="text-indigo-600 font-bold">
                    ${booking.amount}
                </div>
                <div className="flex space-x-2">
                    {!isCompleted ? (
                        <>
                             <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 text-xs font-bold rounded-lg hover:bg-gray-50 transition-colors">
                                Reschedule
                            </button>
                            <button className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 shadow-sm shadow-indigo-100 transition-colors">
                                Message
                            </button>
                        </>
                    ) : (
                        <button 
                            onClick={onReview}
                            className="px-4 py-2 bg-indigo-50 text-indigo-600 border border-indigo-100 text-xs font-bold rounded-lg hover:bg-indigo-100 transition-colors flex items-center"
                        >
                            <Star size={14} className="mr-1.5" /> Leave a Review
                        </button>
                    )}
                </div>
            </div>
            
            {isCompleted && (
                 <div className="mt-3 flex items-center text-xs text-green-600 bg-green-50/50 p-2 rounded-lg">
                    <CheckCircle size={14} className="mr-1.5" /> Service Delivery Complete
                 </div>
            )}
        </div>
    )
}