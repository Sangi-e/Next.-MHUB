
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Star, MapPin, Search, Filter, Trash2, ShoppingBag, ShieldCheck } from 'lucide-react';

interface FavoriteItem {
  id: string;
  providerName: string;
  providerAvatar: string;
  title: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  location: string;
  isOnline: boolean;
}

const MOCK_FAVORITES: FavoriteItem[] = [
  {
    id: '1',
    providerName: 'Sarah Tech',
    providerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    title: 'Modern Logo Design & Branding',
    category: 'Digital Services',
    price: 15000,
    rating: 5.0,
    reviews: 89,
    image: 'https://picsum.photos/400/300?random=2',
    location: 'Global',
    isOnline: true,
  },
  {
    id: '3',
    providerName: 'Musa Auto',
    providerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    title: 'Mobile Mechanic - Brake Specialist',
    category: 'Mechanics',
    price: 8000,
    rating: 4.5,
    reviews: 42,
    image: 'https://picsum.photos/400/300?random=3',
    location: 'Yaba, Lagos',
    isOnline: false,
  }
];

export const Favorites: React.FC = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<FavoriteItem[]>(MOCK_FAVORITES);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleRemove = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(favorites.filter(item => item.id !== id));
  };

  const categories = ['All', 'Digital Services', 'Mechanics', 'Home Services'];

  const filteredFavorites = favorites.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.providerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm sticky top-0 z-10 space-y-4">
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
                <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-indigo-600">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-lg font-bold text-slate-800">My Favorites</h1>
            </div>
            <div className="bg-pink-50 text-pink-600 px-3 py-1 rounded-full text-xs font-bold flex items-center">
                <Heart size={12} className="mr-1 fill-pink-600" /> {favorites.length} Saved
            </div>
        </div>

        {/* Search & Filter */}
        <div className="flex space-x-3">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search saved services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-xl text-sm border-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            <button className="bg-gray-100 p-2 rounded-xl text-gray-600 hover:bg-gray-200">
                <Filter size={20} />
            </button>
        </div>

        {/* Category Tabs */}
        <div className="flex overflow-x-auto space-x-2 pb-1 no-scrollbar">
            {categories.map(cat => (
                <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                        selectedCategory === cat 
                        ? 'bg-slate-800 text-white' 
                        : 'bg-white border border-gray-200 text-slate-600 hover:bg-gray-50'
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {filteredFavorites.length > 0 ? (
            filteredFavorites.map(item => (
                <div key={item.id} className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex flex-col group">
                    {/* Top Section: Image & Heart */}
                    <div className="relative h-40 rounded-xl overflow-hidden mb-3">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
                        
                        <button 
                            onClick={(e) => handleRemove(item.id, e)}
                            className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-pink-500 shadow-sm hover:bg-white transition-colors"
                        >
                            <Heart size={16} className="fill-pink-500" />
                        </button>

                        <div className="absolute bottom-2 left-3 text-white">
                            <div className="flex items-center text-xs font-bold mb-0.5">
                                <MapPin size={12} className="mr-1" /> {item.isOnline ? 'Online Service' : item.location}
                            </div>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="px-1">
                        <div className="flex justify-between items-start mb-2">
                             <h3 className="font-bold text-slate-800 text-sm line-clamp-2 pr-2">{item.title}</h3>
                             <div className="flex items-center bg-yellow-50 px-1.5 py-0.5 rounded text-[10px] font-bold text-yellow-700 flex-shrink-0 border border-yellow-100">
                                 <Star size={10} className="fill-yellow-500 text-yellow-500 mr-1" /> {item.rating}
                             </div>
                        </div>

                        {/* Provider Info */}
                        <div className="flex items-center space-x-2 mb-3">
                            <img src={item.providerAvatar} className="w-6 h-6 rounded-full border border-gray-100" />
                            <span className="text-xs text-gray-500 font-medium">{item.providerName}</span>
                            <ShieldCheck size={12} className="text-blue-500" />
                        </div>

                        {/* Price & Action */}
                        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                             <div>
                                 <span className="text-[10px] text-gray-400 block">Starting from</span>
                                 <span className="text-indigo-600 font-bold text-base">₦{item.price.toLocaleString()}</span>
                             </div>
                             <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-lg shadow-slate-200 hover:bg-slate-800 transition-colors flex items-center">
                                 <ShoppingBag size={14} className="mr-2" /> Book Now
                             </button>
                        </div>
                    </div>
                </div>
            ))
        ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Heart size={32} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-1">No Favorites Yet</h3>
                <p className="text-gray-500 text-sm max-w-xs mx-auto mb-6">
                    Start exploring and save services you like to find them easily later.
                </p>
                <button 
                    onClick={() => navigate('/home')}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-indigo-200 hover:bg-indigo-700"
                >
                    Explore Services
                </button>
            </div>
        )}
      </div>
    </div>
  );
};
