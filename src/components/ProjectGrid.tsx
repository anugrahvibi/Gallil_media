"use client";
import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import TextReveal from './ui/TextReveal';
import { useImageMaskReveal } from '@/hooks/useImageMaskReveal';
import { mediaData } from '@/data/mediaData';

const mediaItems = [
    {
        title: "Live Fusion",
        label: "LIVE FUSION",
        images: mediaData.liveFusion.images,
        fallbackSrc: "/assets/images/live_fusion.jpg",
    },
    {
        title: "Church Choir",
        label: "CHURCH CHOIR",
        images: mediaData.churchChoir.images,
        fallbackSrc: "/assets/images/church_choir_02.jpg",
    },
    {
        title: "Funeral Choir",
        label: "FUNERAL CHOIR",
        images: mediaData.funeralChoir.images,
        fallbackSrc: "/assets/images/Funeral_choir.jpg",
    },
    {
        title: "Recording Sessions",
        label: "RECORDING SESSIONS",
        images: mediaData.recordingSessions.images,
        fallbackSrc: "/assets/images/sound_studio.jpg",
    },
];

function ProjectCard({ project, index, className }: { project: any, index: number, className?: string }) {
    const { container, image } = useImageMaskReveal();

    return (
        <div className={cn("flex flex-col gap-6", className)}>
            <div ref={container} className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-neutral-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    ref={image}
                    src={project.src}
                    alt={project.title}
                    className="h-full w-full object-cover will-change-transform"
                />
            </div>
            <div>
                <TextReveal className="mb-2 text-3xl font-serif text-black">{project.title}</TextReveal>
                <div className="text-sm uppercase tracking-wider text-neutral-500">{project.category}</div>
            </div>
        </div>
    )
}

function MediaThumb({ item }: { item: { title: string; label: string; images: string[]; fallbackSrc: string } }) {
    const imageOrder = useMemo(() => item.images.filter((src) => Boolean(src)), [item.images]);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (imageOrder.length <= 1) {
            setCurrentIndex(0);
            setVisible(true);
            return undefined;
        }

        let fadeTimeout: any;
        const interval = window.setInterval(() => {
            setVisible(false);
            fadeTimeout = window.setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % imageOrder.length);
                setVisible(true);
            }, 400);
        }, 3500);

        return () => {
            window.clearInterval(interval);
            window.clearTimeout(fadeTimeout);
        };
    }, [imageOrder]);

    const src = imageOrder.length > 0 ? imageOrder[currentIndex] : item.fallbackSrc;

    return (
        <Link href="/media" className="group block" aria-label={item.title}>
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-neutral-200 shadow-sm shadow-black/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={src}
                    alt={item.title}
                    className="h-full w-full object-cover transition-opacity duration-400 ease-in-out"
                    style={{ opacity: visible ? 1 : 0 }}
                />
            </div>
            <div className="mt-4 text-sm uppercase tracking-wider text-neutral-500">
                {item.label}
            </div>
        </Link>
    );
}

export default function ProjectGrid() {
    // Bottom row: 4 tiles
    const bottomRow = [
        { title: "Studio Recording and Mixing", category: "PROFESSIONAL RECORDING SESSIONS SHAPED FOR CLARITY AND DEPTH. PERSONALISED PROGRAMMING AND MIXING ALSO AVAILABLE. RECORDED AT DELSOUNDSTUDIO, OUR IN-HOUSE PRODUCTION STUDIO.", src: "/assets/images/studio_recording.jpg" },
        { title: "Funeral Choir", category: "Choral services for funerals and memorial services.", src: "/assets/images/Funeral_choir.jpg" },
        { title: "Church Choir", category: "Choral services for weddings and liturgical ceremonies.", src: "/assets/images/church_choir_02.jpg" },
        { title: "Corporate Events", category: "Live audio production and sound curation for conferences and enterprise gatherings.", src: "/assets/images/corporate_events.jpg" },
    ];

    return (
        <section id="services-section" className="container mx-auto px-6 py-24 md:px-12">
            {/* Bottom row: 4 columns */}
            <div className="grid grid-cols-1 gap-x-12 gap-y-24 md:grid-cols-4">
                {bottomRow.map((p, i) => (
                    <ProjectCard
                        key={i + 3}
                        project={p}
                        index={i + 3}
                    />
                ))}
            </div>

            <TextReveal className="mt-24 mb-24 max-w-3xl font-serif text-5xl leading-tight text-black sm:text-6xl">
                Selected works from our sonic journey.
            </TextReveal>
            {/* Media preview grid */}
            <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 xl:grid-cols-4">
                {mediaItems.map((item) => (
                    <MediaThumb key={item.title} item={item} />
                ))}
            </div>

            <div className="mt-10">
                <Link
                    href="/media"
                    className="inline-flex items-center gap-2 px-7 py-3 border border-[#111]/20 rounded-full text-sm uppercase tracking-[0.1em] text-[#111] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#111]/50 hover:shadow-sm"
                >
                    VIEW ALL MEDIA
                    <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                    </svg>
                </Link>
            </div>
        </section>
    )
}
