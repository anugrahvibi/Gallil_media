"use client";

import { useState, useEffect, useRef } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    toggleVisibility();

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn) return;

    const handleScrollTop = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    // Use native pointerdown to guarantee it fires instantly on first interaction (bypasses React event delegation & any mobile delay)
    btn.addEventListener("pointerdown", handleScrollTop);

    return () => {
      btn.removeEventListener("pointerdown", handleScrollTop);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      type="button"
      className={`fixed left-[20px] bottom-[20px] z-[50] flex h-[44px] w-[44px] items-center justify-center rounded-xl bg-[#1a1a1a] text-white transition-opacity duration-300 ${
        isVisible ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-label="Scroll to top"
    >
      <svg
        className="pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m18 15-6-6-6 6" />
      </svg>
    </button>
  );
}
