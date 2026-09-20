import React from 'react';

interface GayaSevaLogoProps {
  className?: string;
  size?: number | string;
  variant?: 'full' | 'icon' | 'badge';
  showText?: boolean;
  textColor?: string;
  subtextColor?: string;
  isDarkBg?: boolean;
}

export const GayaSevaLogo: React.FC<GayaSevaLogoProps> = ({
  className = '',
  size = 44,
  variant = 'full',
  showText = false,
  textColor,
  subtextColor,
  isDarkBg = true,
}) => {
  const numericSize = typeof size === 'number' ? size : parseInt(size.toString(), 10) || 44;

  const logoImage = (
    <div 
      className={`relative inline-block shrink-0 rounded-full overflow-hidden shadow-md ring-2 ring-[#F58220]/50 ring-offset-1 group-hover:scale-105 transition-transform duration-300 ${className}`}
      style={{ width: numericSize, height: numericSize }}
    >
      <img
        src="/icongaya.jpeg"
        alt="GayaSeva Primary Admin Logo"
        width={numericSize}
        height={numericSize}
        className="w-full h-full object-cover object-center"
      />
    </div>
  );

  if (variant === 'icon' || !showText) {
    return logoImage;
  }

  const primaryTextColor = textColor || (isDarkBg ? 'text-white' : 'text-[#2A180B]');
  const tagColor = subtextColor || 'text-[#F6C343]';

  return (
    <div className="flex items-center gap-3 group select-none">
      {logoImage}
      <div className="flex flex-col justify-center">
        <div className="flex items-baseline">
          <span className={`font-serif text-xl sm:text-2xl font-extrabold tracking-tight ${primaryTextColor} drop-shadow-sm`}>
            Gaya
          </span>
          <span className="font-serif text-xl sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-[#FF9800] to-[#F58220] bg-clip-text text-transparent drop-shadow-sm ml-0.5">
            Seva
          </span>
        </div>
        <span className={`text-[9.5px] tracking-[0.16em] uppercase font-black ${tagColor} leading-tight pt-0.5`}>
          ADMIN CONTROL PORTAL
        </span>
      </div>
    </div>
  );
};

export default GayaSevaLogo;
