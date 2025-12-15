
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, ChevronRight, Loader2, Sparkles, ShieldCheck, ArrowLeft, Mail, Lock, Phone, Globe, TrendingUp, MapPin, Upload, User as UserIconSVG, Briefcase as BriefcaseIconSVG, CreditCard, AlertTriangle, FileText, CheckCircle, Smartphone, Eye, Image as ImageIcon, Facebook, Linkedin, Instagram, Navigation, Handshake } from 'lucide-react';
import { generateProfessionalBio } from '../services/geminiService';
import { Logo } from '../components/Logo';

export const Auth: React.FC<{ setRole: (role: any) => void }> = ({ setRole }) => {
  // States
  const [view, setView] = useState<'onboarding' | 'splash' | 'login' | 'register' | 'otp' | 'role' | 'verification' | 'welcome'>('onboarding');
  const [targetRole, setTargetRole] = useState<'customer' | 'entrepreneur' | 'admin' | null>(null);
  const [roleSelection, setRoleSelection] = useState<'customer' | 'entrepreneur' | null>(null);
  const [loginRole, setLoginRole] = useState<'customer' | 'entrepreneur' | 'admin'>('customer');
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  
  // Onboarding State
  const [currentSlide, setCurrentSlide] = useState(0);

  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    // Basic / Identity
    name: '', // Legal Name
    email: '',
    phone: '',
    password: '',
    
    // Entrepreneur Profile
    skills: '',
    experience: '5 years experience.',
    bio: '',
    businessName: '',
    hourlyRate: '',
    
    // Customer Specific
    customerPurpose: '',
    customerState: '',
    customerCity: '',
    recoveryPhone: '',
    nextOfKinName: '',
    nextOfKinPhone: '',
    socialLink: '',
    
    // Location
    address: '',
    geolocation: null as any,
    
    // Banking / Verification
    bankAccount: '',
    bankName: '',
    bvn: '',
    govIdType: 'NIN',
    
    // Emergency
    emergencyContactName: '',
    emergencyContactPhone: '',
    
    // Agreement
    termsAccepted: false,
    
    // Customer Agreements
    agreements: {
        chargeback: false,
        fraud: false,
        guidelines: false,
        disputes: false
    }
  });

  // Welcome Screen Timer
  useEffect(() => {
    if (view === 'welcome') {
        const timer = setTimeout(() => {
            setRole(targetRole || 'customer');
            navigate(targetRole === 'admin' ? '/admin' : '/home');
        }, 5000); // Set to 5s
        return () => clearTimeout(timer);
    }
  }, [view, targetRole, setRole, navigate]);

  const handleGenerateBio = async () => {
    if (!formData.skills) return;
    setIsLoading(true);
    const skillsList = formData.skills.split(',').map(s => s.trim());
    const bio = await generateProfessionalBio(formData.name || 'Professional', skillsList, formData.experience);
    setFormData({ ...formData, bio });
    setIsLoading(false);
  };

  const handleRoleSelect = (role: 'customer' | 'entrepreneur') => {
    setRoleSelection(role);
    if (role === 'customer') {
      setView('register');
    } else {
      // Entrepreneurs skip basic register and go straight to verification (which now includes basic info)
      setView('verification');
    }
  };

  const finalizeSignup = () => {
    setTargetRole(roleSelection);
    setView('welcome');
  };

  const handleLoginSuccess = () => {
      setTargetRole(loginRole); 
      setView('welcome');
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };
  
  const handleCustomerAgreementChange = (key: keyof typeof formData.agreements) => {
      setFormData(prev => ({
          ...prev,
          agreements: {
              ...prev.agreements,
              [key]: !prev.agreements[key]
          }
      }));
  }

  // --- ONBOARDING DATA ---
  const ONBOARDING_SLIDES = [
    {
        id: 1,
        icon: ShieldCheck,
        title: "Trust & Safety",
        desc: "All service providers are verified. Book with confidence knowing you're in safe hands.",
        color: "text-emerald-600",
        bg: "bg-emerald-50"
    },
    {
        id: 2,
        icon: Globe,
        title: "Local & Global Reach",
        desc: "Connect with professionals nearby or access online services from around the world.",
        color: "text-green-600",
        bg: "bg-green-50"
    },
    {
        id: 3,
        icon: TrendingUp,
        title: "Grow Your Business",
        desc: "Showcase your skills, build your portfolio, and reach thousands of potential clients.",
        color: "text-teal-600",
        bg: "bg-teal-50"
    }
  ];

  const handleNextSlide = () => {
      if (currentSlide < ONBOARDING_SLIDES.length - 1) {
          setCurrentSlide(currentSlide + 1);
      } else {
          setView('splash');
      }
  };

  // ----------------------------------------------------------------------
  // VIEW COMPONENTS
  // ----------------------------------------------------------------------

  // 1. ONBOARDING
  if (view === 'onboarding') {
      const slide = ONBOARDING_SLIDES[currentSlide];
      const Icon = slide.icon;
      return (
          <div className="min-h-screen bg-white flex flex-col justify-between p-6 py-12">
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
                  <div className={`w-32 h-32 rounded-full ${slide.bg} flex items-center justify-center animate-bounce-slow`}>
                      <Icon size={64} className={slide.color} />
                  </div>
                  <div>
                      <h2 className="text-2xl font-bold text-slate-800 mb-3">{slide.title}</h2>
                      <p className="text-gray-500 leading-relaxed max-w-xs mx-auto">{slide.desc}</p>
                  </div>
              </div>
              <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                      {ONBOARDING_SLIDES.map((_, idx) => (
                          <div key={idx} className={`h-2 rounded-full transition-all duration-300 ${currentSlide === idx ? 'w-8 bg-emerald-600' : 'w-2 bg-gray-200'}`} />
                      ))}
                  </div>
                  <button onClick={handleNextSlide} className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-200 hover:scale-105 transition-transform">
                      <ChevronRight size={24} />
                  </button>
              </div>
          </div>
      );
  }

  // 2. SPLASH / LANDING
  if (view === 'splash') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-emerald-800 to-emerald-500 flex flex-col items-center justify-center p-8 relative overflow-hidden">
         {/* Background Decoration */}
         <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -ml-20 -mt-20"></div>
         <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl -mr-20 -mb-20"></div>

         <div className="relative z-10 flex flex-col items-center w-full max-w-sm">
            <div className="mb-6">
                <Logo size={80} theme="dark" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Handy</h1>
            <p className="text-emerald-100 text-center mb-12">Verified Talent. Trusted Results.</p>

            <button 
              onClick={() => setView('login')}
              className="w-full bg-white text-emerald-900 py-4 rounded-xl font-bold mb-4 shadow-lg active:scale-[0.98] transition-transform"
            >
              Log In
            </button>
            <button 
              onClick={() => setView('role')}
              className="w-full bg-emerald-700/50 border border-white/20 text-white py-4 rounded-xl font-bold hover:bg-emerald-700/70 active:scale-[0.98] transition-all backdrop-blur-sm"
            >
              Create Account
            </button>
         </div>
      </div>
    );
  }

  // 3. ROLE SELECTION
  if (view === 'role') {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex flex-col">
        <button onClick={() => setView('splash')} className="self-start p-2 -ml-2 text-gray-400 hover:text-emerald-600"><ArrowLeft /></button>
        
        <h2 className="text-2xl font-bold text-slate-800 mt-6 mb-2">Choose your path</h2>
        <p className="text-gray-500 mb-8">How do you want to use Handy?</p>

        <div className="space-y-4">
           {/* Customer Card */}
           <div 
             onClick={() => handleRoleSelect('customer')}
             className="bg-white p-6 rounded-2xl border-2 border-transparent hover:border-emerald-600 shadow-sm cursor-pointer transition-all group"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-100">
                  <UserIconSVG className="text-blue-600" size={24} />
              </div>
              <h3 className="font-bold text-lg text-slate-800">I want to hire</h3>
              <p className="text-sm text-gray-500 mt-1">Find professionals for your needs.</p>
           </div>

           {/* Entrepreneur Card */}
           <div 
             onClick={() => handleRoleSelect('entrepreneur')}
             className="bg-white p-6 rounded-2xl border-2 border-transparent hover:border-emerald-600 shadow-sm cursor-pointer transition-all group"
            >
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-100">
                  <BriefcaseIconSVG className="text-emerald-600" size={24} />
              </div>
              <h3 className="font-bold text-lg text-slate-800">I want to work</h3>
              <p className="text-sm text-gray-500 mt-1">Offer services and grow your business.</p>
           </div>
        </div>
      </div>
    );
  }

  // 4. LOGIN FORM
  if (view === 'login') {
      return (
          <div className="min-h-screen bg-white p-6 flex flex-col justify-center max-w-md mx-auto">
              <button onClick={() => setView('splash')} className="absolute top-6 left-6 p-2 -ml-2 text-gray-400"><ArrowLeft /></button>
              
              <div className="mb-6">
                  <h2 className="text-3xl font-bold text-slate-900">Welcome Back</h2>
                  <p className="text-gray-500 mt-2">Enter your credentials to continue</p>
              </div>

              {/* Role Selection */}
              <div className="flex bg-gray-50 p-1 rounded-xl mb-6 border border-gray-100 overflow-x-auto">
                <button 
                    onClick={() => setLoginRole('customer')}
                    className={`flex-1 py-3 px-2 rounded-lg text-xs md:text-sm font-bold transition-all flex items-center justify-center whitespace-nowrap ${loginRole === 'customer' ? 'bg-white text-emerald-600 shadow-sm ring-1 ring-gray-100' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    <UserIconSVG size={16} className="mr-1 md:mr-2" /> Customer
                </button>
                <button 
                    onClick={() => setLoginRole('entrepreneur')}
                    className={`flex-1 py-3 px-2 rounded-lg text-xs md:text-sm font-bold transition-all flex items-center justify-center whitespace-nowrap ${loginRole === 'entrepreneur' ? 'bg-white text-emerald-600 shadow-sm ring-1 ring-gray-100' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    <BriefcaseIconSVG size={16} className="mr-1 md:mr-2" /> Entrepreneur
                </button>
                <button 
                    onClick={() => setLoginRole('admin')}
                    className={`flex-1 py-3 px-2 rounded-lg text-xs md:text-sm font-bold transition-all flex items-center justify-center whitespace-nowrap ${loginRole === 'admin' ? 'bg-white text-emerald-600 shadow-sm ring-1 ring-gray-100' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    <ShieldCheck size={16} className="mr-1 md:mr-2" /> Admin
                </button>
              </div>

              <div className="space-y-4">
                  <div className="relative">
                      <Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
                      <input type="email" placeholder="Email Address" className="w-full pl-12 pr-4 py-3.5 bg-gray-50 rounded-xl border border-gray-100 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all" />
                  </div>
                  <div className="relative">
                      <Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
                      <input type="password" placeholder="Password" className="w-full pl-12 pr-4 py-3.5 bg-gray-50 rounded-xl border border-gray-100 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all" />
                  </div>
                  <div className="text-right">
                      <a href="#" className="text-emerald-600 text-sm font-bold">Forgot Password?</a>
                  </div>
              </div>

              <button onClick={handleLoginSuccess} className="w-full text-white py-4 rounded-xl font-bold mt-8 shadow-lg transition-colors bg-emerald-600 shadow-emerald-200 hover:bg-emerald-700 capitalize">
                  Log In as {loginRole}
              </button>

              <p className="text-center mt-6 text-gray-500 text-sm">
                  Don't have an account? <span onClick={() => setView('role')} className="text-emerald-600 font-bold cursor-pointer">Sign Up</span>
              </p>
          </div>
      )
  }

  // 5. REGISTER FORM (Expanded Customer Registration)
  if (view === 'register') {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="bg-white p-4 shadow-sm sticky top-0 z-10 flex items-center">
                <button onClick={() => setView('role')} className="p-2 -ml-2 text-gray-500 mr-2"><ArrowLeft size={20}/></button>
                <div>
                    <h2 className="font-bold text-slate-800">Create Customer Account</h2>
                    <p className="text-xs text-gray-500">Secure setup to start hiring</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-24">
                
                {/* 1. Identity Verification */}
                <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center space-x-2 mb-4 text-emerald-600">
                        <UserIconSVG size={20} />
                        <h3 className="font-bold text-sm uppercase tracking-wide">Identity & Profile</h3>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-bold text-gray-500 mb-1 block">Full Legal Name <span className="text-red-500">*</span></label>
                            <input 
                                type="text" 
                                placeholder="As it appears on ID" 
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full p-3 bg-gray-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-emerald-500" 
                            />
                        </div>
                        <div className="flex space-x-3">
                            <div className="w-24 h-24 bg-gray-50 rounded-full border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 hover:bg-gray-100 cursor-pointer flex-shrink-0">
                                <Camera size={20} className="mb-1" />
                                <span className="text-[10px] text-center px-1">Profile Photo</span>
                            </div>
                            <div className="flex-1 space-y-2">
                                <label className="text-xs font-bold text-gray-500 block">Why are you joining? <span className="text-red-500">*</span></label>
                                <textarea 
                                    placeholder="Brief bio or purpose (e.g. Hiring for home renovation)"
                                    value={formData.customerPurpose}
                                    onChange={(e) => setFormData({...formData, customerPurpose: e.target.value})}
                                    className="w-full h-[88px] p-3 bg-gray-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-emerald-500 resize-none"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <label className="text-xs font-bold text-gray-500 mb-1 block">Email <span className="text-red-500">*</span></label>
                                <input 
                                    type="email" 
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="w-full p-3 pl-9 bg-gray-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-emerald-500"
                                />
                                <Mail className="absolute left-3 top-8 text-gray-400" size={16} />
                            </div>
                            <div className="relative">
                                <label className="text-xs font-bold text-gray-500 mb-1 block">Phone <span className="text-red-500">*</span></label>
                                <input 
                                    type="tel" 
                                    placeholder="+234..."
                                    value={formData.phone}
                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                    className="w-full p-3 pl-9 bg-gray-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-emerald-500"
                                />
                                <Smartphone className="absolute left-3 top-8 text-gray-400" size={16} />
                                <span className="absolute right-3 top-8 text-[10px] text-orange-500 font-bold">Unverified</span>
                            </div>
                        </div>
                        <div className="relative">
                            <label className="text-xs font-bold text-gray-500 mb-1 block">Password <span className="text-red-500">*</span></label>
                            <input 
                                type="password" 
                                placeholder="••••••••" 
                                className="w-full p-3 pl-9 bg-gray-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-emerald-500" 
                            />
                            <Lock className="absolute left-3 top-8 text-gray-400" size={16} />
                        </div>
                    </div>
                </section>

                {/* 2. Location (Geolocation) */}
                <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                     <div className="flex items-center space-x-2 mb-4 text-emerald-600">
                        <MapPin size={20} />
                        <h3 className="font-bold text-sm uppercase tracking-wide">Location</h3>
                    </div>
                    <div className="space-y-3">
                         <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-xs font-bold text-gray-500 mb-1 block">State <span className="text-red-500">*</span></label>
                                <input 
                                    type="text" 
                                    placeholder="Lagos"
                                    value={formData.customerState}
                                    onChange={(e) => setFormData({...formData, customerState: e.target.value})}
                                    className="w-full p-3 bg-gray-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>
                             <div>
                                <label className="text-xs font-bold text-gray-500 mb-1 block">City <span className="text-red-500">*</span></label>
                                <input 
                                    type="text" 
                                    placeholder="Ikeja"
                                    value={formData.customerCity}
                                    onChange={(e) => setFormData({...formData, customerCity: e.target.value})}
                                    className="w-full p-3 bg-gray-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>
                         </div>
                         <button className="w-full py-2.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg flex items-center justify-center border border-emerald-100">
                              <Navigation size={14} className="mr-2" /> Use Current Location
                          </button>
                    </div>
                </section>

                {/* 3. Payment Method */}
                <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                     <div className="flex items-center space-x-2 mb-4 text-emerald-600">
                        <CreditCard size={20} />
                        <h3 className="font-bold text-sm uppercase tracking-wide">Payment Method</h3>
                    </div>
                    <p className="text-xs text-gray-500 mb-4">Required to book services. You won't be charged yet.</p>
                    <div className="p-4 border border-gray-200 rounded-xl flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors">
                        <div className="flex items-center space-x-3">
                            <div className="bg-gray-100 p-2 rounded-full">
                                <CreditCard size={20} className="text-gray-500"/>
                            </div>
                            <span className="text-sm font-bold text-slate-700">Add Card / Bank</span>
                        </div>
                        <ChevronRight size={16} className="text-gray-400" />
                    </div>
                </section>

                {/* 4. Security & Trust (Recovery + Socials) */}
                 <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                     <div className="flex items-center space-x-2 mb-4 text-emerald-600">
                        <ShieldCheck size={20} />
                        <h3 className="font-bold text-sm uppercase tracking-wide">Security & Trust</h3>
                    </div>
                    
                    <div className="space-y-4">
                        <div>
                             <label className="text-xs font-bold text-gray-500 mb-1 block">Recovery Phone Number <span className="text-red-500">*</span></label>
                             <input 
                                type="tel" 
                                placeholder="Backup contact for account recovery"
                                value={formData.recoveryPhone}
                                onChange={(e) => setFormData({...formData, recoveryPhone: e.target.value})}
                                className="w-full p-3 bg-gray-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>
                         <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-xs font-bold text-gray-500 mb-1 block">Next of Kin Name</label>
                                <input 
                                    type="text" 
                                    placeholder="Optional"
                                    value={formData.nextOfKinName}
                                    onChange={(e) => setFormData({...formData, nextOfKinName: e.target.value})}
                                    className="w-full p-3 bg-gray-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>
                             <div>
                                <label className="text-xs font-bold text-gray-500 mb-1 block">Next of Kin Phone</label>
                                <input 
                                    type="tel" 
                                    placeholder="Optional"
                                    value={formData.nextOfKinPhone}
                                    onChange={(e) => setFormData({...formData, nextOfKinPhone: e.target.value})}
                                    className="w-full p-3 bg-gray-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>
                         </div>
                         
                         {/* Optional Socials */}
                         <div>
                            <label className="text-xs font-bold text-gray-500 mb-2 block">Link Socials (Boosts Trust Score)</label>
                            <div className="flex space-x-3">
                                <button className="flex-1 py-2 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-xs font-bold border border-blue-100">
                                    <Facebook size={14} className="mr-2" /> Connect
                                </button>
                                <button className="flex-1 py-2 bg-pink-50 text-pink-600 rounded-lg flex items-center justify-center text-xs font-bold border border-pink-100">
                                    <Instagram size={14} className="mr-2" /> Connect
                                </button>
                                <button className="flex-1 py-2 bg-blue-50 text-blue-800 rounded-lg flex items-center justify-center text-xs font-bold border border-blue-100">
                                    <Linkedin size={14} className="mr-2" /> Connect
                                </button>
                            </div>
                         </div>
                    </div>
                </section>

                {/* 5. Optional High Trust Verification */}
                 <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-1 rounded-bl-lg z-10">HIGH TRUST</div>
                     <div className="flex items-center space-x-2 mb-4 text-emerald-600">
                        <Eye size={20} />
                        <h3 className="font-bold text-sm uppercase tracking-wide">Enhanced Verification (Optional)</h3>
                    </div>
                    <p className="text-xs text-gray-500 mb-4">Upload ID and verify face to get the <span className="font-bold text-emerald-600">"Trusted Customer"</span> badge.</p>
                    
                    <div className="grid grid-cols-2 gap-3">
                         <div className="p-3 bg-gray-50 border border-gray-200 border-dashed rounded-xl flex flex-col items-center justify-center text-gray-400 py-6">
                             <FileText size={20} className="mb-2" />
                             <span className="text-[10px] font-bold">Upload Gov ID</span>
                         </div>
                          <div className="p-3 bg-gray-50 border border-gray-200 border-dashed rounded-xl flex flex-col items-center justify-center text-gray-400 py-6">
                             <Eye size={20} className="mb-2" />
                             <span className="text-[10px] font-bold">Face Scan</span>
                         </div>
                    </div>
                </section>

                {/* 6. Legal Agreements */}
                <section className="bg-emerald-50 p-5 rounded-2xl border border-emerald-100">
                    <h3 className="font-bold text-sm text-emerald-900 mb-3">Community Agreements</h3>
                    <div className="space-y-3">
                        <label className="flex items-start space-x-3">
                            <input checked={formData.agreements.chargeback} onChange={() => handleCustomerAgreementChange('chargeback')} type="checkbox" className="mt-1 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500" />
                            <span className="text-xs text-emerald-800">I agree to the <b>No-Chargeback Policy</b> for completed services.</span>
                        </label>
                        <label className="flex items-start space-x-3">
                            <input checked={formData.agreements.fraud} onChange={() => handleCustomerAgreementChange('fraud')} type="checkbox" className="mt-1 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500" />
                            <span className="text-xs text-emerald-800">I agree to the <b>Anti-Fraud Policy</b>. I understand my account will be banned for suspicious activity.</span>
                        </label>
                         <label className="flex items-start space-x-3">
                            <input checked={formData.agreements.guidelines} onChange={() => handleCustomerAgreementChange('guidelines')} type="checkbox" className="mt-1 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500" />
                            <span className="text-xs text-emerald-800">I accept the Community Guidelines & Terms of Service.</span>
                        </label>
                         <label className="flex items-start space-x-3">
                            <input checked={formData.agreements.disputes} onChange={() => handleCustomerAgreementChange('disputes')} type="checkbox" className="mt-1 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500" />
                            <span className="text-xs text-emerald-800">I understand the Refund & Dispute resolution rules.</span>
                        </label>
                    </div>
                </section>
            </div>

            {/* Submit Footer */}
            <div className="bg-white p-4 border-t border-gray-100 sticky bottom-0 z-10 safe-area-bottom">
                  <button 
                      onClick={() => setView('otp')}
                      disabled={
                          !formData.name || !formData.email || !formData.phone || 
                          !formData.agreements.chargeback || !formData.agreements.fraud || 
                          !formData.agreements.guidelines || !formData.agreements.disputes
                      }
                      className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-emerald-200 disabled:bg-gray-300 disabled:shadow-none transition-all flex items-center justify-center"
                  >
                      Verify & Create Account <ChevronRight className="ml-2" size={18} />
                  </button>
            </div>
        </div>
    );
  }

  // 6. ENTREPRENEUR VERIFICATION (Merged Registration + Verification)
  if (view === 'verification') {
      return (
          <div className="min-h-screen bg-gray-50 flex flex-col">
              {/* Header */}
              <div className="bg-white p-4 shadow-sm sticky top-0 z-10 flex items-center">
                  <button onClick={() => setView('role')} className="p-2 -ml-2 text-gray-500 mr-2"><ArrowLeft size={20}/></button>
                  <div>
                      <h2 className="font-bold text-slate-800">Partner Verification</h2>
                      <p className="text-xs text-gray-500">Complete your profile to start earning</p>
                  </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-24">
                  
                  {/* SECTION 1: IDENTITY & CONTACT */}
                  <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                      <div className="flex items-center space-x-2 mb-4 text-emerald-600">
                          <UserIconSVG size={20} />
                          <h3 className="font-bold text-sm uppercase tracking-wide">Identity & Contact</h3>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                            <label className="text-xs font-bold text-gray-500 mb-1 block">Full Legal Name <span className="text-red-500">*</span></label>
                            <input 
                                type="text" 
                                placeholder="Must match your Gov ID"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full p-3 bg-gray-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-bold text-gray-500 mb-1 block">Email <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <input 
                                        type="email" 
                                        placeholder="name@email.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        className="w-full p-3 pl-9 bg-gray-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-emerald-500"
                                    />
                                    <Mail className="absolute left-3 top-3 text-gray-400" size={16} />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 mb-1 block">Phone (OTP Verified) <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <input 
                                        type="tel" 
                                        placeholder="+234..."
                                        value={formData.phone}
                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                        className="w-full p-3 pl-9 bg-gray-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-emerald-500"
                                    />
                                    <Smartphone className="absolute left-3 top-3 text-gray-400" size={16} />
                                    <button className="absolute right-2 top-2 text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded font-bold">Verify</button>
                                </div>
                            </div>
                        </div>
                      </div>
                  </section>

                  {/* SECTION 2: PROFESSIONAL PROFILE */}
                  <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                      <div className="flex items-center space-x-2 mb-4 text-emerald-600">
                          <BriefcaseIconSVG size={20} />
                          <h3 className="font-bold text-sm uppercase tracking-wide">Professional Profile</h3>
                      </div>

                      <div className="space-y-4">
                          {/* Photo & Logo */}
                          <div className="flex space-x-4">
                              <div className="flex-1">
                                  <label className="text-xs font-bold text-gray-500 mb-2 block">Headshot</label>
                                  <div className="h-24 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 hover:bg-gray-100 cursor-pointer">
                                      <Camera size={20} className="mb-1" />
                                      <span className="text-[10px]">Upload Photo</span>
                                  </div>
                              </div>
                              <div className="flex-1">
                                  <label className="text-xs font-bold text-gray-500 mb-2 block">Business Logo</label>
                                  <div className="h-24 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 hover:bg-gray-100 cursor-pointer">
                                      <Upload size={20} className="mb-1" />
                                      <span className="text-[10px]">Upload Logo</span>
                                  </div>
                              </div>
                          </div>

                          {/* Skill Category */}
                          <div>
                              <label className="text-xs font-bold text-gray-500 mb-1 block">Skill Category</label>
                              <select 
                                className="w-full p-3 bg-gray-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-emerald-500 text-slate-700"
                                value={formData.skills}
                                onChange={(e) => setFormData({...formData, skills: e.target.value})}
                              >
                                  <option value="">Select a category...</option>
                                  <option value="Plumbing">Plumbing & Repairs</option>
                                  <option value="Electrical">Electrical Works</option>
                                  <option value="Carpentry">Carpentry & Furniture</option>
                                  <option value="Cleaning">Cleaning & Janitorial</option>
                                  <option value="Tech">IT & Digital Services</option>
                                  <option value="Auto">Auto Mechanics</option>
                              </select>
                          </div>

                          {/* Service Description & AI Gen */}
                          <div>
                              <div className="flex justify-between items-center mb-1">
                                  <label className="text-xs font-bold text-gray-500">Service Description / Bio</label>
                                  <button 
                                    onClick={handleGenerateBio} 
                                    disabled={!formData.skills || isLoading}
                                    className="text-[10px] flex items-center text-emerald-600 font-bold disabled:opacity-50"
                                  >
                                      {isLoading ? <Loader2 size={10} className="animate-spin mr-1"/> : <Sparkles size={10} className="mr-1" />}
                                      AI Generate
                                  </button>
                              </div>
                              <textarea 
                                  rows={3}
                                  placeholder="Describe your services..."
                                  value={formData.bio}
                                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                                  className="w-full p-3 bg-gray-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-emerald-500"
                              />
                          </div>

                          {/* Pricing & Portfolio */}
                          <div className="grid grid-cols-2 gap-4">
                              <div>
                                  <label className="text-xs font-bold text-gray-500 mb-1 block">Hourly Rate (₦)</label>
                                  <input 
                                      type="number" 
                                      placeholder="5000"
                                      value={formData.hourlyRate}
                                      onChange={(e) => setFormData({...formData, hourlyRate: e.target.value})}
                                      className="w-full p-3 bg-gray-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-emerald-500"
                                  />
                              </div>
                              <div>
                                  <label className="text-xs font-bold text-gray-500 mb-1 block">Portfolio</label>
                                  <div className="w-full p-3 bg-gray-50 rounded-xl text-sm border border-gray-200 flex items-center justify-center text-gray-500 cursor-pointer">
                                      <ImageIcon size={16} className="mr-2"/>
                                      <span className="text-xs">Add Media</span>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </section>

                   {/* SECTION 3: LOCATION */}
                   <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                      <div className="flex items-center space-x-2 mb-4 text-emerald-600">
                          <MapPin size={20} />
                          <h3 className="font-bold text-sm uppercase tracking-wide">Business Address</h3>
                      </div>
                      <div className="space-y-3">
                          <input 
                              type="text" 
                              placeholder="Street Address, City, State"
                              value={formData.address}
                              onChange={(e) => setFormData({...formData, address: e.target.value})}
                              className="w-full p-3 bg-gray-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-emerald-500"
                          />
                          <button className="w-full py-2 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-lg flex items-center justify-center">
                              <MapPin size={14} className="mr-2" /> Pin Location on Map (Geolocation)
                          </button>
                      </div>
                   </section>

                  {/* SECTION 4: DOCUMENT VERIFICATION */}
                  <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                      <div className="flex items-center space-x-2 mb-4 text-emerald-600">
                          <ShieldCheck size={20} />
                          <h3 className="font-bold text-sm uppercase tracking-wide">Verification Docs</h3>
                      </div>
                      
                      <div className="space-y-4">
                          <div>
                              <label className="text-xs font-bold text-gray-500 mb-1 block">Government ID Type</label>
                              <select 
                                className="w-full p-3 bg-gray-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-emerald-500 mb-2"
                                value={formData.govIdType}
                                onChange={(e) => setFormData({...formData, govIdType: e.target.value})}
                              >
                                  <option value="NIN">National ID (NIN)</option>
                                  <option value="Passport">International Passport</option>
                                  <option value="DriversLicense">Driver's License</option>
                                  <option value="VotersCard">Voter's Card</option>
                              </select>
                              <div className="p-4 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center bg-gray-50 text-gray-400 hover:bg-gray-100 transition-colors cursor-pointer">
                                  <FileText size={24} className="mb-2" />
                                  <span className="text-xs font-medium">Upload Document Front</span>
                              </div>
                          </div>

                          <div>
                              <label className="text-xs font-bold text-gray-500 mb-1 block">Live Selfie / Face Match</label>
                              <button className="w-full py-3 bg-emerald-50 text-emerald-600 rounded-xl font-bold text-sm flex items-center justify-center border border-emerald-100">
                                  <Eye size={16} className="mr-2" /> Start Face Verification
                              </button>
                          </div>
                      </div>
                  </section>

                  {/* SECTION 5: FINANCIALS */}
                  <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                      <div className="flex items-center space-x-2 mb-4 text-emerald-600">
                          <CreditCard size={20} />
                          <h3 className="font-bold text-sm uppercase tracking-wide">Bank Details</h3>
                      </div>
                      <div className="space-y-3">
                           <input 
                              type="text" 
                              placeholder="Bank Name"
                              value={formData.bankName}
                              onChange={(e) => setFormData({...formData, bankName: e.target.value})}
                              className="w-full p-3 bg-gray-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-emerald-500"
                          />
                          <div className="flex space-x-3">
                              <input 
                                  type="text" 
                                  placeholder="Account Number"
                                  className="flex-1 p-3 bg-gray-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-emerald-500"
                                  value={formData.bankAccount}
                                  onChange={(e) => setFormData({...formData, bankAccount: e.target.value})}
                              />
                              <input 
                                  type="text" 
                                  placeholder="BVN (Hidden)"
                                  className="flex-1 p-3 bg-gray-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-emerald-500"
                                  value={formData.bvn}
                                  onChange={(e) => setFormData({...formData, bvn: e.target.value})}
                              />
                          </div>
                          <p className="text-[10px] text-gray-400 flex items-center"><Lock size={10} className="mr-1"/> Name on account must match Legal Name.</p>
                      </div>
                  </section>

                  {/* SECTION 6: TRUST & SAFETY */}
                  <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                      <div className="flex items-center space-x-2 mb-4 text-red-500">
                          <AlertTriangle size={20} />
                          <h3 className="font-bold text-sm uppercase tracking-wide">Emergency Contact (Optional)</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                          <input 
                              type="text" 
                              placeholder="Name"
                              className="w-full p-3 bg-gray-50 rounded-xl text-sm"
                              value={formData.emergencyContactName}
                              onChange={(e) => setFormData({...formData, emergencyContactName: e.target.value})}
                          />
                          <input 
                              type="tel" 
                              placeholder="Phone"
                              className="w-full p-3 bg-gray-50 rounded-xl text-sm"
                              value={formData.emergencyContactPhone}
                              onChange={(e) => setFormData({...formData, emergencyContactPhone: e.target.value})}
                          />
                      </div>
                  </section>

                  {/* AGREEMENT */}
                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                      <label className="flex items-start space-x-3">
                          <input 
                            type="checkbox" 
                            className="mt-1 w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                            checked={formData.termsAccepted}
                            onChange={(e) => setFormData({...formData, termsAccepted: e.target.checked})}
                          />
                          <span className="text-xs text-emerald-900">
                              I agree to the <b className="cursor-pointer underline">Anti-Fraud Terms</b>. I confirm that all provided information is accurate and matches my legal documents. False information will lead to a permanent ban.
                          </span>
                      </label>
                  </div>

              </div>

              {/* Submit Footer */}
              <div className="bg-white p-4 border-t border-gray-100 sticky bottom-0 z-10 safe-area-bottom">
                  <button 
                      onClick={() => setView('otp')} // Go to OTP after full form
                      disabled={!formData.termsAccepted || !formData.name || !formData.phone}
                      className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-emerald-200 disabled:bg-gray-300 disabled:shadow-none transition-all"
                  >
                      Submit for Verification
                  </button>
              </div>
          </div>
      );
  }

  // 7. OTP VERIFICATION
  if (view === 'otp') {
    return (
        <div className="min-h-screen bg-white p-6 flex flex-col items-center pt-20">
            <button onClick={() => setView(roleSelection === 'customer' ? 'register' : 'verification')} className="absolute top-6 left-6 p-2 -ml-2 text-gray-400"><ArrowLeft /></button>
            
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600">
                <Lock size={32} />
            </div>
            
            <h2 className="text-2xl font-bold text-slate-900 text-center">Verify Number</h2>
            <p className="text-gray-500 text-center mt-2 mb-8 max-w-xs">
                We sent a 6-digit code to <b className="text-slate-800">{formData.phone || '+234 812 345 6789'}</b>
            </p>

            <div className="flex space-x-3 mb-8">
                {otp.map((digit, idx) => (
                    <input
                        key={idx}
                        id={`otp-${idx}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        className="w-12 h-14 bg-gray-50 border border-gray-200 rounded-xl text-center text-2xl font-bold text-emerald-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                    />
                ))}
            </div>

            <button 
                onClick={finalizeSignup}
                className="w-full max-w-xs bg-emerald-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-emerald-200"
            >
                Verify & Create Account
            </button>
            <p className="mt-6 text-sm text-gray-500 font-medium">Resend Code in 0:45</p>
        </div>
    );
  }

  // 8. WELCOME SUCCESS (UPDATED DESIGN)
  if (view === 'welcome') {
      return (
          <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
              {/* Animated Background Particles */}
              <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
                  <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-emerald-500 rounded-full animate-ping delay-700"></div>
                  <div className="absolute bottom-10 left-1/2 w-2 h-2 bg-white rounded-full animate-pulse delay-500"></div>
              </div>

              <div className="relative z-10 flex flex-col items-center animate-in fade-in zoom-in duration-700">
                  {/* Custom Handshake H Logo */}
                  <div className="w-48 h-48 mb-6 relative">
                      {/* Structure: Two Pillars + Handshake Icon Crossbar */}
                      <div className="w-full h-full flex items-center justify-between px-8 relative">
                           {/* Left Pillar */}
                           <div className="w-5 h-full bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] animate-[pulse_3s_ease-in-out_infinite]"></div>
                           
                           {/* Connecting Arm Left */}
                           <div className="absolute left-1/2 top-1/2 -translate-x-full h-3 w-12 bg-white/80 rounded-l-full -ml-3"></div>

                           {/* Handshake Center Icon */}
                           <div className="z-10 relative">
                                {/* The Nokia-inspired Connection Spark/Glow */}
                                <div className="absolute inset-0 bg-blue-400 rounded-full blur-xl opacity-40 animate-pulse scale-150"></div>
                                <div className="relative bg-emerald-800 p-4 rounded-full border-4 border-white animate-handshake shadow-2xl">
                                     <Handshake size={48} className="text-white drop-shadow-md" strokeWidth={2.5} />
                                </div>
                           </div>

                           {/* Connecting Arm Right */}
                           <div className="absolute right-1/2 top-1/2 translate-x-full h-3 w-12 bg-white/80 rounded-r-full -mr-3"></div>

                           {/* Right Pillar */}
                           <div className="w-5 h-full bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] animate-[pulse_3s_ease-in-out_infinite] delay-150"></div>
                      </div>
                  </div>

                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Handy</h1>
                  <p className="text-xl text-emerald-100 font-medium mb-2">Verified Talent. Trusted Results.</p>
                  <p className="text-emerald-300/80 text-sm animate-pulse">Connecting...</p>
                  
                  <div className="mt-12 flex flex-col items-center space-y-3">
                     <div className="h-1.5 w-48 bg-emerald-900/50 rounded-full overflow-hidden backdrop-blur-sm border border-emerald-500/20">
                         <div className="h-full bg-emerald-400 animate-[loading_1.5s_ease-in-out_infinite]" style={{width: '60%'}}></div>
                     </div>
                  </div>
              </div>
          </div>
      )
  }

  return <div>Error: Unknown View</div>;
};
