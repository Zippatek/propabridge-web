
import Image from 'next/image';
import Link from 'next/link';

const WaitlistPage = () => {
  return (
    <div className="bg-beige min-h-screen flex items-center justify-center">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-navy mb-4">Join the Propabridge Waitlist</h1>
        <p className="text-grey-subtle mb-6">
          Be the first to know when we launch in your city. Get exclusive access to verified properties and early-bird offers.
        </p>
        <div className="mb-6">
          <Image
            src="/images/qr-placeholder.png" // Placeholder for QR code
            alt="WhatsApp QR Code"
            width={200}
            height={200}
            className="mx-auto"
          />
        </div>
        <Link href="https://chat.whatsapp.com/Fz5aPGbknm14h60aTFaz4q?mode=gi_t" passHref>
          <a
            className="inline-block bg-blue-action text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-hover transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Join our WhatsApp Group
          </a>
        </Link>
        <p className="text-xs text-grey-placeholder mt-4">
          Scan the QR code or click the link to join.
        </p>
      </div>
    </div>
  );
};

export default WaitlistPage;
