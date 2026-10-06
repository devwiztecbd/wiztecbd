"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

import { featuredTrainingPortfolio } from "@/app/staticData/featuredTrainingPortfolio";

const AUTOPLAY_SPEED = 28;
const portfolioCopies = [0, 1, 2];

const PortfolioLogo = ({ logo }) => (
    <span className="relative h-14 w-32">
        <Image src={logo.src} alt={logo.alt} fill sizes="128px" className="pointer-events-none object-contain" draggable={false} />
    </span>
);

const PortfolioCard = ({ project, index }) => {
    const isAbove = index % 2 === 1;

    return (
        <article className="relative w-[340px] shrink-0 px-5 sm:w-[420px] lg:w-[470px]">
            <div className="absolute left-1/2 top-1/2 z-20 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-[6px] border-[#F8F9FB] bg-success_deep shadow-lg" />

            <div className={`absolute left-5 right-5 ${isAbove ? "top-0" : "bottom-0"}`}>
                <div className="flex min-h-60 flex-col items-center justify-center rounded-2xl border border-black/5 bg-white px-7 py-7 text-center shadow-[0_18px_45px_rgba(0,0,0,.10)]">
                    <h3 className="text-lg font-extrabold leading-6 text-primary md:text-xl">{project.title}</h3>
                    <p className="mt-3 text-sm leading-5 text-gray500">{project.organization}</p>
                    <div className="mt-6 flex min-h-14 flex-wrap items-center justify-center gap-4">
                        {project.logos.map((logo) => <PortfolioLogo key={logo.src} logo={logo} />)}
                    </div>
                </div>
            </div>

            <div className={`absolute left-1/2 z-30 w-56 -translate-x-1/2 rounded-lg bg-[linear-gradient(90deg,#8BC43F_0%,#20804F_100%)] px-5 py-2 text-center text-lg font-extrabold leading-none text-white shadow-md ${isAbove ? "top-[calc(50%+3rem)]" : "bottom-[calc(50%+3rem)]"}`}>
                <span className="relative">{project.year}</span>
            </div>
        </article>
    );
};

const FeaturedTrainingPortfolio = () => {
    const viewportRef = useRef(null);
    const trackRef = useRef(null);
    const isDraggingRef = useRef(false);
    const dragStartXRef = useRef(0);
    const dragStartOffsetRef = useRef(0);
    const offsetRef = useRef(0);
    const copyWidthRef = useRef(0);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return undefined;

        let animationFrame;
        let lastFrameTime = performance.now();

        const measureTrack = () => {
            const copyWidth = track.scrollWidth / portfolioCopies.length;
            if (!copyWidth) return;
            copyWidthRef.current = copyWidth;
            offsetRef.current = -copyWidth;
            track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
        };

        const animate = (time) => {
            const elapsed = Math.min(time - lastFrameTime, 64);
            lastFrameTime = time;

            if (!isDraggingRef.current) {
                const copyWidth = copyWidthRef.current;
                offsetRef.current -= (AUTOPLAY_SPEED * elapsed) / 1000;
                if (copyWidth && offsetRef.current <= -copyWidth * 2) offsetRef.current += copyWidth;
                track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
            }

            animationFrame = window.requestAnimationFrame(animate);
        };

        measureTrack();
        const resizeObserver = new ResizeObserver(measureTrack);
        resizeObserver.observe(track);
        animationFrame = window.requestAnimationFrame(animate);

        return () => {
            resizeObserver.disconnect();
            window.cancelAnimationFrame(animationFrame);
        };
    }, []);

    const finishDragging = (event) => {
        if (!isDraggingRef.current) return;
        isDraggingRef.current = false;
        if (viewportRef.current?.hasPointerCapture(event.pointerId)) viewportRef.current.releasePointerCapture(event.pointerId);
    };

    return (
        <div className="relative overflow-hidden bg-[#F8F9FB] py-16 text-primary md:py-24">
            <div className="pointer-events-none absolute -left-24 top-12 h-72 w-72 rounded-full bg-success_main/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-success_deep/10 blur-3xl" />

            <div className="relative">
                <div className="pointer-events-none absolute left-0 right-0 top-1/2 z-0 h-1 -translate-y-1/2 bg-[#DDE2DE]" />
                <div
                    ref={viewportRef}
                    className="relative z-10 cursor-grab select-none overflow-x-hidden touch-pan-y active:cursor-grabbing"
                    role="region"
                    aria-label="Featured training portfolio. Drag left or right to explore."
                    onDragStart={(event) => event.preventDefault()}
                    onPointerDown={(event) => {
                        if (event.pointerType === "mouse" && event.button !== 0) return;
                        const viewport = viewportRef.current;
                        if (!viewport) return;
                        isDraggingRef.current = true;
                        dragStartXRef.current = event.clientX;
                        dragStartOffsetRef.current = offsetRef.current;
                        viewport.setPointerCapture(event.pointerId);
                    }}
                    onPointerMove={(event) => {
                        if (!isDraggingRef.current || !trackRef.current) return;

                        const copyWidth = copyWidthRef.current;
                        let nextOffset = dragStartOffsetRef.current + (event.clientX - dragStartXRef.current);
                        if (copyWidth) {
                            while (nextOffset <= -copyWidth * 2) nextOffset += copyWidth;
                            while (nextOffset >= 0) nextOffset -= copyWidth;
                        }

                        offsetRef.current = nextOffset;
                        trackRef.current.style.transform = `translate3d(${nextOffset}px, 0, 0)`;
                    }}
                    onPointerUp={finishDragging}
                    onPointerCancel={finishDragging}
                >
                    <div ref={trackRef} className="flex w-max will-change-transform">
                        {portfolioCopies.map((copyIndex) => (
                            <div key={copyIndex} className="flex h-[590px] items-stretch" aria-hidden={copyIndex !== 1}>
                                {featuredTrainingPortfolio.map((project, index) => (
                                    <PortfolioCard key={`${copyIndex}-${project.id}`} project={project} index={index} />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturedTrainingPortfolio;
