import { motion } from "framer-motion";

export default function ClassroomCard({ title,date, time, link }) {
  return (
    <motion.div
      className="bg-white/20 backdrop-blur-md rounded-2xl shadow-lg p-6 hover:scale-105 transform transition duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-sm text-gray-200">{date}</p>
      <p className="text-sm text-gray-200">{time}</p>
      <a
        href={link}
        className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Join Class
      </a>
    </motion.div>
  );
}
