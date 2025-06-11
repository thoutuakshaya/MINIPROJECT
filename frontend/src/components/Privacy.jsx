import React from 'react';
import { useNavigate } from 'react-router-dom';

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <div className="relative max-w-4xl mx-auto px-6 py-16 bg-white rounded-lg shadow-md">
      {/* Go Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 right-4 flex items-center text-sm bg-blue-600 text-white px-3 py-1 rounded-md transition duration-200"
      >
        Go Back
      </button>

      <h1 className="text-3xl font-bold mb-6 text-gray-900">Privacy Policy</h1>

      <p className="mb-4 text-gray-700">
        Your privacy is important to us. This policy explains how we collect, use, and protect your personal information on Tech Event Management.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-900">1. Information We Collect</h2>
      <p className="mb-4 text-gray-700">
        We collect personal details such as name, email, phone number, and event-related information to provide and improve our services.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-900">2. How We Use Your Information</h2>
      <p className="mb-4 text-gray-700">
        Your data is used to manage events, communicate with you, provide customer support, and for analytics to enhance user experience.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-900">3. Data Sharing</h2>
      <p className="mb-4 text-gray-700">
        We do not sell your data. Information may be shared with trusted third parties like payment processors or email services only to support platform operations.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-900">4. Cookies and Tracking</h2>
      <p className="mb-4 text-gray-700">
        Our website uses cookies to enhance functionality and analyze traffic. You can control cookie preferences via your browser settings.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-900">5. Your Rights</h2>
      <p className="mb-4 text-gray-700">
        You can access, update, or request deletion of your personal information by contacting us at <a href="mailto:privacy@techeventpro.com" className="text-indigo-600 underline">privacy@techeventpro.com</a>.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-900">6. Data Security</h2>
      <p className="mb-4 text-gray-700">
        We implement security measures to protect your data from unauthorized access, alteration, or disclosure.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-900">7. Children’s Privacy</h2>
      <p className="mb-4 text-gray-700">
        Our services are not intended for children under 13. We do not knowingly collect data from minors.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-900">8. Changes to This Policy</h2>
      <p className="mb-4 text-gray-700">
        We may update this policy from time to time. Users will be notified of major changes.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-900">9. Contact Us</h2>
      <p className="mb-4 text-gray-700">
        For privacy concerns, please email us at <a href="mailto:privacy@techeventpro.com" className="text-indigo-600 underline">privacy@techeventpro.com</a>.
      </p>
      <button
        onClick={() => navigate(-1)}
        className="absolute buttom-4 right-4 flex items-center text-sm bg-blue-600 text-white px-3 py-1 rounded-md transition duration-200"
      >
        Go Back
      </button>
    </div>
  );
};

export default Privacy;
