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
  const [groups, setGroups] = useState([]);

  const [newGroup, setNewGroup] = useState({ name: "" });
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [newClass, setNewClass] = useState({
    link: "",
    title: "",
    date: "",
    time: "",
    groupId: "",
  });

  const [newResource, setNewResource] = useState({ title: "", link: "" });

  // Pagination states
  const [userPage, setUserPage] = useState(1);
  const [classPage, setClassPage] = useState(1);
  const [resourcePage, setResourcePage] = useState(1);
  const [groupPage, setGroupPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchUsers();
    fetchClasses();
    fetchResources();
    fetchGroups();
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

  const fetchGroups = async () => {
    try {
      const res = await api.get("/api/admin/groups");
      setGroups(res.data);
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
      setNewClass({ link: "", title: "", date: "", time: "", groupId: "" });
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

  const addGroup = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/admin/groups", newGroup);
      setGroups([...groups, res.data]);
      setNewGroup({ name: "" });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteGroup = async (id) => {
    try {
      await api.delete(`/api/admin/groups/${id}`);
      setGroups(groups.filter((g) => g.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const assignUsersToGroup = async (groupId) => {
    try {
      await api.post(`/api/admin/groups/${groupId}/assign`, {
        userIds: selectedUsers,
      });
      alert("Users assigned to group ✅");
      setSelectedUsers([]);
      fetchGroups();
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
  const groupPages = Math.ceil(groups.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-600 to-blue-500 p-10">
      <h1 className="text-5xl font-extrabold text-white mb-12 text-center drop-shadow-lg">
        👨‍💻 Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-2 gap-12">
        {/* ===== USERS ===== */}
        {/* (same as your version, keep pagination) */}

        {/* ===== CLASSES ===== */}
        {/* (same as your version, but add group dropdown) */}
        <select
          value={newClass.groupId}
          onChange={(e) =>
            setNewClass({ ...newClass, groupId: e.target.value })
          }
          className="w-full px-4 py-3 rounded-xl bg-white/20 text-white"
        >
          <option value="">-- Select Group (optional) --</option>
          {groups.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>

        {/* ===== RESOURCES ===== */}
        {/* (same as your version, keep pagination) */}

        {/* ===== GROUPS ===== */}
        <div className="bg-white/20 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-white/30 md:col-span-2">
          <h2 className="text-3xl font-bold text-white mb-6">👥 Groups</h2>

          <form
            onSubmit={addGroup}
            className="space-y-4 mb-8 bg-white/10 p-5 rounded-2xl"
          >
            <input
              type="text"
              placeholder="Group Name"
              value={newGroup.name}
              onChange={(e) => setNewGroup({ name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/70"
              required
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-400 to-indigo-600 text-white py-3 rounded-xl font-bold shadow-xl hover:opacity-90 transition"
            >
              ➕ Add Group
            </button>
          </form>

          {/* Users assignment UI */}
          {selectedGroup && (
            <div className="mb-6 bg-white/10 p-5 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-4">
                Assign Users to {selectedGroup.name}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-white">
                {users.map((u) => (
                  <label
                    key={u.id}
                    className="flex items-center space-x-2 bg-white/20 rounded-lg px-3 py-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(u.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedUsers([...selectedUsers, u.id]);
                        } else {
                          setSelectedUsers(
                            selectedUsers.filter((id) => id !== u.id)
                          );
                        }
                      }}
                    />
                    <span>{u.name}</span>
                  </label>
                ))}
              </div>
              <button
                onClick={() => assignUsersToGroup(selectedGroup.id)}
                className="mt-4 w-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white py-3 rounded-xl font-bold shadow-xl hover:opacity-90 transition"
              >
                ✅ Assign Selected Users
              </button>
            </div>
          )}

          <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className="w-full text-white border border-white/20 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-lg">
                  <th className="p-4">Name</th>
                  <th className="p-4">Users</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginate(groups, groupPage).map((g, idx) => (
                  <tr
                    key={g.id}
                    className={`${
                      idx % 2 === 0 ? "bg-white/10" : "bg-white/5"
                    } hover:bg-white/20 transition`}
                  >
                    <td className="p-4">{g.name}</td>
                    <td className="p-4">
                      {g.users?.map((u) => u.name).join(", ") || "No users"}
                    </td>
                    <td className="p-4 space-x-3">
                      <button
                        onClick={() => setSelectedGroup(g)}
                        className="px-4 py-2 rounded-xl text-white bg-gradient-to-r from-green-500 to-teal-600 shadow-lg"
                      >
                        ➕ Assign Users
                      </button>
                      <button
                        onClick={() => deleteGroup(g.id)}
                        className="px-4 py-2 rounded-xl text-white bg-gradient-to-r from-red-500 to-pink-600 shadow-lg"
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
            currentPage={groupPage}
            totalPages={groupPages}
            onPageChange={setGroupPage}
          />
        </div>
      </div>
    </div>
  );
}
