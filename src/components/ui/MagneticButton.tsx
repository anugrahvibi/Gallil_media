"use client";
import React from 'react';
import { cn } from '@/lib/utils';
import { useMagnetic } from '@/hooks/useMagnetic';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export default function MagneticButton({ children, className, ...props }: MagneticButtonProps) {
    const { ref, onMouseMove, onMouseLeave } = useMagnetic();

    return (
        <button
            ref={ref}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className={cn(
                "relative inline-flex items-center justify-center rounded-full border border-current px-6 py-2 text-sm uppercase tracking-wide transition-colors hover:bg-black hover:text-white hover:border-black",
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
