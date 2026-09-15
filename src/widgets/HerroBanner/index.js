"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    FiArrowRight,
    FiAward,
    FiBookOpen,
    FiCalendar,
    FiGlobe,
    FiLayers,
    FiSettings,
    FiSmartphone,
    FiTrendingUp,
    FiUsers,
    FiZap,
} from "react-icons/fi";

import Slider from "@/components/Slider";

const digitalStats = [
    { value: "2017", label: "Founding Year", icon: FiCalendar },
    { value: "300+", label: "Websites Delivered", icon: FiGlobe },
    { value: "50+", label: "ERP Solutions", icon: FiLayers },
    { value: "150+", label: "Mobile Apps", icon: FiSmartphone },
    { value: "2,000+", label: "Clients Worldwide", icon: FiUsers },
];

const trainingStats = [
    { value: "7,000+", label: "Learners Trained / Engaged", icon: FiUsers },
    { value: "8+", label: "Major Training Engagements", icon: FiBookOpen },
    { value: "15+", label: "Technology & Skill Domains", icon: FiLayers },
    { value: "7+", label: "Training Locations", icon: FiGlobe },
    { value: "Up to 90%", label: "Reported Job Placement", icon: FiTrendingUp },
];

const featureIcons = {
    digital: [FiZap, FiSettings, FiTrendingUp],
    training: [FiBookOpen, FiAward, FiTrendingUp],
};

