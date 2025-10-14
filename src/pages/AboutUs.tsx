import React from "react";
import photo from "../assets/My Photo.jpeg";

const AboutUs: React.FC = () => {
  return (
    <div className="bg-gray-50 overflow-x-hidden">
      {/* Hero Quote Section */}
      <section className="w-full py-16 flex mt-12 justify-center">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-pink-700 leading-tight">
            “Task Manager helps you take full control of your tasks, making your work organized, efficient, and stress-free.”
          </h1>
          <p className="text-lg text-gray-700 max-w-xl mx-auto">
            With it, you stay focused, meet deadlines, and achieve your goals every day.
            No more chaos — just clarity, structure, and success at your fingertips.
          </p>
        </div>
      </section>

      {/* About Me / My Mission */}
      <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-16">
        {/* Blob Image */}
        <div className="relative w-64 h-64 mx-auto animate-[blob_20s_infinite_alternate]">
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0 left-0 w-full h-full"
          >
            <path
              fill="#f472b6"
              d="M46.6,-62.3C61.3,-63.1,74.8,-51.7,82.4,-37C90,-22.4,91.9,-4.4,89,12.5C86.1,29.5,78.5,45.5,65.9,53.5C53.3,61.5,35.7,61.7,21.8,58.6C7.9,55.6,-2.4,49.4,-14.2,46.8C-26,44.1,-39.3,44.8,-48.2,39.2C-57.1,33.6,-61.5,21.5,-65.9,7.9C-70.2,-5.7,-74.5,-20.8,-70.5,-33.2C-66.4,-45.6,-54.1,-55.3,-41,-55.3C-27.8,-55.3,-13.9,-45.5,1,-47.1C15.9,-48.7,31.9,-61.6,46.6,-62.3Z"
              transform="translate(100 100)"
            />
          </svg>
          <img
            src={photo}
            alt="Profile"
            className="absolute inset-0 w-full h-full object-cover rounded-[35%]"
          />
        </div>

        {/* Mission Text */}
        <div>
          <h2 className="text-3xl font-bold text-blue-700 mb-4">My Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            My mission with Task Manager is to create a tool that empowers individuals to work smarter, 
            not harder. I believe in a world where productivity should be effortless and organization 
            should feel natural. Every feature in this project is built to make your day smoother, your 
            goals clearer, and your success inevitable.
          </p>
        </div>
      </section>

      {/* My Story */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Story Text */}
        <div className="order-2 md:order-1">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">My Story</h2>
          <h3 className="text-2xl font-semibold mb-4">
            "One developer. One idea. One goal — to make life simpler."
          </h3>
          <p className="text-gray-700 leading-relaxed">
            It started as a personal challenge: finding a better way to manage my own tasks.
            I was juggling multiple projects, deadlines, and responsibilities, and every tool I tried felt either overly complex or missing something essential.
            So I decided to build my own — a task manager that was minimal yet powerful, visually clean yet feature-rich.
            What began as a solo experiment grew into a mission to help others stay organized, productive, and stress-free.
          </p>
        </div>

        {/* Story Blob Image */}
        <div className="relative w-64 h-64 mx-auto order-1 md:order-2 animate-[blob_25s_infinite_alternate]">
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0 left-0 w-full h-full"
          >
            <path
              fill="#93c5fd"
              d="M45.6,-64.5C58.5,-59.4,69.8,-49.1,75.8,-36.4C81.8,-23.8,82.4,-8.8,79.1,5.7C75.9,20.3,68.8,34.3,58.3,45.4C47.8,56.6,33.9,64.8,18.4,68.7C2.9,72.6,-14.2,72.1,-29.6,65.5C-45,58.9,-58.8,46.2,-66.6,30.5C-74.3,14.8,-76,-4,-71.8,-20.6C-67.7,-37.2,-57.8,-51.7,-44.1,-57.6C-30.3,-63.5,-15.1,-60.8,0.9,-62C16.9,-63.2,33.8,-68.3,45.6,-64.5Z"
              transform="translate(100 100)"
            />
          </svg>
          <img
            src={photo}
            alt="Story"
            className="absolute inset-0 w-full h-full object-cover rounded-[35%]"
          />
        </div>
      </section>

      
    </div>
  );
};

export default AboutUs;
