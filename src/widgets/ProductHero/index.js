"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiBarChart2, FiCheckCircle, FiExternalLink, FiLink } from "react-icons/fi";

import Slider from "@/components/Slider";

const productSlides = [
    {
        eyebrow: "Featured solution",
        title: "Insurance Management",
        subtitle: "A complete digital insurance ecosystem",
        description: "Bring policy sales, claims, customer service and reporting together in one secure platform built for modern insurers.",
        technologies: ["Laravel", "PHP", "MySQL", "REST API"],
        industries: ["Insurance", "Finance", "Enterprise"],
        image: "/assets/images/Case Study Insurance Image/Case Study Banner.webp",
        imageAlt: "Insurance management platform shown on desktop, tablet and mobile devices",
        badge: "Secure & scalable",
        portfolioId: 1,
        liveUrl: "/portfolio/1",
        liveLabel: "wiztecbd.com/portfolio/1",
        stats: [
            { value: "18+", label: "Hours saved weekly" },
            { value: "$40K", label: "Annual savings" },
            { value: "90%", label: "High usability" },
        ],
    },
    {
        eyebrow: "Commerce platform",
        title: "Perfecto Commerce",
        subtitle: "Connected retail across every screen",
        description: "Manage products, orders, payments and customer experiences through an integrated commerce platform designed to grow with your business.",
        technologies: ["React.js", "Node.js", "Flutter", "AWS"],
        industries: ["E-commerce", "Retail", "Beauty"],
        image: "/assets/images/portfolio/Case Study 2 Image Perfecto/Case Study Banner Perfecto.webp",
        imageAlt: "Perfecto commerce platform displayed across multiple devices",
        badge: "Cloud powered",
        portfolioId: 2,
        liveUrl: "/portfolio/2",
        liveLabel: "wiztecbd.com/portfolio/2",
        stats: [
            { value: "30%", label: "Online sales growth" },
            { value: "40%", label: "Admin efficiency" },
            { value: "95%", label: "Positive experience" },
        ],
    },
    {
        eyebrow: "Learning platform",
        title: "Exam Preparation",
        subtitle: "A smarter learning and assessment experience",
        description: "Give learners an intuitive place to study, practice and track progress while administrators manage content and performance from one dashboard.",
        technologies: ["Laravel", "MySQL", "Bootstrap", "REST API"],
        industries: ["Education", "Training", "Assessment"],
        image: "/assets/images/portfolio/Casec Study 4/Banner lx.webp",
        imageAlt: "Exam preparation website and administration dashboard on laptop and tablet",
        badge: "Built for growth",
        portfolioId: 4,
        liveUrl: "/portfolio/4",
        liveLabel: "wiztecbd.com/portfolio/4",
        stats: [
            { value: "90%", label: "Less moderation time" },
            { value: "40%", label: "Revenue increase" },
            { value: "2,000+", label: "Active learners" },
        ],
    },
];

