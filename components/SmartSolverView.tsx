import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Loader2, Eraser } from 'lucide-react';
import { useTheme } from './ThemeContext';
import { solveMathProblem } from '../services/geminiService';
import { ChatMessage } from '../types';

const SmartSolverView = () => {
  const { isDarkMode } = useTheme();
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Hello! I am your AI Math Assistant. Ask me to solve an equation, convert units, or explain a math concept.',
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!prompt.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: prompt
    };

    setMessages(prev => [...prev, userMsg]);
    setPrompt('');
    setIsLoading(true);

    try {
      const result = await solveMathProblem(userMsg.text);
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: result
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "I'm having trouble connecting to the network right now. Please verify your API key.",
        isError: true
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${
          isDarkMode ? 'from-purple-400 to-blue-400' : 'from-blue-600 to-purple-600'
        }`}>
          AI Solver
        </h2>
        <button 
          onClick={() => setMessages(messages.slice(0, 1))}
          className={`p-2 rounded-full transition-colors ${
            isDarkMode ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
          }`}
          title="Clear Chat"
        >
          <Eraser size={20} />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-1 custom-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
              msg.role === 'user'
                ? isDarkMode 
                  ? 'bg-blue-600 text-white rounded-tr-sm'
                  : 'bg-blue-500 text-white rounded-tr-sm shadow-md shadow-blue-200'
                : isDarkMode
                  ? 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-sm backdrop-blur-md'
                  : 'bg-white border border-gray-100 text-gray-700 rounded-tl-sm shadow-sm'
            } ${msg.isError ? 'border-red-500/50 bg-red-500/10 text-red-400' : ''}`}>
               {msg.role === 'model' && (
                 <div className="flex items-center gap-2 mb-2 text-xs font-semibold opacity-70">
                    <Sparkles size={12} className={isDarkMode ? 'text-purple-400' : 'text-purple-600'} />
                    <span>Gemini AI</span>
                 </div>
               )}
               <div className="whitespace-pre-wrap">{msg.text}</div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className={`p-4 rounded-2xl rounded-tl-sm flex items-center gap-3 ${
              isDarkMode ? 'bg-white/5' : 'bg-white'
            }`}>
              <Loader2 size={18} className="animate-spin text-purple-500" />
              <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="relative mt-auto">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask a math question..."
          className={`w-full py-4 pl-4 pr-14 rounded-2xl outline-none transition-all ${
            isDarkMode
              ? 'bg-white/5 border border-white/10 text-white focus:border-purple-500/50 placeholder-gray-500'
              : 'bg-white border border-gray-200 text-slate-800 focus:border-blue-500 shadow-sm placeholder-gray-400'
          }`}
        />
        <button
          type="submit"
          disabled={!prompt.trim() || isLoading}
          className={`absolute right-2 top-2 p-2 rounded-xl transition-all ${
            prompt.trim() && !isLoading
              ? isDarkMode ? 'bg-purple-500 text-white hover:bg-purple-400' : 'bg-blue-500 text-white hover:bg-blue-600'
              : isDarkMode ? 'bg-transparent text-gray-600' : 'bg-transparent text-gray-300'
          }`}
        >
          {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
        </button>
      </form>
    </div>
  );
};

export default SmartSolverView;