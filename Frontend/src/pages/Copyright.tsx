
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Copyright = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="text-sm">
            <span className="text-gray-500">Home</span>
            <span className="mx-2 text-gray-300">/</span>
            <span className="font-medium text-blue-600">Copyright Policy</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-sm max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Copyright Policy</h1>
          
          <div className="prose prose-blue max-w-none">
            <p>The National Mining Accident Information System (NMAIS) is committed to respecting intellectual property rights and complying with copyright laws. This Copyright Policy outlines the terms governing the use of content available on our website.</p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">1. Ownership</h2>
            <p>All content on the NMAIS website, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, data compilations, and software, is the property of the Department of Mining Engineering, NIT Rourkela, or its content suppliers and is protected by Indian and international copyright laws.</p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">2. Government Data</h2>
            <p>Some data presented on NMAIS is derived from government sources and may be subject to specific terms of use. Such data is used in compliance with the guidelines provided by the respective governmental bodies.</p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">3. Permitted Use</h2>
            <p>Users may:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Access and view the content on NMAIS for personal, non-commercial use</li>
              <li>Download or print content for personal, educational, or research purposes</li>
              <li>Use data and information in academic publications, presentations, or reports with proper attribution</li>
            </ul>
            
            <h2 className="text-xl font-bold mt-6 mb-3">4. Restrictions</h2>
            <p>Users may not:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Reproduce, duplicate, copy, sell, or exploit any content from NMAIS for commercial purposes without express written permission</li>
              <li>Modify, create derivative works, distribute, or publicly display content from NMAIS without express written permission</li>
              <li>Remove any copyright, trademark, or other proprietary notices from any content</li>
              <li>Transfer content to another person or "mirror" the content on any other server</li>
            </ul>
            
            <h2 className="text-xl font-bold mt-6 mb-3">5. Attribution Requirements</h2>
            <p>When using data or information from NMAIS in publications, presentations, or other materials, proper attribution must be provided as follows:</p>
            <p className="bg-gray-50 p-3 border-l-4 border-blue-500 italic">"Source: National Mining Accident Information System, Department of Mining Engineering, NIT Rourkela."</p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">6. Third-Party Content</h2>
            <p>NMAIS may include content provided by third parties. Such content remains the property of the respective third parties and is subject to their copyright terms and conditions.</p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">7. Images and Media</h2>
            <p>All photographs, videos, and other media on NMAIS are either owned by NIT Rourkela, used with permission, or used under appropriate licenses. Users may not download, reproduce, or distribute such media without express permission.</p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">8. Permission Requests</h2>
            <p>For permission to use content from NMAIS beyond what is allowed in this policy, please contact:</p>
            <p>Department of Mining Engineering<br />National Institute of Technology Rourkela<br />Rourkela, Odisha - 769008<br />Email: mining@nitrkl.ac.in</p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">9. Copyright Infringement</h2>
            <p>If you believe that your work has been copied in a way that constitutes copyright infringement on NMAIS, please provide our copyright agent with the following information:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>A description of the copyrighted work that you claim has been infringed</li>
              <li>A description of where the material that you claim is infringing is located on NMAIS</li>
              <li>Your contact information, including address, telephone number, and email address</li>
              <li>A statement by you that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law</li>
              <li>A statement by you, made under penalty of perjury, that the above information in your notice is accurate and that you are the copyright owner or authorized to act on the copyright owner's behalf</li>
            </ul>
            
            <h2 className="text-xl font-bold mt-6 mb-3">10. Changes to Copyright Policy</h2>
            <p>We reserve the right to update or modify this Copyright Policy at any time without prior notice. Changes will be effective immediately upon posting on NMAIS.</p>
            
            <p className="mt-8">Last updated: May 27, 2025</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Copyright;
