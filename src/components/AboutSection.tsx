"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutSection() {
    return (
        <section id="approach" className="container mx-auto px-6 py-24 md:px-12 md:py-32">
            {/* 2-column layout: Stacked on mobile, Split on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">

                {/* Left Column: Image */}
                {/* Image enters 2nd (delay 150ms) */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }} // 150ms delay
                    className="relative w-full aspect-[4/3] md:aspect-[5/4] overflow-hidden"
                >
                    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg shadow-black/5">
                        <motion.div
                            className="w-full h-full"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <Image
                                src="/assets/images/Our mission.png" // Using existing asset
                                alt="Quiet sound studio environment"
                                fill
                                className="object-cover"
                                sizes="(max-width: 800px) 100vw, 800px"
                                priority={false}
                            />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Right Column: Text */}
                {/* Text enters 1st */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex flex-col justify-center max-w-xl"
                >
                    {/* Eyebrow */}
                    <span className="text-xs md:text-sm font-medium tracking-widest text-neutral-500 uppercase mb-6 block">
                        Our Approach
                    </span>

                    {/* Heading */}
                    <h2 className="font-serif text-3xl md:text-4xl text-black leading-tight mb-8 font-normal">
                        Sound is treated as part of the moment — not an overlay.
                    </h2>

                    {/* Body Copy - Max 65 chars per line approx controlled by max-w */}
                    <div className="text-neutral-600 text-lg leading-relaxed space-y-6 max-w-[65ch]">
                        <p>
                            At Gallil Media, we approach sound with care and restraint.
                            Music is not something we add at the end — it is shaped early, with intention.
                        </p>
                        <p>
                            Whether in a studio or a sacred space, our work is guided by listening first, preparing quietly, and delivering with respect for the moment at hand.
                        </p>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
