"use client";
import { useEffect, useState } from "react";

export const useScrollBackground = (defaultColor = "#ffffff") => {
    const [bgColor, setBgColor] = useState(defaultColor);

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll("section");
            let currentSectionColor = null;

            sections.forEach((section) => {
                const rect = section.getBoundingClientRect();
                const isInMiddle = rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
                if (isInMiddle) {
                    currentSectionColor = section.getAttribute("data-bg") || currentSectionColor;
                }
            });

            // Keep the final section color while the footer is in view instead of
            // resetting the page to its initial color when no section crosses the midpoint.
            if (currentSectionColor) {
                setBgColor((currentColor) => (currentColor === currentSectionColor ? currentColor : currentSectionColor));
            }
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return bgColor;
};
