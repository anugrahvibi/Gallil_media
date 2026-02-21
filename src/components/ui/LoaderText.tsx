"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const text = "Gallil Media";
const characters = text.split("");

export default function LoaderText() {
    const container = useRef<HTMLHeadingElement>(null);

    useGSAP(
        () => {
            const chars = container.current?.querySelectorAll(".loader-char");
            if (!chars || chars.length === 0) return;

            // Initial State: Thin & Upright
            gsap.set(chars, {
                fontVariationSettings: "'wght' 300, 'slnt' 0",
            });

            // "Choir Breathing" Wave Animation
            // A smooth, continuous wave that passes through the text
            gsap.to(chars, {
                fontVariationSettings: "'wght' 600, 'slnt' -5", // Peak state: Bold & Slanted
                duration: 2,
                ease: "sine.inOut",
                stagger: {
                    each: 0.15, // Creates the wave propagation delay
                    repeat: -1, // Infinite loop per character
                    yoyo: true, // Go back to thin
                    from: "start", // Flow from left to right
                },
                delay: 0.3, // Initial pause
            });
        },
        { scope: container }
    );

    return (
        <h1
            ref={container}
            className="flex font-inter text-5xl tracking-tighter text-black sm:text-7xl md:text-9xl cursor-default select-none"
            aria-label={text}
        >
            {characters.map((char, i) => (
                <span
                    key={i}
                    className="loader-char inline-block"
                    style={{ minWidth: "0.2em" }} // Prevent layout collapse on spaces
                >
                    {char === " " ? "\u00A0" : char}
                </span>
            ))}
        </h1>
    );
}
