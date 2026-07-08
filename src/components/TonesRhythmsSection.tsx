"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const offerings = [
    "STUDIO SAMPLED RHYTHMS AND TONES",
    "SOFT RHYTHMS SUITABLE FOR CHURCH CHOIRS",
    "WORSHIP RHYTHMS",
    "SAMPLED INDIAN RHYTHMS — PITCH TUNED TABLA, DOLEK, TAVIL AND MORE",
    "SAMPLED TONES",
    "KORG PA5X SAMPLED PIANO FOR KORG MODELS",
    "CUSTOM PROGRAMMING AVAILABLE ON REQUEST",
];

const PLAYLISTS = [
    { name: "KORG PA FUSION STYLES", url: "https://youtube.com/playlist?list=PL4o53tBouU7KfPrPjRn21yL1E-E3WFYdj" },
    { name: "KORG PA SOFT RHYTHMS", url: "https://youtube.com/playlist?list=PL4o53tBouU7I7ayPqVGmU3uAGZBPjIGbL" },
    { name: "KORG PA TONES", url: "https://youtube.com/playlist?list=PL4o53tBouU7J9_nhkaF7YjArLFgyf5oJw" },
    { name: "KORG PA5X FUSION RHYTHMS", url: "https://youtube.com/playlist?list=PL4o53tBouU7IRg5k-fJN6Uql9lUignP0s" },
    { name: "YAMAHA PSR FUSION STYLES", url: "https://youtube.com/playlist?list=PLfj7BOzrs5YA&si=xRvgIQ9IIcXP3GY7" },
    { name: "YAMAHA PSR SOFT STYLES", url: "https://youtube.com/playlist?list=PLO7530MqrPd8&si=DOcu2K1d3OScQGVI" },
];

export default function TonesRhythmsSection() {
    const [videoError, setVideoError] = useState(false);

    return (
        <section id="main-offering" className="relative overflow-hidden bg-background">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-60"
                style={{
                    backgroundImage:
                        "repeating-linear-gradient(to right, transparent 0, transparent calc(100% / 12 - 1px), rgba(17,17,17,0.05) calc(100% / 12 - 1px), rgba(17,17,17,0.05) calc(100% / 12))",
                }}
            />

            <div className="container mx-auto px-6 py-24 md:px-12 md:py-32 relative z-10">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-24 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
                        className="relative w-full aspect-[4/3] md:aspect-[5/4] overflow-hidden"
                    >
                        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg shadow-black/5">
                            <motion.div
                                className="w-full h-full"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                {videoError ? (
                                    <img
                                        src="/media/korg-thumb.jpg"
                                        alt="Tones and Rhythms setup for Korg and Yamaha keyboards"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <video
                                        className="w-full h-full object-cover"
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        poster="/media/korg-thumb.jpg"
                                        onError={() => setVideoError(true)}
                                    >
                                        <source src="/media/korg-promo.mp4" type="video/mp4" />
                                    </video>
                                )}
                            </motion.div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="flex flex-col justify-center max-w-xl"
                    >
                        <span className="text-xs md:text-sm font-medium tracking-widest text-neutral-500 uppercase mb-6 block">
                            Our Main Offering
                        </span>

                        <h2 className="font-serif text-3xl md:text-4xl text-black leading-tight mb-8 font-normal">
                            Tones & Rhythms for Korg Pa & Yamaha PSR Keyboards
                        </h2>

                        <ul className="space-y-4 max-w-[42ch]">
                            {offerings.map((item) => (
                                <li key={item} className="text-sm uppercase tracking-wider text-neutral-500">
                                    {item}
                                </li>
                            ))}
                        </ul>

                        {/* Playlist Block */}
                        <div className="mt-10 w-full max-w-[42ch]">
                            <div className="text-sm uppercase tracking-wider text-neutral-500 mb-4 font-inter">
                                LISTEN
                            </div>
                            <div
                                className="w-full"
                                style={{
                                    borderTop: "0.5px solid rgba(17, 17, 17, 0.1)",
                                    marginBottom: "10px",
                                }}
                            />
                            <div className="flex flex-col">
                                {PLAYLISTS.map((playlist, index) => {
                                    const isLast = index === PLAYLISTS.length - 1;
                                    return (
                                        <a
                                            key={playlist.name}
                                            href={playlist.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex justify-between items-center w-full group transition-colors duration-150 ease-in-out text-neutral-500 hover:text-[#111111]"
                                            style={{
                                                paddingTop: "14px",
                                                paddingBottom: "14px",
                                                paddingLeft: "12px",
                                                borderLeft: "2px solid #FFEA00",
                                                borderBottom: isLast ? "none" : "0.5px solid rgba(17, 17, 17, 0.04)",
                                                textDecoration: "none",
                                            }}
                                        >
                                            <span className="text-sm uppercase tracking-wider transition-colors duration-150 ease-in-out font-inter">
                                                {playlist.name}
                                            </span>
                                            <span className="text-base transition-colors duration-150 ease-in-out font-inter" style={{ color: "#000000", fontWeight: 700 }}>
                                                ↗
                                            </span>
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}