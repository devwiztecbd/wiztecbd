import { SCROLL_BACKGROUNDS } from "@/config/scrollBackgrounds";
import React from "react";

import { benifits, customExpertistData, faqItems, introData, services } from "@/app/staticData/service/customSoftwer";
import { RootSection, Section } from "@/components/Section";
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
import Products from "@/widgets/Products";
import Industries from "@/widgets/Industries";
import portfolio from "/public/Json/portfolio.json";

const CustomSoftwareDevelopment = () => {
    return (
        <RootSection>
            <Section id={"customBanner"}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12">
                    <Banner subTitle={"Show Custom Software Development Service our company"} img={"/assets/images/banners/Web Dev Banner.webp"} title={"Custom Software Development Service"} description={"Transforming Complex Challenges into Seamless Software Solutions"} />
                </div>
            </Section>
            <Section id={"customIntroDesign"} bgColor={SCROLL_BACKGROUNDS.green}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12">
                    <IntroDesign bug={introData.bug} title={introData.title} img={introData.img} header={introData.header} subheader={introData.subheader} facilities={introData.facilities} buttonText={introData.buttonText} />
                </div>
            </Section>
            <Section id={"customDevelopmentServices"} bgColor={SCROLL_BACKGROUNDS.green}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12 ">
                    <Services title={services.title} description={services.description} service={services.service} />
                </div>
            </Section>
            <Section id={"customTechExpartise"} bgColor={SCROLL_BACKGROUNDS.green}>
                <div className=" container mx-auto px-4 max-w-xl py-12">
                    <TechExpartise expertistData={customExpertistData} />
                </div>
            </Section>
            <Section id={"customWorkProcess"} bgColor={SCROLL_BACKGROUNDS.green}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12">
                    <WorkProcess title="Work Process Image" img="/assets/images/service/Our-Development-Process.png" imgMob={"/assets/images/service/process-mob.svg"} alt="Work Process" />
                </div>
            </Section>
            <Section id={"customBenefits"} bgColor={SCROLL_BACKGROUNDS.green}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12">
                    <Benefits title={"Our Engagement Models "} benifits={benifits} />
                </div>
            </Section>
            <Section id="industries" bgColor={SCROLL_BACKGROUNDS.green}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12">
                    <Industries />
                </div>
            </Section>
            <Section id={"customClientsTestMonials"} bgColor={SCROLL_BACKGROUNDS.dark}>
                <div className="md:py-100 py-12 text-white">
                    <ClientsTestMonials />
                </div>
            </Section>
            <Products />
            <Section id={"customRelatedCases"}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100  py-12">
                    <RelatedCases relatedCaseStudies={portfolio.slice(0, 3)} />
                </div>
            </Section>
            <Section id={"customFaqHome"} bgColor={SCROLL_BACKGROUNDS.dark}>
                <div className="  container mx-auto px-4 max-w-xl  md:py-100 py-12 text-white">
                    <FaqHome faqItems={faqItems} />
                </div>
            </Section>
            <Section id={"customContactButton"} bgColor={SCROLL_BACKGROUNDS.light}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12">
                    <ContactButton />
                </div>
            </Section>
        </RootSection>
    );
};

export default CustomSoftwareDevelopment;
