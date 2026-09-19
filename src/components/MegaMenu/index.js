import { useState } from "react";
import Link from "next/link";
import { BsArrowRight, BsArrowUpRight } from "react-icons/bs";

import Menu from "@/components/Menu";

const ServiceMegaMenu = ({ onMouseEnter, onMouseLeave, menuData, onClose }) => {
    const [activeId, setActiveId] = useState(menuData[0].id);
    const activeCategory = menuData.find((category) => category.id === activeId) || menuData[0];
    const hasGroupedLinks = activeCategory.sections.length > 0;

    const renderSectionCard = (section, isWide = false) => (
        <Link key={section.id} href={section.href} onClick={onClose} className={`mega-menu-card-gradient group block rounded-xl border border-success_main/10 p-4 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-success_main/40 hover:shadow-md ${isWide ? "col-span-2" : ""}`}>
            <span className="flex items-start justify-between gap-3 font-semibold text-primary transition group-hover:text-success_deep">
                <span className="text-sm leading-5">{section.title}</span>
                <BsArrowUpRight className="mt-0.5 shrink-0 text-success_main transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
            {section.items.length > 0 && (
                <ul className={`mt-3 border-t border-black/5 pt-3 ${isWide ? "grid grid-cols-2 gap-x-5 gap-y-2" : "space-y-2"}`}>
                    {section.items.map((item) => (
                        <li key={item.title} className="flex gap-2 text-[11px] font-medium leading-4 text-gray500">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-success_main" />
                            {item.title}
                        </li>
                    ))}
                </ul>
            )}
        </Link>
    );

    const viewAllCard = (
        <Link href={activeCategory.href} onClick={onClose} className="group relative flex min-h-40 flex-col justify-end overflow-hidden rounded-xl border border-success_main/20 bg-[#273126] p-5 text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-md">
            <span className="absolute -right-10 -top-10 h-32 w-32 rounded-full border border-white/10 bg-white/5" />
            <span className="absolute right-8 top-8 h-12 w-12 rounded-full border border-success_main/40" />
            <span className="relative mt-6">
                <span className="block text-base font-bold">View all</span>
                <span className="mt-1 flex items-center gap-2 text-xs text-white/70">
                    {activeCategory.title} <BsArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
            </span>
        </Link>
    );

    return (
        <Menu onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <div className="border-t border-success_main/20">
                <div className="container mx-auto grid max-h-[calc(100vh-6.25rem)] max-w-xl grid-cols-[300px_minmax(0,1fr)] overflow-y-auto px-4">
                    <div className="border-r border-black/10 py-7 pr-6">
                        <div className="mb-5">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.22em] text-success_deep">Our expertise</p>
                                <h2 className="mt-2 text-2xl font-bold text-primary">Services</h2>
                            </div>
                        </div>

                        <div className="space-y-2">
                            {menuData.map((category, index) => (
                                <button
                                    key={category.id}
                                    type="button"
                                    onMouseEnter={() => setActiveId(category.id)}
                                    onFocus={() => setActiveId(category.id)}
                                    onClick={() => setActiveId(category.id)}
                                    className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${activeId === category.id ? "bg-success_main text-white shadow-md" : "text-secondary hover:bg-white hover:text-success_deep"}`}
                                >
                                    <span className={`text-[10px] font-bold ${activeId === category.id ? "text-white/70" : "text-success_main"}`}>0{index + 1}</span>
                                    <span className="flex-1 text-sm font-semibold leading-5">{category.title}</span>
                                    <BsArrowRight className={`shrink-0 transition-transform group-hover:translate-x-1 ${activeId === category.id ? "opacity-100" : "opacity-40"}`} />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="min-w-0 py-7 pl-7">
                        <div className="mb-6">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.18em] text-success_main">Selected service</p>
                                <h3 className="mt-2 text-xl font-bold text-primary">{activeCategory.title}</h3>
                                <p className="mt-2 max-w-2xl text-xs leading-5 text-gray500">{activeCategory.description}</p>
                            </div>
                        </div>

                        {hasGroupedLinks ? (
                            activeCategory.sections.length === 1 ? (
                                <div className="grid grid-cols-3 items-start gap-3">
                                    {renderSectionCard(activeCategory.sections[0], true)}
                                    {viewAllCard}
                                </div>
                            ) : activeCategory.id === "engineering-development" ? (
                                <div className="grid grid-cols-3 items-start gap-3">
                                    <div className="space-y-3">
                                        {renderSectionCard(activeCategory.sections.find((section) => section.id === "website-development"))}
                                        {renderSectionCard(activeCategory.sections.find((section) => section.id === "ecommerce-development"))}
                                    </div>
                                    <div className="col-span-2 space-y-3">
                                        <div className="grid grid-cols-2 items-start gap-3">
                                            {renderSectionCard(activeCategory.sections.find((section) => section.id === "mobile-development"))}
                                            {renderSectionCard(activeCategory.sections.find((section) => section.id === "software-development"))}
                                        </div>
                                        {renderSectionCard(activeCategory.sections.find((section) => section.id === "support-maintenance"))}
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-3 items-start gap-3">
                                    {[0, 1, 2].map((columnIndex) => (
                                        <div key={columnIndex} className="space-y-3">
                                            {activeCategory.sections.filter((_, sectionIndex) => sectionIndex % 3 === columnIndex).map((section) => renderSectionCard(section))}
                                            {columnIndex === 2 && viewAllCard}
                                        </div>
                                    ))}
                                </div>
                            )
                        ) : (
                            <div className="grid grid-cols-3 items-stretch gap-3">
                                <div className="mega-menu-feature-gradient relative col-span-2 flex min-h-44 items-end overflow-hidden rounded-2xl border border-success_main/10 p-6 shadow-lg">
                                    <span className="absolute -right-8 -top-8 h-32 w-32 rounded-full border border-success_main/20 bg-success_main/10" />
                                    <div className="relative max-w-md">
                                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-success_main text-white">
                                            <BsArrowUpRight size={18} />
                                        </span>
                                        <p className="mt-4 text-lg font-bold text-primary">{activeCategory.title}</p>
                                        <p className="mt-2 text-sm leading-6 text-gray500">{activeCategory.description}</p>
                                    </div>
                                </div>
                                {viewAllCard}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Menu>
    );
};

export default ServiceMegaMenu;
