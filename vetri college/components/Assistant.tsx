
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, ChevronDown } from 'lucide-react';
import { getGeminiResponse } from '../services/gemini';
import { ChatMessage } from '../types';

const TypingIndicator: React.FC = () => (
  <div className="flex items-center gap-1 px-1 py-1">
    <div className="w-1.5 h-1.5 bg-[#2DAA5F] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
    <div className="w-1.5 h-1.5 bg-[#2DAA5F] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
    <div className="w-1.5 h-1.5 bg-[#2DAA5F] rounded-full animate-bounce"></div>
  </div>
);

const Assistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello! I am your Vetri Assistant. How can I help you today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [hasNewMessages, setHasNewMessages] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const prevMessagesLength = useRef(messages.length);

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior
      });
      setHasNewMessages(false);
    }
  };

  // Handle initial opening
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => scrollToBottom('auto'), 100);
    }
  }, [isOpen]);

  // Handle new messages logic
  useEffect(() => {
    if (messages.length > prevMessagesLength.current) {
      // If user is scrolled up, don't force scroll, but show indicator
      if (showScrollButton) {
        setHasNewMessages(true);
      } else {
        scrollToBottom();
      }
      prevMessagesLength.current = messages.length;
    }
  }, [messages, showScrollButton]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      // Consider "at bottom" if within 50px
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
      setShowScrollButton(!isAtBottom);
      
      if (isAtBottom) {
        setHasNewMessages(false);
      }
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue.trim();
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setInputValue('');
    setIsLoading(true);

    const botResponse = await getGeminiResponse(userText);
    setMessages(prev => [...prev, { role: 'model', text: botResponse }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {isOpen ? (
        <div className="bg-white rounded-2xl shadow-2xl w-[350px] max-w-[90vw] h-[500px] border border-gray-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-[#2DAA5F] p-4 flex justify-between items-center text-white shadow-md">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Vetri Assistant</h3>
                <p className="text-[10px] text-white/80">Online and ready to help</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50 scroll-smooth relative"
          >
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm transition-all ${
                  msg.role === 'user' 
                    ? 'bg-[#2DAA5F] text-white rounded-tr-none' 
                    : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-none shadow-sm">
                  <TypingIndicator />
                </div>
              </div>
            )}

            {/* Scroll to Bottom Button - Shows when scrolled up, with special notification if new messages exist */}
            {showScrollButton && (
              <button 
                onClick={() => scrollToBottom()}
                className={`sticky bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-2 rounded-full shadow-lg border transition-all z-10 animate-bounce ${
                  hasNewMessages 
                    ? 'bg-[#2DAA5F] text-white border-[#2DAA5F]' 
                    : 'bg-white text-[#2DAA5F] border-gray-200 hover:bg-gray-50'
                }`}
                title="Scroll to bottom"
              >
                {hasNewMessages && <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>}
                <ChevronDown className="w-4 h-4" />
                {hasNewMessages && <span className="text-[10px] font-bold uppercase tracking-tight">New Messages</span>}
              </button>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-100 bg-white flex gap-2 items-center">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask a question..."
              className="flex-1 bg-gray-50 border border-gray-100 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-[#2DAA5F] focus:bg-white outline-none transition-all"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !inputValue.trim()}
              className="p-2.5 bg-[#2DAA5F] text-white rounded-full disabled:opacity-50 disabled:grayscale hover:bg-[#258d4e] hover:shadow-lg transition-all transform active:scale-90"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-[#2DAA5F] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300 group relative"
        >
          <MessageCircle className="w-8 h-8" />
          <span className="absolute -top-12 right-0 bg-white text-[#2DAA5F] text-xs font-bold px-3 py-1 rounded-lg border border-[#2DAA5F] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-sm pointer-events-none">
            Need help?
          </span>
        </button>
      )}
    </div>
  );
};

export default Assistant;
