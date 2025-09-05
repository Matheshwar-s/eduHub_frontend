import { FaHome, FaBook, FaChalkboardTeacher, FaUser } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-900 text-white h-screen p-6 flex flex-col">
      <h1 className="text-2xl font-bold mb-8">Student Dashboard</h1>
      <nav className="flex flex-col gap-4">
        <a href="#" className="flex items-center gap-3 hover:text-blue-400">
          <FaHome /> Dashboard
        </a>
        <a href="#" className="flex items-center gap-3 hover:text-blue-400">
          <FaChalkboardTeacher /> Classes
        </a>
        <a href="#" className="flex items-center gap-3 hover:text-blue-400">
          <FaBook /> Resources
        </a>
        <a href="#" className="flex items-center gap-3 hover:text-blue-400">
          <FaUser /> Profile
        </a>
      </nav>
    </div>
  );
}
