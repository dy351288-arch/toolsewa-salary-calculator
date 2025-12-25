import React, { useState } from 'react';
import { Calculator, Sparkles, Settings as SettingsIcon, LayoutGrid, Search } from 'lucide-react';
import CalculatorView from './components/Calculator';
import SmartSolverView from './components/SmartSolverView';
import SettingsView from './components/SettingsView';
import ToolsView from './components/ToolsView';
import { ThemeProvider, useTheme } from './components/ThemeContext';

// Navigation Item Component
const NavItem = ({ 
  icon: Icon, 
  label, 
  active, 
  onClick 
}: { 
  icon: React.ElementType; 
  label: string; 
  active: boolean; 
  onClick: () => void; 
}) => {
  const { isDarkMode } = useTheme();
  
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-all duration-300 relative group`}
    >
      <div className={`p-2 rounded-2xl transition-all duration-300 ${
        active 
          ? isDarkMode 
            ? 'bg-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.4)]' 
            : 'bg-blue-500/10 text-blue-600'
          : 'hover:bg-gray-500/10'
      }`}>
        <Icon 
          size={22} 
          className={`transition-all duration-300 ${
            active 
              ? isDarkMode ? 'text-purple-400' : 'text-blue-600'
              : isDarkMode ? 'text-gray-400' : 'text-gray-500'
          } ${active && isDarkMode ? 'drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]' : ''}`}
          strokeWidth={active ? 2.5 : 2}
        />
      </div>
      <span className={`text-[10px] font-medium tracking-wide transition-colors ${
        active 
          ? isDarkMode ? 'text-purple-300' : 'text-blue-600'
          : isDarkMode ? 'text-gray-500' : 'text-gray-400'
      }`}>
        {label}
      </span>
      
      {active && (
        <span className={`absolute -top-2 w-1 h-1 rounded-full ${
          isDarkMode ? 'bg-purple-400 shadow-[0_0_5px_#a855f7]' : 'bg-blue-500'
        }`} />
      )}
    </button>
  );
};

// Header Component
const Header = () => {
  const { isDarkMode } = useTheme();
  return (
    <div className={`sticky top-0 z-40 px-6 py-4 backdrop-blur-md border-b flex items-center justify-between ${
      isDarkMode 
        ? 'bg-slate-950/80 border-white/5' 
        : 'bg-slate-50/80 border-slate-200'
    }`}>
      <div className="flex items-center gap-2">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
           isDarkMode ? 'bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg shadow-purple-500/20' : 'bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/20'
        }`}>
          <Calculator size={18} className="text-white" />
        </div>
        <span className={`text-xl font-bold tracking-tight ${
          isDarkMode ? 'text-white' : 'text-slate-800'
        }`}>
          Tool<span className={isDarkMode ? 'text-purple-400' : 'text-blue-500'}>Sewa</span>
        </span>
      </div>
    </div>
  );
};

// Main Content Wrapper
const AppContent = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'tools' | 'search' | 'settings'>('home');
  const { isDarkMode } = useTheme();

  return (
    <div className={`relative w-full h-screen flex flex-col transition-colors duration-500 ${
      isDarkMode 
        ? 'bg-slate-950 text-white' 
        : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Dynamic Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-20 animate-pulse ${
          isDarkMode ? 'bg-purple-900' : 'bg-blue-200'
        }`} />
        <div className={`absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-20 animate-pulse ${
          isDarkMode ? 'bg-blue-900' : 'bg-purple-200'
        }`} style={{ animationDelay: '1s' }} />
      </div>

      <Header />

      {/* Main View Area */}
      <main className="flex-1 overflow-y-auto relative z-10 flex flex-col max-w-md mx-auto w-full custom-scrollbar">
        <div className="flex-1 p-4 pb-24 flex flex-col h-full">
           {activeTab === 'home' && <CalculatorView />}
           {activeTab === 'tools' && <ToolsView />}
           {activeTab === 'search' && <SmartSolverView />}
           {activeTab === 'settings' && <SettingsView />}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className={`fixed bottom-0 left-0 right-0 z-50 px-6 pb-6 pt-2 max-w-md mx-auto`}>
        <div className={`rounded-3xl h-20 shadow-lg backdrop-blur-xl border flex justify-around items-center px-2 ${
          isDarkMode 
            ? 'bg-black/60 border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]' 
            : 'bg-white/90 border-white/40 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)]'
        }`}>
          <NavItem 
            icon={Calculator} 
            label="Home" 
            active={activeTab === 'home'} 
            onClick={() => setActiveTab('home')} 
          />
           <NavItem 
            icon={Search} 
            label="Search" 
            active={activeTab === 'search'} 
            onClick={() => setActiveTab('search')} 
          />
          <NavItem 
            icon={LayoutGrid} 
            label="Calculators" 
            active={activeTab === 'tools'} 
            onClick={() => setActiveTab('tools')} 
          />
          <NavItem 
            icon={SettingsIcon} 
            label="Settings" 
            active={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')} 
          />
        </div>
      </nav>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;