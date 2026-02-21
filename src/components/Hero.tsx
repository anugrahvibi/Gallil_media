"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useAnimation } from "./providers/AnimationContext";

export default function Hero() {
    const containerRef = useRef<HTMLElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const subheadRef = useRef<HTMLParagraphElement>(null);
    const bodyRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLAnchorElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const { isLoading } = useAnimation();

    useGSAP(() => {
        if (isLoading) {
            gsap.set([headlineRef.current, subheadRef.current, bodyRef.current, ctaRef.current], {
                opacity: 0,
                y: 30,
            });
            gsap.set(gridRef.current, { opacity: 0 });
            return;
        }

        const tl = gsap.timeline({
            defaults: { ease: "power3.out" },
            delay: 0.3,
        });

        // Grid lines fade in
        tl.to(gridRef.current, {
            opacity: 1,
            duration: 1.2,
        }, 0);

        // Headline entrance
        tl.to(headlineRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
        }, 0.1);

        // Subhead entrance
        tl.to(subheadRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
        }, 0.3);

        // Body text entrance
        tl.to(bodyRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
        }, 0.5);

        // CTA entrance
        tl.to(ctaRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
        }, 0.65);

    }, { scope: containerRef, dependencies: [isLoading] });

    // Generate vertical grid lines
    const gridLines = Array.from({ length: 7 }, (_, i) => i);

    return (
        <section
            ref={containerRef}
            className="relative flex min-h-screen w-full flex-col items-center justify-center bg-[#F8F7F4] overflow-hidden"
        >
            {/* Subtle vertical grid lines */}
            <div ref={gridRef} className="absolute inset-0 opacity-0 pointer-events-none">
                <div className="relative h-full w-full max-w-[1400px] mx-auto">
                    {gridLines.map((i) => (
                        <div
                            key={i}
                            className="absolute top-0 bottom-0 w-px bg-black/[0.04]"
                            style={{ left: `${((i + 1) / (gridLines.length + 1)) * 100}%` }}
                        />
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 md:px-12 text-center">
                {/* Main Headline */}
                <h1
                    ref={headlineRef}
                    className="opacity-0 font-serif font-bold uppercase tracking-tight text-[#111] leading-[0.95] text-[clamp(3.5rem,12vw,10rem)]"
                >
                    GALLIL MEDIA
                    <span
                        className="inline-block w-[0.12em] h-[0.12em] rounded-full bg-[#FFEA00] ml-[0.1em] align-baseline relative -top-[0.15em]"
                        aria-hidden="true"
                    />
                </h1>

                {/* Secondary Headline */}
                <p
                    ref={subheadRef}
                    className="opacity-0 mt-6 md:mt-8 font-serif text-[#333] text-[clamp(1.2rem,2.5vw,2rem)] leading-[1.4] tracking-[-0.01em]"
                >
                    Sound That Shapes the Moment.
                </p>

                {/* Supporting Paragraph */}
                <p
                    ref={bodyRef}
                    className="opacity-0 mt-6 md:mt-8 mx-auto max-w-[52ch] text-[#666] text-[clamp(0.9rem,1.2vw,1.1rem)] leading-[1.7] font-light"
                >
                    From ceremony to stage, from intimate spaces to large gatherings
                    — we craft music that serves the experience, not the noise.
                </p>

                {/* CTA Button */}
                <a
                    ref={ctaRef}
                    href="#services-section"
                    className="opacity-0 inline-flex items-center gap-2 mt-10 md:mt-14 px-7 py-3 border border-[#111]/20 rounded-full text-sm uppercase tracking-[0.1em] text-[#111] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#111]/50 hover:shadow-sm"
                >
                    Explore Our Work
                    <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                    </svg>
                </a>
            </div>
        </section>
    );
}
