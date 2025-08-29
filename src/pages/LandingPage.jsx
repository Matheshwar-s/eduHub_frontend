import { motion } from "framer-motion";
import { FaBookOpen, FaLaptopCode, FaUsers, FaRocket } from "react-icons/fa";

export default function LandingPage() {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-black text-white font-sans">
      {/* 🌟 Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold leading-tight"
        >
          Empower Your Learning with <span className="text-indigo-400">EduHub</span>
        </motion.h1>
        <p className="mt-6 max-w-2xl text-lg md:text-xl text-gray-300">
          Interactive courses, personalized learning paths, and AI-powered study
          tools to boost your skills.
        </p>
        <div className="mt-8 flex gap-4">
          <button className="px-6 py-3 bg-indigo-500 rounded-xl text-lg font-semibold hover:bg-indigo-600 transition">
            Get Started
          </button>
          <button className="px-6 py-3 border border-gray-400 rounded-xl text-lg font-semibold hover:bg-gray-700 transition">
            Learn More
          </button>
        </div>
      </section>

      {/* 📚 Features */}
      <section className="py-20 px-6 bg-gray-800 text-center">
        <h2 className="text-4xl font-bold mb-12">Why Choose EduHub?</h2>
        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <FeatureCard icon={<FaBookOpen />} title="Expert Courses" desc="Curated by industry leaders with real-world insights." />
          <FeatureCard icon={<FaLaptopCode />} title="Hands-On Learning" desc="Build projects while you learn for practical experience." />
          <FeatureCard icon={<FaUsers />} title="Community Support" desc="Join peers, mentors, and instructors worldwide." />
        </div>
      </section>

      {/* 💬 Testimonials */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-4xl font-bold mb-12">What Our Learners Say</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Testimonial
            text="EduHub transformed my career. The courses are engaging and practical!"
            author="Sarah M."
          />
          <Testimonial
            text="I loved the projects! They helped me build a strong portfolio."
            author="James K."
          />
        </div>
      </section>

      {/* 🚀 Call to Action */}
      <section className="py-20 px-6 bg-indigo-600 text-center">
        <h2 className="text-4xl font-bold">Ready to Start Learning?</h2>
        <p className="mt-4 text-lg text-gray-200">
          Join thousands of learners and level up your skills today.
        </p>
        <button className="mt-6 px-8 py-3 bg-white text-indigo-600 rounded-xl text-lg font-bold hover:bg-gray-200 transition">
          Sign Up Now
        </button>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-400 text-sm border-t border-gray-700">
        © {new Date().getFullYear()} EduHub. All rights reserved.
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-gray-900 p-8 rounded-2xl shadow-lg hover:scale-105 transition">
      <div className="text-4xl text-indigo-400 mb-4 flex justify-center">{icon}</div>
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-300">{desc}</p>
    </div>
  );
}

function Testimonial({ text, author }) {
  return (
    <div className="bg-gray-800 p-8 rounded-2xl shadow-md">
      <p className="italic text-gray-200">“{text}”</p>
      <p className="mt-4 font-bold text-indigo-400">- {author}</p>
    </div>
  );
}
