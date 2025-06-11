import React from 'react';

const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 bg-white rounded-lg shadow-md">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 right-4 flex items-center text-sm bg-blue-600 text-white px-3 py-1 rounded-md transition duration-200"
      >
        Go Back
      </button>
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Terms of Service</h1>

      <p className="mb-4 text-gray-700">
        Welcome to Tech Event Management. By accessing or using our platform, you agree to comply with and be bound by the following terms and conditions.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-900">1. User Responsibilities</h2>
      <p className="mb-4 text-gray-700">
        Users agree to use the platform responsibly, without engaging in any harmful or unlawful activities. You must not spam, harass, or misuse the platform in any way.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-900">2. Account Management</h2>
      <p className="mb-4 text-gray-700">
        Users are responsible for maintaining the confidentiality of their account credentials. We reserve the right to suspend or terminate accounts violating our policies.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-900">3. Event Hosting & Participation</h2>
      <p className="mb-4 text-gray-700">
        Organizers and attendees agree to follow guidelines for hosting and participating in events. The platform does not guarantee the success or quality of any event.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-900">4. Content Ownership</h2>
      <p className="mb-4 text-gray-700">
        Users retain ownership of their submitted content but grant us a license to use it for platform operations and promotion.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-900">5. Limitation of Liability</h2>
      <p className="mb-4 text-gray-700">
        Tech Event Management is not liable for any damages resulting from platform use or inability to access services.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-900">6. Changes to Terms</h2>
      <p className="mb-4 text-gray-700">
        We reserve the right to update these terms. Users will be notified of significant changes.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-900">7. Contact</h2>
      <p className="mb-4 text-gray-700">
        For questions regarding these terms, please contact us at <a href="mailto:support@techeventpro.com" className="text-indigo-600 underline">support@techeventpro.com</a>.
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

export default Terms;
