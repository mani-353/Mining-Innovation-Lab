
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="text-sm">
            <span className="text-gray-500">Home</span>
            <span className="mx-2 text-gray-300">/</span>
            <span className="font-medium text-blue-600">Privacy Policy</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-sm max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Privacy Policy</h1>
          
          <div className="prose prose-blue max-w-none">
            <p>The National Mining Accident Information System (NMAIS) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">1. Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Personal Information:</strong> For authorized users of the administrative functions, we may collect names, email addresses, and professional affiliations.</li>
              <li><strong>Log Data:</strong> We automatically collect information that your browser sends whenever you visit our website, including your IP address, browser type, referring/exit pages, and date/time stamps.</li>
              <li><strong>Cookies:</strong> We use cookies to collect information and improve your experience. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</li>
              <li><strong>Usage Data:</strong> We may collect information on how the website is accessed and used, including page views, time spent on pages, and navigation paths.</li>
            </ul>
            
            <h2 className="text-xl font-bold mt-6 mb-3">2. Use of Information</h2>
            <p>We may use the collected information for various purposes, including:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>To provide and maintain our website</li>
              <li>To notify you about changes to our website</li>
              <li>To allow you to participate in interactive features when you choose to do so</li>
              <li>To monitor the usage of our website</li>
              <li>To detect, prevent, and address technical issues</li>
              <li>To improve our website based on your feedback and interactions</li>
            </ul>
            
            <h2 className="text-xl font-bold mt-6 mb-3">3. Disclosure of Information</h2>
            <p>We may disclose your information in the following situations:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Legal Requirements:</strong> To comply with a legal obligation, such as responding to a court order or government request.</li>
              <li><strong>Protection of Rights:</strong> To protect and defend the rights or property of NMAIS or NIT Rourkela.</li>
              <li><strong>Public Safety:</strong> To protect the personal safety of users of the website or the public.</li>
              <li><strong>With Your Consent:</strong> For any other purpose disclosed by us when you provide the information.</li>
            </ul>
            
            <h2 className="text-xl font-bold mt-6 mb-3">4. Data Security</h2>
            <p>The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.</p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">5. User Rights</h2>
            <p>If you are a registered user of our administrative functions, you have the right to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Access personal information we hold about you</li>
              <li>Request correction of your personal information</li>
              <li>Request deletion of your personal information</li>
              <li>Object to processing of your personal information</li>
              <li>Request restriction of processing your personal information</li>
              <li>Request transfer of your personal information</li>
              <li>Withdraw consent where we are relying on consent to process your personal information</li>
            </ul>
            
            <h2 className="text-xl font-bold mt-6 mb-3">6. Children's Privacy</h2>
            <p>Our website is not intended for use by children under the age of 18. We do not knowingly collect personally identifiable information from children under 18. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us.</p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">7. Changes to This Privacy Policy</h2>
            <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the bottom of this page.</p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">8. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <p>Department of Mining Engineering<br />National Institute of Technology Rourkela<br />Rourkela, Odisha - 769008<br />Email: mining@nitrkl.ac.in</p>
            
            <p className="mt-8">Last updated: May 27, 2025</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Privacy;
