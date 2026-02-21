import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useImageMaskReveal() {
    const container = useRef<HTMLDivElement>(null);
    const image = useRef<HTMLImageElement>(null);

    useGSAP(() => {
        if (!container.current) return;

        // Reveal (Clip Path Wipe)
        gsap.fromTo(container.current,
            { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
            {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                duration: 1.2,
                ease: "power4.inOut",
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 85%"
                }
            }
        );

        // Parallax
        if (image.current) {
            gsap.fromTo(image.current,
                { scale: 1.2, yPercent: -10 },
                {
                    scale: 1,
                    yPercent: 10,
                    ease: "none",
                    scrollTrigger: {
                        trigger: container.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                }
            );
        }
    }, { scope: container });

    return { container, image };
}
