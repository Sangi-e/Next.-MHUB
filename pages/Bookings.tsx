
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon, Clock, CheckCircle, Star, X, Briefcase, AlertCircle, ChevronRight, Filter, Package, Loader, Archive, ArrowUpRight } from 'lucide-react';
import { Booking, UserRole } from '../types';
import { MOCK_BOOKINGS } from '../services/mockData';

interface BookingsProps {
  role: UserRole;
}

export const Bookings: React.FC<BookingsProps> = ({ role }) => {
    // If Entrepreneur, show "Order Management" view
    if (role === 'entrepreneur') {
        return <EntrepreneurOrderView />;
    }
    // If Customer, show new Redesigned Customer View
    return <CustomerBookingView />;
};

// --- Entrepreneur View Components (Kept simple for now to focus on Customer redesign) ---
const EntrepreneurOrderView: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'Requests' | 'Active' | 'History'>('Requests');
    // Using MOCK_BOOKINGS from service, filtering for entrepreneur 'me'
    const myOrders = MOCK_BOOKINGS.filter(b => b.providerId === 'me');

    const getOrders = () => {
        if (activeTab === 'Requests') return myOrders.filter(b => b.status === 'pending');
        if (activeTab === 'Active') return myOrders.filter(b => b.status === 'confirmed' || b.status === 'in-progress');
        return myOrders.filter(b => b.status === 'completed' || b.status === 'cancelled');
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
            {/* Simple Entrepreneur Tabs */}
            <div className="flex bg-white p-1 rounded-xl shadow-sm mb-6">
                {['Requests', 'Active', 'History'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
                            activeTab === tab ? 'bg-slate-900 text-white shadow-md' : 'text-gray-400 hover:text-gray-600'
                        }`}
                    >
                        {tab} {tab === 'Requests' && <span className="ml-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">1</span>}
                    </button>
                ))}
            </div>
            {/* List */}
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
    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                    <img src={order.providerAvatar} className="w-10 h-10 rounded-full object-cover border border-gray-100" />
                    <div>
                        <h4 className="font-bold text-slate-800 text-sm">{order.providerName}</h4>
                        <p className="text-xs text-gray-500">Client</p>
                    </div>
                </div>
                <span className="text-lg font-bold text-indigo-600">₦{order.amount.toLocaleString()}</span>
            </div>
            <p className="text-sm font-medium text-slate-700 mb-3">{order.serviceTitle}</p>
            <div className="flex space-x-2">
                 <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600 font-bold capitalize">{order.status}</span>
            </div>
        </div>
    );
};

// --- CUSTOMER VIEW COMPONENTS (REDESIGNED) ---

type TabType = 'All' | 'Pending' | 'Accepted' | 'In Progress' | 'Completed' | 'Cancelled';

const CustomerBookingView: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<TabType>('All');
    
    // Filter out Entrepreneur mocks (providerId === 'me')
    const customerBookings = MOCK_BOOKINGS.filter(b => b.providerId !== 'me');

    // Counts
    const counts = {
        total: customerBookings.length,
        active: customerBookings.filter(b => ['confirmed', 'in-progress', 'accepted'].includes(b.status)).length,
        completed: customerBookings.filter(b => b.status === 'completed').length,
        cancelled: customerBookings.filter(b => ['cancelled', 'disputed'].includes(b.status)).length
    };

    const getFilteredBookings = () => {
        switch (activeTab) {
            case 'All': return customerBookings;
            case 'Pending': return customerBookings.filter(b => b.status === 'pending');
            case 'Accepted': return customerBookings.filter(b => b.status === 'confirmed'); // mapping confirmed to Accepted for UI
            case 'In Progress': return customerBookings.filter(b => b.status === 'in-progress');
            case 'Completed': return customerBookings.filter(b => b.status === 'completed');
            case 'Cancelled': return customerBookings.filter(b => ['cancelled', 'disputed'].includes(b.status));
            default: return customerBookings;
        }
    };

    const displayBookings = getFilteredBookings();

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            
            {/* Header */}
            <div className="bg-white p-4 pb-2 sticky top-0 z-20 shadow-sm">
                 <h1 className="text-2xl font-bold text-slate-900 mb-4">My Orders</h1>
                 
                 {/* Summary Cards */}
                 <div className="grid grid-cols-4 gap-2 mb-4">
                     <SummaryCard 
                        label="Total" 
                        count={counts.total} 
                        icon={Package} 
                        color="bg-blue-50 text-blue-600" 
                        onClick={() => setActiveTab('All')} 
                        active={activeTab === 'All'}
                     />
                     <SummaryCard 
                        label="Active" 
                        count={counts.active} 
                        icon={Loader} 
                        color="bg-indigo-50 text-indigo-600" 
                        onClick={() => setActiveTab('Accepted')} // or In Progress
                        active={activeTab === 'Accepted' || activeTab === 'In Progress'}
                     />
                     <SummaryCard 
                        label="Done" 
                        count={counts.completed} 
                        icon={CheckCircle} 
                        color="bg-green-50 text-green-600" 
                        onClick={() => setActiveTab('Completed')} 
                        active={activeTab === 'Completed'}
                     />
                     <SummaryCard 
                        label="Void" 
                        count={counts.cancelled} 
                        icon={X} 
                        color="bg-red-50 text-red-600" 
                        onClick={() => setActiveTab('Cancelled')} 
                        active={activeTab === 'Cancelled'}
                     />
                 </div>

                 {/* Sticky Tabs */}
                 <div className="flex overflow-x-auto no-scrollbar space-x-2 pb-2">
                     {['All', 'Pending', 'Accepted', 'In Progress', 'Completed', 'Cancelled'].map(tab => (
                         <button
                            key={tab}
                            onClick={() => setActiveTab(tab as TabType)}
                            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                                activeTab === tab
                                ? 'bg-slate-900 text-white border-slate-900'
                                : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
                            }`}
                         >
                             {tab}
                         </button>
                     ))}
                 </div>
            </div>

            {/* List */}
            <div className="p-4 space-y-4">
                {displayBookings.length > 0 ? (
                    displayBookings.map(booking => (
                        <OrderListCard 
                            key={booking.id} 
                            booking={booking} 
                            onClick={() => navigate(`/booking/${booking.id}`)}
                            onMessage={() => navigate('/chat')}
                        />
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-300">
                            <Archive size={32} />
                        </div>
                        <h3 className="font-bold text-slate-800">No Orders Found</h3>
                        <p className="text-xs text-gray-500 mt-1">You don't have any orders in this category.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const SummaryCard = ({ label, count, icon: Icon, color, onClick, active }: any) => (
    <div 
        onClick={onClick}
        className={`rounded-xl p-2 flex flex-col items-center justify-center cursor-pointer transition-all border ${active ? 'bg-white border-indigo-600 ring-1 ring-indigo-600' : 'bg-white border-gray-100 hover:border-gray-200'}`}
    >
        <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${color}`}>
            <Icon size={16} />
        </div>
        <span className="text-lg font-bold text-slate-800 leading-none">{count}</span>
        <span className="text-[10px] text-gray-400 font-medium mt-1">{label}</span>
    </div>
);

const OrderListCard: React.FC<{ booking: Booking, onClick: () => void, onMessage: () => void }> = ({ booking, onClick, onMessage }) => {
    // Status Badge Logic
    let statusColor = 'bg-gray-100 text-gray-600';
    let statusLabel: string = booking.status;

    if (booking.status === 'confirmed' || booking.status === 'in-progress') {
        statusColor = 'bg-blue-100 text-blue-700';
        statusLabel = 'In Progress';
    } else if (booking.status === 'completed') {
        statusColor = 'bg-green-100 text-green-700';
    } else if (booking.status === 'pending') {
        statusColor = 'bg-yellow-100 text-yellow-700';
    } else if (booking.status === 'cancelled') {
        statusColor = 'bg-red-100 text-red-700';
    }

    return (
        <div 
            onClick={onClick}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 active:scale-[0.98] transition-transform cursor-pointer"
        >
            {/* Top Row */}
            <div className="flex justify-between items-start mb-3">
                 <div className="flex items-center space-x-3">
                     <img src={booking.providerAvatar} className="w-10 h-10 rounded-full object-cover border border-gray-100" />
                     <div>
                         <h4 className="font-bold text-slate-800 text-sm">{booking.providerName}</h4>
                         <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${statusColor}`}>
                             {statusLabel}
                         </span>
                     </div>
                 </div>
                 <div className="text-right">
                     <span className="block font-bold text-indigo-600">₦{booking.amount.toLocaleString()}</span>
                     <span className="text-[10px] text-gray-400 capitalize">{booking.paymentStatus || 'Pending'}</span>
                 </div>
            </div>

            {/* Service Detail */}
            <div className="bg-gray-50 rounded-xl p-3 mb-3 flex justify-between items-center">
                <div>
                    <h5 className="font-bold text-sm text-slate-700">{booking.serviceTitle}</h5>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                        <CalendarIcon size={12} className="mr-1"/> {booking.date}
                    </div>
                </div>
                <ChevronRight size={16} className="text-gray-300" />
            </div>

            {/* Quick Actions */}
            <div className="flex space-x-2 pt-1">
                <button 
                    onClick={(e) => { e.stopPropagation(); onMessage(); }}
                    className="flex-1 py-2 bg-white border border-gray-200 text-slate-600 text-xs font-bold rounded-lg hover:bg-gray-50"
                >
                    Message
                </button>
                <button 
                    onClick={(e) => { e.stopPropagation(); onClick(); }}
                    className="flex-1 py-2 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-lg hover:bg-indigo-100"
                >
                    View Details
                </button>
            </div>
        </div>
    );
};
