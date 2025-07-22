// import {
//   useGetAllVenuesQuery,
//   useCreateVenueMutation,
//   useUpdateVenueMutation,
//   useDeleteVenueMutation,
// } from "../../features/api/venueApi";
// import { useState } from "react";
// import { toast } from "sonner";
// import { FiEdit, FiTrash } from "react-icons/fi";

// type VenueForm = {
//   name: string;
//   address: string;
//   capacity: number;
// };

// type Venue = {
//   venueId: number;
//   name: string;
//   address: string;
//   capacity: number;
// };

// export function ManageVenues() {
//   const { data: venues, isLoading } = useGetAllVenuesQuery("");
//   const [createVenue] = useCreateVenueMutation();
//   const [updateVenue] = useUpdateVenueMutation();
//   const [deleteVenue] = useDeleteVenueMutation();

//   const [form, setForm] = useState<VenueForm>({ name: "", address: "", capacity: 0 });
//   const [editingId, setEditingId] = useState<number | null>(null);

//   const handleSubmit = async () => {
//     if (!form.name || !form.address || !form.capacity) {
//       toast.error("Please fill out all fields.");
//       return;
//     }

//     try {
//       if (editingId) {
//         await updateVenue({ venueId: editingId, data: form }).unwrap();
//         toast.success("Venue updated successfully");
//       } else {
//         await createVenue(form).unwrap();
//         toast.success("Venue created successfully");
//       }

//       setForm({ name: "", address: "", capacity: 0 });
//       setEditingId(null);
//     } catch (error) {
//       toast.error("Something went wrong. Try again.");
//     }
//   };

//   const handleEdit = (venue: Venue) => {
//     setForm({
//       name: venue.name,
//       address: venue.address,
//       capacity: venue.capacity,
//     });
//     setEditingId(venue.venueId);
//   };

//   const handleDelete = async (id: number) => {
//     const confirm = window.confirm("Are you sure you want to delete this venue?");
//     if (!confirm) return;

//     try {
//       await deleteVenue(id).unwrap();
//       toast.success("Venue deleted successfully");
//     } catch (error) {
//       toast.error("Failed to delete venue");
//     }
//   };

//   return (
//     <div className="p-4 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Manage Venues</h1>

//       <div className="bg-white p-4 rounded shadow mb-6">
//         <h2 className="text-lg font-semibold mb-2">
//           {editingId ? "Edit Venue" : "Add New Venue"}
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <input
//             type="text"
//             placeholder="Venue Name"
//             className="input input-bordered w-full"
//             value={form.name}
//             onChange={(e) => setForm({ ...form, name: e.target.value })}
//           />
//           <input
//             type="text"
//             placeholder="Address"
//             className="input input-bordered w-full"
//             value={form.address}
//             onChange={(e) => setForm({ ...form, address: e.target.value })}
//           />
//           <input
//             type="number"
//             placeholder="Capacity"
//             className="input input-bordered w-full"
//             value={form.capacity}
//             onChange={(e) => setForm({ ...form, capacity: +e.target.value })}
//           />
//         </div>
//         <button className="btn btn-primary mt-4" onClick={handleSubmit}>
//           {editingId ? "Update Venue" : "Add Venue"}
//         </button>
//       </div>

//       <div className="overflow-x-auto">
//         {isLoading ? (
//           <p>Loading venues...</p>
//         ) : (
//           <table className="table">
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Name</th>
//                 <th>Address</th>
//                 <th>Capacity</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {venues?.map((venue: Venue, idx: number) => (
//                 <tr key={venue.venueId}>
//                   <td>{idx + 1}</td>
//                   <td>{venue.name}</td>
//                   <td>{venue.address}</td>
//                   <td>{venue.capacity}</td>
//                   <td className="flex gap-2">
//                     <button
//                       className="btn btn-sm btn-warning"
//                       onClick={() => handleEdit(venue)}
//                     >
//                       <FiEdit />
//                     </button>
//                     <button
//                       className="btn btn-sm btn-error"
//                       onClick={() => handleDelete(venue.venueId)}
//                     >
//                       <FiTrash />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { FiEdit, FiTrash, FiPlus } from "react-icons/fi";
import Swal from "sweetalert2";
import {
  useGetAllVenuesQuery,
  useCreateVenueMutation,
  useUpdateVenueMutation,
  useDeleteVenueMutation,
} from "../../features/api/venueApi";

