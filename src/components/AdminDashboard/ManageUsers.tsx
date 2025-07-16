import { useState } from "react";
import { FiEdit, FiTrash, FiUserPlus } from "react-icons/fi";
import Swal from "sweetalert2";
import {
  useGetAllUsersProfilesQuery,
  useUpdateUserProfileMutation,
  useDeleteUserProfileMutation,
  useRegisterUserMutation,
} from "../../features/api/userApi";

interface User {
  userId: number;
  firstname: string;
  lastname: string;
  email: string;
  role: "user" | "admin";
  contactPhone?: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
}

const ManageUsers = () => {
  const { data: users = [], isLoading } = useGetAllUsersProfilesQuery("");
  const [updateUserProfile] = useUpdateUserProfileMutation();
  const [deleteUserProfile] = useDeleteUserProfileMutation();
  const [registerUser] = useRegisterUserMutation();

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setIsCreating(false);
    setFormData({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: "",
    });
  };

  const openCreateModal = () => {
    setEditingUser(null);
    setIsCreating(true);
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    });
  };

  const closeModal = () => {
    setEditingUser(null);
    setIsCreating(false);
    setFormData({ firstname: "", lastname: "", email: "", password: "" });
  };

  const handleSave = async () => {
    if (isCreating) {
      // CREATE NEW USER
      if (!formData.password) {
        Swal.fire("Error", "Password is required for new users.", "error");
        return;
      }

      try {
        await registerUser(formData).unwrap();
        closeModal();
        Swal.fire("Success", "New user created successfully.", "success");
      } catch (error) {
        console.error("Failed to create user:", error);
        Swal.fire("Error", "Failed to create user.", "error");
      }
    } else if (editingUser?.userId) {
      // UPDATE USER
      const payload = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        ...(formData.password && { password: formData.password }),
      };

      try {
        await updateUserProfile({ userId: editingUser.userId, data: payload }).unwrap();
        closeModal();
        Swal.fire("Updated!", "User profile updated successfully.", "success");
      } catch (error) {
        console.error("Failed to update user:", error);
        Swal.fire("Error", "Failed to update user.", "error");
      }
    }
  };

  const handleDelete = async (userId: number) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmed.isConfirmed) {
      try {
        await deleteUserProfile(userId).unwrap();
        Swal.fire("Deleted!", "User has been deleted.", "success");
      } catch (error) {
        console.error("Failed to delete user:", error);
        Swal.fire("Error!", "Failed to delete user.", "error");
      }
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-blue-600">Manage Users</h2>
        <button className="btn btn-success" onClick={openCreateModal}>
          <FiUserPlus /> Create User
        </button>
      </div>

      {isLoading ? (
        <div className="text-center">Loading users...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Joined</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: User, index: number) => (
                <tr key={user.userId}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${user.firstname}`}
                            alt="avatar"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user.firstname} {user.lastname}</div>
                        <div className="text-sm opacity-50">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className={`badge badge-outline ${user.role === "admin" ? "badge-success" : "badge-warning"}`}>
                      {user.role}
                    </div>
                  </td>
                  <td className="flex gap-2">
                    <button onClick={() => openEditModal(user)} className="btn btn-sm btn-outline text-blue-700">
                      <FiEdit />
                    </button>
                    <button onClick={() => handleDelete(user.userId)} className="btn btn-sm btn-outline text-red-600">
                      <FiTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {(editingUser || isCreating) && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-center text-blue-600">
              {isCreating ? "Create New User" : "Edit User"}
            </h2>

            <div className="mb-3">
              <label className="label">First Name</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={formData.firstname}
                onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label className="label">Last Name</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={formData.lastname}
                onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label className="label">Email</label>
              <input
                type="email"
                className="input input-bordered w-full"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label className="label">
                Password <span className="text-xs text-gray-400">(Required for new users)</span>
              </label>
              <input
                type="password"
                className="input input-bordered w-full"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <div className="flex justify-end gap-3">
              <button onClick={closeModal} className="btn btn-ghost">Cancel</button>
              <button onClick={handleSave} className="btn btn-primary">
                {isCreating ? "Create" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageUsers;
