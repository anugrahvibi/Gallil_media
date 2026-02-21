import { useRef, MouseEvent } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface UseMagneticOptions {
    strength?: number;
    duration?: number;
}

export function useMagnetic({ strength = 0.4, duration = 0.5 }: UseMagneticOptions = {}) {
    const ref = useRef<HTMLButtonElement>(null); // Default to button, can be generic

    const { contextSafe } = useGSAP();

    const onMouseMove = contextSafe!((e: MouseEvent) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const x = (clientX - (left + width / 2));
        const y = (clientY - (top + height / 2));

        gsap.to(ref.current, {
            x: x * strength,
            y: y * strength,
            duration: duration,
            ease: "power2.out",
        });
    });

    const onMouseLeave = contextSafe!(() => {
        if (!ref.current) return;
        gsap.to(ref.current, {
            x: 0,
            y: 0,
            duration: 1,
            ease: "elastic.out(1, 0.3)",
        });
    });

    return { ref, onMouseMove, onMouseLeave };
}
