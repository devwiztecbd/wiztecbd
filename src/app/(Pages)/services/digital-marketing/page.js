import { SCROLL_BACKGROUNDS } from "@/config/scrollBackgrounds";
import React from "react";

import Banner from "@/components/Banner";
import MarkatingPlyer from "@/widgets/MarkatinPlyer";
import BussinessGrouth from "@/widgets/BussinessGrouth";
import ClientRatting from "@/widgets/ClientRatting";
import Agencies from "@/widgets/Agencies";
import DriveServices from "@/widgets/DriveServices";
import Soluation from "@/widgets/Soluations";
import ServiceCard from "@/widgets/ServiceCard";
import ContactForm from "@/widgets/ContactForm";
import ContactInfo from "@/widgets/ContactForm/ContactInfo";
import { RootSection, Section } from "@/components/Section";
import List from "@/components/List";
import ServedClients from "@/widgets/ServedClients";
import { driveServicesData, lists, solution } from "@/app/staticData/service/marketing";
import ContactButton from "@/components/contactbutton";

const MarketingServices = () => {
    return (
        <RootSection>
            <Section id={"marketingBanner"}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12">
                    <Banner description={"Utilize targeted and data-driven strategies to grow your client base"} subTitle={"Digital Marketing Service our company"} title={"Digital Marketing Service"} img={"/assets/images/banners/Digital.webp"} />
                </div>
            </Section>
            <Section id={"marketingMarkatingPlyer"} bgColor={SCROLL_BACKGROUNDS.green}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12">
                    <MarkatingPlyer />
                </div>
            </Section>
            <Section id={"marketingClientRatting"} bgColor={SCROLL_BACKGROUNDS.green}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12">
                    <ClientRatting />
                </div>
            </Section>
            <Section id={"marketingBussinessGrouth"} bgColor={SCROLL_BACKGROUNDS.green}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12">
                    <BussinessGrouth
                        title={"How Digital Marketing Service Drive Business Growth"}
                        content1={"Digital marketing services provide businesses of all sizes with an opportunity to market their brand 24/7 at a low cost. From startups to medium-sized enterprises to multiple-location"}
                        content2={
                            "companies, a digital marketing company helps you expand your niche market reach to offer goods and services to your target customers, irrespective of time differences or location. Hiring an internet marketing agency is one of the best ways to reach your prospects while maintaining a robust relationship with your existing clients. As long as your business has a strong digital presence, your customers will always find you."
                        }
                        content3={"Since 2005, our digital marketing company has been partnering with hundreds of businesses in the United States to achieve their conversion goals. Throughout the years, we’ve provided an array of custom digital marketing services to our clients and generated the following results:"}
                        img="/assets/images/Digital Marketing Image/Digital Marketing Image 2.webp"
                        alt={"challeng"}
                    />
                </div>
            </Section>
            <Section id={"marketingAgencies"} bgColor={SCROLL_BACKGROUNDS.dark}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12 text-white">
                    <Agencies />
                </div>
            </Section>
            <Section>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12">
                    <ContactButton contact />
                </div>
            </Section>
            <Section id={"marketingDriveServices"} bgColor={SCROLL_BACKGROUNDS.green}>
                <div className=" container mx-auto px-4 max-w-xl md:pb-100 pb-12">
                    <DriveServices driveServicesData={driveServicesData} />
                </div>
            </Section>
            <Section id={"marketingSoluation"} bgColor={SCROLL_BACKGROUNDS.green}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12">
                    <Soluation solution={solution} />
                </div>
            </Section>
            <Section id={"marketingbussiness"} bgColor={SCROLL_BACKGROUNDS.green}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12">
                    <BussinessGrouth
                        title={"Why Your Business Should Be Using Digital Marketing Services"}
                        content1={" The online marketing industry is growing at an unprecedented rate. According to eMarketer, businesses in the U.S. spend more than $110 billion on digital advertising. With more companies investing their time and resources in online marketing, relying on your old advertising tactics is not enough to win over customers."}
                        content2={"Increase your sales volume and build a robust digital foundation with value-driven internet marketing services. Digital marketing helps you:"}
                        img="/assets/images/Digital Marketing Image/Digital Marketing Image 6.webp"
                        alt={"challeng2"}
                    />

                    <div className=" flex flex-col md:flex-row gap-5 md:gap-0 my-6 md:my-12">
                        <div className=" md:w-1/2">
                            <List lists={lists.slice(0, 5)} />
                        </div>
                        <div className=" md:w-1/2">
                            <List lists={lists.slice(5, 10)} />
                        </div>
                    </div>
                    <p className="text-subtitle2 text-justify">
                        A study presented by BrightTALK shows that 42 percent of marketing professionals find the lack of quality data their biggest barrier to lead generation. With the help of a trusted internet marketing company, you can gain a holistic view of your customer journey and competition. <br /> <br /> Don’t waste your investment in marketing techniques that do not deliver measurable
                        results. Partner with Thrive Internet Marketing Agency today and establish your market dominance with our targeted digital marketing solutions.
                    </p>
                </div>
            </Section>
            <Section id={"marketingServices"} bgColor={SCROLL_BACKGROUNDS.green}>
                <div className="container mx-auto px-4 max-w-xl md:py-100 py-12">
                    <div className=" mb-6 md:mb-12">
                        <BussinessGrouth
                            title={"Why Choose WiztecBD As Your DigitalMarketing Services Agency"}
                            content1={"Thrive Internet Marketing Agency is an award-winning internet marketing company that provides goal-oriented advertising solutions. Our primary focus is to help businesses increase their client retention rate and maximize conversion opportunities."}
                            content2={"Trust us to give our full commitment to your brand’s digital success. Choose Thrive and gain the following advantages (and so many more digital marketing solutions:)"}
                            img="/assets/images/Digital Marketing Image/Digital Marketing Image 7.webp"
                            alt={"challeng2"}
                        />
                    </div>
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 sm:grid-cols-2 gap-4">
                        <ServiceCard
                            title={"Data-driven Digital Marketing Services"}
                            icon={"/assets/icons/Digital Marketing/Content Creation (ImageVideo).png"}
                            description={"Research and data are essential parts of business success. Deliver the right message at the right time using the right platform with Thrive’s results-oriented digital marketing services. We analyze your brand’s strengths, weaknesses, opportunities and threats (SWOT) to create up-to-date metrics and generate actionable insights."}
                            more={false}
                        />
                        <ServiceCard
                            title={"Industry Experts"}
                            icon={"/assets/icons/Digital Marketing/Content Marketing.png"}
                            description={
                                "Thrive is composed of digital marketing professionals who have more than 10 years of industry experience. We keep track of the latest trends and innovations, develop goal-oriented strategies and ensure all our campaigns meet search engine guidelines. Whether you need support in Walmart Marketplace integration, Shopify SEO or other digital marketing solutions, we can help you."
                            }
                            more={false}
                        />
                        <ServiceCard
                            title={"Custom Digital Marketing Framework"}
                            icon={"/assets/icons/Digital Marketing/Social Media Marketing.png"}
                            description={
                                "Our internet marketing company takes a 360-degree approach to online marketing. We review your current marketing strategies and digital presence, set key performance indicators (KPIs), identify your brand personality and integrate your customer experience in all levels of your strategy-building. In doing so, we create a structured marketing framework that optimizes all your digital touchpoints."
                            }
                            more={false}
                        />
                        <ServiceCard
                            title={"Omnichannel Personalization"}
                            icon={"/assets/icons/Digital Marketing/Email Marketing.png"}
                            description={
                                "Results of a RedPoint Global survey by The Harris Poll revealed that 63 percent of consumers expect personalized brand experiences as the standard of service. At Thrive, we perform audience analyses and needs assessments to develop customized internet marketing strategies that drive more business. Omnichannel personalization increases your revenue and boosts brand loyalty."
                            }
                            more={false}
                        />
                        <ServiceCard
                            title={"Campaign Monitoring and Evaluation"}
                            icon={"/assets/icons/Digital Marketing/Marketing Consultancy & Support.png"}
                            description={
                                "How do you know if the digital marketing services work for your firm? At Thrive, we establish your campaign metrics and perform regular monitoring and evaluation to determine your strategies' success. Using Google Analytics results, we adjust your online marketing tactics and improve your approach to audience targeting to put you in a stronger financial position."
                            }
                            more={false}
                        />
                        <ServiceCard
                            title={"Competitive Pricing"}
                            icon={"/assets/icons/Digital Marketing/seo.png"}
                            description={
                                "Thrive Internet Marketing Agency is a customer-centric digital marketing company. We shape our internet marketing services based on your industry demands, online needs and financial capacity. In this way, we help you acquire the online attention you need without breaking the bank. We also provide white label services that offer huge ROI for your SEO agency."
                            }
                            more={false}
                        />
                    </div>
                </div>
            </Section>
            <Section id={"marketingclient"} bgColor={SCROLL_BACKGROUNDS.green}>
                <div className=" md:py-100 py-12 ">
                    <ServedClients title={"Awards & Recognition"} />
                </div>
            </Section>
            <Section id={"marketingform"}>
                <div className=" container mx-auto px-4 max-w-xl md:py-100 py-12 grid md:grid-cols-2 grid-cols-1 gap-16">
                    <ContactForm />
                    <ContactInfo />
                </div>
            </Section>
        </RootSection>
    );
};

export default MarketingServices;
