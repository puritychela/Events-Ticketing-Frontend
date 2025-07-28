// import { useState, useEffect, type FormEvent } from "react";
// import {
//   useCreateEventMutation,
//   useDeleteEventMutation,
//   useGetAllEventsQuery,
//   useUpdateEventMutation,
// } from "../../features/api/eventsApi";
// import Swal from "sweetalert2";
// import type { Event } from "../../types/types";

// // Use a type that excludes backend-generated fields
// type EventFormData = Omit<Event, "eventId" | "createdAt" | "updatedAt" | "ticketsSold">;

// const initialFormData: EventFormData = {
//   title: "",
//   description: "",
//   date: "",
//   time: "",
//   venueId: 1,
//   category: "Music",
//   ticketPrice: "0",
//   ticketsTotal: 0,
//   imageUrl: "",
//   accessLevel: "General",
//   eventType: "In-person",
// };

// const ManageEvents = () => {
//   const [formData, setFormData] = useState<EventFormData>(initialFormData);
//   const [editingId, setEditingId] = useState<number | null>(null);

//   const { data: events, refetch } = useGetAllEventsQuery(undefined);
//   const [createEvent] = useCreateEventMutation();
//   const [updateEvent] = useUpdateEventMutation();
//   const [deleteEvent] = useDeleteEventMutation();

//   useEffect(() => {
//     refetch();
//   }, []);

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();

//     const payload: EventFormData = {
//       ...formData,
//       ticketsTotal: Number(formData.ticketsTotal),
//       ticketPrice: formData.ticketPrice || "0",
//       venueId: Number(formData.venueId),
//     };

//     try {
//       if (editingId !== null) {
//         // Send just the updatable fields
//         await updateEvent({
//           eventId: editingId,
//           updatedData: payload,
//         }).unwrap();

//         Swal.fire("Success", "Event updated successfully", "success");
//       } else {
//         await createEvent(payload).unwrap();
//         Swal.fire("Success", "Event created successfully", "success");
//       }

//       setFormData(initialFormData);
//       setEditingId(null);
//       refetch();
//     } catch (err: any) {
//       Swal.fire("Error", err?.message || "Something went wrong", "error");
//     }
//   };

//   const handleEdit = (event: Event) => {
//     setFormData({
//       title: event.title,
//       description: event.description,
//       date: event.date,
//       time: event.time,
//       venueId: event.venueId,
//       category: event.category,
//       ticketPrice: event.ticketPrice,
//       ticketsTotal: event.ticketsTotal,
//       imageUrl: event.imageUrl,
//       accessLevel: event.accessLevel || "General",
//       eventType: event.eventType || "In-person",
//     });
//     setEditingId(event.eventId);
//   };

//   const handleDelete = async (id: number) => {
//     const res = await Swal.fire({
//       title: "Are you sure?",
//       text: "This will permanently delete the event!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       confirmButtonText: "Delete",
//     });

//     if (res.isConfirmed) {
//       try {
//         await deleteEvent(id).unwrap();
//         Swal.fire("Deleted!", "Event deleted successfully", "success");
//         refetch();
//       } catch (err: any) {
//         Swal.fire("Error", err?.message || "Something went wrong", "error");
//       }
//     }
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Manage Events</h2>

//       {/* Event Form */}
//       <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//         <input
//           type="text"
//           placeholder="Title"
//           className="input input-bordered w-full"
//           value={formData.title}
//           onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Description"
//           className="input input-bordered w-full"
//           value={formData.description}
//           onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//           required
//         />
//         <input
//           type="date"
//           className="input input-bordered w-full"
//           value={formData.date}
//           onChange={(e) => setFormData({ ...formData, date: e.target.value })}
//           required
//         />
//         <input
//           type="time"
//           className="input input-bordered w-full"
//           value={formData.time}
//           onChange={(e) => setFormData({ ...formData, time: e.target.value })}
//           required
//         />
//         <select
//           className="select select-bordered w-full"
//           value={formData.category}
//           onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//         >
//           <option value="Music">Music</option>
//           <option value="Sports">Sports</option>
//           <option value="Tech">Tech</option>
//           <option value="Business">Business</option>
//         </select>
//         <select
//           className="select select-bordered w-full"
//           value={formData.eventType}
//           onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
//         >
//           <option value="In-person">In-person</option>
//           <option value="Online">Online</option>
//         </select>
//         <select
//           className="select select-bordered w-full"
//           value={formData.accessLevel}
//           onChange={(e) => setFormData({ ...formData, accessLevel: e.target.value })}
//         >
//           <option value="General">General</option>
//           <option value="VIP">VIP</option>
//           <option value="Free">Free</option>
//         </select>
//         <input
//           type="number"
//           placeholder="Total Tickets"
//           className="input input-bordered w-full"
//           value={formData.ticketsTotal}
//           onChange={(e) => setFormData({ ...formData, ticketsTotal: Number(e.target.value) })}
//         />
//         <input
//           type="text"
//           placeholder="Ticket Price"
//           className="input input-bordered w-full"
//           value={formData.ticketPrice}
//           onChange={(e) => setFormData({ ...formData, ticketPrice: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Image URL"
//           className="input input-bordered w-full"
//           value={formData.imageUrl}
//           onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
//         />
//         <button type="submit" className="btn btn-primary col-span-1 md:col-span-2">
//           {editingId ? "Update Event" : "Create Event"}
//         </button>
//       </form>

