"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useAnimation } from "./providers/AnimationContext";

gsap.registerPlugin(useGSAP, ScrollToPlugin);

export default function ServicesTransition() {
    const container = useRef<HTMLDivElement>(null);
    const { isServicesTransitioning, setIsServicesTransitioning } = useAnimation();

    useGSAP(
        () => {
            if (isServicesTransitioning) {
                const tl = gsap.timeline({
                    onComplete: () => {
                        setIsServicesTransitioning(false);
                        // Ensure it's hidden fully
                        gsap.set(container.current, { y: "-100%" });
                    }
                });

                // 1. Initial State: Above the viewport
                // Force display block and z-index again just in case
                gsap.set(container.current, { y: "-100%", display: "block", zIndex: 9999 });

                // 2. Slide Down (Enter)
                tl.to(container.current, {
                    y: "0%",
                    duration: 1,
                    ease: "power2.inOut",
                });

                // 3. Scroll to Section
                tl.add(() => {
                    const section = document.getElementById("services-section");
                    if (section) {
                        section.scrollIntoView({ behavior: "auto" });
                    }
                });

                // 4. Slide Up (Exit)
                tl.to(container.current, {
                    y: "-100%",
                    duration: 1,
                    ease: "power2.inOut",
                });
            } else {
                // Ensure it's hidden initially
                gsap.set(container.current, { y: "-100%" });
            }
        },
        { dependencies: [isServicesTransitioning] }
    );

    return (
        <div
            ref={container}
            className="fixed inset-0 z-[9999] block bg-[#FFEA00] pointer-events-none"
            style={{ transform: "translateY(-100%)" }} // Initial CSS state
        />
    );
}
