
import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  theme?: 'light' | 'dark'; // light = colored logo (for white bg), dark = white logo (for dark bg)
}

export const Logo: React.FC<LogoProps> = ({ className = "", size = 32, theme = 'light' }) => {
  // Deep Green (#047857) for light theme, White for dark theme
  const primary = theme === 'light' ? '#047857' : '#FFFFFF';
  // Contrast color for windows (white/transparent)
  const windowColor = theme === 'light' ? '#FFFFFF' : '#000000';

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 
         London Tower Bridge "H" Concept:
         Two Towers form the vertical legs.
         The Walkways form the horizontal crossbar.
      */}

      {/* Left Tower */}
      <path d="M11 44V14L15.5 8L20 14V44H11Z" fill={primary} />
      
      {/* Right Tower */}
      <path d="M28 44V14L32.5 8L37 14V44H28Z" fill={primary} />

      {/* The Bridge (Crossbar of the H) */}
      {/* We use two bars to mimic the Walkway (top) and Road (bottom) look of Tower Bridge, 
          but merged closer to form a solid H crossbar feel */}
      <rect x="20" y="20" width="8" height="3" fill={primary} />
      <rect x="20" y="26" width="8" height="3" fill={primary} />
      
      {/* Vertical Window Details (Architectural Slits) */}
      <rect x="14.5" y="20" width="2" height="12" rx="0.5" fill={windowColor} fillOpacity="0.3" />
      <rect x="31.5" y="20" width="2" height="12" rx="0.5" fill={windowColor} fillOpacity="0.3" />

      {/* Suspension Cables (Decorative Swoops at the bottom) */}
      <path 
        d="M11 34 Q 5 38 3 44" 
        stroke={primary} 
        strokeWidth="2.5" 
        strokeLinecap="round" 
      />
      <path 
        d="M37 34 Q 43 38 45 44" 
        stroke={primary} 
        strokeWidth="2.5" 
        strokeLinecap="round" 
      />

      {/* Optional: Tiny flag poles or details could go here, but keeping it minimal for an icon */}
    </svg>
  );
};
