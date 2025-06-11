// AboutPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import profilePic from "../assets/images/profile.jpg";
import {
  Users,
  Rocket,
  Lightbulb,
  Code2,
  Server,
  Database,
  ShieldCheck,
  Linkedin,
  Github,
} from "lucide-react";

// Reusable Card Component
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${className}`}>
    {children}
  </div>
);

// Feature Card
const FeatureCard = ({ icon, title, description }) => (
  <Card className="p-6 flex flex-col items-start space-y-4">
    <div className="p-3 bg-teal-50 rounded-full">{icon}</div>
    <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
    <p className="text-slate-600">{description}</p>
  </Card>
);

// Features Section
const FeaturesSection = () => {
  const features = [
    {
      icon: <Users size={32} className="text-teal-600" />,
      title: "Event Organizers",
      description: "Full toolkit to create, track, and scale your technical events.",
    },
    {
      icon: <Lightbulb size={32} className="text-teal-600" />,
      title: "Industry Experts",
      description: "Monetize expertise with flexible scheduling and secure payouts.",
    },
    {
      icon: <Rocket size={32} className="text-teal-600" />,
      title: "Learning Community",
      description: "Engage, network, and grow through curated sessions.",
    },
  ];

  return (
    <section className="bg-slate-50 py-20">
  <div className="max-w-5xl mx-auto px-6 text-center mb-12">
    <h2 className="text-3xl font-bold text-slate-800 mb-4">
      What Sets <span className="text-teal-600">Us Apart</span>
    </h2>
    <p className="text-slate-600">Driven by values that make every interaction impactful and every event unforgettable.</p>
  </div>
  <div className="max-w-5xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <FeatureCard
      icon={<Lightbulb size={32} className="text-teal-600" />}
      title="Innovation First"
      description="We constantly evolve with emerging technologies to deliver cutting-edge event solutions."
    />
    <FeatureCard
      icon={<ShieldCheck size={32} className="text-teal-600" />}
      title="Trust & Security"
      description="Your data and experiences are protected with enterprise-grade security and privacy standards."
    />
    <FeatureCard
      icon={<Users size={32} className="text-teal-600" />}
      title="Community-Centric"
      description="Built around real users with feedback-driven features and inclusive collaboration tools."
    />
  </div>
</section>

  );
};

// Team Card
const TeamCard = ({ member }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transition-transform duration-300"
  >
    <img
      src={member.photo}
      alt={member.name}
      className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-teal-500"
    />
    <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
    <p className="text-sm text-teal-600 font-medium mb-2">{member.role}</p>
    <p className="text-sm text-gray-600 mb-4">{member.description}</p>
    <div className="flex gap-4">
      {member.linkedin && (
        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
          <Linkedin size={20} />
        </a>
      )}
      {member.github && (
        <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-black">
          <Github size={20} />
        </a>
      )}
    </div>
  </motion.div>
);

// Team Section
const TeamSection = () => {
  const teamMembers = [
    {
      name: "Thoutu Akshaya",
      role: "Frontend Developer",
      description: "Brings creativity and precision to the frontend—turning designs into seamless digital experiences.",
      linkedin: "https://www.linkedin.com/in/thoutu-akshaya3116",
      github: "https://github.com/thoutuakshaya",
      photo:profilePic,
    },
    {
      name: "Madhasthu Haripriya",
      role: "Backend Developer",
      description: "Architects robust backend systems with a passion for clean code and performance-first APIs.",
      linkedin: "https://www.linkedin.com/in/haripriya-madhasthu-402960346",
      github: "https://github.com/madhasthu",
      photo:profilePic,
    },
    {
      name: "Bingi Umesh",
      role: "Testing & Integration Developer",
      description: "Ensures secure, scalable data handling with expertise in databases and authentication layers.",
      linkedin: "https://www.linkedin.com/in/umesh-bingi",
      github: "https://github.com/BingiUmesh",
      photo:profilePic,
    },
    {
      name: "Pogula Rajkumar",
      role: "Full Stack Developer",
      description: "Visionary behind the platform. Merged frontend finesse with backend power to craft a solution that's fast, user-first, and future-ready.",
      linkedin: "https://www.linkedin.com/in/rajkumar-pogula",
      github: "https://github.com/rajkumarpogula15",
      photo:profilePic,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-white to-slate-100">
      <div className="max-w-6xl mx-auto px-6 text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800">
        The Minds Behind <span className="text-teal-600">Tech Event Management</span>
        </h2>
        <p className="text-gray-600 mt-2">
        Young minds building smart solutions for a connected community.
        </p>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto px-6">
        {teamMembers.map((member, index) => (
          <TeamCard key={index} member={member} />
        ))}
      </div>
    </section>
  );
};

// Tech Stack Item
const TechItem = ({ icon, name, category }) => (
  <Card className="p-4 flex flex-col items-center space-y-2">
    <div className="p-2 bg-teal-50 rounded-full">{icon}</div>
    <h5 className="text-sm font-semibold text-slate-800">{name}</h5>
    <span className="text-xs text-slate-500">{category}</span>
  </Card>
);

// Tech Stack Section
const TechStackSection = () => {
  const techStack = [
    { icon: <Code2 size={28} className="text-teal-600" />, name: "React.js", category: "Frontend" },
    { icon: <Code2 size={28} className="text-teal-600" />, name: "Tailwind CSS", category: "Styling" },
    { icon: <Server size={28} className="text-teal-600" />, name: "Node.js", category: "Backend" },
    { icon: <Server size={28} className="text-teal-600" />, name: "Express.js", category: "Framework" },
    { icon: <Database size={28} className="text-teal-600" />, name: "MongoDB", category: "Database" },
    { icon: <ShieldCheck size={28} className="text-teal-600" />, name: "JWT Auth", category: "Security" },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-5xl mx-auto px-6 text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">
          Powered by <span className="text-teal-600">Modern Tech</span>
        </h2>
        <p className="text-slate-600">Industry-leading stack for scale & security.</p>
      </div>
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {techStack.map((t, i) => <TechItem key={i} {...t} />)}
      </div>
    </section>
  );
};

// CTA Section
const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gray-900 py-20 text-white text-center">
      <div className="max-w-3xl mx-auto px-6 space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold">Ready to Elevate Your Events?</h2>
        <p className="text-lg md:text-xl opacity-90">
          Join thousands who’ve transformed their tech communities with EventHub.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-teal-600 px-6 py-3 rounded-lg font-medium hover:bg-slate-100 transition"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate("/contact")}
            className="border-2 border-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-teal-600 transition"
          >
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
};

// About Page
const AboutPage = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <main className="font-sans antialiased text-slate-700">
      <Navbar />
      {/* <FeaturesSection /> */}
      <TeamSection />
      <TechStackSection />
      <FeaturesSection />
      <CTASection />
    </main>
  );
};

export default AboutPage;
