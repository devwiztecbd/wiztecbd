import { SCROLL_BACKGROUNDS } from "@/config/scrollBackgrounds";
import React from "react";

import { benifits, faqItems, introData, services, webExpertistData, websiteCustomization, websiteRedesign, websiteRedevelopment } from "@/app/staticData/service/web";
import Services from "@/widgets/Services";
import ClientsTestMonials from "@/widgets/ClientsTestmonials";
import { RootSection, Section } from "@/components/Section";
import FaqHome from "@/widgets/FaqHome/indesx";
import IntroDesign from "@/widgets/IntroDesign";
import RelatedCases from "@/widgets/RelatedCases";
import TechExpartise from "@/widgets/TechExpartise";
import WorkProcess from "@/components/WorkProcess";
import ContactButton from "@/components/contactbutton";
import Banner from "@/components/Banner";
import Benefits from "@/widgets/Benefits";
import Products from "@/widgets/Products";
import OurFeatureProjects from "@/widgets/OurFeatureProjects";
import portfolio from "/public/Json/portfolio.json";
import Industries from "@/widgets/Industries";

const WebsiteDevelopment = () => {
    return (
        <RootSection>
            <Section id={"webBanner"}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12">
                    <Banner subTitle={"Website Development Service our company"} title={"Website Development Service"} description={"Turning Clicks into Connections with Thoughtfully Developed Websites. Brief sentence about your unique service offerings."} img={"/assets/images/banners/Web Dev Banner.webp"} alt="website" />
                </div>
            </Section>
            <Section id={"webIntroDesign"} bgColor={SCROLL_BACKGROUNDS.green}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12">
                    <IntroDesign title={introData.title} img={introData.img} header={introData.header} subheader={introData.subheader} facilities={introData.facilities} buttonText={introData.buttonText} />
                </div>
            </Section>
            <Section id={"webDevelopmentServices"} bgColor={SCROLL_BACKGROUNDS.green}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12 ">
                    <Services title={services.title} description={services.description} service={services.service} />
                </div>
            </Section>
            <Section id={"webTechExpartise"} bgColor={SCROLL_BACKGROUNDS.green}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12">
                    <TechExpartise expertistData={webExpertistData} />
                </div>
            </Section>
            <Section id={"webWorkProcess"} bgColor={SCROLL_BACKGROUNDS.green}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12">
                    <WorkProcess title="Work Process Image" img="/assets/images/service/Our-Development-Process.png" imgMob={"/assets/images/service/process-mob.svg"} alt="Work Process" />
                </div>
            </Section>
            <Section id={"supportOurFeatureProjects2"} bgColor={SCROLL_BACKGROUNDS.green}>
                <div className="container mx-auto px-4 max-w-xl  py-12">
                    <OurFeatureProjects reverse ourFeatureProjectsData={websiteRedesign} />
                </div>
            </Section>
            <Section id={"supportOurFeatureProjects3"} bgColor={SCROLL_BACKGROUNDS.green}>
                <div className="container mx-auto px-4 max-w-xl  py-12">
                    <OurFeatureProjects ourFeatureProjectsData={websiteCustomization} />
                </div>
            </Section>
            <Section id={"supportOurFeatureProjects4"} bgColor={SCROLL_BACKGROUNDS.green}>
                <div className="container mx-auto px-4 max-w-xl  py-12">
                    <OurFeatureProjects reverse ourFeatureProjectsData={websiteRedevelopment} />
                </div>
            </Section>
            <Section id={"webBenefits"} bgColor={SCROLL_BACKGROUNDS.green}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12">
                    <Benefits benifits={benifits} title={"Our Engagement Models "} />
                </div>
            </Section>
            <Section id="industries" bgColor={SCROLL_BACKGROUNDS.green}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12">
                    <Industries />
                </div>
            </Section>
            <Section id={"webClientsTestMonials"} bgColor={SCROLL_BACKGROUNDS.dark}>
                <div className="md:py-100 py-12 text-white">
                    <ClientsTestMonials />
                </div>
            </Section>
            <Products />
            <Section id={"webRelatedCases"}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12 ">
                    <RelatedCases relatedCaseStudies={portfolio.slice(0, 3)} />
                </div>
            </Section>
            <Section id={"webFaqHome"} bgColor={SCROLL_BACKGROUNDS.dark}>
                <div className="  container mx-auto px-4 max-w-xl  md:py-100 py-12 text-white">
                    <FaqHome faqItems={faqItems} />
                </div>
            </Section>
            <Section id={"webContactButton"} bgColor={SCROLL_BACKGROUNDS.light}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12">
                    <ContactButton />
                </div>
            </Section>
        </RootSection>
    );
};

export default WebsiteDevelopment;
