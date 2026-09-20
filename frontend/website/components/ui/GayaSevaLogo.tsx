import React from 'react';

interface GayaSevaLogoProps {
  className?: string;
  size?: number | string;
  variant?: 'full' | 'icon' | 'badge';
  showText?: boolean;
  textColor?: string;
  subtextColor?: string;
}

export const GayaSevaLogo: React.FC<GayaSevaLogoProps> = ({
  className = '',
  size = 48,
  variant = 'full',
  showText = false,
  textColor = 'text-white',
  subtextColor = 'text-[#F6C343]',
}) => {
  const numericSize = typeof size === 'number' ? size : parseInt(size.toString(), 10) || 48;

  const logoImage = (
    <div 
      className={`relative inline-block shrink-0 rounded-full overflow-hidden shadow-md group-hover:scale-105 transition-transform duration-300 border border-[#F58220]/30 ${className}`}
      style={{ width: numericSize, height: numericSize }}
    >
      <img
        src="/icongaya.jpeg"
        alt="GayaSeva Primary Logo"
        width={numericSize}
        height={numericSize}
        className="w-full h-full object-cover object-center"
      />
    </div>
  );

  if (variant === 'icon' || !showText) {
    return logoImage;
  }

  return (
    <div className="flex items-center gap-3 group">
      {logoImage}
      <div className="flex flex-col">
        <span className={`font-serif text-xl sm:text-2xl font-bold tracking-tight ${textColor} group-hover:text-[#F6C343] transition-colors`}>
          Gaya<span className="text-[#F58220]">Seva</span>
        </span>
        <span className={`text-[9px] sm:text-[10px] tracking-wider uppercase font-semibold ${subtextColor}`}>
          Bodhgaya • Pind Daan • Pick & Drop
        </span>
      </div>
    </div>
  );
};

export default GayaSevaLogo;
