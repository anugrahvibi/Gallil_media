"use client";

import { Particles } from "@/components/Particles";

export default function GlobalParticles() {
    return (
        <div className="fixed inset-0 z-[1] pointer-events-none">
            <Particles
                quantity={70}
                staticity={60}
                ease={80}
                size={0.6}
                color="#000000"
            />
        </div>
    );
}
