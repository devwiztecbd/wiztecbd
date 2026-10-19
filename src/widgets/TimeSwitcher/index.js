"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { fetchHome } from "@/utilities/api";

const TimeSwitcher = () => {
    const pathname = usePathname();
    const lastSegment = pathname.replace(/\/+$/, "").split("/").pop();

    const capitalizedPathname = lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);

    const [webTitleText, setWebTitleText] = useState("");

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetchHome();
                if (response?.home?.webTitleText) {
                    setWebTitleText(response.home.webTitleText);
                }
            } catch (error) {
                console.error("Error fetching popup image:", error);
            }
        };
        fetchImage();
    }, []);

    useEffect(() => {
        const defaultTitle = pathname == "/" ? "WiztechBD - A Celestial Software House." : `${capitalizedPathname} - WiztechBD - A Celestial Software House.`;

        const alternateTitle = `${webTitleText ?? "WiztechBD"}`;
        document.title = defaultTitle;

        const titleToggle = () => {
            setTimeout(() => {
                document.title = alternateTitle;
                setTimeout(() => {
                    document.title = defaultTitle;
                }, 1000);
            }, 1000);
        };

        const interval = setInterval(titleToggle, 2000);

        return () => clearInterval(interval);
    }, [capitalizedPathname, webTitleText]);

    return null;
};

export default TimeSwitcher;
