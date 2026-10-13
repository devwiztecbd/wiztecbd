import { SCROLL_BACKGROUNDS } from "@/config/scrollBackgrounds";
import React from "react";

import { benifitsCources, introData, trainingData, trainingData2 } from "@/app/staticData/course";
import ScrollAnimatedSection from "@/components/ScrollAnimationSection";
import OurCourses from "@/widgets/OurCourses";
import MasterSkills from "@/widgets/MasterSkills";
import PopularCourses from "@/widgets/PopularCourses";
import Benefits from "@/widgets/Benefits";
import IntroDesign from "@/widgets/IntroDesign";
import Training from "@/widgets/Training";
import ContactButton from "@/components/contactbutton";
import { RootSection, Section } from "@/components/Section";
import ImageURL from "@/components/ImageUrl";

const Courses = () => {
    return (
        <RootSection>
            <Section id={"course"} bgColor={SCROLL_BACKGROUNDS.green}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12">
                    <OurCourses />
                </div>
            </Section>
            <Section id={"popularCourse"} bgColor={SCROLL_BACKGROUNDS.dark}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12 text-white">
                    <PopularCourses />
                </div>
            </Section>
            <Section id={"introDesign"} bgColor={SCROLL_BACKGROUNDS.dark}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12 text-white">
                    <IntroDesign title={introData.title} img={introData.img} header={introData.header} subheader={introData.subheader} facilities={introData.facilities} buttonText={introData.buttonText} />
                </div>
            </Section>
            <Section id={"benefits"} bgColor={SCROLL_BACKGROUNDS.green}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12">
                    <Benefits benifits={benifitsCources} title={"Your Gateway to Care IT Mastery"} />
                </div>
            </Section>
            <Section id={"masterSkills"} bgColor={SCROLL_BACKGROUNDS.dark}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12 text-white">
                    <MasterSkills />
                </div>
            </Section>
            <Section id={"working"} bgColor={SCROLL_BACKGROUNDS.dark}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12 text-white">
                    <ScrollAnimatedSection>
                        <h1 className=" text-H1 font-bold md:mb-12 mb-6 text-center">Working With Us</h1>
                    </ScrollAnimatedSection>
                    <div className=" grid grid-cols-4 gap-4">
                        <ScrollAnimatedSection delay={800}>
                            <div className="flex items-center w-full  justify-center flex-shrink-0 h-12 mr-8 hover:scale-110 transition-transform duration-300">
                                <ImageURL image="/assets/images/client/1.webp" height={48} width={150} alt="client1" />
                            </div>
                        </ScrollAnimatedSection>
                        <ScrollAnimatedSection delay={600}>
                            <div className="flex items-center w-full  justify-center flex-shrink-0 h-12 mr-8 hover:scale-110 transition-transform duration-300">
                                <ImageURL image="/assets/images/client/8.webp" height={48} width={150} alt="client2" />
                            </div>
                        </ScrollAnimatedSection>
                        <ScrollAnimatedSection delay={400}>
                            <div className="flex items-center w-full  justify-center flex-shrink-0 h-12 mr-8 hover:scale-110 transition-transform duration-300">
                                <ImageURL image="/assets/images/client/33.webp" height={48} width={150} alt="client3" />
                            </div>
                        </ScrollAnimatedSection>
                        <ScrollAnimatedSection delay={200}>
                            <div className="flex items-center w-full  justify-center flex-shrink-0 h-12 mr-8 hover:scale-110 transition-transform duration-300">
                                <ImageURL image="/assets/images/client/48.webp" height={48} width={150} alt="client4" />
                            </div>
                        </ScrollAnimatedSection>
                    </div>
                </div>
            </Section>
            <Section id={"computer"} bgColor={SCROLL_BACKGROUNDS.dark}>
                <div className=" container mx-auto px-4 max-w-xl md:pt-100 pt-12 mb-12 text-white">
                    <Training title={trainingData.title} subTitle={trainingData.subTitle} organaization={trainingData.organaization} trainees={trainingData.trainees} duration={trainingData.duration} location={trainingData.location} sliderIImg={trainingData.sliderImage} />
                </div>
            </Section>
            <Section id={"mobile"} bgColor={SCROLL_BACKGROUNDS.dark}>
                <div className=" container mx-auto px-4 max-w-xl md:pt-100 pt-12 mb-12 text-white">
                    <Training title={trainingData2.title} subTitle={trainingData2.subTitle} organaization={trainingData2.organaization} trainees={trainingData2.trainees} duration={trainingData2.duration} location={trainingData2.location} sliderIImg={trainingData2.sliderImage} />
                </div>
            </Section>
            <Section id={"contactButton"}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12">
                    <ContactButton />
                </div>
            </Section>
        </RootSection>
    );
};

export default Courses;
