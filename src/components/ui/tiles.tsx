"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface TilesProps {
    rows?: number;
    cols?: number;
    tileSize?: "sm" | "md" | "lg";
    className?: string;
}

export const Tiles = ({
    rows = 40,
    cols = 8,
    className,
}: TilesProps) => {
    return (
        <div
            className={cn("grid h-full w-full", className)}
            style={{
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                gridTemplateRows: `repeat(${rows}, 1fr)`,
            }}
        >
            {Array.from({ length: rows * cols }).map((_, i) => (
                <div
                    key={i}
                    className="h-full w-full border border-neutral-900"
                />
            ))}
        </div>
    );
};
