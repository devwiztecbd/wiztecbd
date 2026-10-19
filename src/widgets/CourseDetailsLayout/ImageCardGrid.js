"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

function GridCardImage({ src, alt }) {
    const fallback = "/assets/icons/system.svg";
    const [imgSrc, setImgSrc] = useState(src || fallback);

    useEffect(() => {
        setImgSrc(src || fallback);
    }, [src]);

    return (
        <Image
            src={imgSrc || fallback}
            alt={alt}
            width={72}
            height={72}
            unoptimized
            onError={() => setImgSrc(fallback)}
            className="h-[72px] w-[72px] object-contain"
        />
    );
}

export default function ImageCardGrid({ headingId, title, description, items, countLabel, icon: Icon }) {
    const safeItems = Array.isArray(items) ? items : [];

    return (
        <section aria-labelledby={headingId}>
            <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
                <div>
                    <h2 id={headingId} className="text-[22px] font-bold tracking-[-0.025em] text-primary md:text-[26px]">{title}</h2>
                    <p className="mt-2 max-w-[580px] text-sm leading-relaxed text-gray700">{description}</p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#f2f6ed] px-3 py-2 text-xs font-semibold text-success_deep">
                    <Icon aria-hidden="true" size={14} /> {safeItems.length} {countLabel}
                </span>
            </div>

            <ul className="grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-3 md:gap-5">
                {safeItems.map((item) => (
                    <li key={item.id} className="flex flex-col items-center rounded-xl border border-[#e2e7df] bg-white px-5 py-7 text-center transition-[border-color,box-shadow] duration-200 hover:border-success_deep/35 hover:shadow-[0_6px_20px_rgba(32,128,79,0.06)] motion-reduce:transition-none">
                        <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-2xl border border-[#edf0e9] bg-[#f7f9f4] p-3">
                            <GridCardImage src={item.image} alt={item.alt || `${item.name} icon`} />
                        </div>
                        <h3 className="max-w-[200px] text-sm font-semibold leading-relaxed text-secondary">{item.name}</h3>
                    </li>
                ))}
            </ul>
        </section>
    );
}
