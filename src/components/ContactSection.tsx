"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const socialLinks = [
    {
        name: "Instagram",
        href: "https://www.instagram.com/gallilmedia",
    },
    {
        name: "Youtube",
        href: "https://www.youtube.com/@vibik.varkey9842",
    },
    {
        name: "Gmail",
        href: "mailto:vibikvarkey@gmail.com",
    },
];

const sitemapLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "#services" },
    { name: "Approach", href: "#approach" },
    { name: "About", href: "#about" },

];

export default function ContactSection() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="w-full bg-background text-foreground pt-20 pb-8 px-6 md:px-12 overflow-hidden" id="contact">
            <div className="container mx-auto">
                {/* Top Section: Work with us */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline mb-16 md:mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="text-4xl md:text-6xl font-sans font-medium tracking-tight mb-8 md:mb-0"
                    >
                        Work with us
                    </motion.h2>

                    <div className="flex flex-col items-start md:items-end gap-1">
                        <motion.a
                            href="mailto:vibikvarkey@gmail.com"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                            className="text-2xl md:text-5xl font-sans underline decoration-1 underline-offset-4 hover:decoration-2 transition-all"
                        >
                            vibikvarkey@gmail.com
                        </motion.a>
                        <a
                            href="https://wa.me/919061944416"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-right text-xl md:text-4xl font-sans font-normal text-current hover:opacity-75 transition-opacity cursor-pointer mt-0 md:mt-1"
                        >
                            +91 90619 44416
                        </a>
                    </div>
                </div>

                <div className="w-full h-px bg-neutral-200 mb-12" />

                {/* Middle Section: Sitemap & Socials */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24 md:mb-32">
                    {/* Sitemap */}
                    <div className="col-span-1">
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-neutral-500">
                            Sitemap
                        </h3>
                        <ul className="flex flex-col space-y-3">
                            {sitemapLinks.map((link, idx) => (
                                <motion.li
                                    key={link.name}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.1 + idx * 0.05 }}
                                >
                                    <Link
                                        href={link.href}
                                        className="text-lg font-medium text-neutral-800 hover:text-black transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    {/* Socials */}
                    <div className="col-span-1">
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-neutral-500">
                            Socials
                        </h3>
                        <ul className="flex flex-col space-y-3">
                            {socialLinks.map((link, idx) => (
                                <motion.li
                                    key={link.name}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.2 + idx * 0.05 }}
                                >
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-lg font-medium text-neutral-800 hover:text-black transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    {/* Space holder or extra info if needed */}
                    <div className="col-span-2 hidden md:block"></div>
                </div>

                {/* Bottom Section: Big Brand & Footer Info */}
                <div className="relative flex flex-col md:flex-row items-end justify-between border-t border-transparent">
                    {/* Huge Brand Text */}
                    <div className="w-full md:w-auto">
                        <motion.h1
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="text-[12vw] md:text-[14vw] leading-[0.8] font-bold tracking-tighter text-black mix-blend-difference md:mix-blend-normal select-none"
                        >
                            GALLIL MEDIA
                        </motion.h1>
                    </div>

                    {/* Bottom Details */}
                    <div className="w-full md:w-auto flex flex-row md:flex-col justify-between items-end md:mb-4 gap-4 mt-8 md:mt-0">
                        <button
                            onClick={scrollToTop}
                            className="text-sm font-medium hover:opacity-70 transition-opacity"
                        >
                            Back to top ↑
                        </button>
                        <p className="text-sm text-neutral-500">
                            Copyright © Gallil Media {new Date().getFullYear()}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
