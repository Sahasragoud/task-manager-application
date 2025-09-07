import React, { useState, useEffect } from "react";
import hero1 from "../assets/Sign up-bro.png";
import hero2 from "../assets/Developer activity-bro.svg";
import hero3 from "../assets/Mobile Marketing-rafiki.png";
import aboutImg from "../assets/About us page-amico.png";
import { useNavigate } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import LoginPopup from "../forms/Login";
const slides = [
  {
    title: "Manage Your Tasks Effortlessly",
    description:
      "No more sticky notes, scattered files, or mental overload. With our intuitive task dashboard, you can add, prioritize, and categorize tasks in seconds. Whether it’s a big project or a simple to-do list, everything stays in one clean, easy-to-navigate space",
    imageUrl: hero1,
  },
  {
    title: "Stay ahead with seamless task management designed for productivity.",
    description:
      "Never miss a deadline again. Our smart reminders adapt to your schedule, ensuring you get notified at the right moment, not hours after you’ve already forgotten. It’s like having a personal assistant who’s always one step ahead.",
    imageUrl: hero2,
  },
  {
    title: "Get Detailed Reports",
    description:
      "Stay on top of deadlines without the constant check-ins. Our progress tracking gives you visual updates, letting you see what’s completed, what’s pending, and where your team needs a push — all in real time.Analyze task completion rates and improve workflow efficiency.",
    imageUrl: hero3,
  },
];

const faqs = [
  {
    question: "Is Task Manager free to use?",
    answer:
      "Yes! Task Manager offers a free plan with all the essential features to help you stay organized. You can upgrade anytime for advanced features.",
  },
  {
    question: "Can I access my tasks on mobile?",
    answer:
      "Absolutely. Task Manager is fully responsive and works seamlessly on any device — desktop, tablet, or phone.",
  },
  {
    question: "Do you offer team collaboration features?",
    answer:
      "Yes. You can create projects, assign tasks, and track progress with your team in real-time.",
  },
  {
    question: "Is my data secure?",
    answer:
      "We take security seriously. Your data is encrypted and stored securely using industry-standard practices.",
  },
];

const HeroCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isLogin, setIsLogin] = useState(false);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-screen px-4 bg-gray-50">
      {/* Hero Carousel */}
      <div className="flex flex-col md:flex-row items-center bg-gray-100 min-h-[400px] p-8 rounded-lg shadow-md w-full mx-auto overflow-hidden">
        {/* Left: Text */}
        <div className="md:w-1/2 text-center md:text-left transition-all duration-500">
          <h2 className="text-3xl font-bold mb-4 text-blue-700 animate-fadeIn">
            {slides[current].title}
          </h2>
          <p className="text-gray-700 mb-6 animate-fadeIn delay-100">
            {slides[current].description}
          </p>
          <button
            onClick={() => setIsLogin(true)} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
          >
            Get Started
          </button>
        </div>

        {/* Right: Image */}
        <div className="md:w-1/2 mt-6 md:mt-0 h-96 relative overflow-hidden rounded-lg shadow-lg">
          <img
            src={slides[current].imageUrl}
            alt={slides[current].title}
            key={slides[current].imageUrl}
            className="w-full h-full object-contain animate-float fade-image"
          />
        </div>
      </div>

      {/* About Us with Blob */}
      <div className="flex flex-col md:flex-row items-center bg-gray-100 min-h-[400px] p-8 rounded-lg shadow-md w-full mx-auto mt-10">
        {/* Blob image */}
        <div className="relative w-80 h-80 flex-shrink-0">
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0 left-0 w-full h-full"
          >
            <path
              fill="#93c5fd"
              d="M39.9,-63.6C53.3,-56.7,67,-46,73.5,-32.4C80,-18.7,79.2,-2.1,73.1,12.3C67.1,26.6,55.8,38.8,43,49.1C30.1,59.5,15,68.1,-0.2,68.3C-15.4,68.5,-30.8,60.4,-43.1,49.5C-55.3,38.6,-64.4,25,-69.4,9.1C-74.3,-6.9,-75.1,-24.2,-66.9,-36.5C-58.6,-48.8,-41.3,-56.1,-25.3,-62.3C-9.3,-68.6,5.4,-73.8,18.2,-72.5C30.9,-71.3,41.8,-63.5,39.9,-63.6Z"
              transform="translate(100 100)"
            />
          </svg>
          <img
            src={aboutImg}
            alt="About us"
            className="absolute inset-0 w-full h-full object-contain"
          />
        </div>

        {/* About text */}
        <div className="md:w-1/2 text-center md:text-left md:ml-10">
          <h2 className="text-2xl font-bold mb-4 text-blue-700">About Us</h2>
          <p className="text-gray-700 mb-6">
            We are a passionate team dedicated to building tools that simplify
            your work life. At Task Manager, we believe productivity should be
            effortless and enjoyable. Our goal is to provide a reliable platform
            that helps individuals and teams stay organized and focused. With
            continuous innovation, we strive to deliver features that truly make
            a difference. Together, we’re committed to empowering you to achieve
            more every day.
          </p>
          <button
            onClick={() => navigate("/about-us")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
          >
            View More
          </button>
        </div>
      </div>

      {/* Reviews */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-blue-700 mb-10">
            What People Say
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                text: "This task manager completely changed the way I work — now I hit deadlines without stress.",
                author: "— Sarah L.",
                color: "bg-pink-50 text-pink-700",
                delay: "delay-100",
              },
              {
                text: "It’s clean, easy to use, and surprisingly powerful. The perfect tool for busy people.",
                author: "— Daniel K.",
                color: "bg-blue-50 text-blue-700",
                delay: "delay-200",
              },
              {
                text: "I’ve tried dozens of productivity apps, but this one just clicks with how I think.",
                author: "— Priya M.",
                color: "bg-green-50 text-green-700",
                delay: "delay-300",
              },
            ].map((review, index) => (
              <div
                key={index}
                className={`${review.color.split(" ")[0]} p-6 rounded-2xl shadow hover:shadow-lg transition transform hover:-translate-y-1 hover:scale-105 animate-slideUp ${review.delay}`}
              >
                <p className="text-gray-700 italic mb-4">{`“${review.text}”`}</p>
                <h4 className={`font-bold ${review.color.split(" ")[1]}`}>
                  {review.author}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-blue-700 mb-10 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow hover:shadow-md transition"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center p-5 text-left focus:outline-none"
                >
                  <span className="text-lg font-semibold text-gray-800">
                    {faq.question}
                  </span>
                  <ChevronDownIcon
                    className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? "max-h-40 p-5 pt-0" : "max-h-0"
                  }`}
                >
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LoginPopup isOpen={isLogin} onClose={() => setIsLogin(false)} onLoginSuccess={(loggedUser) => {
    localStorage.setItem("user", JSON.stringify(loggedUser));}} />
    </div>
  );
};

export default HeroCarousel;
