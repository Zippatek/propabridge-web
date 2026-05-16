import { ContactHero } from "@/components/sections/contact/ContactHero";
import { ContactCTACards } from "@/components/sections/contact/ContactCTACards";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { ContactOffices } from "@/components/sections/contact/ContactOffices";
import { ContactMap } from "@/components/sections/contact/ContactMap";

export const metadata = {
  title: "Contact Us | Propabridge",
  description:
    "Get in touch with the Propabridge team. Reach us in Abuja, Kaduna or Minna — or chat with Propa, our AI concierge, 24/7 on WhatsApp.",
  keywords: [
    'contact Propabridge', 'Propabridge Abuja office', 'Nigeria real estate contact',
    'property inquiry Nigeria', 'chat with Propa AI',
  ],
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f4f3ea]">
      {/* Background grid pattern */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      <div className="relative z-10">
        <ContactHero />
        <ContactCTACards />
        <ContactForm />
        <ContactOffices />
      </div>
      <div className="relative z-10 w-full">
        <ContactMap />
      </div>
    </main>
  );
}
