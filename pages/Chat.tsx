import React, { useState } from 'react';
import { Send, Paperclip, Mic, Image as ImageIcon, CreditCard, Shield, Lock, Search, ArrowLeft, Calendar, MessageSquare } from 'lucide-react';
import { Conversation, Message } from '../types';

// Mock Data
const MOCK_CONVERSATIONS: Conversation[] = [
    {
        id: 'c1',
        participantId: 'p1',
        participantName: 'Adeola Johnson',
        participantAvatar: 'https://picsum.photos/100/100?random=1',
        lastMessage: 'I have started working on your logo concepts!',
        lastMessageTime: new Date(Date.now() - 1000 * 60 * 10), // 10 mins ago
        unreadCount: 2,
        isOnline: true
    },
    {
        id: 'c2',
        participantId: 'p3',
        participantName: 'Musa Auto',
        participantAvatar: 'https://picsum.photos/100/100?random=3',
        lastMessage: 'The website is ready for review.',
        lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
        unreadCount: 0,
        isOnline: false
    }
];

const MOCK_MESSAGES: Message[] = [
  { id: '1', senderId: 'p1', text: 'Hello! Thanks for reaching out about the plumbing repair.', type: 'text', timestamp: new Date(Date.now() - 3600000) },
  { id: '2', senderId: 'me', text: 'Hi Adeola, yes. My kitchen sink is leaking heavily.', type: 'text', timestamp: new Date(Date.now() - 3500000) },
  { id: '3', senderId: 'p1', text: 'I can fix that. Here is a preview of a similar job I did yesterday.', type: 'text', timestamp: new Date(Date.now() - 3400000) },
  { id: '4', senderId: 'p1', text: '', type: 'image', previewUrl: 'https://picsum.photos/400/300', isWatermarked: true, timestamp: new Date(Date.now() - 3400000) },
  { id: '5', senderId: 'system', text: 'Adeola sent a Booking Request: ₦5,000', type: 'system', timestamp: new Date(Date.now() - 100000) }
];

