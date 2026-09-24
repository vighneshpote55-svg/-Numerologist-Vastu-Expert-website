import React from 'react';

interface CanvasFallbackProps {
  activeNumber?: number;
  onSelectNumber?: (num: number) => void;
  className?: string;
}

export const CanvasFallback: React.FC<CanvasFallbackProps> = ({
  activeNumber = 1,
  onSelectNumber,
  className = ''
}) => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-[#080A14] border border-[#C8A45D]/20 ${className}`}>
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,164,93,0.15)_0%,rgba(16,21,42,0.6)_60%,transparent_100%)] pointer-events-none" />

      {/* Sacred Geometry SVG Rings */}
      <svg className="absolute w-[90%] h-[90%] max-w-[460px] max-h-[460px] animate-[spin_120s_linear_infinite] opacity-40 pointer-events-none" viewBox="0 0 400 400">
        <circle cx="200" cy="200" r="180" fill="none" stroke="#C8A45D" strokeWidth="1" strokeDasharray="4 8" />
        <circle cx="200" cy="200" r="140" fill="none" stroke="#E8D5A8" strokeWidth="0.75" />
        <circle cx="200" cy="200" r="95" fill="none" stroke="#C8A45D" strokeWidth="1.2" strokeDasharray="8 6" />
        <circle cx="200" cy="200" r="50" fill="none" stroke="#E8D5A8" strokeWidth="0.5" />
        
        {/* Tilted orbital ellipses */}
        <ellipse cx="200" cy="200" rx="160" ry="70" fill="none" stroke="#C8A45D" strokeWidth="1" transform="rotate(30 200 200)" />
        <ellipse cx="200" cy="200" rx="160" ry="70" fill="none" stroke="#C8A45D" strokeWidth="1" transform="rotate(-30 200 200)" />
        <ellipse cx="200" cy="200" rx="160" ry="70" fill="none" stroke="#E8D5A8" strokeWidth="0.8" transform="rotate(90 200 200)" />
      </svg>

      {/* Central Radiant Sphere */}
      <div className="relative z-10 flex flex-col items-center justify-center w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-[#E8D5A8]/40 via-[#10152A] to-[#080A14] border border-[#C8A45D]/50 shadow-[0_0_50px_rgba(200,164,93,0.3)]">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-tr from-[#C8A45D] to-[#F7F4EC] blur-[1px] flex items-center justify-center shadow-[inset_0_0_20px_rgba(8,10,20,0.8)]">
          <span className="font-serif text-2xl md:text-3xl font-bold text-[#080A14]">
            {activeNumber}
          </span>
        </div>
        <span className="text-[10px] uppercase tracking-widest text-[#E8D5A8]/80 mt-1 font-medium">
          Frequency
        </span>
      </div>

      {/* 9 Interactive Orbital Nodes */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {numbers.map((num, idx) => {
          const angle = (idx * (360 / 9) - 90) * (Math.PI / 180);
          const radius = 135; // px from center
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const isSelected = num === activeNumber;

          return (
            <button
              key={num}
              type="button"
              onClick={() => onSelectNumber && onSelectNumber(num)}
              style={{
                transform: `translate(${x}px, ${y}px)`
              }}
              className={`pointer-events-auto absolute flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 group cursor-pointer ${
                isSelected
                  ? 'bg-[#C8A45D] text-[#080A14] shadow-[0_0_25px_rgba(200,164,93,0.8)] scale-125 z-20'
                  : 'bg-[#10152A]/90 text-[#E8D5A8] border border-[#C8A45D]/40 hover:border-[#C8A45D] hover:bg-[#1a213e] hover:scale-110'
              }`}
              title={`Examine Number ${num}`}
            >
              <span className="font-serif text-sm font-semibold">{num}</span>
            </button>
          );
        })}
      </div>

      {/* Subtle indicator bar */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center items-center gap-1.5 pointer-events-none">
        <span className="text-[11px] text-[#9EA3B5] tracking-wider uppercase">
          Tap any number node to inspect vibration
        </span>
      </div>
    </div>
  );
};
