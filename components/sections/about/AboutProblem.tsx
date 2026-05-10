import Image from "next/image";

export const AboutProblem = () => {
  return (
    <section className="container-site px-4 md:px-8">
      <div className="flex flex-col gap-12 items-center">
        <h2 className="text-display-lg text-center text-heading font-medium max-w-4xl">
          Looking for a home? You&apos;ve probably been here before...
        </h2>
        
        <div className="relative w-full max-w-5xl aspect-video md:aspect-[21/9] rounded-[24px] overflow-hidden">
          <Image 
            src="/images/about/about-problem-media.png"
            alt="Frustrated man looking at laptop"
            fill
            className="object-cover object-center"
          />
          {/* Dark gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-12 flex flex-col items-center justify-end text-center gap-3">
            {[
              "Paid ₦15,000 just to view a flat that didn't exist",
              "Endless scrolling through fake or outdated listings.",
              "Paying \"inspection fees\" to quack agents for houses you don't even like.",
              "Hidden agency charges and confusing paperwork.",
              "Missed chances because no one followed up"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-2 text-white/90 text-[14px] md:text-[16px] font-medium">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M16 16s-1.5-2-4-2-4 2-4 2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-[#001a40] text-[16px] md:text-[18px] leading-[1.6] max-w-4xl mx-auto font-medium">
          We get it — and that&apos;s exactly why we built Propabridge. Our mission is to make real estate safe again. We verify the details, guide you with honesty, and keep the process simple — so you can focus on the joy of finding a place that truly feels like home.
        </p>
      </div>
    </section>
  );
};
