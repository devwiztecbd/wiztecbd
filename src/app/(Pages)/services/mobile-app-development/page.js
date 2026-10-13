import { SCROLL_BACKGROUNDS } from "@/config/scrollBackgrounds";
import React from "react";

import { faqItems, introData, mobileCustomization, mobileExpertistData, mobileRedesign, mobileRedevelopment, services } from "@/app/staticData/service/mobileApp";
import Services from "@/widgets/Services";
import Banner from "@/components/Banner";
import Benefits from "@/widgets/Benefits";
import FaqHome from "@/widgets/FaqHome/indesx";
import IntroDesign from "@/widgets/IntroDesign";
import RelatedCases from "@/widgets/RelatedCases";
import TechExpartise from "@/widgets/TechExpartise";
import ContactButton from "@/components/contactbutton";
import WorkProcess from "@/components/WorkProcess";
import ClientsTestMonials from "@/widgets/ClientsTestmonials";
import { RootSection, Section } from "@/components/Section";
import { benifits } from "@/app/staticData/course";
import Products from "@/widgets/Products";
import OurFeatureProjects from "@/widgets/OurFeatureProjects";
import portfolio from "/public/Json/portfolio.json";
import Industries from "@/widgets/Industries";

const MobileAppDevelopment = () => {
    return (
        <RootSection>
            <Section id="mobileBanner">
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12">
                    <Banner subTitle={"Show Mobile App Development Service our company"} img={"/assets/images/banners/Mobile App Banner.webp"} title={"Mobile App Development Service"} description={"Building Apps That Connect, Engage, and Inspire"} />
                </div>
            </Section>
            <Section id="mobileIntroDesign" bgColor={SCROLL_BACKGROUNDS.green}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12">
                    <IntroDesign bug={introData.bug} title={introData.title} img={introData.img} header={introData.header} subheader={introData.subheader} facilities={introData.facilities} buttonText={introData.buttonText} />
                </div>
            </Section>
            <Section id="mobilDevelopmentServices" bgColor={SCROLL_BACKGROUNDS.green}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12">
                    <Services title={services.title} description={services.description} service={services.service} />
                </div>
            </Section>
            <Section id="mobileTechExpartise" bgColor={SCROLL_BACKGROUNDS.green}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12">
                    <TechExpartise expertistData={mobileExpertistData} defaultTech="mobile" />
                </div>
            </Section>
            <Section id="mobileWorkProcess" bgColor={SCROLL_BACKGROUNDS.green}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12">
                    <WorkProcess title="Work Process Image" img="/assets/images/service/Our-Development-Process.png" imgMob={"/assets/images/service/process-mob.svg"} alt="Work Process" />
                </div>
            </Section>
            {/* <Section id={"supportOurFeatureProjects5"} bgColor={SCROLL_BACKGROUNDS.green}>
                <div className="container mx-auto px-4 max-w-xl  py-12">
                    <OurFeatureProjects ourFeatureProjectsData={ourFeatureProjectsDataSupport5} />
                </div>
            </Section> */}

            <Section id={"supportOurFeatureProjects2"} bgColor={SCROLL_BACKGROUNDS.green}>
                <div className="container mx-auto px-4 max-w-xl  py-12">
                    <OurFeatureProjects reverse ourFeatureProjectsData={mobileRedesign} />
                </div>
            </Section>
            <Section id={"supportOurFeatureProjects3"} bgColor={SCROLL_BACKGROUNDS.green}>
                <div className="container mx-auto px-4 max-w-xl  py-12">
                    <OurFeatureProjects ourFeatureProjectsData={mobileCustomization} />
                </div>
            </Section>
            <Section id={"supportOurFeatureProjects4"} bgColor={SCROLL_BACKGROUNDS.green}>
                <div className="container mx-auto px-4 max-w-xl  py-12">
                    <OurFeatureProjects reverse ourFeatureProjectsData={mobileRedevelopment} />
                </div>
            </Section>
            <Section id="mobileBenefits" bgColor={SCROLL_BACKGROUNDS.green}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12">
                    <Benefits title={"Our Engagement Models "} benifits={benifits} />
                </div>
            </Section>
            <Section id="industries" bgColor={SCROLL_BACKGROUNDS.green}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12">
                    <Industries />
                </div>
            </Section>
            <Section id="mobileClientsTestMonials" bgColor={SCROLL_BACKGROUNDS.dark}>
                <div className="md:py-100 py-12 text-white">
                    <ClientsTestMonials />
                </div>
            </Section>
            <Products />
            <Section id="mobileRelatedCases">
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12 ">
                    <RelatedCases relatedCaseStudies={portfolio.slice(0, 3)} />
                </div>
            </Section>
            <Section id="mobileFaqHome" bgColor={SCROLL_BACKGROUNDS.dark}>
                <div className="  container mx-auto px-4 max-w-xl  md:py-100 py-12 text-white">
                    <FaqHome faqItems={faqItems} />
                </div>
            </Section>
            <Section id="mobileContactButton">
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12">
                    <ContactButton />
                </div>
            </Section>
        </RootSection>
    );
};

export default MobileAppDevelopment;