export const Chat: React.FC = () => {
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [input, setInput] = useState('');
  const [showBookingModal, setShowBookingModal] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      text: input,
      type: 'text',
      timestamp: new Date()
    };
    setMessages([...messages, newMsg]);
    setInput('');
  };

  // View: Conversation List
  if (!activeConversation) {
      return (
          <div className="flex flex-col h-[calc(100vh-64px)] md:h-screen bg-white">
              <div className="px-4 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm">
                  <h1 className="text-xl font-bold mb-4">Messages</h1>
                  <div className="relative">
                      <Search className="absolute left-3 top-2.5 text-indigo-200" size={18} />
                      <input 
                        placeholder="Search conversations..." 
                        className="w-full bg-white/20 backdrop-blur-sm pl-10 pr-4 py-2 rounded-xl text-white placeholder-indigo-200 outline-none focus:bg-white/30 transition-colors text-sm"
                      />
                  </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                  {MOCK_CONVERSATIONS.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full text-gray-400">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <MessageSquare size={32} />
                          </div>
                          <p className="font-medium">No Messages</p>
                          <p className="text-xs mt-1">Start chatting with providers when you book a service</p>
                      </div>
                  ) : (
                      <div className="divide-y divide-gray-50">
                          {MOCK_CONVERSATIONS.map(conv => (
                              <div 
                                key={conv.id} 
                                onClick={() => setActiveConversation(conv)}
                                className="flex items-center p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                              >
                                  <div className="relative mr-4">
                                      <img src={conv.participantAvatar} className="w-12 h-12 rounded-full object-cover" />
                                      {conv.isOnline && (
                                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                                      )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                      <div className="flex justify-between items-baseline mb-1">
                                          <h3 className="font-bold text-slate-800 text-sm">{conv.participantName}</h3>
                                          <span className="text-[10px] text-gray-400">
                                              {conv.lastMessageTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                          </span>
                                      </div>
                                      <p className="text-sm text-gray-500 truncate pr-4">{conv.lastMessage}</p>
                                  </div>
                                  {conv.unreadCount > 0 && (
                                      <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                                          {conv.unreadCount}
                                      </div>
                                  )}
                              </div>
                          ))}
                      </div>
                  )}
              </div>
          </div>
      )
  }

  // View: Active Chat
  return (
    <div className="flex flex-col h-[calc(100vh-64px)] md:h-screen bg-gray-50">
      {/* Chat Header */}
      <div className="bg-white px-4 py-3 shadow-sm border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center space-x-3">
          <button onClick={() => setActiveConversation(null)} className="text-gray-500 hover:text-indigo-600">
              <ArrowLeft size={22} />
          </button>
          <div className="relative">
             <img src={activeConversation.participantAvatar} className="w-10 h-10 rounded-full" />
             <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h3 className="font-bold text-slate-800">{activeConversation.participantName}</h3>
            <p className="text-xs text-gray-500 flex items-center"><Shield size={10} className="mr-1 text-indigo-500" /> Verified Entrepreneur</p>
          </div>
        </div>
        <button 
          onClick={() => setShowBookingModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors"
        >
          Book Now
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="flex justify-center">
            <span className="text-xs bg-gray-200 text-gray-600 px-3 py-1 rounded-full">Today</span>
        </div>
        
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'}`}>
            {msg.type === 'system' ? (
                <div className="w-full flex justify-center my-2">
                    <div className="bg-orange-50 border border-orange-100 p-3 rounded-lg flex items-center space-x-3 max-w-sm shadow-sm">
                        <div className="bg-orange-100 p-2 rounded-full text-orange-600"><CreditCard size={18} /></div>
                        <div>
                            <p className="text-xs font-bold text-orange-800">{msg.text}</p>
                            <p className="text-[10px] text-orange-600">Funds held in Escrow until completion.</p>
                        </div>
                        <button className="bg-orange-600 text-white text-xs px-3 py-1.5 rounded shadow-sm hover:bg-orange-700">Pay</button>
                    </div>
                </div>
            ) : (
                <div className={`max-w-[80%] rounded-2xl p-3 ${msg.senderId === 'me' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white text-slate-800 rounded-bl-none shadow-sm'}`}>
                    {msg.type === 'image' && (
                        <div className="relative mb-2 overflow-hidden rounded-lg group">
                            <img src={msg.previewUrl} className={`w-full h-40 object-cover ${msg.isWatermarked ? 'blur-[1px]' : ''}`} />
                            {msg.isWatermarked && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                    <div className="rotate-[-20deg] border-2 border-white/50 text-white/50 text-xl font-bold px-4 py-2 rounded">PREVIEW ONLY</div>
                                    <Lock className="absolute top-2 right-2 text-white/80" size={16} />
                                </div>
                            )}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                                <span className="text-[10px] text-white flex items-center"><Lock size={10} className="mr-1"/> Payment required to download</span>
                            </div>
                        </div>
                    )}
                    <p className="text-sm">{msg.text}</p>
                    <span className={`text-[10px] block text-right mt-1 ${msg.senderId === 'me' ? 'text-indigo-200' : 'text-gray-400'}`}>
                        {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="bg-white p-3 border-t border-gray-100 flex items-center space-x-2 pb-6 md:pb-3 safe-area-bottom">
        <button className="p-2 text-gray-400 hover:text-indigo-600 bg-gray-50 rounded-full hover:bg-indigo-50 transition-colors"><Paperclip size={20}/></button>
        <div className="flex-1 bg-gray-50 rounded-full px-4 py-2 flex items-center border border-transparent focus-within:border-indigo-200 focus-within:bg-white transition-all">
            <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..." 
                className="bg-transparent flex-1 outline-none text-sm"
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button className="text-gray-400 hover:text-indigo-600"><ImageIcon size={18}/></button>
        </div>
        {input ? (
             <button onClick={sendMessage} className="p-3 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 transition-colors"><Send size={18}/></button>
        ) : (
            <button className="p-3 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100 transition-colors"><Mic size={18}/></button>
        )}
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-sm p-6 space-y-4 animate-in fade-in zoom-in duration-200">
                <div className="text-center">
                    <div className="mx-auto w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-2">
                        <Calendar size={24} />
                    </div>
                    <h3 className="font-bold text-lg">Create Booking</h3>
                    <p className="text-sm text-gray-500">Secure escrow payment</p>
                </div>

                <div className="space-y-3">
                    <div>
                        <label className="text-xs font-bold text-gray-500">Service</label>
                        <div className="p-3 bg-gray-50 rounded-lg text-sm font-medium">Pipe Repair & Maintenance</div>
                    </div>
                    <div className="flex space-x-3">
                        <div className="flex-1">
                             <label className="text-xs font-bold text-gray-500">Date</label>
                             <input type="date" className="w-full p-2 border border-gray-200 rounded-lg text-sm" />
                        </div>
                        <div className="flex-1">
                             <label className="text-xs font-bold text-gray-500">Time</label>
                             <input type="time" className="w-full p-2 border border-gray-200 rounded-lg text-sm" />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500">Agreed Price (₦)</label>
                        <input type="number" defaultValue={5000} className="w-full p-3 border border-gray-200 rounded-lg text-lg font-bold text-indigo-700" />
                    </div>
                </div>

                <div className="flex space-x-3 pt-2">
                    <button onClick={() => setShowBookingModal(false)} className="flex-1 py-3 text-gray-600 font-medium text-sm hover:bg-gray-50 rounded-xl">Cancel</button>
                    <button onClick={() => {
                        setShowBookingModal(false);
                        setMessages([...messages, { id: Date.now().toString(), senderId: 'system', text: 'Booking request sent for ₦5,000', type: 'system', timestamp: new Date() }]);
                    }} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors">Send Request</button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};