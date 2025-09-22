import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Zap, Heart, Smile, MoreVertical, Maximize2, Minimize2 } from 'lucide-react';

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey there! ✨ I'm your AI assistant. What can I help you with today?",
      sender: 'bot',
      timestamp: new Date(),
      reactions: []
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [theme, setTheme] = useState('light');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const quickActions = [
    { text: "How can you help me?", icon: "❓" },
    { text: "Tell me a joke", icon: "😄" },
    { text: "What's the weather?", icon: "🌤️" },
    { text: "Show me features", icon: "⚡" }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      setUnreadCount(0);
    }
  }, [open]);

  const handleSendMessage = (messageText = inputMessage) => {
    if (!messageText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: messageText.trim(),
      sender: 'user',
      timestamp: new Date(),
      reactions: []
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    setShowQuickActions(false);

    setTimeout(() => {
      const botResponses = [
        "That's a great question! Let me think about that... 🤔",
        "I love helping with that! Here's what I can tell you... ✨",
        "Absolutely! I'm here to make things easier for you 💫",
        "Perfect timing! I was just thinking about that topic 🎯",
        "Thanks for asking! This is one of my favorite things to discuss 🚀"
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage = {
        id: Date.now() + 1,
        text: randomResponse,
        sender: 'bot',
        timestamp: new Date(),
        reactions: []
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      
      if (!open) {
        setUnreadCount(prev => prev + 1);
      }
    }, 1200 + Math.random() * 800);
  };

  const handleQuickAction = (action) => {
    handleSendMessage(action.text);
  };

  const addReaction = (messageId, emoji) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const existingReaction = msg.reactions.find(r => r.emoji === emoji);
        if (existingReaction) {
          return {
            ...msg,
            reactions: msg.reactions.map(r => 
              r.emoji === emoji ? { ...r, count: r.count + 1 } : r
            )
          };
        } else {
          return {
            ...msg,
            reactions: [...msg.reactions, { emoji, count: 1 }]
          };
        }
      }
      return msg;
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const chatSize = maximized ? 'w-96 h-[600px]' : 'w-80 h-[500px]';
  const isDark = theme === 'dark';

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setOpen(true)}
          className="group relative bg-gradient-to-r from-emerald-400 to-green-500 hover:from-emerald-500 hover:to-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-500 hover:scale-110 hover:shadow-2xl"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12" />
          
          {/* Ripple Effect */}
          <div className="absolute inset-0 rounded-full bg-green-400 opacity-75 animate-ping"></div>
          
          {/* Unread Badge */}
          {unreadCount > 0 && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-bounce shadow-lg">
              {unreadCount > 9 ? '9+' : unreadCount}
            </div>
          )}
          
          {/* Floating Sparkles */}
          <div className="absolute -top-1 -left-1 text-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Sparkles className="w-3 h-3 animate-spin" />
          </div>
          <div className="absolute -bottom-1 -right-1 text-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
        </button>
      </div>

      {/* Chat Window */}
      {open && (
        <div className={`fixed bottom-6 right-6 ${chatSize} ${isDark ? 'bg-gray-900' : 'bg-white'} rounded-2xl shadow-2xl border ${isDark ? 'border-gray-700' : 'border-gray-200'} z-50 transition-all duration-300 animate-in slide-in-from-bottom-8 backdrop-blur-sm`}>
          
          {/* Header */}
          <div className={`${isDark ? 'bg-gradient-to-r from-gray-800 to-gray-700' : 'bg-gradient-to-r from-gray-50 to-white'} p-4 rounded-t-2xl flex justify-between items-center border-b ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <Sparkles className="w-5 h-5 text-white animate-pulse" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h1 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>AI Assistant</h1>
                <p className={`text-xs ${isDark ? 'text-green-400' : 'text-green-600'}`}>Online • Always here to help</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}
              >
                {isDark ? '🌙' : '☀️'}
              </button>
              <button
                onClick={() => setMaximized(!maximized)}
                className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}
              >
                {maximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button 
                onClick={() => setOpen(false)} 
                className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`} style={{ height: maximized ? '450px' : '320px' }}>
            
            {/* Quick Actions */}
            {showQuickActions && messages.length === 1 && (
              <div className="space-y-2 animate-in fade-in-50 slide-in-from-bottom-4">
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} text-center`}>Quick actions to get started:</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickAction(action)}
                      className={`p-3 rounded-xl border transition-all duration-200 hover:scale-105 ${
                        isDark 
                          ? 'bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-300' 
                          : 'bg-white border-gray-200 hover:border-green-200 hover:bg-green-50 text-gray-700'
                      }`}
                    >
                      <div className="text-lg mb-1">{action.icon}</div>
                      <div className="text-xs">{action.text}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Messages */}
            {messages.map((message, index) => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-${message.sender === 'user' ? 'right' : 'left'}-4 duration-300`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`max-w-[85%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                  <div className={`group relative p-4 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md ${
                    message.sender === 'user' 
                      ? `bg-gradient-to-r from-green-500 to-emerald-500 text-white ${message.sender === 'user' ? 'rounded-br-md' : ''}` 
                      : `${isDark ? 'bg-gray-800 border border-gray-700 text-gray-100' : 'bg-white border border-gray-200 text-gray-800'} ${message.sender === 'bot' ? 'rounded-bl-md' : ''}`
                  }`}>
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.text}</div>
                    
                    {/* Message Actions */}
                    {message.sender === 'bot' && (
                      <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => addReaction(message.id, '👍')}
                          className="text-xs hover:scale-125 transition-transform"
                        >
                          👍
                        </button>
                        <button 
                          onClick={() => addReaction(message.id, '❤️')}
                          className="text-xs hover:scale-125 transition-transform"
                        >
                          ❤️
                        </button>
                        <button 
                          onClick={() => addReaction(message.id, '😊')}
                          className="text-xs hover:scale-125 transition-transform"
                        >
                          😊
                        </button>
                      </div>
                    )}
                    
                    {/* Reactions */}
                    {message.reactions.length > 0 && (
                      <div className="flex gap-1 mt-2 flex-wrap">
                        {message.reactions.map((reaction, idx) => (
                          <span 
                            key={idx} 
                            className={`px-2 py-1 rounded-full text-xs ${isDark ? 'bg-gray-700' : 'bg-gray-100'} animate-in zoom-in-75`}
                          >
                            {reaction.emoji} {reaction.count}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className={`text-xs mt-2 opacity-70 ${
                      message.sender === 'user' ? 'text-green-100' : isDark ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start animate-in slide-in-from-left-4">
                <div className={`p-4 rounded-2xl rounded-bl-md ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-sm`}>
                  <div className="flex items-center gap-1">
                    <div className={`w-2 h-2 ${isDark ? 'bg-green-400' : 'bg-gray-400'} rounded-full animate-bounce`}></div>
                    <div className={`w-2 h-2 ${isDark ? 'bg-green-400' : 'bg-gray-400'} rounded-full animate-bounce`} style={{ animationDelay: '0.1s' }}></div>
                    <div className={`w-2 h-2 ${isDark ? 'bg-green-400' : 'bg-gray-400'} rounded-full animate-bounce`} style={{ animationDelay: '0.2s' }}></div>
                    <span className={`ml-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className={`p-4 border-t ${isDark ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'} rounded-b-2xl`}>
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <textarea
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message here..."
                  className={`w-full min-h-[44px] max-h-24 px-4 py-3 rounded-xl border transition-all duration-200 resize-none ${
                    isDark 
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-green-500' 
                      : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-500 focus:border-green-500 focus:bg-white'
                  } focus:outline-none focus:ring-2 focus:ring-green-500/20`}
                  disabled={isTyping}
                  rows={1}
                  style={{ 
                    height: 'auto',
                    minHeight: '44px'
                  }}
                  onInput={(e) => {
                    e.target.style.height = 'auto';
                    e.target.style.height = e.target.scrollHeight + 'px';
                  }}
                />
                {inputMessage.length > 400 && (
                  <div className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {500 - inputMessage.length} characters remaining
                  </div>
                )}
              </div>
              
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white p-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 hover:shadow-lg group"
              >
                <Send className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;