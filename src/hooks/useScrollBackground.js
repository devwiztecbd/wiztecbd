"use client";
import { useEffect, useState } from "react";

export const useScrollBackground = (defaultColor = "#ffffff") => {
    const [bgColor, setBgColor] = useState(defaultColor);

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll("section");
            let currentSection = defaultColor;

            sections.forEach((section) => {
                const rect = section.getBoundingClientRect();
                const isInMiddle = rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
                if (isInMiddle) {
                    currentSection = section.getAttribute("data-bg") || currentSection;
                }
            });
            if (currentSection !== bgColor) {
                setBgColor(currentSection);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [bgColor, defaultColor]);

    return bgColor;
};
