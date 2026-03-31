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

    const handleSendMessage = (text = inputValue) => {
        if (!text.trim()) return;

        // Add user message
        const newUserMessage = { id: Date.now(), text: text, sender: 'user' };
        setMessages(prev => [...prev, newUserMessage]);
        setInputValue('');
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const botResponse = {
                id: Date.now() + 1,
                text: "I am a demo AI assistant for Payzen Bank. I can help you with account inquiries, technical support, and product information. This is a simulated response designed to demonstrate the chat interface.",
                sender: 'bot',
                showFeedback: true
            };
            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
        }, 1500);
    };

    const handleFeedbackClick = (messageId) => {
        // Remove feedback buttons from the message that was clicked
        setMessages(prev => prev.map(msg =>
            msg.id === messageId ? { ...msg, showFeedback: false } : msg
        ));

        // Simulate typing for the "Thank you" response
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

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const handleClearConversation = () => {
        setMessages([]);
        setIsMenuOpen(false);
    };

    // Close menu if clicked outside loosely
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMenuOpen && !event.target.closest('.menu-container')) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMenuOpen]);

    // Exact Gradient from the image
    const brandGradient = "bg-gradient-to-br from-[#6366f1] to-[#a855f7]";

    return (
        <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[9999] font-sans antialiased select-none">
            <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={(e) => console.log(e.target.files[0])}
            />

            {/* Floating Toggle Button - Transparent with Image Colors */}
            <button
                className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[9999] bg-transparent border border-white/10 backdrop-blur-md rounded-xl shadow-2xl flex items-center justify-center gap-3 transition-all duration-300 bg-white/10 p-2 px-2 md:px-2"
                onClick={handleToggle}
                aria-label="Toggle AI Assistant"
            >
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[32px] h-[32px] md:w-[36px] md:h-[36px] shrink-0 transition-transform duration-300 group-hover:scale-110"
                >
                    <defs>
                        {/* Deep Ruby Red - Top */}
                        <radialGradient id="gemini_dark_red" cx="12" cy="8" r="10" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#D93025" />
                            <stop offset="100%" stopColor="#D93025" stopOpacity="0" />
                        </radialGradient>

                        {/* Deep Cobalt Blue - Right */}
                        <radialGradient id="gemini_dark_blue" cx="16" cy="12" r="10" gradientUnits="userSpaceOnUse">
                            <stop offset="5%" stopColor="#1967D2" />
                            <stop offset="100%" stopColor="#1967D2" stopOpacity="0" />
                        </radialGradient>

                        {/* Deep Vivid Amber - Left */}
                        <radialGradient id="gemini_dark_yellow" cx="8" cy="12" r="10" gradientUnits="userSpaceOnUse">
                            <stop offset="5%" stopColor="#F9AB00" />
                            <stop offset="100%" stopColor="#F9AB00" stopOpacity="0" />
                        </radialGradient>

                        {/* Deep Forest Green - Bottom */}
                        <radialGradient id="gemini_dark_green" cx="12" cy="16" r="10" gradientUnits="userSpaceOnUse">
                            <stop offset="5%" stopColor="#188038" />
                            <stop offset="100%" stopColor="#188038" stopOpacity="0" />
                        </radialGradient>
                    </defs>

                    {/* Shadow base for depth */}
                    <path
                        d="M12 0C12 9 15 12 24 12C15 12 12 15 12 24C12 15 9 12 0 12C9 12 12 9 12 0Z"
                        fill="black"
                        fillOpacity="0.1"
                    />

                    {/* The Star Layers with Darker, Richer Colors */}
                    <path d="M12 0C12 9 15 12 24 12C15 12 12 15 12 24C12 15 9 12 0 12C9 12 12 9 12 0Z" fill="url(#gemini_dark_yellow)" />
                    <path d="M12 0C12 9 15 12 24 12C15 12 12 15 12 24C12 15 9 12 0 12C9 12 12 9 12 0Z" fill="url(#gemini_dark_red)" />
                    <path d="M12 0C12 9 15 12 24 12C15 12 12 15 12 24C12 15 9 12 0 12C9 12 12 9 12 0Z" fill="url(#gemini_dark_blue)" />
                    <path d="M12 0C12 9 15 12 24 12C15 12 12 15 12 24C12 15 9 12 0 12C9 12 12 9 12 0Z" fill="url(#gemini_dark_green)" />

                    {/* High-Contrast center point */}
                    <path
                        d="M12 0C12 9 15 12 24 12C15 12 12 15 12 24C12 15 9 12 0 12C9 12 12 9 12 0Z"
                        fill="white"
                        fillOpacity="0.15"
                    />
                </svg>
                <span className="font-semibold text-white tracking-tight">AI Mode</span>
            </button>

            {/* Chat Panel - Mobile Responsive */}
            <div className={`fixed bottom-20 right-4 md:bottom-24 md:right-6 w-[calc(100vw-2rem)] md:w-[450px] h-[calc(100vh-12rem)] md:h-[680px] bg-transparent bg-white/10 backdrop-blur-sm rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] overflow-hidden transition-all duration-500 origin-bottom-right transform flex flex-col ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-0 opacity-0 translate-y-10 pointer-events-none'}`}>

                {/* Header Section */}
                <div className={`${brandGradient} p-5 md:p-6 text-white shrink-0`}>
                    <div className="flex justify-between items-center mb-5 relative">

                        {/* Title & Badge (Left aligned) */}
                        <div className="flex items-center gap-2.5">
                            <h2 className="text-[18px] md:text-[20px] font-bold tracking-tight">Ask Payzen</h2>
                            <div className="inline-flex items-center gap-1.5 bg-white px-2 py-[2px] rounded shadow-sm">
                                <Clock size={11} strokeWidth={3} className="text-gray-800" />
                                <span className="text-[10px] text-gray-800 font-extrabold lowercase tracking-wide">built-in</span>
                            </div>
                        </div>

                        {/* Right Side Icons */}
                        <div className="flex items-center gap-0.5">
                            {/* 3-Dot Menu Dropdown */}
                            <div className="relative menu-container">
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="p-1.5 text-white/90 hover:text-white hover:bg-white/10 rounded-md transition-colors focus:outline-none"
                                >
                                    <MoreVertical size={20} strokeWidth={2.5} />
                                </button>

                                {isMenuOpen && (
                                    <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-50 origin-top-right">
                                        <button
                                            onClick={handleClearConversation}
                                            className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2.5 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            disabled={messages.length === 0}
                                        >
                                            <Trash2 size={16} strokeWidth={2.5} /> Clear conversation
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Minus Button */}
                            <button onClick={handleToggle} className="p-1.5 text-white/90 hover:text-white hover:bg-white/10 rounded-md transition-colors focus:outline-none">
                                <Minus size={22} strokeWidth={3} />
                            </button>
                        </div>
                    </div>

                    {/* Conditional Subtitle based on chat state */}
                    {messages.length === 0 && (
                        <p className="mb-5 text-[14px] font-medium text-white/95 leading-relaxed tracking-tight max-w-[95%]">
                            Get helpful guidance and recommendations from Payzen generative AI assistant.
                        </p>
                    )}

                    {/* Search Box - Inside Header with Document Upload */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Ask a question"
                            className="w-full bg-white rounded-xl px-4 py-[14px] pr-24 text-gray-800 outline-none placeholder:text-gray-500 font-medium shadow-sm transition-all focus:ring-2 focus:ring-white/30 text-[15px]"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                            {/* Document Upload Button */}
                            <button
                                onClick={handleFileUpload}
                                className="p-1.5 text-gray-400 hover:text-gray-700 transition-colors"
                                title="Upload Document"
                            >
                                <Paperclip size={18} strokeWidth={2.5} />
                            </button>
                            {/* Send Button */}
                            <button
                                onClick={() => handleSendMessage()}
                                className={`w-[34px] h-[34px] rounded-full flex items-center justify-center transition-all ${inputValue.trim() ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/20 hover:bg-indigo-700 hover:scale-105 active:scale-95' : 'bg-[#c5c7c8] text-white cursor-default'}`}
                                disabled={!inputValue.trim()}
                            >
                                <ArrowRight size={18} strokeWidth={3} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content Section - Either Suggestions or Chat History */}
                <div className="flex-1 p-5 md:p-6 overflow-y-auto scrollbar-hide bg-gray-50/20">
                    {messages.length === 0 ? (
                        // Suggestions View
                        <div className="space-y-6 animate-in fade-in duration-500">
                            <div className="space-y-1.5">
                                <h3 className="text-[15px] font-semibold text-gray-800 tracking-tight">Want help getting started?</h3>
                                <p className="text-[14px] text-gray-500/90 font-medium leading-relaxed">
                                    Tell us a little bit about what you're looking for.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3">
                                {suggestions.map((suggestion, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSendMessage(suggestion)}
                                        className="w-full text-left p-4 rounded-xl border border-purple-200/40 bg-white hover:bg-[#f4faff] hover:border-purple-300 transition-all text-[14px] font-medium text-gray-700 leading-snug group shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]"
                                    >
                                        <span className="group-hover:text-indigo-600 transition-colors">{suggestion}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        // Chat History View
                        <div className="flex flex-col gap-6">
                            {messages.map((msg) => (
                                <div key={msg.id} className="animate-in slide-in-from-bottom-2 duration-300">
                                    <div className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        {msg.sender === 'bot' && (
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center mr-3 mt-1 shrink-0 shadow-sm text-white">
                                                <Sparkles size={16} strokeWidth={2.5} />
                                            </div>
                                        )}
                                        <div className={`
                      max-w-[85%] rounded-2xl p-4 text-[14.5px] font-medium leading-relaxed
                      ${msg.sender === 'user'
                                                ? 'bg-gray-100 text-gray-800 rounded-tr-sm'
                                                : 'bg-white border border-gray-100 shadow-sm text-gray-700 rounded-tl-sm'}
                    `}>
                                            {msg.text}
                                        </div>
                                    </div>

                                    {/* Feedback Buttons for Bot Messages */}
                                    {msg.sender === 'bot' && msg.showFeedback && (
                                        <div className="flex gap-4 mt-2 ml-14">
                                            <button
                                                onClick={() => handleFeedbackClick(msg.id)}
                                                className="text-black hover:text-gray-700 transition-colors focus:outline-none"
                                            >
                                                <ThumbsUp size={16} strokeWidth={2.5} />
                                            </button>
                                            <button
                                                onClick={() => handleFeedbackClick(msg.id)}
                                                className="text-gray-300 hover:text-gray-500 transition-colors focus:outline-none"
                                            >
                                                <ThumbsDown size={16} strokeWidth={2.5} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* Typing Indicator */}
                            {isTyping && (
                                <div className="flex justify-start animate-in fade-in">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center mr-3 mt-1 shrink-0 shadow-sm text-white">
                                        <Sparkles size={16} strokeWidth={2.5} />
                                    </div>
                                    <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-tl-sm p-4 px-5 flex items-center gap-1.5 h-[52px]">
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 text-center border-t border-gray-50 bg-white shrink-0">
                    <p className="text-[11.5px] text-gray-500 font-medium">
                        By chatting, you agree to this <a href="#" className="text-blue-500 hover:text-blue-600 hover:underline transition-all">disclaimer</a>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AIChat;
