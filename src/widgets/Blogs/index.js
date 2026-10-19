"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import ScrollAnimatedSection from "@/components/ScrollAnimationSection";
import staticBlogs from "/public/Json/blogs.json";
import Button from "@/components/Button";
import Blog from "../blog";
import { fetchBlogs as getBlogsApi } from "@/utilities/api";

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [visibleItems, setVisibleItems] = useState(6);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await getBlogsApi();
                if (response?.blogs) {
                    const mappedBlogs = response.blogs.map((blog) => ({
                        id: blog.id,
                        title: blog.title,
                        img: blog.image,
                        artical: blog.expertises?.[0]?.name || "Article",
                        date: new Date(blog.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        }),
                        description: blog.content?.replace(/<[^>]*>?/gm, "") || "",
                    }));
                    setBlogs(mappedBlogs);
                } else {
                    setBlogs(staticBlogs);
                }
            } catch (error) {
                console.error("Error fetching blogs:", error);
                setBlogs(staticBlogs);
            }
        };
        fetchBlogs();
    }, []);

    const loadMoreItems = () => {
        setVisibleItems((prev) => prev + 6);
    };

    return (
        <div className="md:py-100 py-12">
            <ScrollAnimatedSection>
                <h1 className="text-H1  text-center md:text-start font-bold mb-4">Our Recent Articals</h1>
                <p className=" text-secondary md:mb-6 mb-4  text-center md:text-start">Stay informed with Our Ineight</p>
            </ScrollAnimatedSection>
            <div className=" grid lg:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-4 mb-6 md:mb-12">
                {blogs.slice(0, visibleItems).map((card) => (
                    <Link href={`/blog/${card.id}`} key={card.id}>
                        <Blog img={card.img} artical={card.artical} date={card.date} title={card.title} description={card.description} />
                    </Link>
                ))}
            </div>
            <div className=" flex justify-end">
                {visibleItems < blogs.length && <Button onClick={loadMoreItems}>Load More</Button>}
            </div>
        </div>
    );
};

export default Blogs;
