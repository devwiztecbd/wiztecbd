"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiChevronDown } from "react-icons/fi";

import { socialLinks as staticSocialLinks } from "@/app/staticData/data";
import api from "@/config/api";

const SocialLink = () => {
    const [open, setOpen] = useState(false);
    const [socialLinks, setSocialLinks] = useState(staticSocialLinks);
    const socialRailRef = useRef(null);

    useEffect(() => {
        const fetchSocialLinks = async () => {
            try {
                const response = await api.get("/api/get-home");
                if (response.data && response.data.home) {
                    const homeData = response.data.home;
                    const mappedLinks = [
                        { href: homeData.facebook, icon: "facebook.webp", alt: "Facebook" },
                        { href: homeData.whatsapp, icon: "whatsapp.webp", alt: "WhatsApp" },
                        { href: homeData.instagram, icon: "Instragram.webp", alt: "Instagram" },
                        { href: homeData.linkedin, icon: "likn.webp", alt: "LinkedIn" },
                        { href: homeData.skype, icon: "sky.webp", alt: "Skype" },
                        { href: homeData.telegram, icon: "Telegram.webp", alt: "Telegram" },
                        { href: homeData.x, icon: "x twi.webp", alt: "Twitter (X)" },
                        { href: homeData.youtube, icon: "youtube.webp", alt: "YouTube" },
                        { href: homeData.pinterest, icon: "pinterest.webp", alt: "Pinterest" },
                    ].filter(link => link.href); // Only include links that have a value

                    if (mappedLinks.length > 0) {
                        // Ensure URLs have protocol
                        const formattedLinks = mappedLinks.map(link => ({
                            ...link,
                            href: link.href.startsWith("http") ? link.href : `https://${link.href}`
                        }));
                        setSocialLinks(formattedLinks);
                    }
                }
            } catch (error) {
                console.error("Error fetching social links:", error);
            }
        };

        fetchSocialLinks();
    }, []);

    useEffect(() => {
        const closeDrawer = (event) => {
            if (event.key === "Escape") setOpen(false);
            if (event.type === "mousedown" && socialRailRef.current && !socialRailRef.current.contains(event.target)) setOpen(false);
        };

        document.addEventListener("mousedown", closeDrawer);
        document.addEventListener("keydown", closeDrawer);

        return () => {
            document.removeEventListener("mousedown", closeDrawer);
            document.removeEventListener("keydown", closeDrawer);
        };
    }, []);

    const visibleLinks = socialLinks.slice(0, 4);
    const drawerLinks = socialLinks.slice(4);

    return (
        <div className="relative h-[168px] w-8 md:h-[184px] md:w-10">
            <div ref={socialRailRef} className="absolute left-0 top-0 z-[100] flex flex-col items-center rounded-br-xl rounded-tr-xl bg-white px-1 py-2 shadow-social md:px-2 md:py-4">
                <div className="flex flex-col items-center gap-2">
                    {visibleLinks.map(({ href, icon, alt }) => (
                        <Link key={alt} href={href} target="_blank" rel="noopener noreferrer" aria-label={alt} className="h-6 w-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
                            <Image src={`/assets/images/Social/${icon}`} height={24} width={24} alt={alt} />
                        </Link>
                    ))}
                </div>

                {drawerLinks.length > 0 && (
                    <>
                        <div
                            id="additional-social-links"
                            className={`overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out ${open ? "max-h-64 opacity-100" : "pointer-events-none max-h-0 opacity-0"}`}
                        >
                            <div className="flex flex-col items-center gap-2 pt-2">
                                {drawerLinks.map(({ href, icon, alt }) => (
                                    <Link key={alt} href={href} target="_blank" rel="noopener noreferrer" aria-label={alt} className="h-6 w-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
                                        <Image src={`/assets/images/Social/${icon}`} height={24} width={24} alt={alt} />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <button
                            type="button"
                            aria-expanded={open}
                            aria-controls="additional-social-links"
                            aria-label={open ? "Hide additional social links" : "Show all social links"}
                            onClick={() => setOpen((current) => !current)}
                            className="mt-2 flex h-6 w-6 items-center justify-center text-success_main transition-transform duration-300 hover:-translate-y-1"
                        >
                            <FiChevronDown className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} size={20} />
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default SocialLink;
