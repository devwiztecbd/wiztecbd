import { SCROLL_BACKGROUNDS } from "@/config/scrollBackgrounds";
import React from "react";

import { benifits, bussinessExpertistData, faqItems } from "@/app/staticData/service/bussinessautomation";
import { introData, services } from "@/app/staticData/service/web";
import ClientsTestMonials from "@/widgets/ClientsTestmonials";
import { RootSection, Section } from "@/components/Section";
import ContactButton from "@/components/contactbutton";
import TechExpartise from "@/widgets/TechExpartise";
import portfolio from "/public/Json/portfolio.json";
import WorkProcess from "@/components/WorkProcess";
import RelatedCases from "@/widgets/RelatedCases";
import IntroDesign from "@/widgets/IntroDesign";
import FaqHome from "@/widgets/FaqHome/indesx";
import Industries from "@/widgets/Industries";
import Services from "@/widgets/Services";
import Banner from "@/components/Banner";
import Benefits from "@/widgets/Benefits";
import Products from "@/widgets/Products";

const BusinessAutomation = () => {
    return (
        <RootSection>
            <Section id={"automationBanner"}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12">
                    <Banner title={"Business Automation Software Development Service "} img={"/assets/images/banners/Business Auto Banner.webp"} description={" Future-Proof Your Business with Intelligent Automation"} />
                </div>
            </Section>
            <Section id={"automationIntroDesign"} bgColor={SCROLL_BACKGROUNDS.green}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12 ">
                    <IntroDesign bug={introData.bug} title={introData.title} img={introData.img} header={introData.header} subheader={introData.subheader} facilities={introData.facilities} buttonText={introData.buttonText} />
                </div>
            </Section>
            <Section id={"automationDevelopmentServices"} bgColor={SCROLL_BACKGROUNDS.green}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12 ">
                    <Services title={services.title} description={services.description} service={services.service} />
                </div>
            </Section>
            <Section id={"automationTechExpartise"} bgColor={SCROLL_BACKGROUNDS.green}>
                <div className=" container mx-auto px-4 max-w-xl  py-12">
                    <TechExpartise expertistData={bussinessExpertistData} />
                </div>
            </Section>
            <Section id={"automationProcess"} bgColor={SCROLL_BACKGROUNDS.green}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12">
                    <WorkProcess title="Work Process Image" img="/assets/images/service/Our-Development-Process.png" imgMob={"/assets/images/service/process-mob.svg"} alt="Work Process" />
                </div>
            </Section>
            <Section id={"automationBenefits"} bgColor={SCROLL_BACKGROUNDS.green}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12">
                    <Benefits title={"Our Engagement Models "} benifits={benifits} />
                </div>
            </Section>
            <Section id={"automationClientsTestMonials"} bgColor={SCROLL_BACKGROUNDS.dark}>
                <div className=" md:py-100 py-12 text-white">
                    <ClientsTestMonials />
                </div>
            </Section>
            <Products />
            <Section id={"automationRelatedCases"}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12 ">
                    <RelatedCases relatedCaseStudies={portfolio.slice(0, 3)} />
                </div>
            </Section>
            <Section id={"automationServedClients"} bgColor={SCROLL_BACKGROUNDS.green}>
                <div className="  container mx-auto px-4 max-w-xl md:py-100 py-12">
                    <Industries />
                </div>
            </Section>
            <Section id={"automationFaqHome"} bgColor={SCROLL_BACKGROUNDS.dark}>
                <div className=" container mx-auto px-4 max-w-xl  md:py-100 py-12 text-white">
                    <FaqHome faqItems={faqItems} />
                </div>
            </Section>
            <Section id={"automationContactButton"} bgColor={SCROLL_BACKGROUNDS.light}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12">
                    <ContactButton />
                </div>
            </Section>
        </RootSection>
    );
};

export default BusinessAutomation;
