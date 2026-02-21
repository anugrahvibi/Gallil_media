"use client";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import { useAnimation } from "./providers/AnimationContext";

// --- Clock Component ---
function ISTClock() {
    const [time, setTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const options: Intl.DateTimeFormatOptions = {
                timeZone: "Asia/Kolkata",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            };
            setTime(new Intl.DateTimeFormat("en-GB", options).format(now) + " IST");
        };
        updateTime();
        const timer = setInterval(updateTime, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <span suppressHydrationWarning>
            {time.replace(" IST", "")}
            <sup className="ml-0.5 text-[0.6em] align-top">IST</sup>
        </span>
    );
}

// --- Navigation Component ---
export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [isNavigating, setIsNavigating] = useState(false); // Prevention state
    const menuRef = useRef<HTMLDivElement>(null);
    const container = useRef<HTMLElement>(null);
    const brandRef = useRef<HTMLSpanElement>(null);
    const { triggerReset, triggerServicesTransition } = useAnimation();

    const [scrollTarget, setScrollTarget] = useState<string>("");

    const handleServicesClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (isNavigating) return;
        setIsNavigating(true);
        setScrollTarget("services-section");

        const servicesText = e.target as HTMLElement;

        gsap.to(servicesText, {
            y: 3,
            opacity: 0.85,
            duration: 0.15,
            ease: "power2.inOut",
            onComplete: () => {
                gsap.to(servicesText, { y: 0, opacity: 1, duration: 0.3 });
                setTransitionStage("enter");
            }
        });

        if (isOpen) toggleMenu();
    };

    const { contextSafe } = useGSAP({ scope: container });

    const handleBrandClick = contextSafe!(() => {
        // Micro-animation
        gsap.to(brandRef.current, {
            y: 3,
            opacity: 0.85,
            duration: 0.15,
            ease: "power2.inOut",
            onComplete: () => {
                gsap.to(brandRef.current, {
                    y: 0,
                    opacity: 1,
                    duration: 0.3,
                    ease: "power2.out",
                });
                triggerReset();
            },
        });
    });

    const toggleMenu = contextSafe!(() => {
        if (!isOpen) {
            setIsOpen(true);
            gsap.to(menuRef.current, {
                y: "0%",
                duration: 0.8,
                ease: "power4.inOut",
            });
            gsap.fromTo(
                ".mobile-link",
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.4 }
            );
        } else {
            gsap.to(menuRef.current, {
                y: "-100%",
                duration: 0.8,
                ease: "power4.inOut",
                onComplete: () => setIsOpen(false),
            });
        }
    });

    // About Navigation Logic
    // 1. Animate text
    // 2. Animate Overlay Down
    // 3. Scroll
    // 4. Animate Overlay Up (Exit)
    const handleAboutClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (isNavigating) return;
        setIsNavigating(true);
        setScrollTarget("approach"); // Adjusted to match ID

        const aboutText = e.target as HTMLElement;

        // 1. Text Animation
        gsap.to(aboutText, {
            y: 3,
            opacity: 0.85,
            duration: 0.15,
            ease: "power2.inOut",
            onComplete: () => {
                gsap.to(aboutText, { y: 0, opacity: 1, duration: 0.3 });
                setTransitionStage("enter");
            }
        });

        if (isOpen) toggleMenu();
    };

    const handleContactClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (isNavigating) return;
        setIsNavigating(true);
        setScrollTarget("contact");

        const contactText = e.target as HTMLElement;

        // 1. Text Animation (Micro-interaction)
        gsap.to(contactText, {
            scale: 0.96, // Slight scale down
            opacity: 0.7, // Opacity dip
            duration: 0.16, // ~160ms
            ease: "power2.inOut",
            onComplete: () => {
                gsap.to(contactText, { scale: 1, opacity: 1, duration: 0.3 });
                setTransitionStage("enter");
            }
        });

        if (isOpen) toggleMenu();
    };

    const [transitionStage, setTransitionStage] = useState<"idle" | "enter" | "exit">("idle");

    // Effect to handle scrolling when overlay covers screen
    useEffect(() => {
        if (transitionStage === "enter") {
            // Wait for entry animation (approx 700ms - 800ms)
            const timer = setTimeout(() => {
                if (scrollTarget) {
                    const section = document.getElementById(scrollTarget);
                    if (section) {
                        section.scrollIntoView({ behavior: "instant" }); // Instant scroll behind curtain
                    }
                }
                // Move to exit phase
                setTransitionStage("exit");
            }, 750); // Wait for cover to be fully down
            return () => clearTimeout(timer);
        } else if (transitionStage === "exit") {
            // Wait for exit animation (approx 700ms)
            const timer = setTimeout(() => {
                setTransitionStage("idle");
                setIsNavigating(false);
                setScrollTarget("");
            }, 750); // Wait for cover to slide away
            return () => clearTimeout(timer);
        }
    }, [transitionStage, scrollTarget]);

    return (
        <>
            {/* Yellow Overlay Transition */}
            {/* Using inline styles or Motion logic manually here? Use AnimatePresence or conditional render with motion.div */}
            {transitionStage !== "idle" && (
                <div
                    className="fixed inset-0 z-[60] pointer-events-none"
                    style={{ overflow: 'hidden' }} // Ensure no scrollbars from huge div
                >
                    <motion.div
                        initial={{ y: "-100%" }}
                        animate={transitionStage === "enter" ? { y: "0%" } : { y: "100%" }}
                        transition={{
                            duration: 0.75, // Slow, deliberate (~750ms)
                            ease: [0.22, 1, 0.36, 1], // Custom bezier for organic flow
                        }}
                        className="absolute inset-0 w-full h-full bg-[#FFF714]"
                    />
                </div>
            )}

            <nav ref={container} className="fixed left-0 top-0 z-40 w-full px-6 py-8 md:px-12 bg-[#F8F7F4]/90 backdrop-blur-sm">
                {/* Desktop & Mobile Header Bar */}
                <div className="flex w-full items-baseline justify-between text-[#111111]">
                    {/* Logo - Primary Display Typeface (Editorial) */}
                    <div onClick={handleBrandClick} className="z-50 block leading-none cursor-pointer">
                        <span ref={brandRef} className="font-serif text-2xl md:text-3xl font-normal tracking-tight block">
                            Gallil Media
                        </span>
                    </div>

                    {/* Right Side Group: Desktop Menu & Clock */}
                    {/* Secondary Typeface (Neutal Sans) */}
                    <div className="flex items-center gap-8 md:gap-12">
                        {/* Desktop Menu */}
                        <div className="hidden md:flex gap-8 font-inter text-sm font-medium tracking-tight text-[#111111]/80">
                            <span onClick={handleServicesClick} className="hover:text-black transition-colors cursor-pointer">Services</span>
                            <span onClick={handleAboutClick} className="hover:text-black transition-colors cursor-pointer">About</span>
                            <span onClick={handleContactClick} className="hover:text-black transition-colors cursor-pointer">Contact</span>
                        </div>

                        {/* Desktop Clock */}
                        <div className="hidden md:block font-inter text-sm font-medium tracking-tight text-[#111111]/60">
                            <ISTClock />
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button onClick={toggleMenu} className="z-50 block md:hidden font-inter text-sm font-medium">
                            {isOpen ? "Close" : "Menu"}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <div
                    ref={menuRef}
                    className="fixed inset-0 z-40 flex h-screen w-full flex-col justify-end bg-[#F8F7F4] p-6 pb-12 translate-y-[-100%]"
                >
                    <div className="flex flex-col gap-6">
                        {["Services", "About", "Contact"].map((label, i) => (
                            label === "Services" ? (
                                <span
                                    key={i}
                                    onClick={handleServicesClick}
                                    className="mobile-link text-5xl font-serif font-normal tracking-tight text-[#111111] md:text-7xl cursor-pointer"
                                >
                                    {label}
                                </span>
                            ) : label === "About" ? (
                                <span
                                    key={i}
                                    onClick={handleAboutClick}
                                    className="mobile-link text-5xl font-serif font-normal tracking-tight text-[#111111] md:text-7xl cursor-pointer"
                                >
                                    {label}
                                </span>
                            ) : (
                                <span
                                    key={i}
                                    onClick={handleContactClick}
                                    className="mobile-link text-5xl font-serif font-normal tracking-tight text-[#111111] md:text-7xl cursor-pointer"
                                >
                                    {label}
                                </span>
                            )
                        ))}
                    </div>

                    {/* Mobile Clock */}
                    <div className="mt-12 text-sm font-medium text-[#111111]/60 mobile-link font-inter">
                        <ISTClock />
                    </div>
                </div>
            </nav>
        </>
    );
}
