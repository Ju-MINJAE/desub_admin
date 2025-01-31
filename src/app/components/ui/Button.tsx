import type React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'black' | 'outline';
  size?: 'full' | 'medium' | 'small' | 'tiny';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'outline',
  size = 'medium',
  className = '',
  disabled = false,
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'black':
        return 'bg-black text-white';
      default:
        return 'bg-white text-black border-solid border-[1px] border-black';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'full':
        return 'w-[54rem] h-[7rem] rounded-[1.8rem] font-medium text-[1.8rem]';
      case 'small':
        return 'w-[15.8rem] h-[5.4rem] rounded-[1.8rem] font-medium text-[1.5rem]';
      case 'tiny':
        return 'w-[13rem] h-[3.7rem] rounded-[1.2rem] font-medium text-[1.3rem]';
      default:
        return 'w-[25.9rem] h-[7rem] rounded-[1.8rem] font-medium text-[1.8rem]';
    }
  };
  return (
    <button
      disabled={disabled}
      className={`
      ${getSizeStyles()} 
      ${getVariantStyles()}
      ${className}
  `}
      {...props}
    >
      {children}
    </button>
  );
};
