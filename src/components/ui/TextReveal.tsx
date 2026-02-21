"use client";
import React from 'react';
import { cn } from '@/lib/utils';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface TextRevealProps {
    children: string;
    className?: string;
}

export default function TextReveal({ children, className }: TextRevealProps) {
    const container = useScrollReveal({ selector: ".word" });
    const words = children.split(" ");

    return (
        <div ref={container} className={cn("leading-[1.15]", className)}>
            {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden align-top mr-[0.25em]">
                    <span className="word inline-block will-change-transform">
                        {word}
                    </span>
                </span>
            ))}
        </div>
    );
}
