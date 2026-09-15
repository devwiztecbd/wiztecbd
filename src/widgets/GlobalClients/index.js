import Image from "next/image";

const GlobalClients = () => {
    return (
        <>
            <div className=" md:mb-12 mb-6">
                <h2 className=" text-center text-H1 font-bold md:mb-12 mb-6">Clients Beyond Borders</h2>
                <div className="flex items-center justify-center md:h-370 h-300">
                    <Image
                        src="/assets/images/maps/Group 1000007270.png"
                        alt="World map showing WiztecBD's global client reach"
                        width={1171}
                        height={643}
                        sizes="(max-width: 768px) 100vw, 1140px"
                        loading="eager"
                        className="max-h-full h-auto max-w-full w-auto object-contain"
                    />
                </div>
            </div>
        </>
    );
};

export default GlobalClients;
