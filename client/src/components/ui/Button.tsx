"use client";

import * as React from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface ButtonProps
    extends HTMLMotionProps<"button"> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
        const variants = {
            primary: 'bg-brand-gold text-white hover:bg-[#c09160]',
            secondary: 'bg-brand-green text-white hover:bg-[#627a53]',
            outline: 'border-2 border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white',
            ghost: 'text-text-primary hover:bg-brand-soft',
        };

        const sizes = {
            sm: 'px-4 py-1.5 text-sm',
            md: 'px-6 py-2.5 text-base',
            lg: 'px-8 py-3 text-lg',
        };

        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                    'rounded-full font-heading font-semibold transition-colors duration-200 flex items-center justify-center gap-2',
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            />
        );
    }
);
Button.displayName = 'Button';

export default Button;