const HerroBanner = () => {
    const containerRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 640);
        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const element = containerRef.current;
        if (!element) return undefined;

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        if (!context) return undefined;

        canvas.className = "pg-canvas";
        canvas.style.cssText = "display:block;position:absolute;inset:0;pointer-events:none;";
        element.appendChild(canvas);

        let animationFrame;
        let particles = [];
        const density = 1500;
        const proximity = isMobile ? 60 : 110;

        const resizeCanvas = () => {
            canvas.width = element.clientWidth;
            canvas.height = element.clientHeight;
        };

        const createParticles = () => {
            particles = Array.from({ length: density / 10 }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: 3,
                speedX: (Math.random() - 0.5) * 0.6,
                speedY: (Math.random() - 0.5) * 0.6,
            }));
        };

        const drawFrame = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle) => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;

                if (particle.x > canvas.width) particle.x = 0;
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.y > canvas.height) particle.y = 0;
                if (particle.y < 0) particle.y = canvas.height;

                context.beginPath();
                context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                context.fillStyle = "#8BC43F";
                context.fill();

                particles.forEach((otherParticle) => {
                    if (Math.hypot(particle.x - otherParticle.x, particle.y - otherParticle.y) >= proximity) return;
                    context.beginPath();
                    context.moveTo(particle.x, particle.y);
                    context.lineTo(otherParticle.x, otherParticle.y);
                    context.strokeStyle = "#8BC43F";
                    context.lineWidth = 0.3;
                    context.stroke();
                });
            });

            animationFrame = requestAnimationFrame(drawFrame);
        };

        resizeCanvas();
        createParticles();
        drawFrame();
        window.addEventListener("resize", resizeCanvas);

        return () => {
            cancelAnimationFrame(animationFrame);
            window.removeEventListener("resize", resizeCanvas);
            canvas.remove();
        };
    }, [isMobile]);

    const slides = [
        {
            id: "digital",
            eyebrow: "Digital transformation",
            title: (
                <>
                    Engineering Digital Solutions for a <span className="text-success_main">Smarter Future</span>
                </>
            ),
            description: "From custom software and enterprise platforms to mobile applications, web solutions and business automation, WiztecBD helps organizations transform ideas and operational challenges into scalable digital solutions.",
            primaryAction: { label: "Start Your Digital Transformation", href: "/contact" },
            secondaryAction: { label: "Explore Our Solutions", href: "/services" },
            features: [
                { title: "Innovate", text: "Turn ideas into impact" },
                { title: "Automate", text: "Streamline operations" },
                { title: "Grow", text: "Build a smarter tomorrow" },
            ],
            image: "/assets/images/banners/Business Auto Banner.webp",
            imageAlt: "Business automation software dashboard",
            stats: digitalStats,
        },
        {
            id: "training",
            eyebrow: "IT & technical training",
            title: (
                <>
                    Building Skills for the <span className="text-success_main">Technology-Driven Future</span>
                </>
            ),
            description: "Industry-aligned IT and technical training programs designed for individuals, institutions, government initiatives and workforce-development projects—from software development and data analytics to AI, 4IR technologies and digital skills.",
            primaryAction: { label: "Explore Training Programs", href: "/courses" },
            secondaryAction: { label: "Partner With Us for Training", href: "/contact" },
            features: [
                { title: "Learn", text: "Industry-relevant technical skills" },
                { title: "Upskill", text: "Practical and future-ready knowledge" },
                { title: "Grow", text: "Build careers and workforce capacity" },
            ],
            image: "/assets/images/portfolio/Casec Study 4/Banner lx.webp",
            imageAlt: "Digital learning platform displayed on laptop and tablet",
            stats: trainingStats,
        },
    ];

    return (
        <div className="relative min-h-[calc(100vh-100px)] overflow-hidden bg-white">
            <div ref={containerRef} className="absolute inset-0 z-0" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-br from-white/95 via-white/80 to-success_light/70" />
            <div className="pointer-events-none absolute -left-32 bottom-0 z-[1] h-96 w-96 rounded-full bg-success_light blur-3xl" />
            <div className="pointer-events-none absolute -right-40 top-0 z-[1] h-[32rem] w-[32rem] rounded-full bg-success_light blur-3xl" />

            <div className="relative z-10 mx-auto max-w-2xl px-4 py-5 md:py-8">
                <Slider activeIndex={activeSlide} onSlideChange={setActiveSlide} autoplayDelay={12000} pauseOnHover showNavigation={false} showPagination={false} viewportClassName="bg-transparent">
                    {slides.map((slide) => (
                        <article key={slide.id} className="flex min-h-[calc(100vh-156px)] flex-col justify-center pb-24">
                            <div className="grid items-center gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
                                <div>
                                    <div className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-gray500 md:text-sm">
                                        {slide.eyebrow}
                                        <span className="h-0.5 w-8 bg-success_main" />
                                    </div>
                                    <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight text-primary sm:text-5xl lg:text-6xl 2xl:text-7xl">{slide.title}</h1>
                                    <p className="mt-5 max-w-3xl text-sm leading-7 text-gray500 md:text-base lg:text-lg">{slide.description}</p>

                                    <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                                        <Link href={slide.primaryAction.href} className="inline-flex items-center justify-center gap-3 rounded-lg bg-success_main px-6 py-3.5 font-semibold text-white shadow-md transition hover:bg-success_dark">
                                            {slide.primaryAction.label} <FiArrowRight />
                                        </Link>
                                        <Link href={slide.secondaryAction.href} className="inline-flex items-center justify-center gap-3 rounded-lg border border-success_main bg-white/80 px-6 py-3.5 font-semibold text-primary transition hover:bg-success_light">
                                            {slide.secondaryAction.label} <FiArrowRight />
                                        </Link>
                                    </div>

                                    <div className="mt-7 grid gap-4 sm:grid-cols-3">
                                        {slide.features.map((feature, index) => {
                                            const Icon = featureIcons[slide.id][index];
                                            return (
                                                <div key={feature.title} className="flex items-center gap-3">
                                                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-success_light text-success_deep">
                                                        <Icon size={21} />
                                                    </span>
                                                    <span>
                                                        <strong className="block text-sm text-primary">{feature.title}</strong>
                                                        <span className="block text-xs leading-5 text-gray500">{feature.text}</span>
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="relative flex min-h-[300px] items-center justify-center sm:min-h-[400px] lg:min-h-[520px]">
                                    <div className="absolute h-4/5 w-4/5 rounded-full bg-success_light blur-2xl" />
                                    <div className="relative h-[280px] w-full sm:h-[390px] lg:h-[500px]">
                                        <Image src={slide.image} alt={slide.imageAlt} fill priority={slide.id === "digital"} sizes="(min-width: 1024px) 52vw, 96vw" className="object-contain drop-shadow-2xl" />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 grid overflow-hidden rounded-2xl bg-white/90 shadow-xl sm:grid-cols-2 lg:grid-cols-5">
                                {slide.stats.map((stat) => {
                                    const Icon = stat.icon;
                                    return (
                                        <div key={stat.label} className="flex items-center gap-3 border-b border-divider px-4 py-4 last:border-b-0 sm:border-r lg:border-b-0 lg:last:border-r-0">
                                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-success_light text-success_deep">
                                                <Icon size={21} />
                                            </span>
                                            <span>
                                                <strong className="block text-xl font-bold text-success_deep md:text-2xl">{stat.value}</strong>
                                                <span className="block text-[11px] leading-4 text-gray500 md:text-xs">{stat.label}</span>
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </article>
                    ))}
                </Slider>

                <div className="absolute bottom-7 left-1/2 z-20 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-xl bg-white/95 p-1.5 shadow-xl backdrop-blur-md">
                    {slides.map((slide, index) => (
                        <button key={slide.id} type="button" onClick={() => setActiveSlide(index)} aria-pressed={activeSlide === index} className={`relative flex-1 rounded-lg px-3 py-2.5 text-left transition ${activeSlide === index ? "bg-success_light text-success_deep" : "text-gray500 hover:bg-secondary_bg"}`}>
                            <span className="block text-[10px] font-bold uppercase tracking-wider">0{index + 1}</span>
                            <span className="block truncate text-xs font-semibold sm:text-sm">{slide.id === "digital" ? "Digital Solutions" : "Technical Training"}</span>
                            <span className={`absolute inset-x-3 bottom-0 h-0.5 origin-left bg-success_main transition-transform duration-500 ${activeSlide === index ? "scale-x-100" : "scale-x-0"}`} />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HerroBanner;
