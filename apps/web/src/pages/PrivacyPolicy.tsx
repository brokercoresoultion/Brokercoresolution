import React from 'react';
import { Helmet } from 'react-helmet';

const PrivacyPolicy = () => {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <Helmet>
        <title>Privacy Policy | BrokerCoreSolution</title>
      </Helmet>
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-white uppercase tracking-widest border-b border-white/10 pb-8">
          Privacy <span className="text-accent-cyan">Policy</span>
        </h1>
        
        <div className="prose prose-invert prose-lg max-w-none space-y-8 text-gray-300">
          <p>Effective Date: January 1, 2024</p>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us, including when you use our services, 
              contact customer support, or otherwise interact with us. The types of information we may collect 
              include your name, email address, postal address, phone number, and any other information you choose to provide.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Provide, maintain, and improve our services;</li>
              <li>Process transactions and send related information;</li>
              <li>Send technical notices, updates, security alerts, and support messages;</li>
              <li>Respond to your comments, questions, and requests;</li>
              <li>Communicate about products, services, offers, and events offered by BrokerCoreSolution.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Data Security</h2>
            <p>
              We take reasonable measures to help protect information about you from loss, theft, misuse, 
              unauthorized access, disclosure, alteration, and destruction. We utilize industry-standard 
              encryption and security protocols for all data transmission and storage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Sharing of Information</h2>
            <p>We may share information about you as follows:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>With vendors, consultants, and other service providers who need access to such information to carry out work on our behalf;</li>
              <li>In response to a request for information if we believe disclosure is in accordance with, or required by, any applicable law or legal process;</li>
              <li>If we believe your actions are inconsistent with our user agreements or policies, or to protect the rights, property, and safety of BrokerCoreSolution or others;</li>
              <li>With your consent or at your direction.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at: <br/>
              <a href="https://mail.google.com/mail/u/0/?view=cm&fs=1&to=info@brokercoresolution.com" target="_blank" rel="noopener noreferrer" className="text-accent-cyan hover:underline">info@brokercoresolution.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
