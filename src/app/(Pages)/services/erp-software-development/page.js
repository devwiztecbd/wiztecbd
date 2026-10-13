import { SCROLL_BACKGROUNDS } from "@/config/scrollBackgrounds";
import React from "react";

import Banner from "@/components/Banner";
import Benefits from "@/widgets/Benefits";
import Services from "@/widgets/Services";
import FaqHome from "@/widgets/FaqHome/indesx";
import IntroDesign from "@/widgets/IntroDesign";
import RelatedCases from "@/widgets/RelatedCases";
import ContactButton from "@/components/contactbutton";
import WorkProcess from "@/components/WorkProcess";
import ClientsTestMonials from "@/widgets/ClientsTestmonials";
import TechExpartise from "@/widgets/TechExpartise";
import { benifits, expertistData, faqItems, introData, services } from "@/app/staticData/service/erp";
import portfolio from "/public/Json/portfolio.json";
import { RootSection, Section } from "@/components/Section";
import Industries from "@/widgets/Industries";
import Products from "@/widgets/Products";

const ERPSoftwareDevelopment = () => {
    return (
        <RootSection>
            <Section id={"erpBanner"}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12">
                    <Banner subTitle={"ERP Software Development Service our company"} title={"ERP Software Development Service"} description={"Empowering Businesses with Fully Integrated ERP Solutions"} img={"/assets/images/banners/ERP bannar.webp"} />
                </div>
            </Section>
            <Section id={"erpIntroDesign"} bgColor={SCROLL_BACKGROUNDS.green}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12">
                    <IntroDesign title={introData.title} img={introData.img} header={introData.header} subheader={introData.subheader} facilities={introData.facilities} buttonText={introData.buttonText} />
                </div>
            </Section>
            <Section id={"erpDevelopmentServices"} bgColor={SCROLL_BACKGROUNDS.dark}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12 text-white">
                    <Services title={services.title} description={services.description} service={services.service} />
                </div>
            </Section>
            <Section id={"erpBenefits"} bgColor={SCROLL_BACKGROUNDS.green}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12">
                    <Benefits title={"ERP Development Type"} benifits={benifits} />
                </div>
            </Section>
            <Section id={"erpServedClients"} bgColor={SCROLL_BACKGROUNDS.green}>
                <div className="  container mx-auto px-4 max-w-xl md:py-100 py-12">
                    <Industries />
                </div>
            </Section>
            <Section id={"erpTechExpartise"} bgColor={SCROLL_BACKGROUNDS.green}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12">
                    <TechExpartise expertistData={expertistData} />
                </div>
            </Section>
            <Section id={"erpWorkProcess"} bgColor={SCROLL_BACKGROUNDS.green}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12">
                    <WorkProcess title="Work Process Image" img="/assets/images/service/Our-Development-Process.png" imgMob={"/assets/images/service/process-mob.svg"} alt="Work Process" />
                </div>
            </Section>

            <Section id={"erpClientsTestMonials"} bgColor={SCROLL_BACKGROUNDS.green}>
                <div className="py-12 md:py-100">
                    <ClientsTestMonials />
                </div>
            </Section>
            <Products />
            <Section id={"erpRelatedCases"}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12 ">
                    <RelatedCases relatedCaseStudies={portfolio.slice(0, 3)} />
                </div>
            </Section>
            <Section id={"erpFaqHome"} bgColor={SCROLL_BACKGROUNDS.dark}>
                <div className="  container mx-auto px-4 max-w-xl  md:py-100 py-12 text-white">
                    <FaqHome faqItems={faqItems} />
                </div>
            </Section>
            <Section id={"erpFaqHome"} bgColor={SCROLL_BACKGROUNDS.light}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12">
                    <ContactButton />
                </div>
            </Section>
        </RootSection>
    );
};

export default ERPSoftwareDevelopment;
