import Image from "next/image";

export const AboutCompany = () => {
  return (
    <section className="container-site px-4 md:px-8">
      {/* Divider */}
      <div className="w-full h-px bg-[#001a40]/30 mb-12"></div>
      {/* Label */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-2 h-2 rounded-[2px] bg-[#001a40]"></div>
        <span className="text-[#001a40] text-[12px] font-semibold tracking-wide">COMPANY BACKGROUND</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Left Column */}
        <div className="flex flex-col gap-8">
          <h2 className="text-display-lg text-heading font-medium">
            A verified property bridge helping buyers, renters, and investors find inspected homes across Nigeria.
          </h2>
          <div className="relative w-full aspect-video rounded-[24px] overflow-hidden bg-[#001a40]">
            <video
              src="/images/A trusted property bridge helping.mp4"
              className="h-full w-full object-cover object-center"
              autoPlay
              muted
              loop
              playsInline
              controls={false}
              preload="metadata"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-8">
          <div className="bg-[#e8e6d5] rounded-[24px] p-8 md:p-10 flex flex-col gap-8">
            <p className="text-[#001a40] text-[20px] md:text-[24px] leading-[1.4] font-medium">
              &quot;We built Propabridge because Nigerians deserve to find homes with excitement, not fear. &apos;Zero fees, Zero fears&apos; isn&apos;t just our slogan; it&apos;s our promise.&quot;
            </p>
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0">
                <Image 
                  src="/images/about/about-aminu.png"
                  alt="Aminu S. Muhammad"
                  fill
                  sizes="64px"
                  className="object-cover object-center"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[#001a40] text-[22px] italic font-serif leading-none mb-1">Aminu S. Muhammad</span>
                <span className="text-[#001a40]/70 text-[10px] font-bold tracking-wider uppercase">Co-Founder, Propabridge</span>
              </div>
            </div>
          </div>
          
          <p className="text-[#001a40]/80 text-[16px] leading-[1.7]">
            Founded by Tech and Real Estate professionals, Propabridge combines deep industry ethics with modern AI technology. We depart from the broken traditional market of quack agents. Instead, we aggregate only legally and physically verified properties from genuine landlords and developers. Whether you&apos;re searching for your dream home or looking to sell, we&apos;re here to guide you with clarity, trust, and proven expertise.
          </p>
        </div>
      </div>
    </section>
  );
};
