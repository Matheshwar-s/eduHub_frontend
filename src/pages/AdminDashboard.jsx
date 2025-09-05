import { useEffect, useState } from "react";
import api from "../api";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [newClass, setNewClass] = useState({
    link: "",
    title: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    fetchUsers();
    fetchClasses();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/api/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteUser = async (id) => {
    try {
      await api.delete(`/api/admin/users/${id}`);
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchClasses = async () => {
    try {
      const res = await api.get("/api/admin/classes");
      setClasses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addClass = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/admin/classes", newClass);
      setClasses([...classes, res.data]);
      setNewClass({ link: "", title: "", date: "", time: "" });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteClass = async (id) => {
    try {
      await api.delete(`/api/admin/classes/${id}`);
      setClasses(classes.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 p-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">
        👨‍💻 Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Users Section */}
        <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">👥 Users</h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-indigo-100 text-indigo-800 text-left">
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr
                    key={u.id || u.email}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-3">{u.name}</td>
                    <td className="p-3">{u.email}</td>
                    <td className="p-3 capitalize">{u.role}</td>
                    <td className="p-3">
                      <button
                        onClick={() => deleteUser(u.id)}
                        className="px-4 py-1 rounded-lg text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-md"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Class Scheduling */}
        <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            📅 Live Class Scheduling
          </h2>

          {/* Add Class Form */}
          <form
            onSubmit={addClass}
            className="space-y-4 mb-6 bg-gray-50 p-4 rounded-xl"
          >
            <input
              type="text"
              placeholder="Class Title"
              value={newClass.title}
              onChange={(e) => setNewClass({ ...newClass, title: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              required
            />
            <input
              type="date"
              value={newClass.date}
              onChange={(e) => setNewClass({ ...newClass, date: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              required
            />
            <input
              type="time"
              value={newClass.time}
              onChange={(e) => setNewClass({ ...newClass, time: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              required
            />
            <input
              type="text"
              placeholder="Meeting Link"
              value={newClass.link}
              onChange={(e) => setNewClass({ ...newClass, link: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 text-white py-2 rounded-lg shadow-lg hover:from-indigo-600 hover:to-indigo-700"
            >
              ➕ Add Class
            </button>
          </form>

          {/* Classes Table */}
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-indigo-100 text-indigo-800 text-left">
                  <th className="p-3">Title</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Time</th>
                  <th className="p-3">Link</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {classes.map((c, index) => (
                  <tr
                    key={c.id || index}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-3">{c.title}</td>
                    <td className="p-3">{c.date}</td>
                    <td className="p-3">{c.time}</td>
                    <td className="p-3 text-indigo-600 underline">
                      <a href={c.link} target="_blank" rel="noreferrer">
                        Join
                      </a>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => deleteClass(c.id)}
                        className="px-4 py-1 rounded-lg text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-md"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
