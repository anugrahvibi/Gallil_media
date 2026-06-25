"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface AnimationContextType {
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    isResetting: boolean;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export function AnimationProvider({ children }: { children: ReactNode }) {
    // isLoading controls the visibility of the Preloader.
    // Initially true for the first load.
    const [isLoading, setIsLoading] = useState(true);
    const [isResetting] = useState(false);

    return (
        <AnimationContext.Provider value={{ isLoading, setIsLoading, isResetting }}>
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
