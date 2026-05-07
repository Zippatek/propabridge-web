import Image from "next/image";
import Link from "next/link";

const cards = [
  {
    title: "Get a Smart Property Valuation opinion",
    description: "Find out what your property is actually worth — backed by real market data and expert analysis",
    cta: "GET VALUATION",
    href: "/sell",
    image: "https://storage.googleapis.com/propabridge-listings-us/properties/mixed-residential-estate-—-the-promenade-estate-lokogoma-abuja/047dc1f48f8d.webp",
  },
  {
    title: "List your property with us",
    description: "Submit your property details and we'll verify, photograph, and list it across our verified buyer network.",
    cta: "SUBMIT PROPERTY",
    href: "/submit-property",
    image: "https://storage.googleapis.com/propabridge-listings-us/properties/well-finished-4-bedroom-terrace-duplex-with-self-contained-bq/00325858fb27.webp",
  },
  {
    title: "Chat With Propa Now",
    description: "Our AI concierge is available 24/7 on web and WhatsApp. Fastest way to find what you need.",
    cta: "TALK TO PROPA",
    href: "https://wa.me/2348090892219",
    image: "https://storage.googleapis.com/propabridge-listings-us/properties/millenium-city-kaduna-babban-saura/1b787d3f61d9.webp",
  },
];

export const ContactCTACards = () => {
  return (
    <section className="container-site px-4 md:px-8 pb-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="relative rounded-[16px] overflow-hidden group"
            style={{ minHeight: "420px" }}
          >
            {/* Background Image */}
            <Image
              src={card.image}
              alt={card.title}
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-between p-6 lg:p-8">
              {/* Title — top left */}
              <h3 className="text-white font-semibold text-[20px] lg:text-[22px] leading-snug max-w-[85%]">
                {card.title}
              </h3>

              {/* Description + CTA — bottom left */}
              <div className="flex flex-col gap-4">
                <p className="text-white/90 text-[14px] leading-[1.6]">
                  {card.description}
                </p>
                <Link
                  href={card.href}
                  className="inline-flex items-center gap-2 text-white text-[14px] font-bold tracking-widest uppercase hover:gap-3 transition-all duration-200"
                >
                  {card.cta}
                  <span className="text-[18px]">&rsaquo;</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
