import React from 'react';
import { Helmet } from 'react-helmet';

const RefundPolicy = () => {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <Helmet>
        <title>Refund & Cancellation Policy | BrokerCoreSolution</title>
      </Helmet>
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-white uppercase tracking-widest border-b border-white/10 pb-8">
          Refund & Cancellation <span className="text-accent-cyan">Policy</span>
        </h1>
        
        <div className="prose prose-invert prose-lg max-w-none space-y-8 text-gray-300">
          <p>Last Updated: June 2026</p>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. General Overview</h2>
            <p>
              At BrokerCoreSolution, we strive to ensure absolute clarity regarding the services we provide and the financial commitments involved. This Refund and Cancellation Policy outlines the terms governing refunds, cancellations, and service termination for our consulting, technology implementation, website development, and CRM solutions.
            </p>
            <p className="mt-4">
              By engaging BrokerCoreSolution for any service, clients agree to the terms set forth in this policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. B2B Service Nature</h2>
            <p>
              Given the business-to-business (B2B) nature of our bespoke technology and consulting services, much of the work involves dedicated time, specialized expertise, and immediate deployment of resources. Therefore, all sales and service agreements are generally considered final once work has commenced or software/licenses have been provisioned.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Cancellation Terms</h2>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Prior to Commencement:</strong> If a cancellation request is received and approved before any resources have been allocated or work has begun, a refund may be issued, subject to administrative fees.</li>
              <li><strong>Work in Progress:</strong> If a project is cancelled while in progress, the client will be billed for all work completed up to the point of cancellation. Any pre-payments exceeding the value of the completed work may be refunded at our discretion.</li>
              <li><strong>Third-Party Costs:</strong> Any costs incurred by BrokerCoreSolution on behalf of the client for third-party services (e.g., software licenses, hosting, vendor fees) are strictly non-refundable.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Refund Process</h2>
            <p>
              Any eligible refunds will be processed using the original method of payment within 14-30 business days from the date the refund is approved. Please note that international wire transfer fees or currency exchange rate fluctuations are the responsibility of the client.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Contact Us</h2>
            <p>
              If you wish to request a cancellation or have questions about a potential refund, please contact your dedicated account manager or email us directly at <strong>enquiry@brokercoresolution.com</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
