import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ClassroomCard from "../components/ClassroomCard";
import ResourceCard from "../components/ResourceCard";
import QuickActions from "../components/QuickActions";
import { useState, useEffect } from "react";
import api from "../api";

export default function StudentDashboard() {
  const [classrooms, setClassrooms] = useState([]);
  useEffect(() => {
    // Fetch classrooms from backend
    api
      .get("/api/admin/classes")
      .then((res) => setClassrooms(res.data))
      .catch((err) => console.error(err));
  }, []);
  const resources = [
    { id: 1, title: "Calculus Notes", type: "pdf", link: "#" },
    { id: 2, title: "Physics Lecture", type: "video", link: "#" },
  ];

  return (
    <div className="flex bg-gray-900 min-h-screen text-white">
      <Sidebar />
      <div className="flex-1 p-6 flex flex-col gap-6">
        <Header username="Mathesh" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classrooms.map((cls) => (
            <ClassroomCard key={cls.id} {...cls} />
          ))}
          {resources.map((res) => (
            <ResourceCard key={res.id} {...res} />
          ))}
        </div>
        <QuickActions />
      </div>
    </div>
  );
}
