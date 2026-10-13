import { SCROLL_BACKGROUNDS } from "@/config/scrollBackgrounds";
import React from "react";

import { ourFeatureProjectsDataSupport1, ourFeatureProjectsDataSupport6 } from "@/app/staticData/service/support";
import Banner from "@/components/Banner";
import ContactButton from "@/components/contactbutton";
import { RootSection, Section } from "@/components/Section";
import OurFeatureProjects from "@/widgets/OurFeatureProjects";
import ScrollAnimatedSection from "@/components/ScrollAnimationSection";

const SupportMaintenance = () => {
    return (
        <RootSection>
            <Section id={"supportBanner"}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12">
                    <Banner subTitle={"Support & Maintenance Service our company"} title={"Support & Maintenance Service"} description={"Turning Clicks into Connections with Thoughtfully Developed WebsitesBrief sentence about your unique service offerings."} img={"/assets/images/banners/Support.webp"} />
                </div>
            </Section>
            <Section id={"supportOurFeatureProjects1"} bgColor={SCROLL_BACKGROUNDS.green}>
                <div className="container mx-auto px-4 max-w-xl  py-12">
                    <ScrollAnimatedSection>
                        <h1 className=" text-H1 font-bold mb-16 text-center">Our E-commerce Platform Development Services</h1>
                    </ScrollAnimatedSection>
                    <OurFeatureProjects linkAdd={"/developers"} ress ourFeatureProjectsData={ourFeatureProjectsDataSupport1} />
                </div>
            </Section>

            <Section id={"supportOurFeatureProjects6"} bgColor={SCROLL_BACKGROUNDS.green}>
                <div className="container mx-auto px-4 max-w-xl  py-12">
                    <OurFeatureProjects reverse ourFeatureProjectsData={ourFeatureProjectsDataSupport6} />
                </div>
            </Section>
            <Section id={"supportContact"}>
                <div className=" container mx-auto px-4 max-w-xl  py-12">
                    <ContactButton />
                </div>
            </Section>
        </RootSection>
    );
};

export default SupportMaintenance;
