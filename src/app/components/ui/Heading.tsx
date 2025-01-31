import type React from 'react';

interface HeadingProps {
  tag?: 'h1' | 'h2' | 'h3' | 'h4';
  children: React.ReactNode;
  className?: string;
}

export const Heading: React.FC<HeadingProps> = ({
  tag: Tag = 'h1',
  children,
  className = '',
}) => {
  const baseClasses = {
    h1: 'text-[3.5rem] font-bold',
    h2: 'text-[1.8rem]',
    h3: 'text-[1.5rem]',
    h4: 'text-[1.3rem]',
  };

  return (
    <Tag className={`w-auto ${baseClasses[Tag]} ${className}`}>{children}</Tag>
  );
};
