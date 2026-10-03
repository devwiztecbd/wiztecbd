import { RootSection, Section } from "@/components/Section";
import FeaturedTrainingPortfolio from "@/widgets/FeaturedTrainingPortfolio";
import InstitutionalTraining from "@/widgets/InstitutionalTraining";
import MembershipCertification from "@/widgets/MembershipCertification";
import Training4IRFeature from "@/widgets/Training4IRFeature";
import TrainingAreas from "@/widgets/TrainingAreas";
import TrainingAudiences from "@/widgets/TrainingAudiences";
import TrainingDeliveryModel from "@/widgets/TrainingDeliveryModel";
import TrainingFinalCTA from "@/widgets/TrainingFinalCTA";
import TrainingIntroduction from "@/widgets/TrainingIntroduction";
import TrainingInquiryForm from "@/widgets/TrainingInquiryForm";
import TrainingLocations from "@/widgets/TrainingLocations";
import TrainingPartnerships from "@/widgets/TrainingPartnerships";
import TrainingProjects from "@/widgets/TrainingProjects";
import TrainingResults from "@/widgets/TrainingResults";
import TrainingStakeholders from "@/widgets/TrainingStakeholders";
import WhyChooseTraining from "@/widgets/WhyChooseTraining";
import { FiBookOpen, FiLayers, FiMapPin, FiTrendingUp, FiUsers } from "react-icons/fi";

const trainingImpact = [
    { value: "7,000+", label: "Learners Trained / Engaged", icon: FiUsers },
    { value: "15+", label: "Major Training Engagements", icon: FiBookOpen },
    { value: "15+", label: "Technology & Skill Domains", icon: FiLayers },
    { value: "15+", label: "Training Locations", icon: FiMapPin },
    { value: "Up to 90%", label: "Reported Job Placement", icon: FiTrendingUp },
];

export const metadata = {
    title: "Training Projects | WiztecBD",
    description: "Explore the technical training programs and engagements delivered by WiztecBD.",
};

const TrainingPage = () => (
    <RootSection defaultColor="#F8F9FB">
        <Section id="trainingProjectsHero" bgColor="#F8F9FB">
            <TrainingProjects displayMode="hero" />
            <div className="bg-[#F8F9FB] px-4 pb-12 md:pb-16">
                <div className="container mx-auto grid max-w-xl overflow-hidden rounded-2xl border border-divider bg-white shadow-xl sm:grid-cols-2 lg:grid-cols-5">
                    {trainingImpact.map((stat) => {
                        const Icon = stat.icon;

                        return (
                            <div key={stat.label} className="flex items-center gap-3 border-b border-divider px-5 py-5 last:border-b-0 sm:border-r lg:border-b-0 lg:last:border-r-0">
                                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-success_light text-success_deep">
                                    <Icon size={22} />
                                </span>
                                <span>
                                    <strong className="block text-xl font-bold text-success_deep md:text-2xl">{stat.value}</strong>
                                    <span className="block text-[11px] leading-4 text-gray500 md:text-xs">{stat.label}</span>
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Section>
        <Section id="trainingIntroduction" bgColor="#F2F7EC">
            <TrainingIntroduction />
        </Section>
        <Section id="trainingStakeholders" bgColor="#55594C">
            <TrainingStakeholders />
        </Section>
        <Section id="trainingAudiences" bgColor="#F8F9FB">
            <TrainingAudiences />
        </Section>
        <Section id="trainingAreas" bgColor="#F2F7EC">
            <TrainingAreas />
        </Section>
        <Section id="training4IR" bgColor="#173F31">
            <Training4IRFeature />
        </Section>
        <Section id="institutionalTraining" bgColor="#F8F9FB">
            <InstitutionalTraining />
        </Section>
        <Section id="trainingLocations" bgColor="#F7FAF4">
            <TrainingLocations />
        </Section>
        <Section id="featuredTrainingPortfolio" bgColor="#F8F9FB">
            <FeaturedTrainingPortfolio />
        </Section>
        <Section id="trainingResults" bgColor="#EEF5E9">
            <TrainingResults />
        </Section>
        <Section id="trainingDeliveryModel" bgColor="#F8F9FB">
            <TrainingDeliveryModel />
        </Section>
        <Section id="trainingPartnerships" bgColor="#55594C">
            <TrainingPartnerships />
        </Section>
        <Section id="whyChooseTraining" bgColor="#F2F7EC">
            <WhyChooseTraining />
        </Section>
        <Section id="trainingMembershipCertification" bgColor="#8BC240">
            <div className="py-14 md:py-20">
                <MembershipCertification />
            </div>
        </Section>
        <Section id="trainingInquiry" bgColor="#F8F9FB">
            <TrainingInquiryForm />
        </Section>
        <Section id="trainingFinalCTA" bgColor="#173F31">
            <TrainingFinalCTA />
        </Section>
    </RootSection>
);

export default TrainingPage;
