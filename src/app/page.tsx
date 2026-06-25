"use client";
import Hero from "@/components/Hero";
import ProjectGrid from "@/components/ProjectGrid";
import AboutSection from "@/components/AboutSection";
import TonesRhythmsSection from "@/components/TonesRhythmsSection";
import PersonalisedServiceSection from "@/components/PersonalisedServiceSection";
import FounderSection from "@/components/FounderSection";
import ContactSection from "@/components/ContactSection";
import EmotionalStatement from "@/components/EmotionalStatement";


export default function Home() {
  return (
    <main className="relative w-full bg-background selection:bg-fiasco-yellow selection:text-black">
      <Hero />
      <EmotionalStatement />
      <TonesRhythmsSection />
      <PersonalisedServiceSection />
      <ProjectGrid />
      <AboutSection />
      <FounderSection />
      <ContactSection />
    </main>
  );
}
