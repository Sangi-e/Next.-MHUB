
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, Star, MapPin, Clock, CheckCircle, ShieldCheck, MessageSquare, ChevronRight, Calendar } from 'lucide-react';

export const ServiceDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'About' | 'Reviews' | 'Portfolio'>('About');
  const [isSaved, setIsSaved] = useState(false);

  // Mock Data
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
      'https://picsum.photos/800/600?random=10',
      'https://picsum.photos/800/600?random=11',
      'https://picsum.photos/800/600?random=12'
    ],
    provider: {
      name: 'Adeola Johnson',
      avatar: 'https://picsum.photos/100/100?random=1',
      level: 'Platinum',
      jobs: 342,
      responseTime: '< 1 hr'
    },
    reviewsList: [
      { id: 1, user: 'Chioma B.', rating: 5, date: '2 days ago', text: 'Adeola was punctual and fixed the leak in under an hour. Highly recommended!' },
      { id: 2, user: 'David O.', rating: 4, date: '1 week ago', text: 'Great service, but arrived slightly late due to traffic. Workmanship is top notch though.' }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Hero / Gallery */}
      <div className="relative h-72 bg-gray-200">
        <img src={service.images[0]} className="w-full h-full object-cover" alt="Service" />
        
        {/* Header Overlay */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent">
            <button onClick={() => navigate(-1)} className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors">
                <ArrowLeft size={20} />
            </button>
            <div className="flex space-x-3">
                <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors">
                    <Share2 size={20} />
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

          {/* Provider Card */}
          <div className="p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between bg-white">
              <div className="flex items-center space-x-3">
                  <div className="relative">
                      <img src={service.provider.avatar} className="w-12 h-12 rounded-full object-cover" />
                      <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-0.5 rounded-full border border-white">
                          <ShieldCheck size={10} />
                      </div>
                  </div>
                  <div>
                      <h3 className="font-bold text-slate-800 text-sm">{service.provider.name}</h3>
                      <p className="text-xs text-gray-500">{service.provider.level} • {service.provider.jobs} Jobs</p>
                  </div>
              </div>
              <button onClick={() => navigate('/chat')} className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-colors">
                  <MessageSquare size={20} />
              </button>
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
                          <button className="w-full py-2 text-xs font-bold text-indigo-600 bg-indigo-50 rounded-lg">View All 124 Reviews</button>
                      </div>
                  )}

                   {activeTab === 'Portfolio' && (
                      <div className="grid grid-cols-2 gap-3">
                          {[1, 2, 3, 4].map(i => (
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
    </div>
  );
};
