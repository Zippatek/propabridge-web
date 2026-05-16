import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | Propabridge',
  description: 'Read the terms and conditions governing your use of the Propabridge property platform.',
  robots: { index: false, follow: false },
}

const TermsPage = () => {
  return (
    <div className="container-site section-padding">
      <h1 className="text-h1 mb-8">Terms of Service</h1>
      <div className="prose">
        <p>Content for the Terms of Service page will be populated here.</p>
      </div>
    </div>
  );
};

export default TermsPage;
