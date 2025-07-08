
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="text-sm">
            <span className="text-gray-500">Home</span>
            <span className="mx-2 text-gray-300">/</span>
            <span className="font-medium text-blue-600">Terms & Conditions</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-sm max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Terms & Conditions</h1>
          
          <div className="prose prose-blue max-w-none">
            <p>Welcome to the National Mining Accident Information System. These Terms and Conditions govern your use of our website and the services we offer. By accessing or using our website, you agree to be bound by these Terms.</p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">1. Definitions</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>"NMAIS"</strong> refers to the National Mining Accident Information System website and platform.</li>
              <li><strong>"User"</strong> refers to any individual or entity accessing or using the NMAIS.</li>
              <li><strong>"Content"</strong> refers to all information, data, text, graphics, and other materials available on NMAIS.</li>
            </ul>
            
            <h2 className="text-xl font-bold mt-6 mb-3">2. Acceptance of Terms</h2>
            <p>By accessing NMAIS, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree with any part of these Terms, you must not use NMAIS.</p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">3. Use of the System</h2>
            <p>NMAIS is provided for informational and educational purposes related to mining accidents and safety in India. Users may:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Access and view data and visualizations related to mining accidents</li>
              <li>Use the information for research, educational, or safety improvement purposes</li>
              <li>Download publicly available reports and resources</li>
            </ul>
            
            <h2 className="text-xl font-bold mt-6 mb-3">4. Restrictions</h2>
            <p>Users may not:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Use NMAIS for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to any part of NMAIS</li>
              <li>Modify, adapt, or hack NMAIS or modify another website to falsely imply association with NMAIS</li>
              <li>Use NMAIS to transmit any malicious code or interfere with its functionality</li>
              <li>Harvest or collect information about other users without their consent</li>
            </ul>
            
            <h2 className="text-xl font-bold mt-6 mb-3">5. Data Accuracy</h2>
            <p>While we strive to ensure the accuracy of all data and information presented on NMAIS, we cannot guarantee its complete accuracy, timeliness, or reliability. The data is provided "as is" and should be verified with official sources before being used for critical decision-making.</p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">6. Intellectual Property</h2>
            <p>All content on NMAIS, including but not limited to text, graphics, logos, icons, images, data compilations, and software, is the property of the Department of Mining Engineering, NIT Rourkela, and is protected by Indian and international copyright laws.</p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">7. Attribution</h2>
            <p>When using data or information from NMAIS for publications, presentations, or other public dissemination, proper attribution must be given to "National Mining Accident Information System, NIT Rourkela."</p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">8. Disclaimer of Warranties</h2>
            <p>NMAIS is provided on an "as is" and "as available" basis. We make no warranties, expressed or implied, regarding the operation of NMAIS or the information, content, or materials included on NMAIS.</p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">9. Limitation of Liability</h2>
            <p>In no event shall NMAIS, NIT Rourkela, or any of its affiliates be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in any way connected with the use of NMAIS.</p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">10. Governing Law</h2>
            <p>These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.</p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">11. Changes to Terms</h2>
            <p>We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on NMAIS. Your continued use of NMAIS after the posting of revised Terms constitutes acceptance of the changes.</p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">12. Contact Information</h2>
            <p>If you have any questions about these Terms, please contact us at:</p>
            <p>Department of Mining Engineering<br />National Institute of Technology Rourkela<br />Rourkela, Odisha - 769008<br />Email: mining@nitrkl.ac.in</p>
            
            <p className="mt-8">Last updated: May 27, 2025</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Terms;
