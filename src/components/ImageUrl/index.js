"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

const fallbackPlaceholder = "/assets/images/training images/multi_domain_curriculum_lab.png";

const ImageURL = ({ style = {}, image, className = "", height, width, alt = "Image" }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        delay: 500,
        threshold: 0.1,
    });

    const [isLoading, setIsLoading] = useState(true);
    const [imgSrc, setImgSrc] = useState(image || fallbackPlaceholder);

    useEffect(() => {
        if (image) {
            setImgSrc(image);
            setIsLoading(true);
        }
    }, [image]);

    const handleImageLoad = () => setIsLoading(false);
    const handleImageError = () => {
        setIsLoading(false);
        setImgSrc(fallbackPlaceholder);
    };

    return (
        <div ref={ref} className="relative flex justify-center items-center overflow-hidden h-full">
            {/* Show loader until image is fully loaded */}
            {isLoading && (
                <div className={`absolute inset-0 flex items-center justify-center bg-gray-100 ${className}`}>
                    <Image src="/assets/icons/loading_img.svg" alt="Loading" height={24} width={24} className="md:h-12 md:w-12 h-8 w-8" />
                </div>
            )}

            {/* Render Image */}
            {imgSrc && inView && (
                <Image
                    className={`${className} max-h-full h-auto max-w-full w-auto object-cover z-0`}
                    height={height}
                    width={width}
                    src={imgSrc}
                    alt={alt}
                    style={style}
                    unoptimized
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    loading="lazy"
                />
            )}
        </div>
    );
};

export default ImageURL;
