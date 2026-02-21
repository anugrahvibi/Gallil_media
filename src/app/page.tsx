"use client";
import Hero from "@/components/Hero";
import Preloader from "@/components/Preloader";
import ProjectGrid from "@/components/ProjectGrid";
import AboutSection from "@/components/AboutSection";
import FounderSection from "@/components/FounderSection";
import ContactSection from "@/components/ContactSection";
import EmotionalStatement from "@/components/EmotionalStatement";


export default function Home() {
  return (
    <main className="relative w-full bg-background selection:bg-fiasco-yellow selection:text-black">
      <Preloader />

      <Hero />
      <EmotionalStatement />
      <ProjectGrid />
      <AboutSection />
      <FounderSection />
      <ContactSection />
    </main>
  );
}
