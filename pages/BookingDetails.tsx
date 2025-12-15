
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageSquare, Phone, MapPin, Clock, ShieldCheck, CheckCircle, Lock, AlertTriangle, Star, Copy, ThumbsUp, X, Send } from 'lucide-react';
import { MOCK_BOOKINGS } from '../services/mockData';
import { Booking } from '../types';

interface BookingDetailsProps {
    role: string;
}

export const BookingDetails: React.FC<BookingDetailsProps> = ({ role }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // Find booking or use a fallback
    const booking = MOCK_BOOKINGS.find(b => b.id === id);
    
    // State for local interactions
    const [status, setStatus] = useState(booking?.status || 'confirmed');
    const [showReleaseModal, setShowReleaseModal] = useState(false);
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [reviewSubmitted, setReviewSubmitted] = useState(booking?.hasReview || false);

    if (!booking) {
        return <div className="p-8 text-center">Order not found</div>;
    }

    const handleReleasePayment = () => {
        setShowReleaseModal(false);
        setStatus('completed');
        // In real app, API call here
    };

    const handleSubmitReview = () => {
        setReviewSubmitted(true);
        // API call to save review
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            
            {/* Header */}
            <div className="bg-white p-4 sticky top-0 z-20 shadow-sm flex items-center justify-between">
                <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-indigo-600">
                    <ArrowLeft size={24} />
                </button>
                <div className="text-center">
                    <h1 className="font-bold text-slate-800">Order #{booking.id}</h1>
                    <span className="text-[10px] text-gray-500 uppercase tracking-wide font-medium">{booking.date}</span>
                </div>
                <button className="text-gray-400 hover:text-indigo-600">
                    <Phone size={20} />
                </button>
            </div>

            <div className="p-4 space-y-6">

                {/* Status Hero */}
                <StatusHero status={status} />

                {/* 1. Service & Provider Card */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                     <div className="flex justify-between items-start mb-4">
                         <h2 className="text-lg font-bold text-slate-800 leading-tight">{booking.serviceTitle}</h2>
                         <div className="bg-indigo-50 text-indigo-600 px-2 py-1 rounded text-xs font-bold">
                            ₦{booking.amount.toLocaleString()}
                         </div>
                     </div>
                     
                     <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                         <div className="flex items-center space-x-3">
                             <img src={booking.providerAvatar} className="w-10 h-10 rounded-full object-cover" />
                             <div>
                                 <p className="text-xs text-gray-500">Service Provider</p>
                                 <h4 className="font-bold text-slate-800 text-sm">{booking.providerName}</h4>
                             </div>
                         </div>
                         <button 
                            onClick={() => navigate('/chat')}
                            className="bg-gray-100 p-2 rounded-full text-slate-600 hover:bg-indigo-100 hover:text-indigo-600 transition-colors"
                         >
                             <MessageSquare size={18} />
                         </button>
                     </div>

                     <div className="mt-4 bg-gray-50 rounded-xl p-3 space-y-2">
                         <div className="flex items-center text-xs text-gray-500">
                             <MapPin size={14} className="mr-2 text-gray-400" />
                             {booking.location || 'Remote Service'}
                         </div>
                         <div className="flex items-center text-xs text-gray-500">
                             <Clock size={14} className="mr-2 text-gray-400" />
                             {booking.time} • Est. Duration: 2 hrs
                         </div>
                     </div>
                </div>

                {/* 2. Timeline */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <h3 className="font-bold text-slate-800 mb-4 text-sm">Order Timeline</h3>
                    <div className="relative pl-2">
                         {/* Vertical Line */}
                         <div className="absolute left-[7px] top-2 bottom-6 w-0.5 bg-gray-100"></div>

                         {booking.timeline?.map((step, idx) => (
                             <div key={idx} className="flex items-start mb-6 last:mb-0 relative z-10">
                                 <div className={`w-4 h-4 rounded-full border-2 mr-4 mt-0.5 flex-shrink-0 ${
                                     step.status === 'completed' ? 'bg-green-500 border-green-500' :
                                     step.status === 'current' ? 'bg-white border-indigo-600 ring-2 ring-indigo-100' :
                                     'bg-white border-gray-300'
                                 }`}></div>
                                 <div>
                                     <h4 className={`text-sm font-bold ${
                                         step.status === 'completed' || step.status === 'current' ? 'text-slate-800' : 'text-gray-400'
                                     }`}>{step.title}</h4>
                                     {step.date && <p className="text-[10px] text-gray-400 mt-0.5">{step.date}</p>}
                                 </div>
                             </div>
                         ))}
                    </div>
                </div>

                {/* 3. Payment / Escrow Card */}
                {status !== 'completed' && status !== 'cancelled' ? (
                     <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5">
                         <div className="flex items-start space-x-3 mb-4">
                             <div className="bg-white p-2 rounded-full shadow-sm text-orange-500">
                                 <Lock size={20} />
                             </div>
                             <div>
                                 <h3 className="font-bold text-orange-900 text-sm">Payment Held in Escrow</h3>
                                 <p className="text-xs text-orange-800/80 mt-1 leading-relaxed">
                                     Your ₦{booking.amount.toLocaleString()} is safe. Only release it when the job is done.
                                 </p>
                             </div>
                         </div>
                         <button 
                            onClick={() => setShowReleaseModal(true)}
                            className="w-full bg-orange-600 text-white py-3 rounded-xl font-bold text-sm shadow-md shadow-orange-200 hover:bg-orange-700 transition-colors"
                         >
                             Release Payment
                         </button>
                         <p className="text-[10px] text-center text-orange-600/70 mt-2 font-medium">Protected by Nexus Guarantee</p>
                     </div>
                ) : status === 'completed' ? (
                     <div className="bg-green-50 border border-green-100 rounded-2xl p-5 flex items-center justify-between">
                         <div className="flex items-center space-x-3">
                             <CheckCircle size={24} className="text-green-600" />
                             <div>
                                 <h3 className="font-bold text-green-800 text-sm">Payment Released</h3>
                                 <p className="text-xs text-green-700">Funds transferred to provider</p>
                             </div>
                         </div>
                         <button className="text-xs font-bold text-green-700 underline">View Receipt</button>
                     </div>
                ) : null}

                {/* 4. Review Section (If Completed) */}
                {status === 'completed' && !reviewSubmitted && (
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4">
                        <div className="text-center mb-4">
                            <h3 className="font-bold text-slate-800">Rate your experience</h3>
                            <p className="text-xs text-gray-500">How was the service provided by {booking.providerName}?</p>
                        </div>
                        
                        <div className="flex justify-center space-x-2 mb-4">
                            {[1, 2, 3, 4, 5].map(star => (
                                <button key={star} onClick={() => setRating(star)} className="transition-transform hover:scale-110">
                                    <Star size={32} className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'} strokeWidth={star <= rating ? 0 : 2} />
                                </button>
                            ))}
                        </div>

                        <textarea 
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            placeholder="Write a quick review..."
                            className="w-full p-3 bg-gray-50 rounded-xl text-sm border-none mb-4 h-24 resize-none"
                        />

                        <button 
                            onClick={handleSubmitReview}
                            disabled={rating === 0}
                            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-200"
                        >
                            Submit Review
                        </button>
                    </div>
                )}

                {/* Review Submitted State */}
                {status === 'completed' && reviewSubmitted && (
                     <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 text-center">
                         <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-2 text-blue-500 shadow-sm">
                             <ThumbsUp size={20} />
                         </div>
                         <h3 className="font-bold text-blue-900 text-sm">Thanks for your feedback!</h3>
                         <p className="text-xs text-blue-800/70">Your review helps the community.</p>
                     </div>
                )}

                {/* Safety Actions */}
                <div className="pt-4 flex justify-center space-x-6">
                    <button onClick={() => navigate('/disputes')} className="flex items-center text-xs font-bold text-gray-400 hover:text-red-500 transition-colors">
                        <AlertTriangle size={14} className="mr-1" /> Report an Issue
                    </button>
                    <button className="flex items-center text-xs font-bold text-gray-400 hover:text-indigo-500 transition-colors">
                        <ShieldCheck size={14} className="mr-1" /> Safety Center
                    </button>
                </div>

            </div>

            {/* Release Payment Modal */}
            {showReleaseModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white rounded-3xl w-full max-w-sm p-6 text-center shadow-2xl">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                            <Lock size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Release Payment?</h3>
                        <p className="text-sm text-gray-500 mb-6">
                            Are you sure the job is completed? Once released, funds cannot be reversed from Escrow.
                        </p>
                        <div className="space-y-3">
                            <button 
                                onClick={handleReleasePayment}
                                className="w-full bg-green-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-green-200 hover:bg-green-700"
                            >
                                Yes, Release Funds
                            </button>
                            <button 
                                onClick={() => setShowReleaseModal(false)}
                                className="w-full py-3.5 text-gray-500 font-bold hover:bg-gray-50 rounded-xl"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const StatusHero: React.FC<{ status: string }> = ({ status }) => {
    let color = 'bg-blue-600';
    let label = 'In Progress';
    let sub = 'Provider is working';
    let icon = <Clock className="text-white/80" />;

    if (status === 'completed') {
        color = 'bg-green-600';
        label = 'Completed';
        sub = 'Job finished successfully';
        icon = <CheckCircle className="text-white/80" />;
    } else if (status === 'pending') {
        color = 'bg-yellow-500';
        label = 'Pending';
        sub = 'Waiting for provider';
    } else if (status === 'cancelled') {
        color = 'bg-red-500';
        label = 'Cancelled';
        sub = 'Order was cancelled';
        icon = <X className="text-white/80" />;
    }

    return (
        <div className={`${color} rounded-2xl p-6 text-white shadow-lg relative overflow-hidden`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <div className="flex justify-between items-center relative z-10">
                <div>
                    <h2 className="text-2xl font-bold">{label}</h2>
                    <p className="text-white/80 text-sm">{sub}</p>
                </div>
                <div className="bg-white/20 p-3 rounded-full backdrop-blur-md">
                    {icon}
                </div>
            </div>
        </div>
    );
}
