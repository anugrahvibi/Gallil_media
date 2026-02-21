"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function EmotionalStatement() {
    const containerRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!textRef.current || !containerRef.current) return;

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
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative py-36 md:py-44">
            <div className="max-w-6xl mx-auto px-6 text-center">
                <div
                    ref={textRef}
                    className="opacity-0 max-w-[70ch] mx-auto font-serif text-[1.8rem] leading-[1.3] text-[#111] md:text-[clamp(2.5rem,4vw,4rem)]"
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
                    <span className="font-medium italic text-[#3a3a3a]">
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
