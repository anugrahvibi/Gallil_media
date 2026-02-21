import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseScrollRevealConfig {
    stagger?: number;
    start?: string;
    selector?: string; // Class to target
}

export function useScrollReveal({
    stagger = 0.03,
    start = "top 85%",
    selector = ".reveal-target"
}: UseScrollRevealConfig = {}) {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const elements = container.current?.querySelectorAll(selector);
        if (!elements || elements.length === 0) return;

        gsap.fromTo(elements,
            { y: "110%", opacity: 0 },
            {
                y: "0%",
                opacity: 1,
                duration: 1.2,
                ease: "power4.out",
                stagger: stagger,
                scrollTrigger: {
                    trigger: container.current,
                    start: start,
                    toggleActions: "play none none reverse",
                }
            }
        );
    }, { scope: container });

    return container;
}
