"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function FounderSection() {
    const sectionRef = useRef<HTMLElement>(null);

    // Parallax set up: Y movement based on scroll progress of the section
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    // Gentle parallax: large range of pixels but mapped to a small percentage relative to container
    // moving from slightly down to slightly up or vice versa. 
    // Intent: Section moves, image moves slightly slower/faster.
    // Mapping 0->1 progress to y translation.
    const yParallax = useTransform(scrollYProgress, [0, 1], [40, -40]);

    return (
        <section
            ref={sectionRef}
            className="container mx-auto px-6 py-24 md:px-12 md:py-32"
        >
            {/* 2-column layout: Stacked on mobile, Split on desktop */}
            {/* Inverted Visual Weight: Text Left, Image Right */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">

                {/* Left Column: Text */}
                <div className="flex flex-col justify-center order-2 md:order-1 max-w-xl">
                    {/* Staggered Reveal Container */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ staggerChildren: 0.1 }}
                    >
                        {/* Eyebrow */}
                        <motion.span
                            variants={{
                                hidden: { opacity: 0, y: 12 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                            }}
                            className="text-xs md:text-sm font-medium tracking-widest text-neutral-500 uppercase mb-6 block"
                        >
                            The Founder
                        </motion.span>

                        {/* Headline */}
                        <motion.h2
                            variants={{
                                hidden: { opacity: 0, y: 12 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                            }}
                            className="font-serif text-3xl md:text-4xl text-neutral-800 leading-tight mb-8 font-normal"
                        >
                            A lifelong respect for sound and the moments it serves.
                        </motion.h2>

                        {/* Body Copy */}
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 12 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                            }}
                            className="text-neutral-600 text-lg leading-relaxed space-y-6"
                        >
                            <p>
                                With decades of experience in music and audio production, Gallil Media was shaped by a simple idea — sound should support the moment, not overwhelm it.
                            </p>
                            <p>
                                Trained across classical and contemporary traditions, the work bridges ceremony and craft with care and restraint.
                            </p>
                            <p>
                                Every project is approached with the same intention: listen first, prepare quietly, and serve the moment with respect.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Right Column: Image */}
                {/* Visual Weight: Slightly "heavier" or simply taking up the right side. */}
                <div className="relative order-1 md:order-2 w-full aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-2xl">
                    <motion.div
                        style={{ y: yParallax }}
                        className="w-full h-full relative"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, ease: "easeOut" }} // Slow entry
                            className="w-full h-full relative"
                        >
                            <Image
                                src="/assets/images/VIBI.png"
                                alt="Founder of Gallil Media"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority={false}
                            />
                            {/* Subtle shadow bloom/overlay could handle light/shadow if needed, but 'placed' feel requested. No overlay needed. */}
                        </motion.div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
