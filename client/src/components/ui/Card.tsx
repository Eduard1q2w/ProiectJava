import * as React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    hoverEffect?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, hoverEffect = false, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'bg-paper rounded-2xl shadow-[0_10px_40px_-10px_rgba(44,36,32,0.08)] overflow-hidden',
                    hoverEffect && 'transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl',
                    className
                )}
                {...props}
            />
        );
    }
);
Card.displayName = 'Card';

export default Card;
