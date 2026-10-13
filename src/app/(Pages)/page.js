import { SCROLL_BACKGROUNDS } from "@/config/scrollBackgrounds";
import HerroBanner from "@/widgets/HerroBanner";
import { RootSection, Section } from "@/components/Section";
import OurProcess from "@/widgets/OurProcess";
import OverViews from "@/widgets/OverViews";
import ServedClients from "@/widgets/ServedClients";
import MembershipCertification from "@/widgets/MembershipCertification";
import OurServices from "@/widgets/OurServices";
import TrainingProjects from "@/widgets/TrainingProjects";
import Benefits from "@/widgets/Benefits";
import ClientsTestMonials from "@/widgets/ClientsTestmonials";
import GlobalClients from "@/widgets/GlobalClients";
import TechPower from "@/widgets/TechPower";
import Industries from "@/widgets/Industries";
import OurCaseStudies from "@/widgets/FeaturedProjects";
import ContactForm from "@/widgets/ContactForm";
import ContactInfo from "@/widgets/ContactForm/ContactInfo";
import SoftwareProjects from "@/widgets/SoftwareProjects";
import { homeMetaData } from "../staticData/data";
const { benifits } = require("../staticData/course");

export const metadata = homeMetaData;

const Home = () => {
    return (
        <RootSection defaultColor={SCROLL_BACKGROUNDS.green} transitionDuration={1800}>
            <Section bgColor={SCROLL_BACKGROUNDS.green}>
                <HerroBanner />
            </Section>
            <Section id="overview" bgColor={SCROLL_BACKGROUNDS.green} className={"md:hidden"}>
                <div className="md:py-100 py-12 ">
                    <OverViews />
                </div>
            </Section>
            <Section id="serveClient" bgColor={SCROLL_BACKGROUNDS.dark} className="relative isolate overflow-hidden">
                <div className="py-14 md:py-20">
                    <ServedClients title="Our Delighted Clients" />
                </div>
            </Section>
            <Section id="Services" bgColor={SCROLL_BACKGROUNDS.green}>
                <div className="container mx-auto max-w-xl px-4 py-12 md:py-100">
                    <OurServices />
                </div>
            </Section>
            <Section id="trainingProjects" bgColor={SCROLL_BACKGROUNDS.dark}>
                <TrainingProjects />
            </Section>
            <Section id="choose" bgColor={SCROLL_BACKGROUNDS.dark}>
                <div className=" container mx-auto px-4 max-w-xl md:pt-100 md:pb-0 py-12 text-white">
                    <Benefits benifits={benifits} title={"Why Choose Us?"} />
                </div>
            </Section>
            <Section id="findBest-home" bgColor={SCROLL_BACKGROUNDS.green}>
                <div className=" container mx-auto px-4 max-w-2xl md:pt-100 md:pb-0 py-12">
                    <OurProcess />
                </div>
            </Section>
            <Section id="testmonials" bgColor={SCROLL_BACKGROUNDS.dark}>
                <div className="md:pt-100 md:pb-0 py-12 text-white">
                    <ClientsTestMonials />
                </div>
            </Section>
            <Section id="golobalClient" bgColor={SCROLL_BACKGROUNDS.green}>
                <div className=" container mx-auto px-4 max-w-xl md:pt-100 md:pb-0 py-12">
                    <GlobalClients />
                </div>
            </Section>
            <Section id="techPowerhome" bgColor={SCROLL_BACKGROUNDS.green} className="relative isolate overflow-hidden">
                <div className="py-14 md:py-20">
                    <TechPower />
                </div>
            </Section>
            <Section id="industries" bgColor={SCROLL_BACKGROUNDS.dark}>
                <div className=" container mx-auto px-4 max-w-xl md:pt-100 md:pb-0 py-12 text-white">
                    <Industries />
                </div>
            </Section>
            <Section id="membershipCertification" bgColor={SCROLL_BACKGROUNDS.green}>
                <div className="py-14 md:py-20">
                    <MembershipCertification />
                </div>
            </Section>
            <Section id="softwareProjects" bgColor={SCROLL_BACKGROUNDS.dark}>
                <SoftwareProjects />
            </Section>
            <Section id="ourCaseStudies" bgColor={SCROLL_BACKGROUNDS.dark}>
                <div className=" text-white container mx-auto px-4 max-w-xl  md:pt-100 md:pb-0 py-12">
                    <OurCaseStudies />
                </div>
            </Section>

            <Section id="contactform" bgColor={SCROLL_BACKGROUNDS.light}>
                <div className=" container mx-auto px-4 max-w-xl md:pt-100 md:pb-50 py-12 grid md:grid-cols-2 grid-cols-1 gap-16">
                    <ContactForm />
                    <ContactInfo />
                </div>
            </Section>
        </RootSection>
    );
};

export default Home;
