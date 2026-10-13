import { SCROLL_BACKGROUNDS } from "@/config/scrollBackgrounds";
import React from "react";

import { ecomerseExpertistData, faqItems, introData } from "@/app/staticData/service/ecomerce";
import Banner from "@/components/Banner";
import Benefits from "@/widgets/Benefits";
import FaqHome from "@/widgets/FaqHome/indesx";
import RelatedCases from "@/widgets/RelatedCases";
import TechExpartise from "@/widgets/TechExpartise";
import DreamjobEcom from "@/widgets/DreemJobsEcom";
import ContactButton from "@/components/contactbutton";
import OurFeatureProjects from "@/widgets/OurFeatureProjects";
import { RootSection, Section } from "@/components/Section";
import WorkProcess from "@/components/WorkProcess";
import ClientsTestMonials from "@/widgets/ClientsTestmonials";
import IntroDesign from "@/widgets/IntroDesign";
import { benifits } from "@/app/staticData/service/web";
import Products from "@/widgets/Products";
import portfolio from "/public/Json/portfolio.json";

const EcommercePlatform = () => {
    return (
        <RootSection>
            <Section id={"ecomerseBanner"}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12">
                    <Banner subTitle={"E-commerce Platform Service our company"} title={"E-commerce Platform Development Services"} description={"We deliver exceptional E-commerce experiences to bring out the favorable business outcomes"} img={"/assets/images/banners/ecomers.webp"} />
                </div>
            </Section>
            <Section id={"automationIntroDesign"} bgColor={SCROLL_BACKGROUNDS.green}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12">
                    <IntroDesign bug={introData.bug} title={introData.title} img={introData.img} header={introData.header} subheader={introData.subheader} facilities={introData.facilities} buttonText={introData.buttonText} />
                </div>
            </Section>
            <Section id={"ecomerseDreamjobEcom"} bgColor={SCROLL_BACKGROUNDS.green}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12">
                    <DreamjobEcom />
                </div>
            </Section>
            <Section id={"ecomerseTechExpartise"} bgColor={SCROLL_BACKGROUNDS.green}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12">
                    <TechExpartise expertistData={ecomerseExpertistData} />
                </div>
            </Section>
            <Section id={"ecomerseWorkProcess"} bgColor={SCROLL_BACKGROUNDS.green}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12">
                    <WorkProcess title="Work Process Image" img="/assets/images/service/Our-Development-Process.png" imgMob={"/assets/images/service/process-mob.svg"} alt="Work Process" />
                </div>
            </Section>
            <Section id={"ecomerseBenefits"} bgColor={SCROLL_BACKGROUNDS.green}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12">
                    <Benefits benifits={benifits} title={"Our Engagement Models "} />
                </div>
            </Section>
            <Section id={"ecomerseClientsTestMonials"} bgColor={SCROLL_BACKGROUNDS.dark}>
                <div className="md:py-100 py-12 text-white">
                    <ClientsTestMonials />
                </div>
            </Section>
            <Products />
            <Section id={"ecomerseRelatedCases"}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12 ">
                    <RelatedCases relatedCaseStudies={portfolio.slice(0, 3)} />
                </div>
            </Section>
            <Section id={"ecomerseFaqHome"} bgColor={SCROLL_BACKGROUNDS.dark}>
                <div className="  container mx-auto px-4 max-w-xl  md:py-100 py-12 text-white">
                    <FaqHome faqItems={faqItems} />
                </div>
            </Section>
            <Section id={"ecomerseContactButton"} bgColor={SCROLL_BACKGROUNDS.light}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12">
                    <ContactButton />
                </div>
            </Section>
        </RootSection>
    );
};

export default EcommercePlatform;
