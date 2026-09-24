import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { trackEvent } from '../../lib/analytics';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', showLabel = false }) => {
  const { theme, toggleTheme } = useTheme();

  const handleToggle = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    trackEvent('theme_toggle', { to: nextTheme });
    toggleTheme();
  };

  const isLight = theme === 'light';

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={`Switch to ${isLight ? 'Dark' : 'High-Contrast Light'} mode`}
      title={`Switch to ${isLight ? 'Dark' : 'High-Contrast Light'} mode`}
      className={`relative inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all cursor-pointer text-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A45D] ${
        isLight
          ? 'bg-amber-100 hover:bg-amber-200 border-amber-300 text-amber-950 shadow-sm'
          : 'bg-[#10152A] hover:bg-[#161e38] border-[#C8A45D]/30 hover:border-[#C8A45D] text-[#E8D5A8]'
      } ${className}`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isLight ? (
          <Sun className="w-4 h-4 text-amber-600 animate-in fade-in zoom-in duration-200" />
        ) : (
          <Moon className="w-4 h-4 text-[#C8A45D] animate-in fade-in zoom-in duration-200" />
        )}
      </div>

      {showLabel ? (
        <span className="font-mono text-[11px] tracking-wide">
          {isLight ? 'Light Mode' : 'Dark Mode'}
        </span>
      ) : (
        <span className="hidden sm:inline font-mono text-[11px]">
          {isLight ? 'Light' : 'Dark'}
        </span>
      )}
    </button>
  );
};
