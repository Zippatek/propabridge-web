export const AboutDifferences = () => {
  return (
    <section className="container-site px-4 md:px-8">
      {/* Divider */}
      <div className="w-full h-px bg-[#001a40]/30 mb-12"></div>
      {/* Label */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-2 h-2 rounded-[2px] bg-[#001a40]"></div>
        <span className="text-[#001a40] text-[12px] font-semibold tracking-wide">OUR DIFFERENCES</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        {/* Left Column */}
        <div>
          <h2 className="text-display-lg text-heading font-medium">
            We've built our name on integrity, technology, and results that speak for themselves — no gimmicks, no pressure.
          </h2>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-8">
          <div className="flex items-start gap-4">
            <svg className="w-6 h-6 text-[#001a40] shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
            <div className="flex flex-col">
              <h4 className="text-[#001a40] font-bold text-[16px]">Verified Trust</h4>
              <p className="text-[#001a40]/70 text-[15px]">Every property is checked. No fake photos</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <svg className="w-6 h-6 text-[#001a40] shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
            <div className="flex flex-col">
              <h4 className="text-[#001a40] font-bold text-[16px]">Zero Upfront Fees</h4>
              <p className="text-[#001a40]/70 text-[15px]">No registration or inspection fees.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <svg className="w-6 h-6 text-[#001a40] shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
            <div className="flex flex-col">
              <h4 className="text-[#001a40] font-bold text-[16px]">Smart Simplicity</h4>
              <p className="text-[#001a40]/70 text-[15px]">Powered by AI for easy searches, fast tours</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <svg className="w-6 h-6 text-[#001a40] shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
            <div className="flex flex-col">
              <h4 className="text-[#001a40] font-bold text-[16px]">Expertise</h4>
              <p className="text-[#001a40]/70 text-[15px]">Founded by certified professionals who truly know the market value.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <svg className="w-6 h-6 text-[#001a40] shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            <div className="flex flex-col">
              <h4 className="text-[#001a40] font-bold text-[16px]">Results</h4>
              <p className="text-[#001a40]/70 text-[15px]">Fast closings, satisfied happy clients.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
