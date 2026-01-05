
import React from 'react';
import { motion } from 'framer-motion';

// Fix for framer-motion property errors by using a type-casting workaround
const MotionDiv = motion.div as any;

interface CardProps {
  title: string;
  description: string;
  onClick: () => void;
  icon?: React.ReactNode;
  footer?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, description, onClick, icon, footer }) => {
  return (
    <MotionDiv
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="cursor-pointer group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/10"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      
      <div className="relative z-10 space-y-4">
        {icon && <div className="text-orange-400">{icon}</div>}
        <h3 className="text-xl font-bold text-white group-hover:text-orange-300 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed">
          {description}
        </p>
        {footer && <div className="pt-2 border-t border-white/5">{footer}</div>}
      </div>
    </MotionDiv>
  );
};
