"use client";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
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
    const menuRef = useRef<HTMLDivElement>(null);
    const container = useRef<HTMLElement>(null);
    const brandRef = useRef<HTMLSpanElement>(null);
    const pathname = usePathname();
    const router = useRouter();
    const isMediaPage = pathname === "/media";
    const { setIsLoading } = useAnimation();

    // ─── GSAP micro-animations on nav text ───────────────────────────────────
    const { contextSafe } = useGSAP({ scope: container });

    // ─── Section scroll helper ───────────────────────────────────────────────
    const scrollToSection = (sectionId: string) => {
        if (pathname === "/") {
            document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
        } else {
            router.push(`/#${sectionId}`);
        }
    };

    // ─── Click handlers ───────────────────────────────────────────────────────

    const handleServicesClick = (e: React.MouseEvent) => {
        e.preventDefault();
        scrollToSection("services-section");
        if (isOpen) toggleMenu();
    };

    const handleAboutClick = (e: React.MouseEvent) => {
        e.preventDefault();
        scrollToSection("approach");
        if (isOpen) toggleMenu();
    };

    const handleContactClick = (e: React.MouseEvent) => {
        e.preventDefault();
        scrollToSection("contact");
        if (isOpen) toggleMenu();
    };

    const handleBrandClick = contextSafe!(() => {
        // Always replay the Preloader, then go to homepage
        setIsLoading(true);
        if (pathname !== "/") {
            gsap.to(brandRef.current, {
                y: 3,
                opacity: 0.85,
                duration: 0.15,
                ease: "power2.inOut",
                onComplete: () => {
                    gsap.to(brandRef.current, { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" });
                    router.push("/");
                },
            });
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    });

    const toggleMenu = contextSafe!(() => {
        if (!isOpen) {
            setIsOpen(true);
            gsap.to(menuRef.current, { y: "0%", duration: 0.8, ease: "power4.inOut" });
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

    return (
        <>
            <nav ref={container} className="fixed left-0 top-0 z-40 w-full px-6 py-8 md:px-12 bg-[#F8F7F4]/90 backdrop-blur-sm">
                {/* Desktop & Mobile Header Bar */}
                <div className="flex w-full items-baseline justify-between text-[#111111]">
                    {/* Logo */}
                    <div onClick={handleBrandClick} className="z-50 block leading-none cursor-pointer">
                        <span ref={brandRef} className="font-serif text-2xl md:text-3xl font-normal tracking-tight block">
                            Gallil Media
                        </span>
                    </div>

                    {/* Right Side Group: Desktop Menu & Clock */}
                    <div className="flex items-center gap-8 md:gap-12">
                        {/* Desktop Menu */}
                        <div className="hidden md:flex gap-8 font-inter text-sm font-medium tracking-tight text-[#111111]/80">
                            <span onClick={handleServicesClick} className="hover:text-black transition-colors cursor-pointer">Services</span>
                            <Link
                                href="/media"
                                aria-current={isMediaPage ? "page" : undefined}
                                className={`${isMediaPage ? "text-black" : "hover:text-black"} transition-colors cursor-pointer`}
                            >
                                Media
                            </Link>
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
                        <Link
                            href="/media"
                            onClick={() => { if (isOpen) toggleMenu(); }}
                            className="mobile-link text-5xl font-serif font-normal tracking-tight text-[#111111] md:text-7xl cursor-pointer"
                        >
                            Media
                        </Link>
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
