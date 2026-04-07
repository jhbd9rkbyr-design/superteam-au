import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  href?: string;
  onClick?: () => void;
  icon?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  href,
  onClick,
  icon = true,
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-medium transition-all duration-300';

  const variantClasses = {
    primary: 'bg-gradient-brand-diagonal text-text-primary rounded-full hover:shadow-lg hover:scale-105',
    secondary: 'border border-dark-green/20 text-dark-green rounded-full hover:border-dark-green/40 hover:bg-dark-green/5',
    ghost: 'text-text-primary hover:text-brand-green',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const finalClassName = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const content = (
    <>
      {children}
      {icon && variant !== 'ghost' && <ArrowRight size={18} />}
    </>
  );

  if (href) {
    return (
      <a href={href} className={finalClassName}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={finalClassName}>
      {content}
    </button>
  );
}