const ProductHero = () => {
    const [activeProduct, setActiveProduct] = useState(0);
    const heroRef = useRef(null);

    const handleProductSelect = (index) => {
        setActiveProduct(index);
        heroRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <section className="relative overflow-hidden bg-[#f7fbf5] px-4 py-8 md:py-12" aria-label="Featured products">
            <div
                className="pointer-events-none absolute inset-0 opacity-50"
                style={{
                    backgroundImage: "radial-gradient(circle, rgba(139,196,63,.42) 1.5px, transparent 1.5px)",
                    backgroundSize: "54px 54px",
                }}
            />
            <div className="pointer-events-none absolute -left-28 top-24 h-72 w-72 rounded-full bg-success_light blur-3xl" />
            <div className="pointer-events-none absolute -right-20 bottom-10 h-96 w-96 rounded-full bg-success_light blur-3xl" />

            <div className="container relative mx-auto max-w-2xl">
                <div ref={heroRef} className="scroll-mt-[120px]">
                    <Slider
                        autoplayDelay={14000}
                        activeIndex={activeProduct}
                        onSlideChange={setActiveProduct}
                        pauseOnHover
                        viewportClassName="rounded-20 border border-success_main/20 bg-white/90 shadow-xxl backdrop-blur-sm"
                        slideClassName="min-h-[620px]"
                        navigationClassName="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-success_dark shadow-md transition hover:border-success_main hover:text-success_main md:h-12 md:w-12"
                        paginationClassName="bottom-5 md:bottom-7"
                    >
                        {productSlides.map((product) => (
                            <article key={product.title} className="grid min-h-[620px] grid-cols-1 items-center gap-8 px-6 pb-20 pt-10 md:px-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12 lg:px-20 lg:pb-16">
                                <div className="relative z-10">
                                <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-success_light px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-success_deep">
                                    <span className="h-2 w-2 rounded-full bg-success_main" />
                                    {product.eyebrow}
                                </div>

                                <h1 className="mb-2 text-4xl font-extrabold leading-none tracking-tight text-primary md:text-5xl 2xl:text-6xl">
                                    {product.title}
                                </h1>
                                <h2 className="mb-4 text-lg font-bold text-secondary md:text-2xl">{product.subtitle}</h2>
                                <p className="max-w-2xl text-sm leading-7 text-gray500 md:text-base">{product.description}</p>

                                <div className="mt-6 space-y-5">
                                    <div>
                                        <p className="mb-2.5 flex items-center gap-2 font-bold text-secondary">
                                            <FiCheckCircle className="text-success_main" /> Tech stack
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {product.technologies.map((technology) => (
                                                <span key={technology} className="rounded-full bg-secondary_bg px-3 py-1.5 text-xs font-medium text-secondary">
                                                    {technology}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="mb-2.5 flex items-center gap-2 font-bold text-secondary">
                                            <FiCheckCircle className="text-success_main" /> Industry covered
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {product.industries.map((industry) => (
                                                <span key={industry} className="rounded-full bg-success_light px-3 py-1.5 text-xs font-medium text-success_deep">
                                                    {industry}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-5">
                                    <p className="mb-2.5 flex items-center gap-2 font-bold text-secondary">
                                        <FiLink className="text-success_main" /> Live link
                                    </p>
                                    <Link href={product.liveUrl} className="inline-flex min-w-0 items-center gap-2 rounded-full bg-success_light px-4 py-2 text-sm font-medium text-success_deep transition hover:bg-success_main hover:text-white">
                                        <span className="truncate">{product.liveLabel}</span>
                                        <FiExternalLink className="shrink-0" />
                                    </Link>
                                </div>

                                <div className="mt-5">
                                    <p className="mb-3 flex items-center gap-2 font-bold text-secondary">
                                        <FiBarChart2 className="text-success_main" /> Top performance stats
                                    </p>
                                    <div className="grid grid-cols-3 gap-2">
                                        {product.stats.map((stat) => (
                                            <div key={stat.label} className="rounded-lg bg-success_light px-2 py-2.5">
                                                <p className="text-lg font-extrabold leading-none text-success_deep md:text-xl">{stat.value}</p>
                                                <p className="mt-1 text-[10px] leading-tight text-gray500 md:text-xs">{stat.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-6 flex flex-wrap gap-3">
                                    <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-success_main px-6 py-3 font-semibold text-white shadow-md transition hover:bg-success_dark">
                                        Request a demo <FiArrowRight />
                                    </Link>
                                    <Link href={`/portfolio/${product.portfolioId}`} className="inline-flex items-center gap-2 rounded-full border border-success_main/50 bg-white px-6 py-3 font-semibold text-success_deep transition hover:border-success_main hover:bg-success_light">
                                        Learn more <FiExternalLink />
                                    </Link>
                                </div>
                                </div>

                                <div className="relative flex min-h-[300px] items-center justify-center lg:min-h-[480px]">
                                    <div className="absolute inset-x-4 top-1/2 h-72 -translate-y-1/2 rounded-[50%] bg-gradient-to-br from-success_light via-white to-success_main/20 blur-sm" />
                                    <div className="absolute right-0 top-6 z-10 rounded-full border border-success_main/20 bg-white/95 px-4 py-3 text-xs font-semibold text-success_deep shadow-md md:text-sm">
                                        {product.badge}
                                    </div>
                                    <div className="relative h-[280px] w-full md:h-[420px]">
                                        <Image src={product.image} alt={product.imageAlt} fill priority={product.portfolioId === 1} sizes="(min-width: 1024px) 48vw, 90vw" className="object-contain drop-shadow-2xl" />
                                    </div>
                                </div>
                            </article>
                        ))}
                    </Slider>
                </div>

                <div className="mt-10 md:mt-14">
                    <div className="mb-6 text-center">
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-success_deep">Our products</p>
                        <h2 className="text-2xl font-bold text-primary md:text-3xl">Choose a product to explore</h2>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                        {productSlides.map((product, index) => (
                            <button
                                key={product.title}
                                type="button"
                                onClick={() => handleProductSelect(index)}
                                aria-pressed={activeProduct === index}
                                className={`group overflow-hidden rounded-xl bg-white text-left shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-md ${activeProduct === index ? "ring-2 ring-success_main" : "ring-1 ring-black/5"}`}
                            >
                                <div className="relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-success_light via-white to-success_main/10">
                                    <Image src={product.image} alt={product.imageAlt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-contain p-4 transition-transform duration-300 group-hover:scale-105" />
                                </div>
                                <div className="min-w-0 p-5">
                                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-success_deep">{product.eyebrow}</p>
                                    <h3 className="text-sm font-bold leading-snug text-primary md:text-base">{product.title}</h3>
                                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-success_deep">
                                        View product <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductHero;
