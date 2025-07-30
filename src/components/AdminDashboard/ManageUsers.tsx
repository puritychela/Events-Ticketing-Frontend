import { useState } from "react";
import { FiEdit, FiTrash, FiUserPlus } from "react-icons/fi";
import Swal from "sweetalert2";
import {
  useGetAllUsersQuery,
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
  const { data: users = [], isLoading } = useGetAllUsersQuery("");
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
    role: "user",
    contactPhone: "",
    address: "",
  });

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setIsCreating(false);
    setFormData({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: "",
      role: user.role,
      contactPhone: user.contactPhone || "",
      address: user.address || "",
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
      role: "user",
      contactPhone: "",
      address: "",
    });
  };

  const closeModal = () => {
    setEditingUser(null);
    setIsCreating(false);
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      role: "user",
      contactPhone: "",
      address: "",
    });
  };

  const handleSave = async () => {
    if (isCreating) {
      if (!formData.password.trim()) {
        Swal.fire("Error", "Password is required for new users.", "error");
        return;
      }

      try {
        await registerUser({
          ...formData,
          firstname: formData.firstname.trim(),
          lastname: formData.lastname.trim(),
          email: formData.email.trim(),
          password: formData.password.trim(),
          contactPhone: formData.contactPhone.trim(),
          address: formData.address.trim(),
        }).unwrap();
        closeModal();
        Swal.fire("Success", "New user created successfully.", "success");
      } catch (error) {
        console.error("Failed to create user:", error);
        Swal.fire("Error", "Failed to create user.", "error");
      }
    } else if (editingUser?.userId) {
      const rawPayload = {
        firstname: formData.firstname.trim(),
        lastname: formData.lastname.trim(),
        email: formData.email.trim(),
        role: formData.role,
        contactPhone: formData.contactPhone.trim(),
        address: formData.address.trim(),
        ...(formData.password.trim() && { password: formData.password.trim() }),
      };

      const filteredPayload = Object.fromEntries(
        Object.entries(rawPayload).filter(([_, val]) => val !== "")
      );

      if (Object.keys(filteredPayload).length === 0) {
        Swal.fire("Warning", "No changes detected to update.", "warning");
        return;
      }

      try {
        await updateUserProfile({ userId: editingUser.userId, data: filteredPayload }).unwrap();
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

      {(editingUser || isCreating) && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-center text-blue-600">
              {isCreating ? "Create New User" : "Edit User"}
            </h2>

            {["firstname", "lastname", "email", "contactPhone", "address", "password"].map((field) => (
              <div className="mb-3" key={field}>
                <label className="label">{field === "contactPhone" ? "Phone" : field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                  type={field === "password" ? "password" : field === "email" ? "email" : "text"}
                  className="input input-bordered w-full"
                  value={(formData as any)[field]}
                  onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                />
              </div>
            ))}

            <div className="mb-3">
              <label className="label">Role</label>
              <select
                className="input input-bordered w-full"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as "user" | "admin" })}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
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
