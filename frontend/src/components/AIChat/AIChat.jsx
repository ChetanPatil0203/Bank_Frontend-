import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, ArrowRight, Minus, Clock, Paperclip, MoreVertical, Trash2, Sparkles, ThumbsUp, ThumbsDown } from 'lucide-react';

const AIChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);

    const fileInputRef = useRef(null);
    const messagesEndRef = useRef(null);

    const suggestions = [
        "I want to learn about Payzen Bank products and services",
        "I need technical support",
        "I have an account and billing issue"
    ];

    const handleToggle = () => setIsOpen(!isOpen);
    const handleFileUpload = () => fileInputRef.current?.click();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    // Function to format the AI response text with points
    const formatResponse = (text) => {
        if (!text) return null;
        
        // Split by new lines and handle bullet points/numbered lists
        return text.split('\n').map((line, index) => {
            const trimmedLine = line.trim();
            if (!trimmedLine) return <div key={index} className="h-2" />;
            
            // Check if line starts with a bullet point (* or -)
            if (trimmedLine.startsWith('*') || trimmedLine.startsWith('-')) {
                return (
                    <div key={index} className="flex gap-2 mb-1.5 ml-1">
                        <span className="text-indigo-500 mt-1">•</span>
                        <span>{trimmedLine.substring(1).trim()}</span>
                    </div>
                );
            }
            
            // Regular text
            return <div key={index} className="mb-2 leading-relaxed">{line}</div>;
        });
    };

    const handleSendMessage = async (text = inputValue) => {
        if (!text.trim()) return;

        const newUserMessage = { id: Date.now(), text: text, sender: 'user' };
        setMessages(prev => [...prev, newUserMessage]);
        setInputValue('');
        setIsTyping(true);

        try {
            const history = messages.map(msg => ({
                role: msg.sender === 'user' ? 'user' : 'model',
                parts: [{ text: msg.text }]
            }));

            const response = await fetch('http://127.0.0.1:5000/api/v1/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text, history: history }),
            });

            const data = await response.json();
            if (data.error) throw new Error(data.error);

            const botResponse = {
                id: Date.now() + 1,
                text: data.response,
                sender: 'bot',
                showFeedback: true
            };
            setMessages(prev => [...prev, botResponse]);
        } catch (error) {
            console.error("AI Error:", error);
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: "Sorry, I'm having trouble connecting to my brain right now. Please check if the backend is running.",
                sender: 'bot',
                showFeedback: false
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleFeedbackClick = (messageId) => {
        setMessages(prev => prev.map(msg =>
            msg.id === messageId ? { ...msg, showFeedback: false } : msg
        ));

        setIsTyping(true);
        setTimeout(() => {
            const thankYouResponse = {
                id: Date.now(),
                text: "Thank you for your feedback.",
                sender: 'bot',
                showFeedback: false
            };
            setMessages(prev => [...prev, thankYouResponse]);
            setIsTyping(false);
        }, 800);
    };

    const handleKeyDown = (e) => { if (e.key === 'Enter') handleSendMessage(); };
    const handleClearConversation = () => { setMessages([]); setIsMenuOpen(false); };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMenuOpen && !event.target.closest('.menu-container')) setIsMenuOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMenuOpen]);

    const brandGradient = "bg-gradient-to-br from-[#6366f1] to-[#a855f7]";

    return (
        <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[9999] font-sans antialiased select-none">
            <input type="file" className="hidden" ref={fileInputRef} onChange={(e) => console.log(e.target.files[0])} />

            <button className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[9999] bg-transparent border border-white/10 backdrop-blur-md rounded-xl shadow-2xl flex items-center justify-center gap-3 transition-all duration-300 bg-white/10 p-2 px-2 md:px-3 py-2" onClick={handleToggle}>
                <svg viewBox="0 0 24 24" fill="none" className="w-[28px] h-[28px] md:w-[32px] md:h-[32px] shrink-0">
                    <defs>
                        <radialGradient id="g1" cx="12" cy="8" r="10" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#D93025" /><stop offset="100%" stopColor="#D93025" stopOpacity="0" /></radialGradient>
                        <radialGradient id="g2" cx="16" cy="12" r="10" gradientUnits="userSpaceOnUse"><stop offset="5%" stopColor="#1967D2" /><stop offset="100%" stopColor="#1967D2" stopOpacity="0" /></radialGradient>
                        <radialGradient id="g3" cx="8" cy="12" r="10" gradientUnits="userSpaceOnUse"><stop offset="5%" stopColor="#F9AB00" /><stop offset="100%" stopColor="#F9AB00" stopOpacity="0" /></radialGradient>
                        <radialGradient id="g4" cx="12" cy="16" r="10" gradientUnits="userSpaceOnUse"><stop offset="5%" stopColor="#188038" /><stop offset="100%" stopColor="#188038" stopOpacity="0" /></radialGradient>
                    </defs>
                    <path d="M12 0C12 9 15 12 24 12C15 12 12 15 12 24C12 15 9 12 0 12C9 12 12 9 12 0Z" fill="url(#g3)" /><path d="M12 0C12 9 15 12 24 12C15 12 12 15 12 24C12 15 9 12 0 12C9 12 12 9 12 0Z" fill="url(#g1)" /><path d="M12 0C12 9 15 12 24 12C15 12 12 15 12 24C12 15 9 12 0 12C9 12 12 9 12 0Z" fill="url(#g2)" /><path d="M12 0C12 9 15 12 24 12C15 12 12 15 12 24C12 15 9 12 0 12C9 12 12 9 12 0Z" fill="url(#g4)" />
                </svg>
                <span className="font-semibold text-white tracking-tight text-sm md:text-base">AI Mode</span>
            </button>

            <div className={`fixed bottom-20 right-4 md:bottom-24 md:right-6 w-[calc(100vw-2rem)] md:w-[450px] h-[calc(100vh-12rem)] md:h-[680px] bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 origin-bottom-right transform flex flex-col ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
                <div className={`${brandGradient} p-5 md:p-6 text-white shrink-0`}>
                    <div className="flex justify-between items-center mb-5">
                        <div className="flex items-center gap-2.5">
                            <h2 className="text-[18px] md:text-[20px] font-bold tracking-tight">Ask Payzen</h2>
                            <div className="bg-white/20 backdrop-blur-md px-2 py-[2px] rounded flex items-center gap-1">
                                <Clock size={10} className="text-white" />
                                <span className="text-[9px] font-bold uppercase tracking-wider text-white">active</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"><MoreVertical size={20} /></button>
                            <button onClick={handleToggle} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"><Minus size={22} strokeWidth={3} /></button>
                            {isMenuOpen && (
                                <div className="absolute top-16 right-10 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-50 menu-container animate-in fade-in zoom-in duration-200">
                                    <button onClick={handleClearConversation} className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2.5 font-semibold" disabled={messages.length === 0}><Trash2 size={16} /> Clear conversation</button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="relative">
                        <input type="text" placeholder="Ask a question..." className="w-full bg-white rounded-xl px-4 py-3.5 pr-20 text-gray-800 outline-none placeholder:text-gray-400 font-medium text-[15px] shadow-inner" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyDown} />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                            <button onClick={handleFileUpload} className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"><Paperclip size={18} /></button>
                            <button onClick={() => handleSendMessage()} className={`w-[34px] h-[34px] rounded-lg flex items-center justify-center transition-all ${inputValue.trim() ? 'bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 active:scale-95' : 'bg-gray-100 text-gray-300'}`} disabled={!inputValue.trim()}><ArrowRight size={18} strokeWidth={3} /></button>
                        </div>
                    </div>
                </div>

                <div className="flex-1 p-5 md:p-6 overflow-y-auto space-y-6 scroll-smooth">
                    {messages.length === 0 ? (
                        <div className="space-y-6">
                            <div className="space-y-1">
                                <h3 className="text-lg font-bold text-gray-800">Hello! I'm Payzen AI.</h3>
                                <p className="text-sm text-gray-500 font-medium leading-relaxed caps">How can I assist you today? You can choose a topic below or type anything.</p>
                            </div>
                            <div className="grid gap-3">
                                {suggestions.map((s, i) => (
                                    <button key={i} onClick={() => handleSendMessage(s)} className="text-left p-4 rounded-xl border border-gray-100 bg-white hover:border-indigo-200 hover:bg-indigo-50/30 transition-all text-[14px] font-semibold text-gray-700 shadow-sm group">
                                        <span className="group-hover:text-indigo-600 transition-colors flex items-center justify-between">{s} <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /></span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-6">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
                                    {msg.sender === 'bot' && (
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center mr-3 mt-1 shrink-0 text-white shadow-lg shadow-indigo-200">
                                            <Sparkles size={16} strokeWidth={2.5} />
                                        </div>
                                    )}
                                    <div className={`
                                        max-w-[85%] rounded-2xl p-4 text-[14.5px] font-medium leading-relaxed
                                        ${msg.sender === 'user'
                                            ? 'bg-gray-100 text-gray-800 rounded-tr-sm shadow-sm'
                                            : 'text-gray-800 rounded-tl-sm px-0 py-2'}
                                    `}>
                                        {msg.sender === 'bot' ? formatResponse(msg.text) : msg.text}
                                        
                                        {msg.sender === 'bot' && msg.showFeedback && (
                                            <div className="flex gap-4 mt-4 pt-4 border-t border-gray-50">
                                                <button onClick={() => handleFeedbackClick(msg.id)} className="text-gray-300 hover:text-indigo-500 transition-colors"><ThumbsUp size={16} /></button>
                                                <button onClick={() => handleFeedbackClick(msg.id)} className="text-gray-300 hover:text-red-500 transition-colors"><ThumbsDown size={16} /></button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0"><Sparkles size={16} /></div>
                                    <div className="flex gap-1">
                                        <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                        <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                        <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </div>

                <div className="p-4 text-center border-t border-gray-50 bg-gray-50/30 shrink-0">
                    <p className="text-[11px] text-gray-400 font-semibold px-4 tracking-tight leading-tight">
                        Our AI can help with account setups and generic banking questions. For security, never share passwords.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AIChat;