//       {/* Events Table */}
//       <div className="overflow-x-auto">
//         <table className="table table-zebra w-full">
//           <thead>
//             <tr>
//               <th>Title</th>
//               <th>Category</th>
//               <th>Type</th>
//               <th>Date</th>
//               <th>Venue</th>
//               <th>Price</th>
//               <th>Tickets</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {events?.map((event: Event) => (
//               <tr key={event.eventId}>
//                 <td>{event.title}</td>
//                 <td>{event.category}</td>
//                 <td>{event.eventType}</td>
//                 <td>{event.date}</td>
//                 <td>{event.venueId}</td>
//                 <td>Ksh {event.ticketPrice}</td>
//                 <td>{event.ticketsTotal}</td>
//                 <td className="flex gap-2">
//                   <button className="btn btn-xs btn-info" onClick={() => handleEdit(event)}>
//                     Edit
//                   </button>
//                   <button className="btn btn-xs btn-error" onClick={() => handleDelete(event.eventId)}>
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ManageEvents;




import {
  useGetAllEventsQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} from '../../features/api/eventsApi';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import type { Event } from "../../types/types"

type EventFormData = {
  title: string;
  description: string;
  venueId: number;
  category: string;
  date: string;
  time: string;
  ticketPrice: string;
  ticketsTotal: number;
  imageUrl: string;
  eventType: string;
  accessLevel: string;
};

const ManageEvents = () => {
  const { data: events, refetch } = useGetAllEventsQuery(undefined);
  const [createEvent] = useCreateEventMutation();
  const [updateEvent] = useUpdateEventMutation();
  const [deleteEvent] = useDeleteEventMutation();

  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    venueId: 1,
    category: '',
    date: '',
    time: '',
    ticketPrice: '',
    ticketsTotal: 0,
    imageUrl: '',
    eventType: 'Online',
    accessLevel: 'Free',
  });

  const [editingEventId, setEditingEventId] = useState<number | null>(null);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingEventId) {
        await updateEvent({ eventId: editingEventId, updatedData: formData });
        Swal.fire('Updated!', 'Event has been updated.', 'success');
      } else {
        await createEvent(formData);
        Swal.fire('Created!', 'Event has been created.', 'success');
      }
      setFormData({
        title: '',
        description: '',
        venueId: 1,
        category: '',
        date: '',
        time: '',
        ticketPrice: '',
        ticketsTotal: 0,
        imageUrl: '',
        eventType: 'Online',
        accessLevel: 'Free',
      });
      setEditingEventId(null);
    } catch (error) {
      Swal.fire('Error', 'Something went wrong.', 'error');
    }
  };

 const handleEdit = (event: Event) => {
  setFormData({
    title: event.title ?? '',
    description: event.description ?? '',
    venueId: event.venueId ?? 1,
    category: event.category ?? '',
    date: event.date ?? '',
    time: event.time ?? '',
    ticketPrice: event.ticketPrice?.toString() ?? '0',
    ticketsTotal: event.ticketsTotal ?? 0,
    imageUrl: event.imageUrl ?? '',
    eventType: event.eventType ?? 'Online',
    accessLevel: event.accessLevel ?? 'Free',
  });
  setEditingEventId(event.eventId);
};


  const handleDelete = async (eventId: number) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      await deleteEvent(eventId);
      Swal.fire('Deleted!', 'Event has been deleted.', 'success');
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Events</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 bg-white p-4 rounded shadow mb-8">
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required className="input input-bordered" />
        <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required className="input input-bordered" />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="textarea textarea-bordered col-span-2" />
        <input type="number" name="venueId" placeholder="Venue ID" value={formData.venueId} onChange={handleChange} required className="input input-bordered" />
        <input type="date" name="date" value={formData.date} onChange={handleChange} required className="input input-bordered" />
        <input type="time" name="time" value={formData.time} onChange={handleChange} required className="input input-bordered" />
        <input type="text" name="ticketPrice" placeholder="Ticket Price" value={formData.ticketPrice} onChange={handleChange} required className="input input-bordered" />
        <input type="number" name="ticketsTotal" placeholder="Total Tickets" value={formData.ticketsTotal} onChange={handleChange} required className="input input-bordered" />
        <input type="text" name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange} required className="input input-bordered" />
        <select name="eventType" value={formData.eventType} onChange={handleChange} className="select select-bordered">
          <option value="Online">Online</option>
          <option value="In-person">In-person</option>
        </select>
        <select name="accessLevel" value={formData.accessLevel} onChange={handleChange} className="select select-bordered">
          <option value="Free">Free</option>
          <option value="VIP">VIP</option>
        </select>
        <button type="submit" className="btn btn-primary col-span-2">{editingEventId ? 'Update Event' : 'Create Event'}</button>
      </form>

      {/* Events Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Venue</th>
              <th>Category</th>
              <th>Date</th>
              <th>Time</th>
              <th>Price</th>
              <th>Type</th>
              <th>Access</th>
              <th>Tickets</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events?.map((event:Event) => (
              <tr key={event.eventId}>
                <td>{event.title}</td>
                <td>{event.venueId}</td>
                <td>{event.category}</td>
                <td>{event.date}</td>
                <td>{event.time}</td>
                <td>{event.ticketPrice}</td>
                <td>{event.eventType}</td>
                <td>{event.accessLevel}</td>
                <td>{event.ticketsTotal}</td>
                <td className="flex gap-2">
                  <button onClick={() => handleEdit(event)} className="btn btn-sm btn-warning">Edit</button>
                  <button onClick={() => handleDelete(event.eventId)} className="btn btn-sm btn-error">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageEvents;

