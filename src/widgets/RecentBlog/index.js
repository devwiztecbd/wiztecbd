"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { GoArrowRight } from "react-icons/go";
import Link from "next/link";

import ScrollAnimatedSection from "@/components/ScrollAnimationSection";
import staticBlogs from "/public/Json/blogs.json";
import { fetchBlogs } from "@/utilities/api";

const RecentBlog = () => {
    const [recentBlog, setRecentBlog] = useState(null);

    useEffect(() => {
        const fetchRecentBlog = async () => {
            try {
                const response = await fetchBlogs();
                if (response?.blogs?.length > 0) {
                    const latest = response.blogs[0];
                    // Strip HTML from content for description
                    const strippedContent = latest.content?.replace(/<[^>]*>?/gm, "").substring(0, 150) + "...";

                    setRecentBlog({
                        id: latest.id,
                        title: latest.title,
                        description: strippedContent,
                        img: latest.image,
                        readTime: `${latest.readTime} mins read`,
                        date: new Date(latest.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        }),
                    });
                } else {
                    setRecentBlog(staticBlogs[staticBlogs.length - 1]);
                }
            } catch (error) {
                console.error("Error fetching recent blog:", error);
                setRecentBlog(staticBlogs[staticBlogs.length - 1]);
            }
        };
        fetchRecentBlog();
    }, []);

    if (!recentBlog) return null;

    return (
        <div>
            <h1 className="text-H1  font-bold md:mb-12 mb-6">Recent Blog</h1>
            <div className=" flex md:gap-12 gap-5 flex-col md:flex-row items-center">
                <div className="flex flex-shrink-0  md:w-2/5 w-full justify-center items-center h-300  overflow-hidden">
                    <Image height={300} width={450} alt="project" src={recentBlog.img} className=" rounded-lg w-auto max-w-full max-h-full h-auto object-cover" />
                </div>
                <div className="md:w-3/5 w-full">
                    <div className="mb-4 w-auto inline-flex items-center gap-1 rounded-full bg-success_light p-1">
                        <span className=" rounded-full px-4 py-1 bg-success_main text-white ">Nows!</span>
                        <span className="  rounded-full px-4 py-1 ">{recentBlog.readTime || "8 mins read"}</span>
                    </div>
                    <ScrollAnimatedSection>
                        <h5 className=" text-H5 font-bold mb-10px">{recentBlog.title}</h5>
                    </ScrollAnimatedSection>
                    <ScrollAnimatedSection delay={100}>{recentBlog.description && <p className=" text-secondary py-10px md:pr-8 mb-5 ">{recentBlog.description}</p>}</ScrollAnimatedSection>
                    <ScrollAnimatedSection delay={200}>
                        <Link href={`/blog/${recentBlog.id}`} className="group flex items-center gap-4">
                            <p className=" font-semibold ">Explore More</p>
                            <div className="p-1 rounded-full border transition-transform duration-300 ease-in-out group-hover:translate-x-2">
                                <GoArrowRight className=" text-success_main" />
                            </div>
                        </Link>
                    </ScrollAnimatedSection>
                </div>
            </div>
        </div>
    );
};

export default RecentBlog;
