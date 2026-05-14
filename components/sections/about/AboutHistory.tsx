'use client';
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll } from "framer-motion";

export const AboutHistory = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const timelineData = [
    {
      year: "2023",
      title: "The idea sparked",
      description: "We saw the pains of house-hunting in Nigeria—the stress, the fake agents, the wasted money. With a shared dream of transparency, we set out to build a platform that protects seekers and rewards genuine property owners.",
      image: "/images/about/history-idea-sparked.png",
    },
    {
      year: "2024",
      title: "The breakthrough",
      description: "We introduced the \"Zero Fees, Zero Fears\" model. By removing registration and viewing fees, we instantly brought trust back to the people.",
      image: "/images/about/history-breakthrough.png",
    },
    {
      year: "2025",
      title: "Embracing AI technology",
      description: "We launched \"Propa,\" our intelligent AI assistant, making property matching faster than ever. Clients could now find, filter, and book verified homes from their phones in seconds.",
      image: "/images/about/history-embracing-ai.png",
    },
    {
      year: "2026",
      title: "Still growing, still grounded",
      description: "Today, we continue doing what we love — connecting genuine buyers with genuine sellers. Because for us, every closed deal is more than a transaction; it's a story of trust restored.",
      image: "/images/about/history-still-growing.png",
    }
  ];

  return (
    <section className="container-site px-4 md:px-8">
      {/* Divider */}
      <div className="w-full h-px bg-[#001a40]/30 mb-12"></div>
      {/* Label */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-2 h-2 rounded-[2px] bg-[#001a40]"></div>
        <span className="text-[#001a40] text-[12px] font-semibold tracking-wide">OUR HISTORY</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
        {/* Left Column - Sticky Heading */}
        <div className="lg:w-1/2">
          <div className="sticky top-24 pr-4 lg:pr-12">
            <h2 className="text-display-lg text-heading font-medium max-w-[800px]">
              Our journey to a better real estate market.
            </h2>
          </div>
        </div>

        {/* Right Column - Timeline */}
        <div className="lg:w-1/2 relative" ref={containerRef}>
          {/* Continuous vertical line (Background) */}
          <div className="absolute left-0 top-6 bottom-0 w-[2px] bg-[#001a40]/10 z-0 hidden sm:block"></div>
          
          {/* Motion indicator (Foreground) */}
          <motion.div 
            className="absolute left-0 top-6 bottom-0 w-[2px] bg-[#001a40] z-10 hidden sm:block origin-top"
            style={{ scaleY: scrollYProgress }}
          ></motion.div>

          <div className="flex flex-col gap-16 lg:gap-24">
            {timelineData.map((item, index) => (
              <div key={index} className="relative sm:pl-16 lg:pl-20">
                
                {/* Node and Connector */}
                <div className="hidden sm:flex absolute left-[-15px] top-[2px] items-center z-20">
                  <div className="w-8 h-8 rounded-full bg-[#f4f3ea] border-[3px] border-[#001a40] flex items-center justify-center relative shrink-0">
                    {/* Inner dot */}
                    <motion.div 
                      className="w-3 h-3 rounded-full bg-[#001a40]"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: false, margin: "-50% 0px -50% 0px" }}
                      transition={{ duration: 0.3 }}
                    ></motion.div>
                  </div>
                  {/* Dotted horizontal line connecting node to the badge */}
                  <div className="w-[49px] lg:w-[65px] border-t-2 border-dashed border-[#001a40]/40"></div>
                </div>

                {/* Mask to hide vertical line below the last node */}
                {index === timelineData.length - 1 && (
                  <div className="absolute left-[-1px] top-[34px] bottom-[-500px] w-[4px] bg-[#f4f3ea] z-[15] hidden sm:block"></div>
                )}

                {/* Badge */}
                <div className="inline-block bg-[#001a40] text-white text-[15px] font-bold px-4 py-1.5 rounded-lg mb-4 relative z-20 tracking-wide">
                  {item.year}
                </div>

                {/* Card Container */}
                <div className="bg-[#e8e6d5] rounded-[24px] p-6 lg:p-10 w-full transition-shadow relative z-20">
                  <h3 className="text-[#001a40] text-[24px] lg:text-[28px] font-medium leading-tight mb-4 truncate">{item.title}</h3>
                  <p className="text-[#001a40]/80 text-[13px] lg:text-[14px] leading-[1.6] mb-6 lg:mb-8 line-clamp-4">
                    {item.description}
                  </p>
                  
                  <div className="relative w-full aspect-[4/3] sm:aspect-[4/3] lg:aspect-[4/3] rounded-[16px] overflow-hidden">
                    <Image 
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

