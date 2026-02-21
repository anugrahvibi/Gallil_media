"use client";
import React from 'react';
import { cn } from '@/lib/utils';
import TextReveal from './ui/TextReveal';
import { useImageMaskReveal } from '@/hooks/useImageMaskReveal';

// Sound Studio Projects
const projects = [
    { title: "Church choir", category: "Choral services for weddings and liturgical ceremonies.", src: "assets/images/church_choir_01.png" },
    { title: "Funeral Choir", category: "Sound Design", src: "assets/images/funeral_choir.jpg" },
    { title: "Live Fusion", category: "Live performance mastering for stage and broadcast.", src: "assets/images/live_fusion.jpg" },
    { title: "Sound Studio", category: "Music production and studio recording services.", src: "assets/images/sound_studio.jpg" },
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

export default function ProjectGrid() {
    // Top row: 3 tiles
    const topRow = [
        projects.find(p => p.title === "Live Fusion"),
        projects.find(p => p.title === "Sound Studio"),
        { title: "Church choir", category: "Choral services for weddings and liturgical ceremonies.", src: "assets/images/church_choir_01.png" },
    ].filter(Boolean);

    // Bottom row: 4 tiles
    const bottomRow = [
        { title: "Studio recording and mixing", category: "Professional recording sessions shaped for clarity and depth.", src: "assets/images/studio_recording.jpg" },
        { title: "Funeral choir", category: "Choral services for funerals and memorial services.", src: "assets/images/Funeral_choir.jpg" },
        { title: "Tones and Rhythms", category: "Original compositions, sound design and textural arrangements.", src: "assets/images/tones_rhythms.jpg" },
        { title: "Corporate Events", category: "Live audio production and sound curation for conferences and enterprise gatherings.", src: "assets/images/corporate_events.jpg" },
    ];

    return (
        <section id="services-section" className="container mx-auto px-6 py-24 md:px-12">
            <TextReveal className="mb-24 max-w-3xl font-serif text-5xl leading-tight text-black sm:text-6xl">
                Selected works from our sonic journey.
            </TextReveal>
            {/* Top row: 3 columns */}
            <div className="grid grid-cols-1 gap-x-16 gap-y-24 md:grid-cols-3">
                {topRow.map((p, i) => (
                    <ProjectCard
                        key={i}
                        project={p}
                        index={i}
                        className={cn(
                            // Center card gets pushed down
                            i === 1 ? "md:mt-32" : ""
                        )}
                    />
                ))}
            </div>
            {/* Bottom row: 4 columns */}
            <div className="mt-24 grid grid-cols-1 gap-x-12 gap-y-24 md:grid-cols-4">
                {bottomRow.map((p, i) => (
                    <ProjectCard
                        key={i + 3}
                        project={p}
                        index={i + 3}
                    />
                ))}
            </div>
        </section>
    )
}
