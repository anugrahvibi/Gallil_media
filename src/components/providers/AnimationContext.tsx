"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface AnimationContextType {
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    setIsServicesTransitioning: (loading: boolean) => void;
    triggerReset: () => void;
    isResetting: boolean;
    isServicesTransitioning: boolean;
    triggerServicesTransition: () => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export function AnimationProvider({ children }: { children: ReactNode }) {
    // isLoading controls the visibility of the Preloader.
    // Initially true for the first load.
    const [isLoading, setIsLoading] = useState(true);
    const [isResetting, setIsResetting] = useState(false);
    const [isServicesTransitioning, setIsServicesTransitioning] = useState(false);

    const triggerReset = () => {
        // 1. Mark as resetting (useful for subtle differences if needed)
        setIsResetting(true);
        // 2. Set isLoading to true to show Preloader (re-entry)
        setIsLoading(true);

        // Note: The Preloader component itself should handle the logic of 
        // "when I am done, set isLoading to false".
        // Or we could use a timeout here, but using the animation callback in Preloader is smoother.
    };

    const triggerServicesTransition = () => {
        setIsServicesTransitioning(true);
        // We'll reset this to false after the animation completes in the ServicesTransition component
    };

    return (
        <AnimationContext.Provider value={{ isLoading, setIsLoading, triggerReset, isResetting, isServicesTransitioning, setIsServicesTransitioning, triggerServicesTransition }}>
            {children}
        </AnimationContext.Provider>
    );
}

export function useAnimation() {
    const context = useContext(AnimationContext);
    if (context === undefined) {
        throw new Error("useAnimation must be used within an AnimationProvider");
    }
    return context;
}
