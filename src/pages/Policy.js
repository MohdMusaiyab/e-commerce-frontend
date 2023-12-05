import React from 'react';
import Layout from '../components/layout/Layout';

const Policy = () => {
  return (
    <div>
      <Layout title={"Privacy Policy"} description={"Know About Us"}>
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-8">
              <h1>Privacy Policy</h1>
              <p>
                At E-commerce App, we are committed to protecting your privacy
                and ensuring the security of your personal information. This
                Privacy Policy outlines how we collect, use, and safeguard your
                data when you use our website or services.
              </p>
              <h2>Information We Collect</h2>
              <p>
                We may collect personal information, including but not limited
                to your name, email address, and contact details, when you
                create an account or make a purchase on our platform.
              </p>
              <h2>How We Use Your Information</h2>
              <p>
                We use the information we collect to provide and improve our
                services, process your orders, and communicate with you about
                promotions and updates.
              </p>
              <h2>Security Measures</h2>
              <p>
                Your data is important to us, and we implement security
                measures to protect it from unauthorized access, disclosure,
                alteration, and destruction.
              </p>
              <h2>Updates to This Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. Any
                changes will be reflected on this page, so please review it
                periodically.
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Policy;
