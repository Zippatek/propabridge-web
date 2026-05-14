import Image from "next/image";

export const AboutMission = () => {
  return (
    <section className="container-site px-4 md:px-8">
      {/* Massive Parent Card Container */}
      <div className="bg-[#e8e6d5] rounded-[24px] p-6 lg:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          
          {/* Left Column: Text + Stats */}
          <div className="flex flex-col gap-10">
            <p className="text-[20px] md:text-[24px] text-[#001a40] leading-snug font-medium max-w-[90%]">
              Every verified listing, every safe transaction, every happy move — it all starts here. Learn how our big mission is making real estate simple, honest, and secure.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#f4f3ea] rounded-[16px] p-6 lg:p-8 flex flex-col gap-2">
                <span className="text-[#001a40] font-bold leading-none" style={{ fontSize: 'clamp(48px, 6vw, 64px)' }}>100<span className="text-[40px]">%</span></span>
                <p className="text-[#001a40]/80 text-[14px] leading-snug">Legally and physically verified properties.</p>
              </div>
              
              <div className="bg-[#f4f3ea] rounded-[16px] p-6 lg:p-8 flex flex-col gap-2">
                <span className="text-[#001a40] font-bold leading-none" style={{ fontSize: 'clamp(48px, 6vw, 64px)' }}>0<span className="text-[40px]">₦</span></span>
                <p className="text-[#001a40]/80 text-[14px] leading-snug">Inspection or registration fees for property seekers.</p>
              </div>
              
              <div className="bg-[#f4f3ea] rounded-[16px] p-6 lg:p-8 flex flex-col gap-2">
                <span className="text-[#001a40] font-bold leading-none" style={{ fontSize: 'clamp(48px, 6vw, 64px)' }}>24<span className="text-[40px]">/7</span></span>
                <p className="text-[#001a40]/80 text-[14px] leading-snug">Support from Propa, our smart AI concierge.</p>
              </div>
              
              <div className="bg-[#f4f3ea] rounded-[16px] p-6 lg:p-8 flex flex-col gap-2">
                <span className="text-[#001a40] font-bold leading-none" style={{ fontSize: 'clamp(48px, 6vw, 64px)' }}>98<span className="text-[40px]">%</span></span>
                <p className="text-[#001a40]/80 text-[14px] leading-snug">Client satisfaction rate (we&apos;re working hard on the other 2%).</p>
              </div>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="relative w-full h-full min-h-[400px] lg:min-h-full rounded-[16px] overflow-hidden">
            <Image 
              src="/images/about/about-mission-media.png"
              alt="Propabridge team working"
              fill
              className="object-cover object-center"
            />
          </div>

        </div>
      </div>
    </section>
  );
};
