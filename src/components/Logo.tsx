
import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md', 
  showTagline = false 
}) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl'
  };

  const iconSizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12'
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Logo Icon */}
      <div className={`${iconSizeClasses[size]} bg-white dark:bg-gray-900 rounded-lg flex items-center justify-center`}>
        <span className={`font-bold bg-gradient-to-r from-brand-blue-600 to-brand-orange-500 bg-clip-text text-transparent ${size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : size === 'lg' ? 'text-base' : 'text-lg'}`}>
          K
        </span>
      </div>

      {/* Logo Text */}
      <div className="flex flex-col">
        <h1 className={`${sizeClasses[size]} font-bold gradient-text leading-none`}>
          Kontenih
        </h1>
        {showTagline && (
          <p className={`text-gray-600 dark:text-gray-400 font-medium ${size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base'}`}>
            Konten Bikin Cuan
          </p>
        )}
      </div>
    </div>
  );
};

export default Logo;
