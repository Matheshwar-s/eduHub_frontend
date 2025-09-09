import { useEffect, useState } from "react";
import api from "../api";

// ✅ Reusable Pagination Component
function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center items-center mt-6 space-x-3">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={`px-4 py-2 rounded-lg font-semibold shadow-md transition ${
          currentPage === 1
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:opacity-90"
        }`}
      >
        ⬅ Prev
      </button>

      <span className="px-4 py-2 bg-white/20 rounded-lg text-white font-medium">
        Page {currentPage} of {totalPages}
      </span>

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={`px-4 py-2 rounded-lg font-semibold shadow-md transition ${
          currentPage === totalPages
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-gradient-to-r from-indigo-600 to-purple-500 text-white hover:opacity-90"
        }`}
      >
        Next ➡
      </button>
    </div>
  );
}

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [resources, setResources] = useState([]);

  const [newClass, setNewClass] = useState({
    link: "",
    title: "",
    date: "",
    time: "",
  });

  const [newResource, setNewResource] = useState({ title: "", link: "" });
  const [assignment, setAssignment] = useState({ userId: "", classId: "" });

  // Pagination states
  const [userPage, setUserPage] = useState(1);
  const [classPage, setClassPage] = useState(1);
  const [resourcePage, setResourcePage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchUsers();
    fetchClasses();
    fetchResources();
  }, []);

  // ===== Fetch Functions =====
  const fetchUsers = async () => {
    try {
      const res = await api.get("/api/admin/users");
      setUsers(res.data);
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

  const fetchResources = async () => {
    try {
      const res = await api.get("/api/admin/resources");
      setResources(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ===== CRUD Operations =====
  const deleteUser = async (id) => {
    try {
      await api.delete(`/api/admin/users/${id}`);
      setUsers(users.filter((u) => u.id !== id));
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

  const assignUserToClass = async (e) => {
    e.preventDefault();
    try {
      await api.post(
        `/api/admin/classes/${assignment.classId}/assign/${assignment.userId}`
      );
      alert("User assigned to class ✅");
      setAssignment({ userId: "", classId: "" });
      fetchClasses();
    } catch (err) {
      console.error(err);
    }
  };

  const addResource = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/admin/resources", newResource);
      setResources([...resources, res.data]);
      setNewResource({ title: "", link: "" });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteResource = async (id) => {
    try {
      await api.delete(`/api/admin/resources/${id}`);
      setResources(resources.filter((r) => r.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // ===== Pagination Helpers =====
  const paginate = (data, page) => {
    const start = (page - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  };

  const userPages = Math.ceil(users.length / itemsPerPage);
  const classPages = Math.ceil(classes.length / itemsPerPage);
  const resourcePages = Math.ceil(resources.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-10">
      <h1 className="text-5xl font-extrabold text-white mb-12 text-center drop-shadow-lg">
        👨‍💻 Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-2 gap-12">
        {/* ===== USERS ===== */}
        <div className="bg-white/20 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-white/30">
          <h2 className="text-3xl font-bold text-white mb-6">👥 Users</h2>
          <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className="w-full text-white border border-white/20 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-lg">
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginate(users, userPage).map((u, idx) => (
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
          <Pagination
            currentPage={userPage}
            totalPages={userPages}
            onPageChange={setUserPage}
          />
        </div>

        {/* ===== CLASSES ===== */}
        <div className="bg-white/20 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-white/30">
          <h2 className="text-3xl font-bold text-white mb-6">
            📅 Live Classes
          </h2>
          <form
            onSubmit={addClass}
            className="space-y-4 mb-8 bg-white/10 p-5 rounded-2xl"
          >
            <input
              type="text"
              placeholder="Class Title"
              value={newClass.title}
              onChange={(e) => setNewClass({ ...newClass, title: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/70"
              required
            />
            <input
              type="date"
              value={newClass.date}
              onChange={(e) => setNewClass({ ...newClass, date: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white"
              required
            />
            <input
              type="time"
              value={newClass.time}
              onChange={(e) => setNewClass({ ...newClass, time: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white"
              required
            />
            <input
              type="text"
              placeholder="Meeting Link"
              value={newClass.link}
              onChange={(e) => setNewClass({ ...newClass, link: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/70"
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white py-3 rounded-xl font-bold shadow-xl hover:opacity-90 transition"
            >
              ➕ Add Class
            </button>
          </form>

          <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className="w-full text-white border border-white/20 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-lg">
                  <th className="p-4">Title</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Time</th>
                  <th className="p-4">Users</th>
                  <th className="p-4">Link</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginate(classes, classPage).map((c, idx) => (
                  <tr
                    key={c.id}
                    className={`${
                      idx % 2 === 0 ? "bg-white/10" : "bg-white/5"
                    } hover:bg-white/20 transition`}
                  >
                    <td className="p-4">{c.title}</td>
                    <td className="p-4">{c.date}</td>
                    <td className="p-4">{c.time}</td>
                    <td className="p-4">
                      {c.users && c.users.length > 0
                        ? c.users.map((u) => u.name).join(", ")
                        : "No users"}
                    </td>
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
          <Pagination
            currentPage={classPage}
            totalPages={classPages}
            onPageChange={setClassPage}
          />
        </div>

        {/* ===== RESOURCES ===== */}
        <div className="bg-white/20 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-white/30 md:col-span-2">
          <h2 className="text-3xl font-bold text-white mb-6">📚 Resources</h2>
          <form
            onSubmit={addResource}
            className="space-y-4 mb-8 bg-white/10 p-5 rounded-2xl"
          >
            <input
              type="text"
              placeholder="Resource Title"
              value={newResource.title}
              onChange={(e) =>
                setNewResource({ ...newResource, title: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/70"
              required
            />
            <input
              type="text"
              placeholder="Resource Link"
              value={newResource.link}
              onChange={(e) =>
                setNewResource({ ...newResource, link: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/70"
              required
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-400 to-red-500 text-white py-3 rounded-xl font-bold shadow-xl hover:opacity-90 transition"
            >
              ➕ Add Resource
            </button>
          </form>

          <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className="w-full text-white border border-white/20 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-lg">
                  <th className="p-4">Title</th>
                  <th className="p-4">Link</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginate(resources, resourcePage).map((r, idx) => (
                  <tr
                    key={r.id}
                    className={`${
                      idx % 2 === 0 ? "bg-white/10" : "bg-white/5"
                    } hover:bg-white/20 transition`}
                  >
                    <td className="p-4">{r.title}</td>
                    <td className="p-4">
                      <a
                        href={r.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-green-300 underline"
                      >
                        Open
                      </a>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => deleteResource(r.id)}
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
          <Pagination
            currentPage={resourcePage}
            totalPages={resourcePages}
            onPageChange={setResourcePage}
          />
        </div>
      </div>
    </div>
  );
}
