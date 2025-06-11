import { useEffect, useState } from "react";
import axios from "axios";
import SidebarLayout from "../../components/AdminLeftbar";
import AddUserModal from "../../components/AddUserModal";
import ConfirmModal from "../../components/ConfirmModal";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, userId: null });
  const [selectedUser, setSelectedUser] = useState(null);

  const token = localStorage.getItem("userToken");

  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://miniproject-1-34zo.onrender.com/api/users/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users:", err.message);
    }
  };

  const confirmDelete = (userId) => {
    setConfirmModal({ isOpen: true, userId });
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://miniproject-1-34zo.onrender.com/api/users/admin/users/${confirmModal.userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setConfirmModal({ isOpen: false, userId: null });
      setSelectedUser(null);
      fetchUsers();
    } catch (err) {
      console.error("Delete failed:", err.message);
    }
  };

  const toggleBlock = async (id) => {
    try {
      await axios.put(
        `https://miniproject-1-34zo.onrender.com/api/users/admin/users/${id}/block`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSelectedUser(null); // Close popup after block/unblock
      fetchUsers();
    } catch (err) {
      console.error("Block/unblock failed:", err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <SidebarLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Manage Users 👥</h1>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => setIsModalOpen(true)}
          >
            ➕ Add User
          </button>
        </div>

        <AddUserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onUserAdded={fetchUsers}
        />

        <ConfirmModal
          isOpen={confirmModal.isOpen}
          onConfirm={handleDelete}
          onCancel={() => setConfirmModal({ isOpen: false, userId: null })}
          message="Are you sure you want to delete this user?"
        />

        {users.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">No users found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded shadow text-left mb-10">
              <thead className="bg-gray-100 text-sm font-semibold">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{u.name}</td>
                    <td className="p-3">{u.email}</td>
                    <td className="p-3 capitalize">{u.role}</td>
                    <td className="p-3">
                      {u.blocked ? (
                        <span className="text-red-500 font-medium">Blocked</span>
                      ) : (
                        <span className="text-green-600 font-medium">Active</span>
                      )}
                    </td>
                    <td className="p-3 space-x-2">
                      <button
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                        onClick={() => toggleBlock(u._id)}
                      >
                        {u.blocked ? "Unblock" : "Block"}
                      </button>
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                        onClick={() => setSelectedUser(u)}
                      >
                        View Profile
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        onClick={() => confirmDelete(u._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* === Profile Modal === */}
        {selectedUser && (
          <div className="fixed inset-0 z-50 flex justify-center items-center">
            {/* Transparent blur background */}
            <div
              className="fixed inset-0 backdrop-blur-sm"
              onClick={() => setSelectedUser(null)}
            />

            {/* Modal content */}
            <div className="relative bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-md z-10">
              {/* Close (X) Button */}
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
                onClick={() => setSelectedUser(null)}
              >
                ×
              </button>

              <h2 className="text-xl font-bold mb-4">User Profile</h2>
              <div className="mb-4 space-y-2">
                <p>
                  <span className="font-semibold">Name:</span> {selectedUser.name}
                </p>
                <p>
                  <span className="font-semibold">Email:</span> {selectedUser.email}
                </p>
                <p>
                  <span className="font-semibold">Role:</span> {selectedUser.role}
                </p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  {selectedUser.blocked ? "Blocked" : "Active"}
                </p>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                  onClick={() => {
                    confirmDelete(selectedUser._id);
                    setSelectedUser(null);
                  }}
                >
                  Delete
                </button>
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                  onClick={() => toggleBlock(selectedUser._id)}
                >
                  {selectedUser.blocked ? "Unblock" : "Block"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </SidebarLayout>
  );
}

export default ManageUsers;
