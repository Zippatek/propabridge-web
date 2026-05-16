import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Propabridge',
  description: 'Read how Propabridge collects, uses, and protects your personal information when you use our property platform.',
  robots: { index: false, follow: false },
}

const PrivacyPage = () => {
  return (
    <div className="container-site section-padding">
      <h1 className="text-h1 mb-8">Privacy Policy</h1>
      <div className="prose">
        <p>Content for the Privacy Policy page will be populated here.</p>
      </div>
    </div>
  );
};

export default PrivacyPage;