type VenueForm = {
  name: string;
  address: string;
  capacity: number;
};

type Venue = {
  venueId: number;
  name: string;
  address: string;
  capacity: number;
};

export function ManageVenues() {
  const { data: venues = [], isLoading } = useGetAllVenuesQuery("");
  const [createVenue] = useCreateVenueMutation();
  const [updateVenue] = useUpdateVenueMutation();
  const [deleteVenue] = useDeleteVenueMutation();

  const [editingVenue, setEditingVenue] = useState<Venue | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [form, setForm] = useState<VenueForm>({ name: "", address: "", capacity: 0 });

  const openCreateModal = () => {
    setEditingVenue(null);
    setIsCreating(true);
    setForm({ name: "", address: "", capacity: 0 });
  };

  const openEditModal = (venue: Venue) => {
    setEditingVenue(venue);
    setIsCreating(false);
    setForm({
      name: venue.name,
      address: venue.address,
      capacity: venue.capacity,
    });
  };

  const closeModal = () => {
    setEditingVenue(null);
    setIsCreating(false);
    setForm({ name: "", address: "", capacity: 0 });
  };

  const handleSave = async () => {
    if (!form.name || !form.address || !form.capacity) {
      Swal.fire("Error", "All fields are required.", "error");
      return;
    }

    try {
      if (editingVenue) {
        await updateVenue({ venueId: editingVenue.venueId, data: form }).unwrap();
        Swal.fire("Updated", "Venue updated successfully.", "success");
      } else {
        await createVenue(form).unwrap();
        Swal.fire("Created", "Venue created successfully.", "success");
      }
      closeModal();
    } catch (error) {
      console.error("Error saving venue:", error);
      Swal.fire("Error", "Failed to save venue.", "error");
    }
  };

  const handleDelete = async (venueId: number) => {
    const confirm = await Swal.fire({
      title: "Delete Venue?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await deleteVenue(venueId).unwrap();
        Swal.fire("Deleted", "Venue deleted successfully.", "success");
      } catch (error) {
        console.error("Error deleting venue:", error);
        Swal.fire("Error", "Failed to delete venue.", "error");
      }
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-blue-600">Manage Venues</h1>
        <button className="btn btn-success" onClick={openCreateModal}>
          <FiPlus /> Add Venue
        </button>
      </div>

      {isLoading ? (
        <div className="text-center">Loading venues...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Address</th>
                <th>Capacity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {venues.map((venue: Venue, idx: number) => (
                <tr key={venue.venueId}>
                  <td>{idx + 1}</td>
                  <td>{venue.name}</td>
                  <td>{venue.address}</td>
                  <td>{venue.capacity}</td>
                  <td className="flex gap-2">
                    <button className="btn btn-sm btn-outline text-blue-600" onClick={() => openEditModal(venue)}>
                      <FiEdit />
                    </button>
                    <button className="btn btn-sm btn-outline text-red-600" onClick={() => handleDelete(venue.venueId)}>
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
      {(editingVenue || isCreating) && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-center text-blue-600">
              {isCreating ? "Add New Venue" : "Edit Venue"}
            </h2>

            <div className="mb-3">
              <label className="label">Venue Name</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label className="label">Address</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label className="label">Capacity</label>
              <input
                type="number"
                className="input input-bordered w-full"
                value={form.capacity}
                onChange={(e) => setForm({ ...form, capacity: +e.target.value })}
              />
            </div>

            <div className="flex justify-end gap-3">
              <button onClick={closeModal} className="btn btn-ghost">
                Cancel
              </button>
              <button onClick={handleSave} className="btn btn-primary">
                {isCreating ? "Create" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
