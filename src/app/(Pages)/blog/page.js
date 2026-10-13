import { SCROLL_BACKGROUNDS } from "@/config/scrollBackgrounds";
import React from "react";

import RecentBlog from "@/widgets/RecentBlog";
import Blogs from "@/widgets/Blogs";
import { RootSection, Section } from "@/components/Section";

const Blog = () => {
    return (
        <RootSection>
            <Section bgColor={SCROLL_BACKGROUNDS.light} id={"recentblog"}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12">
                    <RecentBlog />
                </div>
            </Section>
            <Section bgColor={SCROLL_BACKGROUNDS.light} id={"blogs"}>
                <div className=" container mx-auto px-4 max-w-xl">
                    <Blogs />
                </div>
            </Section>
        </RootSection>
    );
};

export default Blog;
