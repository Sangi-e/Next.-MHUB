import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, Sparkles, Loader2, Save, MapPin, Phone, Mail, DollarSign, Briefcase, User as UserIcon } from 'lucide-react';
import { generateProfessionalBio } from '../services/geminiService';
import { User } from '../types';

interface EditProfileProps {
  user: User;
  onUpdateUser: (updatedUser: User) => void;
}

export const EditProfile: React.FC<EditProfileProps> = ({ user, onUpdateUser }) => {
  const navigate = useNavigate();
  const isCustomer = user.role === 'customer';
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Initialize form state from user prop
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone || '',
    location: user.location || '',
    bio: user.bio || '',
    skills: user.skills ? user.skills.join(', ') : '',
    hourlyRate: user.hourlyRate ? user.hourlyRate.toString() : '',
    experience: user.experience || ''
  });

  const handleGenerateBio = async () => {
    setIsLoading(true);
    try {
      const skillsList = formData.skills.split(',').map(s => s.trim());
      const generatedBio = await generateProfessionalBio(formData.name, skillsList, formData.experience);
      setFormData(prev => ({ ...prev, bio: generatedBio }));
    } catch (error) {
      console.error("Error generating bio", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    
    // Create updated user object
    const updatedUser: User = {
        ...user,
        name: formData.name,
        phone: formData.phone,
        location: formData.location,
        bio: formData.bio,
        skills: formData.skills ? formData.skills.split(',').map(s => s.trim()).filter(Boolean) : [],
        hourlyRate: formData.hourlyRate ? parseFloat(formData.hourlyRate) : undefined,
        experience: formData.experience
    };

    onUpdateUser(updatedUser);

    setTimeout(() => {
        setIsSaving(false);
        navigate('/profile');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm sticky top-0 z-10 flex items-center justify-between">
         <div className="flex items-center space-x-3">
            <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-indigo-600">
                <ArrowLeft size={24} />
            </button>
            <h1 className="text-lg font-bold text-slate-800">Edit Profile</h1>
         </div>
         <button 
            onClick={handleSave} 
            disabled={isSaving}
            className="text-indigo-600 text-sm font-bold disabled:opacity-50 flex items-center"
         >
             {isSaving && <Loader2 size={14} className="animate-spin mr-1" />}
             {isSaving ? 'Saving...' : 'Save'}
         </button>
      </div>

      <div className="p-4 space-y-6">
          {/* Avatar Section */}
          <div className="flex flex-col items-center">
              <div className="relative">
                  <img 
                      src={user.avatar} 
                      className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-sm" 
                      alt="Profile"
                  />
                  <div className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full text-white border-2 border-white cursor-pointer hover:bg-indigo-700 transition-colors">
                      <Camera size={16} />
                  </div>
              </div>
              <p className="mt-3 text-sm text-indigo-600 font-bold cursor-pointer hover:underline">Change Profile Photo</p>
          </div>

          {/* Form Fields */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-5 space-y-5">
              
              {/* Basic Info */}
              <div className="space-y-4">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide">Basic Information</h3>
                  
                  <div>
                      <label className="text-sm font-medium text-slate-700 mb-1 block">Full Name</label>
                      <div className="relative">
                          <UserIcon className="absolute left-3 top-3 text-gray-400" size={18} />
                          <input 
                              type="text" 
                              value={formData.name}
                              onChange={(e) => setFormData({...formData, name: e.target.value})}
                              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                          />
                      </div>
                  </div>

                  <div>
                      <label className="text-sm font-medium text-slate-700 mb-1 block">Location</label>
                      <div className="relative">
                          <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                          <input 
                              type="text" 
                              value={formData.location}
                              onChange={(e) => setFormData({...formData, location: e.target.value})}
                              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                          />
                      </div>
                  </div>
              </div>

              {/* Bio Section with AI */}
              <div className="space-y-2">
                  <div className="flex justify-between items-center">
                      <label className="text-sm font-medium text-slate-700">Bio</label>
                      {!isCustomer && (
                          <button 
                            onClick={handleGenerateBio}
                            disabled={isLoading || !formData.skills}
                            className="text-xs flex items-center text-purple-600 font-bold hover:text-purple-700 disabled:opacity-50 transition-colors bg-purple-50 px-2 py-1 rounded-md"
                          >
                              {isLoading ? <Loader2 size={12} className="animate-spin mr-1"/> : <Sparkles size={12} className="mr-1" />}
                              AI Enhance
                          </button>
                      )}
                  </div>
                  <textarea 
                      rows={4}
                      value={formData.bio}
                      onChange={(e) => setFormData({...formData, bio: e.target.value})}
                      className="w-full p-3 bg-gray-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-indigo-500 leading-relaxed transition-shadow"
                  />
                  {!isCustomer && <p className="text-[10px] text-gray-400">Tip: List your skills below to generate a better bio.</p>}
              </div>

              {/* Entrepreneur Specifics */}
              {!isCustomer && (
                  <div className="space-y-4 pt-4 border-t border-gray-50">
                      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide">Professional Details</h3>
                      
                      <div>
                          <label className="text-sm font-medium text-slate-700 mb-1 block">Skills (comma separated)</label>
                          <div className="relative">
                              <Briefcase className="absolute left-3 top-3 text-gray-400" size={18} />
                              <input 
                                  type="text" 
                                  value={formData.skills}
                                  onChange={(e) => setFormData({...formData, skills: e.target.value})}
                                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                              />
                          </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                          <div>
                              <label className="text-sm font-medium text-slate-700 mb-1 block">Hourly Rate (₦)</label>
                              <div className="relative">
                                  <DollarSign className="absolute left-3 top-3 text-gray-400" size={18} />
                                  <input 
                                      type="number" 
                                      value={formData.hourlyRate}
                                      onChange={(e) => setFormData({...formData, hourlyRate: e.target.value})}
                                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                                  />
                              </div>
                          </div>
                           <div>
                              <label className="text-sm font-medium text-slate-700 mb-1 block">Years Exp.</label>
                              <input 
                                  type="text" 
                                  value={formData.experience}
                                  onChange={(e) => setFormData({...formData, experience: e.target.value})}
                                  className="w-full px-4 py-2.5 bg-gray-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                              />
                          </div>
                      </div>
                  </div>
              )}

              {/* Private Info */}
              <div className="space-y-4 pt-4 border-t border-gray-50">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide">Private Information</h3>
                  
                  <div>
                      <label className="text-sm font-medium text-slate-700 mb-1 block">Email Address</label>
                      <div className="relative">
                          <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                          <input 
                              type="email" 
                              value={formData.email}
                              disabled
                              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 text-gray-500 rounded-xl text-sm border-none cursor-not-allowed"
                          />
                      </div>
                  </div>

                  <div>
                      <label className="text-sm font-medium text-slate-700 mb-1 block">Phone Number</label>
                      <div className="relative">
                          <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
                          <input 
                              type="tel" 
                              value={formData.phone}
                              onChange={(e) => setFormData({...formData, phone: e.target.value})}
                              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                          />
                      </div>
                  </div>
              </div>

          </div>
      </div>
    </div>
  );
};