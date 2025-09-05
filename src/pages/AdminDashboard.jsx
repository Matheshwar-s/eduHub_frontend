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
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-10">
      <h1 className="text-5xl font-extrabold text-white mb-12 text-center drop-shadow-lg">
        👨‍💻 Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Users Section */}
        <div className="bg-white/20 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-white/30">
          <h2 className="text-3xl font-bold text-white mb-6">👥 Users</h2>
          <div className="overflow-x-auto rounded-lg">
            <table className="w-full text-white border-collapse">
              <thead>
                <tr className="bg-white/20 text-lg">
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, idx) => (
                  <tr
                    key={u.id || u.email}
                    className={`${
                      idx % 2 === 0 ? "bg-white/10" : "bg-white/5"
                    } hover:bg-white/20 transition`}
                  >
                    <td className="p-4">{u.name}</td>
                    <td className="p-4">{u.email}</td>
                    <td className="p-4 capitalize">{u.role}</td>
                    <td className="p-4">
                      <button
                        onClick={() => deleteUser(u.id)}
                        className="px-5 py-2 rounded-xl text-white bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 shadow-lg"
                      >
                        ❌ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Class Scheduling */}
        <div className="bg-white/20 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-white/30">
          <h2 className="text-3xl font-bold text-white mb-6">
            📅 Live Class Scheduling
          </h2>

          {/* Add Class Form */}
          <form
            onSubmit={addClass}
            className="space-y-4 mb-8 bg-white/10 p-5 rounded-2xl"
          >
            <input
              type="text"
              placeholder="Class Title"
              value={newClass.title}
              onChange={(e) =>
                setNewClass({ ...newClass, title: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-pink-400"
              required
            />
            <input
              type="date"
              value={newClass.date}
              onChange={(e) =>
                setNewClass({ ...newClass, date: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-pink-400"
              required
            />
            <input
              type="time"
              value={newClass.time}
              onChange={(e) =>
                setNewClass({ ...newClass, time: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-pink-400"
              required
            />
            <input
              type="text"
              placeholder="Meeting Link"
              value={newClass.link}
              onChange={(e) =>
                setNewClass({ ...newClass, link: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-pink-400"
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white py-3 rounded-xl font-bold shadow-xl hover:opacity-90 transition"
            >
              ➕ Add Class
            </button>
          </form>

          {/* Classes Table */}
          <div className="overflow-x-auto rounded-lg">
            <table className="w-full text-white border-collapse">
              <thead>
                <tr className="bg-white/20 text-lg">
                  <th className="p-4">Title</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Time</th>
                  <th className="p-4">Link</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {classes.map((c, idx) => (
                  <tr
                    key={c.id || idx}
                    className={`${
                      idx % 2 === 0 ? "bg-white/10" : "bg-white/5"
                    } hover:bg-white/20 transition`}
                  >
                    <td className="p-4">{c.title}</td>
                    <td className="p-4">{c.date}</td>
                    <td className="p-4">{c.time}</td>
                    <td className="p-4">
                      <a
                        href={c.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-yellow-300 underline"
                      >
                        Join
                      </a>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => deleteClass(c.id)}
                        className="px-5 py-2 rounded-xl text-white bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 shadow-lg"
                      >
                        ❌ Delete
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
