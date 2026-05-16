import type { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'
import RecentListings from '@/components/sections/RecentListings'
import LocationSection from '@/components/sections/LocationSection'
import ServicesSection from '@/components/sections/ServicesSection'
import WhyPropabridge from '@/components/sections/WhyPropabridge'
import WhyChooseUs from '@/components/sections/WhyChooseUs'
import HowItWorks from '@/components/sections/HowItWorks'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import BlogsSection from '@/components/sections/BlogsSection'
import FAQSection from '@/components/sections/FAQSection'

export const metadata: Metadata = {
  title: 'Propabridge — The Smartest Way to Rent, Buy and Invest in Properties in Nigeria',
  description:
    'Find verified properties in Abuja, Kaduna, and Minna. Zero inspection fees. Zero fake listings. Physical + legal verification on every listing.',
}

const FAQ_ITEMS = [
  { question: 'How do I know the listings are real and up to date?', answer: "We verify every property before it goes live on our site and update them regularly to avoid wasting your time. That means no fake homes, no expired rentals, and no confusing duplicates. When you see a property here, you can trust that it's real and available." },
  { question: 'Are there really no inspection fees?', answer: 'None. Zero. The practice of charging tenants to view a house is exploitative, and we refuse to do it. Search, chat with Propa, and view properties completely free. We only earn a standard commission when you successfully find and sign for a property.' },
  { question: "Why don't I see which agent listed the property?", answer: 'Because that is how we protect you. In the traditional market, you are gambling on whether the person behind a listing is real. On Propabridge, you deal with us — a registered company that has already done the verification. We manage the agent relationship in the background so you never have to.' },
  { question: 'Can you help me sell my current home?', answer: "Yes! We don't just list homes — we help you get the best price. Our services include professional valuation, staging tips, photography, marketing campaigns, and handling offers. We'll guide you from the very first consultation until the day you hand over the keys." },
  { question: 'How do you verify the properties?', answer: "Our team physically visits every property before it goes live. We check that the photos match reality, sight the original title documents, verify ownership, and sign a binding agreement with the property owner. If it hasn't passed all of this — it doesn't appear on our platform." },
  { question: 'How does Propa work?', answer: "Just chat with her — on our website or WhatsApp. Tell her what you need in plain language. She searches our verified database instantly, presents the best matches, and can book you a viewing right in the conversation. No forms. No waiting. Just answers." },
  { question: 'How much commission do you charge?', answer: "Our commission rates vary depending on the property type and service you need, but we're always transparent. No hidden fees, no surprise charges — we'll explain everything upfront so you know exactly what you're paying for and why." },
  { question: 'Can you help me get a mortgage or loan?', answer: "Yes! We work with a network of verified lenders and mortgage brokers. While we don't give out loans ourselves, we connect you with the right people, explain your financing options, and help you understand the paperwork." },
  { question: "I'm a landlord or developer. How do I list with you?", answer: "Visit the 'Submit Property' page and fill in your details. We'll contact you, conduct our verification, and once approved, we upload and market your property across our platform. You deal only with us — no chaotic open-agent model." },
  { question: 'How are you different from PropertyPro or Nigeria Property Centre?', answer: "They are open marketplaces — anyone can list. We are a curated platform — only verified properties from vetted sources are uploaded, by our team, under our name. On those platforms, fraud risk is yours. Here, it's ours." },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'Propabridge',
  url: 'https://propabridge.com',
  logo: 'https://propabridge.com/logo-circle.jpg',
  description:
    'Buy, rent, or invest in verified properties across Nigeria. No fake listings. No inspection fees.',
  areaServed: ['Abuja', 'Kaduna', 'Minna', 'Nigeria'],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'NG',
    addressRegion: 'FCT',
    addressLocality: 'Abuja',
  },
  sameAs: [
    'https://www.instagram.com/propabridge',
    'https://www.linkedin.com/company/propabridge',
  ],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HeroSection />
      <RecentListings />
      <LocationSection />
      <ServicesSection />
      <WhyPropabridge />
      <WhyChooseUs />
      <HowItWorks />
      <TestimonialsSection />
      <BlogsSection />
      <FAQSection />
    </>
  )
}
