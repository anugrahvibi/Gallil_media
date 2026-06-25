"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ContactSection from "@/components/ContactSection";
import { mediaData } from "@/data/mediaData";

type ImageSlot = {
  kind: "image";
  src: string;
  alt: string;
  title: string;
  onSelect: () => void;
};

type VideoSlot = {
  kind: "video";
  src: string;
  thumbnail: string;
  alt: string;
  title: string;
  onSelect: () => void;
};

type MediaSlotData = ImageSlot | VideoSlot;

type MediaSectionData = {
  label: string;
  descriptor: string;
  slots: MediaSlotData[];
};

function MediaSlot({ slot }: { slot: MediaSlotData }) {
  const frameClassName = "relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-neutral-200";

  return (
    <button
      type="button"
      onClick={slot.onSelect}
      className="group block text-left"
      aria-label={slot.title}
    >
      <div className={frameClassName}>
        {slot.kind === "image" ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={slot.src} alt={slot.alt} className="h-full w-full object-cover" />
        ) : (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={slot.thumbnail} alt={slot.alt} className="h-full w-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/10">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black/45 text-white text-lg leading-none">
                ▶
              </span>
            </div>
          </>
        )}
      </div>
    </button>
  );
}

function MediaSection({ label, descriptor, slots }: MediaSectionData) {
  return (
    <section className="pt-8">
      <hr className="border-t border-black/10" />

      <div className="mt-8 md:mt-10">
        <span className="text-xs md:text-sm font-medium tracking-widest text-neutral-500 uppercase mb-6 block">
          {label}
        </span>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {slots.map((slot, index) => (
            <MediaSlot key={`${label}-${slot.kind}-${index}`} slot={slot} />
          ))}
        </div>

        <div className="mt-6 text-sm uppercase tracking-wider text-neutral-500">
          {descriptor}
        </div>
      </div>
    </section>
  );
}

export default function MediaPage() {
  const [activeMedia, setActiveMedia] = useState<MediaSlotData | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const sections = useMemo<MediaSectionData[]>(() => {
    const buildSection = (
      label: string,
      descriptor: string,
      images: string[],
      videos: { src: string; thumbnail: string }[] | undefined
    ) => ({
      label,
      descriptor,
      slots: [
        ...(images ?? []).map((src, index) => ({
          kind: "image" as const,
          src,
          alt: `${label} image ${index + 1}`,
          title: label,
          onSelect: () => setActiveMedia({
            kind: "image",
            src,
            alt: `${label} image ${index + 1}`,
            title: label,
            onSelect: () => {},
          } as ImageSlot),
        })),
        ...((videos ?? []).map((video, index) => ({
          kind: "video" as const,
          src: video.src,
          thumbnail: video.thumbnail,
          alt: `${label} video ${index + 1}`,
          title: label,
          onSelect: () => setActiveMedia({
            kind: "video",
            src: video.src,
            thumbnail: video.thumbnail,
            alt: `${label} video ${index + 1}`,
            title: label,
            onSelect: () => {},
          } as VideoSlot),
        })))
      ],
    });

    return [
      buildSection(mediaData.liveFusion.label, mediaData.liveFusion.descriptor, mediaData.liveFusion.images, mediaData.liveFusion.videos),
      buildSection(mediaData.churchChoir.label, mediaData.churchChoir.descriptor, mediaData.churchChoir.images, mediaData.churchChoir.videos),
      buildSection(mediaData.funeralChoir.label, mediaData.funeralChoir.descriptor, mediaData.funeralChoir.images, mediaData.funeralChoir.videos),
      buildSection(mediaData.recordingSessions.label, mediaData.recordingSessions.descriptor, mediaData.recordingSessions.images, mediaData.recordingSessions.videos),
    ];
  }, []);

  const closeModal = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setActiveMedia(null);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    if (activeMedia) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeMedia]);

  return (
    <main className="relative w-full bg-background selection:bg-fiasco-yellow selection:text-black">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, transparent 0, transparent calc(100% / 12 - 1px), rgba(17,17,17,0.05) calc(100% / 12 - 1px), rgba(17,17,17,0.05) calc(100% / 12))",
        }}
      />

      <div className="relative z-10">
        <section className="container mx-auto px-6 py-24 md:px-12 md:py-32">
          <div className="max-w-3xl">
            <h1 className="font-serif text-5xl leading-tight text-black sm:text-6xl">Media</h1>
            <p className="mt-6 max-w-2xl font-serif text-2xl md:text-3xl font-normal leading-relaxed text-neutral-600">
              A record of our work - live, liturgical, and in the studio.
            </p>
          </div>

          <div className="mt-24 space-y-20 md:space-y-24">
            {sections.map((section) => (
              <section key={section.label} className="pt-8">
                <hr className="border-t border-black/10" />

                <div className="mt-8 md:mt-10">
                  <span className="text-xs md:text-sm font-medium tracking-widest text-neutral-500 uppercase mb-6 block">
                    {section.label}
                  </span>

                  <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {section.slots.map((slot, index) => (
                      <MediaSlot key={`${section.label}-${slot.kind}-${index}`} slot={slot} />
                    ))}
                  </div>

                  <div className="mt-6 text-sm uppercase tracking-wider text-neutral-500">
                    {section.descriptor}
                  </div>
                </div>
              </section>
            ))}
          </div>
        </section>

        <ContactSection />
      </div>

      {activeMedia ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-[800px]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-0 top-0 z-10 rounded-full bg-black/70 p-3 text-white transition hover:bg-black"
              aria-label="Close modal"
            >
              ×
            </button>
            {activeMedia.kind === "image" ? (
              <img
                src={activeMedia.src}
                alt={activeMedia.alt}
                className="w-full rounded-2xl object-contain"
              />
            ) : (
              <video
                ref={videoRef}
                controls
                preload="none"
                src={activeMedia.src}
                className="w-full rounded-2xl"
              />
            )}
          </div>
        </div>
      ) : null}
    </main>
  );
}
