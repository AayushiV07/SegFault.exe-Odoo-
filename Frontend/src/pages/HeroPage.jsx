
import React from "react";
import { useNavigate } from "react-router-dom";

const HeroPage = () => {
  const navigate = useNavigate();

  return (
    
    <div className="w-full h-screen overflow-y-scroll scroll-smooth">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-white shadow-md sticky top-0 z-50">
        <div className="text-2xl font-bold text-indigo-600">SkillHive</div>
        <button
          onClick={() => navigate("/login")}
          className="text-sm text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded"
        >
          Login
        </button>
      </nav>

      {/* Section 1 - Join Now */}
      <section className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-100 to-white">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-6 text-indigo-700">
          Swap Skills, Build Community
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-6 text-center max-w-xl">
          Discover a world of skills, connect with talented individuals, and grow together.
        </p>
        <button
          onClick={() => navigate("/signup")}
          className="bg-indigo-600 text-white px-6 py-3 rounded-full text-lg hover:bg-indigo-700 transition"
        >
          Join Now
        </button>
      </section>

      {/* Section 2 - What We Do */}
      <section className="h-screen flex flex-col justify-center items-center bg-white">
        <h2 className="text-3xl md:text-5xl font-semibold mb-4 text-indigo-600">What We Do</h2>
        <p className="text-center max-w-xl text-gray-600">
          SkillHive is a platform where users offer their skills and request help from others in return.
          It's a modern way to collaborate, learn, and grow your capabilities.
        </p>
      </section>

      {/* Section 3 - Why Skill Swap */}
      <section className="h-screen flex flex-col justify-center items-center bg-indigo-50">
        <h2 className="text-3xl md:text-5xl font-semibold mb-4 text-indigo-700">Why Skill Swap?</h2>
        <ul className="list-disc text-left text-gray-700 max-w-lg px-6">
          <li className="mb-2">No money involved — trade skills fairly</li>
          <li className="mb-2">Build genuine connections</li>
          <li className="mb-2">Improve your abilities with practice</li>
        </ul>
      </section>

      {/* Section 4 - Get Started */}
      <section className="h-screen flex flex-col justify-center items-center bg-white">
        <h2 className="text-3xl md:text-5xl font-semibold mb-4 text-indigo-600">Get Started Today</h2>
        <p className="text-center max-w-xl text-gray-700 mb-6">
          Whether you want to teach or learn — SkillHive is your place to grow.
          Start your journey today by signing up and creating your profile.
        </p>
        <button
          onClick={() => navigate("/signup")}
          className="bg-indigo-600 text-white px-6 py-3 rounded-full text-lg hover:bg-indigo-700 transition"
        >
          Join Now
        </button>
      </section>
    </div>
  );
};

export default HeroPage;