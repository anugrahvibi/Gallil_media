"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAnimation } from "./providers/AnimationContext";
import WordPullUp from "./ui/WordPullUp";

export default function Preloader() {
    const { isLoading, setIsLoading, isResetting } = useAnimation();
    const [shouldExit, setShouldExit] = useState(false);

    useEffect(() => {
        if (isLoading) {
            setShouldExit(false);

            // Timeline:
            // 0ms: Container shown (yellow bg)
            // 300ms: WordPullUp starts (controlled by delay prop)
            // ~1500ms: Animation completes (approx)
            // + 800ms Hold
            // ~2300ms: Start exit

            const timer = setTimeout(() => {
                setShouldExit(true);
            }, 2300);

            return () => clearTimeout(timer);
        }
    }, [isLoading, isResetting]); // Reset if these change

    return (
        <motion.div
            initial={{ y: 0 }}
            animate={{ y: shouldExit ? "-100%" : "0%" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            onAnimationComplete={() => {
                if (shouldExit) {
                    setIsLoading(false);
                }
            }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FFEA00] text-black overflow-hidden"
        >
            {isLoading && (
                <WordPullUp
                    // Key forces remount on reset to replay animation
                    key={isResetting ? "reset" : "init"}
                    words="Gallil Media"
                    // Matching previous LoaderText styles as requested
                    className="font-inter text-5xl tracking-tighter text-black sm:text-7xl md:text-9xl cursor-default select-none"
                    delay={0.3}
                />
            )}
        </motion.div>
    );
}
