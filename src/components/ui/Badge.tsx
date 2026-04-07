import React from 'react';
import { LucideIcon } from 'lucide-react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'gradient';
  icon?: LucideIcon;
  dot?: boolean;
  dotColor?: 'green' | 'gold' | 'gray';
  className?: string;
}

const dotColorMap = {
  green: 'bg-brand-green',
  gold: 'bg-brand-gold',
  gray: 'bg-gray-400',
};

export function Badge({
  children,
  variant = 'default',
  icon: Icon,
  dot,
  dotColor = 'green',
  className = '',
}: BadgeProps) {
  const baseClasses = 'inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300';

  const variantClasses = {
    default: 'glass-light border border-dark-green/10',
    gradient: 'glass-light border-gradient',
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {dot && <div className={`w-2 h-2 rounded-full ${dotColorMap[dotColor]}`} />}
      {Icon && <Icon size={16} />}
      {children}
    </div>
  );
}
