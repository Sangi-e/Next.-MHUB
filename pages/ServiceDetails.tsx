

import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, Star, MapPin, Clock, CheckCircle, ShieldCheck, MessageSquare, ChevronRight, Calendar, Check, Info, Users, Lock, X, Eye } from 'lucide-react';
import { MOCK_SERVICES } from './Home'; // We can import mock data from Home or define a local one if simpler

export const ServiceDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'About' | 'Reviews' | 'Portfolio'>('About');
  const [isSaved, setIsSaved] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [showEscrowInfo, setShowEscrowInfo] = useState(false);

  // Mock Data (Ideally fetched by ID)
  const service = {
    id: '1',
    title: 'Professional Plumbing & Leak Repair',
    price: 5000,
    unit: '/hr',
    rating: 4.9,
    reviews: 124,
    location: 'Lagos, Nigeria',
    description: 'I provide expert plumbing services including leak detection, pipe repair, and fixture installation. With over 10 years of experience, I ensure clean, fast, and reliable work for both residential and commercial properties.',
    features: ['Instant Booking', 'Warranty Included', 'Verified Pro', 'Covid-19 Compliant'],
    images: [
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80'
    ],
    provider: {
      name: 'Adeola Johnson',
      avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=150&q=80',
      level: 'Platinum',
      jobs: 342,
      responseTime: '< 1 hr',
      verified: true
    },
    reviewsList: [
      { id: 1, user: 'Chioma B.', rating: 5, date: '2 days ago', text: 'Adeola was punctual and fixed the leak in under an hour. Highly recommended!' },
      { id: 2, user: 'David O.', rating: 4, date: '1 week ago', text: 'Great service, but arrived slightly late due to traffic. Workmanship is top notch though.' }
    ],
    activity: {
        bookingsThisWeek: 12,
        viewsToday: 45
    }
  };

  const handleShare = () => {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Hero / Gallery */}
      <div className="relative h-72 bg-gray-200">
        <img src={service.images[0]} className="w-full h-full object-cover" alt="Service" />
        
        {/* Header Overlay */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent z-10">
            <button onClick={() => navigate(-1)} className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors">
                <ArrowLeft size={20} />
            </button>
            <div className="flex space-x-3">
                <button 
                    onClick={handleShare}
                    className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors relative"
                >
                    {isCopied ? <Check size={20} className="text-green-400" /> : <Share2 size={20} />}
                    {isCopied && <span className="absolute top-10 right-0 bg-black/70 text-white text-[10px] px-2 py-1 rounded">Link Copied</span>}
                </button>
                <button 
                    onClick={() => setIsSaved(!isSaved)}
                    className={`p-2 bg-white/20 backdrop-blur-md rounded-full transition-colors hover:bg-white/30 ${isSaved ? 'text-pink-500 bg-white' : 'text-white'}`}
                >
                    <Heart size={20} className={isSaved ? 'fill-pink-500' : ''} />
                </button>
            </div>
        </div>
        
        {/* Image Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {[0, 1, 2].map(i => (
                <div key={i} className={`h-1.5 rounded-full shadow-sm ${i === 0 ? 'w-6 bg-white' : 'w-1.5 bg-white/50'}`} />
            ))}
        </div>
      </div>

      <div className="p-5 -mt-6 bg-white rounded-t-3xl relative z-10 space-y-6">
          {/* Title & Price */}
          <div>
              {/* Urgency Pill */}
              <div className="flex items-center space-x-2 mb-2">
                   <div className="flex items-center text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-full border border-orange-100">
                       <Users size={12} className="mr-1" /> {service.activity.bookingsThisWeek} booked this week
                   </div>
                   <div className="flex items-center text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full border border-blue-100">
                       <Eye size={12} className="mr-1" /> {service.activity.viewsToday} viewing now
                   </div>
              </div>

              <div className="flex justify-between items-start mb-2">
                  <h1 className="text-xl font-bold text-slate-800 leading-tight max-w-[70%]">{service.title}</h1>
                  <div className="text-right">
                      <span className="block text-xl font-bold text-indigo-600">₦{service.price.toLocaleString()}</span>
                      <span className="text-xs text-gray-500">{service.unit}</span>
                  </div>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center text-yellow-500 font-bold">
                      <Star size={16} className="fill-yellow-500 mr-1" /> {service.rating} <span className="text-gray-400 font-normal ml-1">({service.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center">
                      <MapPin size={16} className="mr-1 text-gray-400" /> {service.location}
                  </div>
              </div>
          </div>

          {/* Provider Card with Trust Signals */}
          <div className="p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between bg-white relative overflow-hidden">
               {/* Decorative Background for High Tier */}
              {service.provider.level === 'Platinum' && <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-bl-full -mr-10 -mt-10 opacity-50"></div>}

              <div className="flex items-center space-x-3 relative z-10">
                  <div className="relative">
                      <img src={service.provider.avatar} className="w-12 h-12 rounded-full object-cover border border-gray-100" />
                      {service.provider.verified && (
                          <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-0.5 rounded-full border border-white">
                              <ShieldCheck size={10} />
                          </div>
                      )}
                  </div>
                  <div>
                      <h3 className="font-bold text-slate-800 text-sm flex items-center">
                          {service.provider.name}
                          <span className="ml-2 text-[8px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded uppercase font-bold tracking-wide">{service.provider.level}</span>
                      </h3>
                      <p className="text-xs text-gray-500">{service.provider.jobs} Jobs • Fast Responder</p>
                  </div>
              </div>
              <button onClick={() => navigate('/chat')} className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-colors z-10">
                  <MessageSquare size={20} />
              </button>
          </div>

          {/* Trust Banner (New) */}
          <div 
            onClick={() => setShowEscrowInfo(true)}
            className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 flex items-start space-x-3 cursor-pointer active:scale-[0.99] transition-transform"
          >
               <div className="bg-emerald-100 p-1.5 rounded-full text-emerald-600 mt-0.5">
                   <Lock size={16} />
               </div>
               <div className="flex-1">
                   <h4 className="font-bold text-sm text-emerald-900 flex items-center">
                       Handy Escrow Protected
                       <Info size={12} className="ml-1 text-emerald-500" />
                   </h4>
                   <p className="text-xs text-emerald-700 leading-snug">
                       Your payment is held securely until you approve the work. Money back guarantee.
                   </p>
               </div>
          </div>

          {/* Tabs */}
          <div>
              <div className="flex border-b border-gray-100 mb-4">
                  {['About', 'Reviews', 'Portfolio'].map(tab => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`flex-1 pb-3 text-sm font-bold transition-colors relative ${activeTab === tab ? 'text-indigo-600' : 'text-gray-400'}`}
                      >
                          {tab}
                          {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-t-full" />}
                      </button>
                  ))}
              </div>

              {/* Tab Content */}
              <div className="min-h-[200px]">
                  {activeTab === 'About' && (
                      <div className="space-y-4">
                          <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
                          
                          <div>
                              <h3 className="font-bold text-sm text-slate-800 mb-3">Service Features</h3>
                              <div className="grid grid-cols-2 gap-2">
                                  {service.features.map(feat => (
                                      <div key={feat} className="flex items-center space-x-2 text-xs text-gray-600 bg-gray-50 p-2 rounded-lg">
                                          <CheckCircle size={14} className="text-green-500" />
                                          <span>{feat}</span>
                                      </div>
                                  ))}
                              </div>
                          </div>

                          <div>
                               <h3 className="font-bold text-sm text-slate-800 mb-3">Availability</h3>
                               <div className="flex items-center text-xs text-gray-500 bg-blue-50 p-3 rounded-lg border border-blue-100">
                                   <Clock size={16} className="text-blue-600 mr-2" />
                                   <span>Typically responds in {service.provider.responseTime}. Available Mon - Sat.</span>
                               </div>
                          </div>
                      </div>
                  )}

                  {activeTab === 'Reviews' && (
                      <div className="space-y-4">
                          {service.reviewsList.map(review => (
                              <div key={review.id} className="border-b border-gray-50 last:border-0 pb-4">
                                  <div className="flex justify-between items-start mb-2">
                                      <div className="flex items-center space-x-2">
                                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                                              {review.user[0]}
                                          </div>
                                          <div>
                                              <p className="text-xs font-bold text-slate-800">{review.user}</p>
                                              <p className="text-[10px] text-gray-400">{review.date}</p>
                                          </div>
                                      </div>
                                      <div className="flex text-yellow-500">
                                          {[...Array(5)].map((_, i) => (
                                              <Star key={i} size={10} className={i < review.rating ? 'fill-current' : 'text-gray-200'} />
                                          ))}
                                      </div>
                                  </div>
                                  <p className="text-xs text-gray-600 leading-relaxed">{review.text}</p>
                              </div>
                          ))}
                          <button onClick={() => setActiveTab('Reviews')} className="w-full py-2 text-xs font-bold text-indigo-600 bg-indigo-50 rounded-lg">View All 124 Reviews</button>
                      </div>
                  )}

                   {activeTab === 'Portfolio' && (
                      <div className="grid grid-cols-2 gap-3">
                          {service.images.map((img, i) => (
                              <img key={i} src={img} className="rounded-xl w-full h-32 object-cover" />
                          ))}
                          {[1].map(i => (
                              <img key={i} src={`https://picsum.photos/400/300?random=${i+20}`} className="rounded-xl w-full h-32 object-cover" />
                          ))}
                      </div>
                  )}
              </div>
          </div>
      </div>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20 flex items-center space-x-3 md:pl-64">
           <div className="flex-1">
               <span className="text-xs text-gray-400 block">Total Price</span>
               <span className="text-lg font-bold text-slate-800">₦{service.price.toLocaleString()}</span>
           </div>
           <button 
             onClick={() => navigate('/chat')}
             className="flex-[2] bg-indigo-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors flex items-center justify-center"
           >
               <Calendar size={18} className="mr-2" /> Book Now
           </button>
      </div>

      {/* Escrow Info Modal */}
      {showEscrowInfo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in">
              <div className="bg-white rounded-3xl w-full max-w-sm p-6 relative">
                  <button onClick={() => setShowEscrowInfo(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                      <X size={20} />
                  </button>
                  <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
                          <Lock size={32} />
                      </div>
                      <h3 className="text-xl font-bold text-slate-800">How Escrow Works</h3>
                      <p className="text-sm text-gray-500 mt-2">Protecting both customers and providers.</p>
                  </div>
                  
                  <div className="space-y-6 relative">
                      {/* Connector Line */}
                      <div className="absolute left-[19px] top-2 bottom-4 w-0.5 bg-gray-100 -z-10"></div>
                      
                      <div className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-white border-2 border-emerald-500 text-emerald-600 font-bold flex items-center justify-center mr-4 flex-shrink-0 text-sm">1</div>
                          <div>
                              <h4 className="font-bold text-sm text-slate-800">You Pay</h4>
                              <p className="text-xs text-gray-500">Funds are held securely by Handy, not sent to the provider yet.</p>
                          </div>
                      </div>
                      <div className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-white border-2 border-gray-300 text-gray-500 font-bold flex items-center justify-center mr-4 flex-shrink-0 text-sm">2</div>
                          <div>
                              <h4 className="font-bold text-sm text-slate-800">Work Gets Done</h4>
                              <p className="text-xs text-gray-500">Provider completes the service. You inspect the work.</p>
                          </div>
                      </div>
                      <div className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-white border-2 border-gray-300 text-gray-500 font-bold flex items-center justify-center mr-4 flex-shrink-0 text-sm">3</div>
                          <div>
                              <h4 className="font-bold text-sm text-slate-800">You Release</h4>
                              <p className="text-xs text-gray-500">Once satisfied, you release the funds to the provider.</p>
                          </div>
                      </div>
                  </div>

                  <button 
                    onClick={() => setShowEscrowInfo(false)}
                    className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-bold mt-8"
                  >
                      Got it
                  </button>
              </div>
          </div>
      )}
    </div>
  );
};
