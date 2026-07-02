import React from 'react';
import { Helmet } from 'react-helmet';

const TermsAndConditions = () => {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <Helmet>
        <title>Terms & Conditions | BrokerCoreSolution</title>
      </Helmet>
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-white uppercase tracking-widest border-b border-white/10 pb-8">
          Terms & <span className="text-accent-cyan">Conditions</span>
        </h1>
        
        <div className="prose prose-invert prose-lg max-w-none space-y-8 text-gray-300">
          <p>Effective Date: January 1, 2024</p>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the BrokerCoreSolution website and services, you accept and agree to be bound by the terms and provision of this agreement. 
              In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services. 
              Any participation in this service will constitute acceptance of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Description of Services</h2>
            <p>
              BrokerCoreSolution provides various technology and consulting services for the financial sector, including but not limited to White Label trading platforms (MT4/MT5), 
              liquidity integration, CRM deployment, company incorporation, and licensing assistance. The specific terms of your engagement with us will be 
              outlined in a separate Service Agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Intellectual Property Rights</h2>
            <p>
              The Site and its original content, features, and functionality are owned by BrokerCoreSolution and are protected by international copyright, 
              trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. User Obligations</h2>
            <p>You agree to use our services only for lawful purposes. You are prohibited from using the site or its content:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>For any unlawful purpose or to solicit others to perform or participate in any unlawful acts;</li>
              <li>To violate any international, federal, provincial or state regulations, rules, laws, or local ordinances;</li>
              <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others;</li>
              <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate;</li>
              <li>To submit false or misleading information.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Limitation of Liability</h2>
            <p>
              In no event shall BrokerCoreSolution, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, 
              incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, 
              resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; 
              (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide 
              at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us at: <br/>
              <a href="https://mail.google.com/mail/u/0/?view=cm&fs=1&to=info@brokercoresolution.com" target="_blank" rel="noopener noreferrer" className="text-accent-cyan hover:underline">info@brokercoresolution.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
