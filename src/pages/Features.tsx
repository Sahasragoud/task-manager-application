import React from "react";
import { FaTasks, FaUsers, FaChartLine, FaBell, FaShieldAlt } from "react-icons/fa";

const features = [
  {
    title: "Organize Tasks Easily",
    description: "Create, categorize, and prioritize your tasks effortlessly.",
    icon: <FaTasks className="text-pink-600" size={50} />,
  },
  {
    title: "Collaborate with Teams",
    description: "Assign tasks, share updates, and work together in real time.",
    icon: <FaUsers className="text-blue-600" size={50} />,
  },
  {
    title: "Track Progress",
    description: "Get clear insights with visual progress tracking and reports.",
    icon: <FaChartLine className="text-green-600" size={50} />,
  },
  {
    title: "Stay Notified",
    description: "Get timely reminders so you never miss a deadline.",
    icon: <FaBell className="text-yellow-500" size={50} />,
  },
  {
    title: "Secure & Reliable",
    description: "Your data is safe with top-grade encryption and backups.",
    icon: <FaShieldAlt className="text-purple-600" size={50} />,
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-700">
          Why Choose Our Task Manager?
        </h2>

        <div className="space-y-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center ${
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Card */}
              <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-6 hover:shadow-lg transition-all duration-300 md:w-2/3">
                <div className="flex-shrink-0">{feature.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
