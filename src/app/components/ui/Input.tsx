import type React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  status?: 'default' | 'error' | 'success';
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  status = 'default',
  helperText,
  className = '',
  ...props
}) => {
  const getHelperTextColor = () => {
    switch (status) {
      case 'error':
        return 'text-red-500';
      case 'success':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="w-full">
      <input
        className={`
        w-full
        h-[6rem]
        px-[1.2rem] py-[1.5rem]
        border border-black
        placeholder:text-[#929292]
        focus:outline-none 
        text-[1.8rem]
        poppins
        ${className}
      `}
        {...props}
      />
      {helperText && (
        <p className={`mt-[0.25rem] text-[1.5rem] ${getHelperTextColor()}`}>
          {helperText}
        </p>
      )}
    </div>
  );
};
