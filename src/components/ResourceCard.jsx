import { motion } from "framer-motion";
import { FaFilePdf, FaVideo } from "react-icons/fa";

export default function ResourceCard({ title, type, link }) {
  const Icon = type === "pdf" ? FaFilePdf : FaVideo;
  return (
    <motion.div
      className="bg-white/20 backdrop-blur-md rounded-2xl shadow-lg p-6 hover:scale-105 transform transition duration-300 flex items-center gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Icon className="text-2xl text-red-500" />
      <div>
        <h3 className="text-lg font-bold">{title}</h3>
        <a
          href={link}
          className="mt-2 inline-block text-blue-500 hover:underline"
        >
          View / Download
        </a>
      </div>
    </motion.div>
  );
}
