import React from 'react';
import { Moon, Sun, Info, Github, Shield } from 'lucide-react';
import { useTheme } from './ThemeContext';

const SettingsView = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  const SettingsCard = ({ children, title }: { children: React.ReactNode; title: string }) => (
    <div className={`p-6 rounded-3xl mb-6 border backdrop-blur-md ${
      isDarkMode 
        ? 'bg-white/5 border-white/10' 
        : 'bg-white/60 border-white/60 shadow-lg shadow-gray-200/50'
    }`}>
      <h3 className={`text-sm font-semibold uppercase tracking-wider mb-4 ${
        isDarkMode ? 'text-gray-400' : 'text-gray-500'
      }`}>
        {title}
      </h3>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );

  const SettingRow = ({ 
    icon: Icon, 
    label, 
    action 
  }: { 
    icon: React.ElementType; 
    label: string; 
    action: React.ReactNode 
  }) => (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-xl ${
          isDarkMode ? 'bg-white/5 text-purple-400' : 'bg-blue-50 text-blue-500'
        }`}>
          <Icon size={20} />
        </div>
        <span className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-slate-700'}`}>
          {label}
        </span>
      </div>
      {action}
    </div>
  );

  return (
    <div className="flex flex-col h-full pt-4">
      <h2 className={`text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r ${
          isDarkMode ? 'from-white to-gray-400' : 'from-slate-900 to-slate-600'
        }`}>
        Settings
      </h2>

      <SettingsCard title="Appearance">
        <SettingRow 
          icon={isDarkMode ? Moon : Sun}
          label="Dark Mode"
          action={
            <button
              onClick={toggleTheme}
              className={`w-14 h-8 rounded-full p-1 transition-all duration-300 relative ${
                isDarkMode ? 'bg-purple-600' : 'bg-gray-300'
              }`}
            >
              <div className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 flex items-center justify-center ${
                isDarkMode ? 'translate-x-6' : 'translate-x-0'
              }`}>
                {isDarkMode 
                  ? <Moon size={12} className="text-purple-600" /> 
                  : <Sun size={12} className="text-orange-400" />
                }
              </div>
            </button>
          }
        />
      </SettingsCard>

      <SettingsCard title="About">
        <SettingRow 
          icon={Info}
          label="Version"
          action={
            <span className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              2.5.0 (Beta)
            </span>
          }
        />
        <SettingRow 
          icon={Shield}
          label="Privacy"
          action={
            <button className={`text-xs font-medium px-3 py-1 rounded-lg ${
              isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
            }`}>
              View
            </button>
          }
        />
      </SettingsCard>

      <div className={`mt-auto text-center text-xs py-6 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
        <p>Powered by Google Gemini</p>
        <p className="mt-1">Designed for Premium Utility</p>
      </div>
    </div>
  );
};

export default SettingsView;