"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function EmotionalStatement() {
    const containerRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const highlightRef = useRef<HTMLSpanElement>(null);

    useGSAP(() => {
        if (!textRef.current || !containerRef.current) return;

        // Entrance animation (unchanged)
        gsap.fromTo(
            textRef.current,
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                },
            }
        );

        // Subtle scroll-scrub parallax
        gsap.fromTo(
            textRef.current,
            { y: -20 },
            {
                y: 20,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.2,
                },
            }
        );

        // Yellow highlight sweep — left to right on scroll
        if (highlightRef.current) {
            gsap.fromTo(
                highlightRef.current,
                { backgroundSize: "0% 88%" },
                {
                    backgroundSize: "100% 88%",
                    duration: 0.9,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: highlightRef.current,
                        start: "top 85%",
                    },
                }
            );
        }
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative py-36 md:py-44 bg-[#1d1e19] overflow-hidden">
            {/* Top curve — cream bites into black from above */}
            <div className="absolute top-0 left-0 w-full leading-none pointer-events-none" style={{ marginTop: "-1px" }}>
                <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full block" style={{ height: "80px" }}>
                    <path d="M0,0 Q720,80 1440,0 L1440,0 L0,0 Z" fill="#F8F7F4" />
                </svg>
            </div>

            {/* Bottom curve — cream bites into black from below */}
            <div className="absolute bottom-0 left-0 w-full leading-none pointer-events-none" style={{ marginBottom: "-1px" }}>
                <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full block" style={{ height: "80px" }}>
                    <path d="M0,80 Q720,0 1440,80 L1440,80 L0,80 Z" fill="#F8F7F4" />
                </svg>
            </div>
            <div className="max-w-6xl mx-auto px-6 text-center">
                <div
                    ref={textRef}
                    className="opacity-0 max-w-[70ch] mx-auto font-serif text-[1.8rem] leading-[1.3] text-white md:text-[clamp(2.5rem,4vw,4rem)]"
                >
                    We craft music
                    <span className="inline-block relative h-[1.2em] w-[1.8em] mx-2 align-middle -top-[0.1em] overflow-hidden rounded-full opacity-90 grayscale-[20%]">
                        <img
                            src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&q=80"
                            alt="Studio microphone"
                            className="h-full w-full object-cover"
                        />
                    </span>
                    {" "}that gives{" "}
                    <span
                        ref={highlightRef}
                        className="font-medium italic"
                        style={{
                            color: "#1d1e19",
                            background: "linear-gradient(#fffb7a, #fffb7a)",
                            backgroundSize: "0% 88%",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "left center",
                            padding: "0 6px",
                            boxDecorationBreak: "clone",
                            WebkitBoxDecorationBreak: "clone",
                        }}
                    >
                        life&#39;s most important moments
                    </span>
                    <br className="hidden md:inline" />
                    <span className="inline-block relative h-[1.2em] w-[1.8em] mx-2 align-middle -top-[0.1em] overflow-hidden rounded-full opacity-90 grayscale-[20%]">
                        <img
                            src="https://images.unsplash.com/photo-1598653222000-6b7b7a552625?auto=format&fit=crop&w=300&q=80"
                            alt="Mixing console"
                            className="h-full w-full object-cover"
                        />
                    </span>
                    {" "}their meaning.
                </div>
            </div>
        </section>
    );
}

