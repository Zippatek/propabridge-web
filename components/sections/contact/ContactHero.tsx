export const ContactHero = () => {
  return (
    <section className="container-site px-4 md:px-8 pt-16 pb-12 text-center">
      {/* Badge */}
      <div className="inline-flex items-center gap-3 bg-[#eae9e0] border  rounded-[8px] px-5 py-2 mb-8">
        <span className="w-2 h-2 rounded-[2px] bg-[#001a40] shrink-0"></span>
        <span className="text-[#001a40] text-[12px] font-semibold tracking-widest uppercase">Contacts</span>
        <span className="w-2 h-2 rounded-[2px] bg-[#001a40] shrink-0"></span>
      </div>

      {/* Heading */}
      <h1 className="text-display-xl text-heading font-medium max-w-4xl mx-auto">
        We&apos;d love to hear from you<br />
        (seriously, we actually reply)
      </h1>
    </section>
  );
};
