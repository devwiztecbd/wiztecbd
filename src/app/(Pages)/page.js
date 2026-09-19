import HerroBanner from "@/widgets/HerroBanner";
import ScrollAnimatedSection from "@/components/ScrollAnimationSection";
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
import { homeMetaData } from "../staticData/data";
const { benifits } = require("../staticData/course");
import Products from "@/widgets/Products";

export const metadata = homeMetaData;

const HOME_BACKGROUNDS = {
    green: "#8BC240",
    dark: "#55594C",
};

const Home = () => {
    return (
        <RootSection defaultColor={HOME_BACKGROUNDS.green} transitionDuration={1800}>
            <Section bgColor={HOME_BACKGROUNDS.green}>
                <HerroBanner />
            </Section>
            <Section id="overview" bgColor={HOME_BACKGROUNDS.green} className={"md:hidden"}>
                <div className="md:py-100 py-12 ">
                    <OverViews />
                </div>
            </Section>
            <Section id="serveClient" bgColor={HOME_BACKGROUNDS.dark} className="relative isolate overflow-hidden">
                <div className="py-14 md:py-20">
                    <ServedClients title="Our Delighted Clients" />
                </div>
            </Section>
            <Section id="Services" bgColor={HOME_BACKGROUNDS.green}>
                <div className="container mx-auto max-w-xl px-4 py-12 md:py-100">
                    <OurServices />
                </div>
            </Section>
            <Section id="trainingProjects" bgColor={HOME_BACKGROUNDS.dark}>
                <TrainingProjects />
            </Section>
            <Section id="choose" bgColor={HOME_BACKGROUNDS.dark}>
                <div className=" container mx-auto px-4 max-w-xl md:pt-100 md:pb-0 py-12 text-white">
                    <Benefits benifits={benifits} title={"Why Choose Us?"} />
                </div>
            </Section>
            <Section id="findBest-home" bgColor={HOME_BACKGROUNDS.green}>
                <div className=" container mx-auto px-4 max-w-2xl md:pt-100 md:pb-0 py-12">
                    <OurProcess />
                </div>
            </Section>
            <Section id="testmonials" bgColor={HOME_BACKGROUNDS.dark}>
                <div className="md:pt-100 md:pb-0 py-12 text-white">
                    <ClientsTestMonials />
                </div>
            </Section>
            <Section id="golobalClient" bgColor={HOME_BACKGROUNDS.green}>
                <div className=" container mx-auto px-4 max-w-xl md:pt-100 md:pb-0 py-12">
                    <GlobalClients />
                </div>
            </Section>
            <Section id="techPowerhome" bgColor={HOME_BACKGROUNDS.green} className="relative isolate overflow-hidden">
                <div className="py-14 md:py-20">
                    <TechPower />
                </div>
            </Section>
            <Section id="industries" bgColor={HOME_BACKGROUNDS.dark}>
                <div className=" container mx-auto px-4 max-w-xl md:pt-100 md:pb-0 py-12 text-white">
                    <Industries />
                </div>
            </Section>
            <Section id="membershipCertification" bgColor={HOME_BACKGROUNDS.green}>
                <div className="py-14 md:py-20">
                    <MembershipCertification />
                </div>
            </Section>
            <ScrollAnimatedSection delay={200}>
                <div className=" md:mb-12 mb-6 md:pt-100">
                    <h2 className=" text-center text-H1  font-bold mb-2 text-white">Our Feature Projects</h2>
                </div>
            </ScrollAnimatedSection>
            <Products backgroundColors={[HOME_BACKGROUNDS.green, HOME_BACKGROUNDS.dark]} />
            <Section id="ourCaseStudies" bgColor={HOME_BACKGROUNDS.dark}>
                <div className=" text-white container mx-auto px-4 max-w-xl  md:pt-100 md:pb-0 py-12">
                    <OurCaseStudies />
                </div>
            </Section>

            <Section id="contactform" bgColor="#F8F9FB">
                <div className=" container mx-auto px-4 max-w-xl md:pt-100 md:pb-50 py-12 grid md:grid-cols-2 grid-cols-1 gap-16">
                    <ContactForm />
                    <ContactInfo />
                </div>
            </Section>
        </RootSection>
    );
};

export default Home;
