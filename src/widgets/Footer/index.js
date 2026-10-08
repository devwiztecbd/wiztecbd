"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { FiArrowUpRight, FiMail, FiMapPin, FiPhone } from "react-icons/fi";

import api from "@/config/api";
import { membershipCredentials } from "@/app/staticData/home";

const linkGroups = [
    {
        title: "What we do",
        links: [
            { label: "Website development", href: "/services/website-development" },
            { label: "Software development", href: "/services/custom-software-development" },
            { label: "Mobile app development", href: "/services/mobile-app-development" },
            { label: "Digital marketing", href: "/services/digital-marketing" },
            { label: "IT training", href: "/training" },
            { label: "Explore all services", href: "/services" },
        ],
    },
    {
        title: "Explore WiztecBD",
        links: [
            { label: "About us", href: "/about" },
            { label: "Our work", href: "/portfolio" },
            { label: "Our products", href: "/product" },
            { label: "Courses", href: "/courses" },
            { label: "Our team", href: "/team" },
            { label: "Careers", href: "/career" },
            { label: "Blog", href: "/blog" },
        ],
    },
];

const socialLinks = [
    { name: "Facebook", href: "https://www.facebook.com/wiztecbd", icon: FaFacebookF },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/wiztecbd", icon: FaLinkedinIn },
    { name: "X", href: "https://x.com/Wiztecsoft", icon: FaXTwitter },
    { name: "YouTube", href: "https://www.youtube.com/@wizardsoftwaretechnologyba7240", icon: FaYoutube },
];

const linkClass = "transition-colors hover:text-[#b5df76] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b5df76]";

export default function Footer() {
    const [offices, setOffices] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        api.get("/api/get-offices", { signal: controller.signal })
            .then(({ data }) => {
                if (data.status === 200 && Array.isArray(data.offices)) setOffices(data.offices);
            })
            .catch((error) => {
                if (error.code !== "ERR_CANCELED") console.error("Failed to fetch offices:", error);
            });
        return () => controller.abort();
    }, []);

    return (
        <footer className="border-t border-[#253a30] bg-[#10231b] text-[#c0cec6]">
            <div className="mx-auto w-full max-w-[1280px] px-10 sm:px-6 lg:px-8">
                <div className="flex flex-col justify-between gap-7 border-b border-white/10 py-10 md:flex-row md:items-center md:py-12">
                    <div>
                        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#b5df76]">Let’s build what’s next</p>
                        <h2 className="max-w-[600px] text-[28px] font-bold leading-tight tracking-[-0.035em] text-white md:text-[36px]">Good ideas deserve great execution.</h2>
                    </div>
                    <Link href="/contact" className="inline-flex w-fit shrink-0 items-center gap-3 rounded-xl bg-[#b5df76] px-6 py-4 text-sm font-bold text-[#10231b] transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b5df76]">
                        Start a conversation <FiArrowUpRight aria-hidden="true" size={20} />
                    </Link>
                </div>

                <div className="grid grid-cols-2 gap-x-5 gap-y-10 py-10 sm:gap-x-8 lg:grid-cols-[1.2fr_1fr_0.85fr_1.3fr] lg:gap-x-10 lg:py-12">
                    <div className="col-span-2 sm:col-span-1">
                        <Link href="/" aria-label="WiztecBD home" className="mb-5 inline-flex rounded-lg bg-white px-3 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b5df76]">
                            <Image src="/assets/images/Logos/logo.png" alt="WiztecBD" width={167} height={38} className="h-[38px] w-auto object-contain" />
                        </Link>
                        <p className="max-w-[290px] text-sm leading-7">Software, digital solutions, and practical training to help businesses and people move forward.</p>
                        <div aria-label="Follow WiztecBD" className="mt-6 flex gap-2.5">
                            {socialLinks.map(({ name, href, icon: Icon }) => (
                                <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={`WiztecBD on ${name}`} className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-white transition-colors hover:border-[#b5df76] hover:bg-[#b5df76] hover:text-[#10231b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b5df76]">
                                    <Icon aria-hidden="true" size={15} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {linkGroups.map((group) => (
                        <nav key={group.title} aria-label={`Footer ${group.title}`}>
                            <h3 className="mb-5 text-sm font-bold text-white">{group.title}</h3>
                            <ul className="space-y-3">
                                {group.links.map((link) => <li key={link.href}><Link href={link.href} className={`${linkClass} text-[13px] leading-relaxed`}>{link.label}</Link></li>)}
                            </ul>
                        </nav>
                    ))}

                    <div className="col-span-2 sm:col-span-1">
                        <h3 className="mb-5 text-sm font-bold text-white">Let’s connect</h3>
                        {offices.length > 0 ? (
                            <div className="space-y-6">
                                {offices.map((office) => (
                                    <address key={office.id} className="space-y-2.5 text-[13px] leading-relaxed not-italic">
                                        <p className="font-semibold text-[#e8eee9]">{office.title}</p>
                                        {office.address && <p className="flex items-start gap-2.5"><FiMapPin aria-hidden="true" size={15} className="mt-1 shrink-0 text-[#b5df76]" /><span>{office.address}</span></p>}
                                        {office.phone && <a href={`tel:${office.phone}`} className={`${linkClass} flex items-center gap-2.5`}><FiPhone aria-hidden="true" size={14} className="shrink-0 text-[#b5df76]" />{office.phone}</a>}
                                        {office.email && <a href={`mailto:${office.email}`} className={`${linkClass} flex items-start gap-2.5`}><FiMail aria-hidden="true" size={14} className="mt-1 shrink-0 text-[#b5df76]" /><span className="break-all">{office.email}</span></a>}
                                    </address>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm leading-7">Have a project, a training need, or a question? We’d love to hear from you.</p>
                        )}
                        <Link href="/contact" className={`${linkClass} mt-5 inline-flex items-center gap-2 text-[13px] font-semibold text-[#b5df76]`}>Get in touch <FiArrowUpRight aria-hidden="true" size={16} /></Link>
                    </div>
                </div>

                <div className="flex flex-col justify-between gap-5 border-t border-white/10 py-6 sm:flex-row sm:items-center">
                    <p className="text-xs font-medium tracking-wide text-[#a0b4a7]">Memberships &amp; credentials</p>
                    <ul className="flex flex-wrap gap-3">
                        {membershipCredentials.map((credential) => (
                            <li key={credential.id} title={credential.name} className="flex h-14 w-24 items-center justify-center rounded-lg bg-white px-3 py-2">
                                <Image src={credential.image} alt={credential.name} height={40} width={72} className="max-h-10 w-auto max-w-full object-contain" />
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-col justify-between gap-3 border-t border-white/10 py-5 text-[11px] leading-relaxed text-[#a0b4a7] sm:flex-row sm:items-center">
                    <p>© {new Date().getFullYear()} Wizard Software &amp; Technology Bangladesh Ltd. All rights reserved.</p>
                    <Link href="/contact" className={linkClass}>Contact &amp; support</Link>
                </div>
            </div>
        </footer>
    );
}
