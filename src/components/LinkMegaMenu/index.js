import Image from "next/image";
import Link from "next/link";
import { BsArrowUpRight } from "react-icons/bs";

import Menu from "@/components/Menu";

const LinkMegaMenu = ({ eyebrow, title, items, featuredImage, featuredImageAlt = "", onMouseEnter, onMouseLeave, onClose }) => {
    return (
        <Menu onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <div className="border-t border-black/5 bg-[#F8F9FB]">
                <div className={`container mx-auto grid max-w-xl gap-x-3 gap-y-4 px-4 py-8 lg:grid-cols-[0.28fr_0.72fr] ${featuredImage ? "lg:items-stretch" : "lg:items-center"}`}>
                    {featuredImage ? (
                        <>
                            <h2 className="text-3xl font-bold leading-tight text-primary lg:col-start-1 lg:row-start-1">{title}</h2>
                            <div className="relative min-h-40 overflow-hidden rounded-xl border border-black/5 bg-white shadow-lg lg:col-start-1 lg:row-start-2">
                                <Image src={featuredImage} alt={featuredImageAlt} fill sizes="280px" className="object-cover" />
                            </div>
                        </>
                    ) : (
                        <div className="pr-5">
                            {eyebrow && <p className="text-xs font-bold uppercase tracking-[0.22em] text-success_deep">{eyebrow}</p>}
                            <h2 className={`${eyebrow ? "mt-3" : ""} text-3xl font-bold leading-tight text-primary`}>{title}</h2>
                        </div>
                    )}

                    <div className={`grid gap-3 ${items.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"} ${featuredImage ? "lg:col-start-2 lg:row-start-2" : ""}`}>
                        {items.map((item, index) => (
                            <Link
                                key={item.title}
                                href={item.href}
                                onClick={onClose}
                                className="group relative overflow-hidden rounded-xl border border-black/5 bg-white p-5 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-success_main/40 hover:shadow-md"
                            >
                                <span className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-success_light text-success_deep transition group-hover:bg-success_main group-hover:text-white">
                                    <BsArrowUpRight size={14} />
                                </span>
                                <span className="text-xs font-bold text-success_main">0{index + 1}</span>
                                <h3 className="mt-4 pr-8 text-base font-semibold text-primary">{item.title}</h3>
                                <p className="mt-2 text-xs leading-5 text-gray500">{item.description}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </Menu>
    );
};

export default LinkMegaMenu;
