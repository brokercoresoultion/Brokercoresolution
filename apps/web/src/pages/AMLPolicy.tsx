import React from 'react';
import { Helmet } from 'react-helmet';

const AMLPolicy = () => {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <Helmet>
        <title>AML & Compliance Policy | BrokerCoreSolution</title>
      </Helmet>
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-white uppercase tracking-widest border-b border-white/10 pb-8">
          AML & Compliance <span className="text-accent-cyan">Policy</span>
        </h1>
        
        <div className="prose prose-invert prose-lg max-w-none space-y-8 text-gray-300">
          <p>Last Updated: June 2026</p>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Core Commitment</h2>
            <p>
              BrokerCoreSolution ("BrokerCoreSolution") maintains a zero-tolerance approach toward money laundering, terrorist financing, fraud, bribery, corruption, sanctions violations, and identity misrepresentation. We are committed to maintaining the highest standards of ethical business practices and compliance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Business Nature</h2>
            <p>
              BrokerCoreSolution is strictly a technology consulting and business services company. We do not operate as a brokerage, provide financial or trading services, accept client deposits, or hold client funds. As a B2B service provider, our compliance obligations center around ensuring we conduct business with reputable entities.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Client Due Diligence (KYB/KYC)</h2>
            <p>
              Where appropriate, BrokerCoreSolution may request documentation from clients to verify their identity and legitimate business activities before entering into a formal agreement. This documentation may include:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Certificate of Incorporation or Company Registration documents</li>
              <li>Valid Business Licenses</li>
              <li>Proof of identity for authorized signatories and Ultimate Beneficial Owners (UBOs)</li>
              <li>Information regarding the source of funds for the services requested</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Sanctions Compliance</h2>
            <p>
              BrokerCoreSolution reserves the right to conduct compliance screening and will refuse to engage with individuals, entities, or jurisdictions subject to international sanctions (such as OFAC, UN, or EU sanctions) or local regulatory restrictions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Right to Refuse Service</h2>
            <p>
              BrokerCoreSolution reserves the absolute right to decline onboarding, suspend services, or terminate existing agreements immediately if requested due diligence documentation is not provided, or if we identify suspicious, unlawful, or unethical activities associated with a client.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Reporting Suspicious Activity</h2>
            <p>
              While we do not process financial transactions on behalf of retail clients, BrokerCoreSolution cooperates fully with law enforcement and regulatory agencies. If we encounter behavior that indicates financial crime or fraud, we are obligated to report such findings to the relevant authorities in our operating jurisdictions.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AMLPolicy;
