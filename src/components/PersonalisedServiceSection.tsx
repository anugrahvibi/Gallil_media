"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const TRACKS = [
    { id: "parishudalamullil", name: "PARISHUDALAMULLIL", src: "/audio/holy-qurbana/parishudalamullil.mp3" },
    { id: "yachi", name: "YACHI", src: "/audio/holy-qurbana/yachi.mp3" },
    { id: "natha-kripa", name: "NATHA KRIPA", src: "/audio/holy-qurbana/natha-kripa.mp3" },
    { id: "kazchayathil", name: "KAZCHAYATHIL", src: "/audio/holy-qurbana/kazchayathil.mp3" },
];

export default function PersonalisedServiceSection() {
    const [videoError, setVideoError] = useState(false);
    const [playingId, setPlayingId] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);

    const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({});

    useEffect(() => {
        return () => {
            // Clean up all audio instances and event listeners on component unmount
            Object.values(audioRefs.current).forEach((audio) => {
                if (audio) {
                    audio.pause();
                    audio.src = "";
                }
            });
        };
    }, []);

    const handlePlayPause = (trackId: string) => {
        const currentAudio = audioRefs.current[trackId];
        if (!currentAudio) return;

        if (playingId === trackId) {
            if (currentAudio.paused) {
                currentAudio.play().catch((err) => console.log(err));
            } else {
                currentAudio.pause();
                setPlayingId(null);
            }
        } else {
            // Only one track plays at a time. If track 2 is clicked while track 1 is playing,
            // track 1 pauses and resets (currentTime = 0), track 2 begins playing.
            if (playingId) {
                const prevAudio = audioRefs.current[playingId];
                if (prevAudio) {
                    prevAudio.pause();
                    prevAudio.currentTime = 0;
                }
            }
            const pct = currentAudio.duration ? (currentAudio.currentTime / currentAudio.duration) * 100 : 0;
            setProgress(pct);
            currentAudio.play().catch((err) => console.log(err));
            setPlayingId(trackId);
        }
    };

    return (
        <section id="personalised-service" className="relative overflow-hidden bg-background">
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
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="flex flex-col justify-center max-w-xl"
                    >
                        <span className="text-xs md:text-sm font-medium tracking-widest text-neutral-500 uppercase mb-6 block">
                            Personalised Service
                        </span>

                        <h2 className="font-serif text-3xl md:text-4xl text-black leading-tight mb-8 font-normal">
                            Personalised Minus Tracks for Holy Qurbana
                        </h2>

                        <div className="font-serif text-neutral-600 text-lg leading-relaxed space-y-6 max-w-[65ch] mb-8">
                            <p>
                                Custom backing tracks built specifically for the liturgical structure of the Holy Qurbana. Each track is programmed and mixed to match the flow of the service — from the opening to the final blessing — so your choir can rehearse and perform with professional, purpose-built sound.
                            </p>
                        </div>

                        <div className="text-sm uppercase tracking-wider text-neutral-500 max-w-[42ch]">
                            AVAILABLE FOR PARISHES, CHOIRS, AND INDIVIDUAL SERVICES
                        </div>

                        {/* Audio Block */}
                        <div className="mt-12 w-full">
                            <div className="text-xs md:text-sm font-medium tracking-widest text-neutral-500 uppercase mb-4 font-inter">
                                SAMPLE TRACKS
                            </div>
                            <div
                                className="w-full"
                                style={{
                                    borderTop: "0.5px solid #FFEA00",
                                    marginBottom: "12px",
                                }}
                            />

                            {/* Audio Elements (rendered in background, preload none) */}
                            {TRACKS.map((track) => (
                                <audio
                                    key={track.id}
                                    ref={(el) => {
                                        audioRefs.current[track.id] = el;
                                    }}
                                    src={track.src}
                                    preload="none"
                                    onTimeUpdate={() => {
                                        if (playingId === track.id) {
                                            const audio = audioRefs.current[track.id];
                                            if (audio) {
                                                const dur = audio.duration;
                                                const pct = dur ? (audio.currentTime / dur) * 100 : 0;
                                                setProgress(pct);
                                            }
                                        }
                                    }}
                                    onEnded={() => {
                                        const audio = audioRefs.current[track.id];
                                        if (audio) {
                                            audio.currentTime = 0;
                                        }
                                        setPlayingId(null);
                                        setProgress(0);
                                    }}
                                />
                            ))}

                            {/* Track List */}
                            <div className="flex flex-col">
                                {TRACKS.map((track, index) => {
                                    const isPlaying = playingId === track.id;
                                    const isLast = index === TRACKS.length - 1;
                                    return (
                                        <div
                                            key={track.id}
                                            className="flex flex-col"
                                            style={{
                                                paddingTop: "12px",
                                                paddingBottom: "12px",
                                                borderBottom: isLast ? "none" : "0.5px solid rgba(17, 17, 17, 0.04)",
                                            }}
                                        >
                                            <div className="flex justify-between items-center w-full">
                                                <span
                                                    className="font-inter text-xs md:text-sm tracking-wider uppercase text-neutral-500"
                                                    style={{ fontWeight: 500, cursor: "pointer" }}
                                                    onClick={() => handlePlayPause(track.id)}
                                                >
                                                    {track.name}
                                                </span>
                                                <button
                                                    onClick={() => handlePlayPause(track.id)}
                                                    className="flex items-center justify-center rounded-full transition-opacity hover:opacity-80"
                                                    style={{
                                                        width: "28px",
                                                        height: "28px",
                                                        border: "none",
                                                        color: "#000000",
                                                        padding: 0,
                                                        backgroundColor: "#FFEA00",
                                                        cursor: "pointer",
                                                    }}
                                                    aria-label={isPlaying ? `Pause ${track.name}` : `Play ${track.name}`}
                                                >
                                                    {isPlaying ? (
                                                        <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect width="2" height="6" fill="#000000" />
                                                            <rect x="4" width="2" height="6" fill="#000000" />
                                                        </svg>
                                                    ) : (
                                                        <svg width="6" height="7" viewBox="0 0 6 7" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: "1px" }}>
                                                            <path d="M6 3.5L0 7V0L6 3.5Z" fill="#000000" />
                                                        </svg>
                                                    )}
                                                </button>
                                            </div>

                                            {isPlaying && (
                                                <div className="w-full h-[1px] bg-neutral-200 mt-2 relative overflow-hidden">
                                                    <div
                                                        className="h-full bg-[#111111]"
                                                        style={{ width: `${progress}%` }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
                        className="relative w-full aspect-[4/3] md:aspect-[5/4] overflow-hidden"
                    >
                        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg shadow-black/5 bg-[#B9B1A6]">
                            {videoError ? (
                                <img
                                    src="/media/holy-qurbana-thumb.jpg"
                                    alt="Holy Qurbana minus track preview"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <video
                                    className="w-full h-full object-cover"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    poster="/media/holy-qurbana-thumb.jpg"
                                    onError={() => setVideoError(true)}
                                >
                                    <source src="/media/holy-qurbana.mp4" type="video/mp4" />
                                </video>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}