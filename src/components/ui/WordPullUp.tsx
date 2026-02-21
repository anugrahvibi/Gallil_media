"use client";

import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface WordPullUpProps {
    words: string;
    className?: string;
    delay?: number;
    onAnimationComplete?: () => void;
}

export default function WordPullUp({
    words,
    className,
    delay = 0,
    onAnimationComplete,
}: WordPullUpProps) {
    const containerVariants: Variants = {
        hidden: { opacity: 1 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // Stagger by word
                delayChildren: delay, // Initial pause
            },
        },
    };

    const wordVariants: Variants = {
        hidden: {
            y: 20,
            opacity: 0,
        },
        show: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 70,
                damping: 15, // Non-bouncy, weighted feel
                mass: 1.2,
            },
        },
    };

    return (
        <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className={cn(
                "font-display text-center font-bold tracking-[-0.02em] drop-shadow-sm",
                className,
            )}
            onAnimationComplete={() => {
                // We only want to notify when the *entire* animation (including children) is done.
                // Framer Motion's onAnimationComplete on parent fires when parent's own transition is done.
                // But with staggerChildren, the parent transition technically "runs" immediately or waits?
                // Actually, we might need to rely on the duration estimate or a callback on the last child.
                // However, let's try the parent callback first or handle timing in Preloader.
                if (onAnimationComplete) onAnimationComplete();
            }}
        >
            {words.split(" ").map((word, i) => (
                <motion.span
                    key={i}
                    variants={wordVariants}
                    className="inline-block mr-[0.25em] last:mr-0"
                >
                    {word === " " ? "\u00A0" : word}
                </motion.span>
            ))}
        </motion.h1>
    );
}
