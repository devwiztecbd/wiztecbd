"use client";
import { Children, useEffect, useState } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

import ImageURL from "@/components/ImageUrl";

const Slider = ({
    images = [],
    children,
    autoplayDelay = 3000,
    className = "",
    viewportClassName = "bg-gray-100 rounded",
    slideClassName = "",
    navigationClassName = "text-success_main",
    paginationClassName = "bottom-0",
    activeIndex,
    onSlideChange,
    pauseOnHover = false,
    showNavigation = true,
    showPagination = true,
    transitionMode = "slide",
}) => {
    const [internalIndex, setInternalIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const contentSlides = Children.toArray(children);
    const slides = contentSlides.length > 0 ? contentSlides : images;
    const slideCount = slides.length;
    const isControlled = Number.isInteger(activeIndex);
    const currentIndex = isControlled ? activeIndex : internalIndex;

    const goToSlide = (nextIndex) => {
        if (!isControlled) setInternalIndex(nextIndex);
        onSlideChange?.(nextIndex);
    };

    useEffect(() => {
        if (slideCount <= 1 || !autoplayDelay || (pauseOnHover && isHovered)) return undefined;

        const timeout = setTimeout(() => {
            const nextIndex = (currentIndex + 1) % slideCount;
            if (!isControlled) setInternalIndex(nextIndex);
            onSlideChange?.(nextIndex);
        }, autoplayDelay);

        return () => clearTimeout(timeout);
    }, [autoplayDelay, currentIndex, isControlled, isHovered, onSlideChange, pauseOnHover, slideCount]);

    useEffect(() => {
        if (!isControlled && internalIndex >= slideCount) setInternalIndex(0);
    }, [internalIndex, isControlled, slideCount]);

    const handleNext = () => {
        goToSlide((currentIndex + 1) % slideCount);
    };

    const handlePrev = () => {
        goToSlide(currentIndex === 0 ? slideCount - 1 : currentIndex - 1);
    };

    const handleDotClick = (index) => {
        goToSlide(index);
    };

    if (slideCount === 0) return null;

    return (
        <div className={`relative ${className}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <div className={`relative overflow-hidden w-full ${viewportClassName}`}>
                {transitionMode === "fade" ? (
                    <div className="relative grid">
                        {slides.map((slide, index) => (
                            <div
                                key={index}
                                className={`hero-fade-slide col-start-1 row-start-1 min-w-0 w-full transition-[opacity,transform,filter] duration-700 ease-out ${
                                    index === currentIndex ? "relative z-[1] translate-y-0 scale-100 opacity-100 blur-0" : "pointer-events-none z-0 translate-y-2 opacity-0 md:translate-y-0 md:scale-[0.985] md:blur-[2px]"
                                } ${slideClassName}`}
                                aria-hidden={index !== currentIndex}
                            >
                                {contentSlides.length > 0 ? (
                                    slide
                                ) : (
                                    <div className="flex h-300 items-center justify-center overflow-hidden md:justify-end">
                                        <ImageURL height={300} width={480} alt="banner" image={slide} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex relative transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                        {slides.map((slide, index) => (
                            <div key={index} className={`flex-shrink-0 w-full ${slideClassName}`} aria-hidden={index !== currentIndex}>
                                {contentSlides.length > 0 ? (
                                    slide
                                ) : (
                                    <div className="flex h-300 items-center justify-center overflow-hidden md:justify-end">
                                        <ImageURL height={300} width={480} alt="banner" image={slide} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
                {slideCount > 1 && showNavigation && (
                    <>
                        <button type="button" onClick={handlePrev} aria-label="Previous slide" className={`absolute left-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer ${navigationClassName}`}>
                            <SlArrowLeft size={24} />
                        </button>
                        <button type="button" onClick={handleNext} aria-label="Next slide" className={`absolute right-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer ${navigationClassName}`}>
                            <SlArrowRight size={24} />
                        </button>
                    </>
                )}
                {slideCount > 1 && showPagination && (
                    <div className={`absolute left-1/2 z-10 flex -translate-x-1/2 justify-center space-x-1 ${paginationClassName}`}>
                        {slides.map((_, index) => (
                            <button key={index} type="button" onClick={() => handleDotClick(index)} aria-label={`Go to slide ${index + 1}`} className={`rounded-full border p-0.5 ${index === currentIndex ? "border-success_main" : "border-transparent"}`}>
                                <span className={`block h-2 w-2 rounded-full ${index === currentIndex ? "bg-success_main" : "bg-gray600"}`} />
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Slider;
