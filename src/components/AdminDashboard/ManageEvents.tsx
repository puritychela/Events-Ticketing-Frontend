import { useState, type FormEvent } from "react";
import { FiEdit, FiTrash, FiPlus } from "react-icons/fi";
import Swal from "sweetalert2";
import {
  useGetAllEventsQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} from "../../features/api/eventsApi";
import  { type Event } from "../../types/types";

const initialFormData: Event = {
  eventId: 0,
  title: "",
  description: "",
  venueId: 1,
  category: "",
  eventType: "",
  accessLevel: "",
  date: "",
  time: "",
  ticketPrice: "",
  ticketsTotal: 0,
  ticketsSold: 0,
  imageUrl: "",
  createdAt: "",
  updatedAt: "",
};

export const ManageEvents = () => {
  const { data: events = [], refetch } = useGetAllEventsQuery(undefined);
  const [createEvent] = useCreateEventMutation();
  const [updateEvent] = useUpdateEventMutation();
  const [deleteEvent] = useDeleteEventMutation();

  const [formData, setFormData] = useState<Partial<Event>>(initialFormData);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        ticketsTotal: Number(formData.ticketsTotal) || 0,
        ticketPrice: formData.ticketPrice || "0",
        venueId: Number(formData.venueId) || 1,
      } as Event;

      if (editingId) {
        await updateEvent({ eventId: editingId, updatedData: payload }).unwrap();
        Swal.fire("Success", "Event updated successfully", "success");
      } else {
        await createEvent(payload).unwrap();
        Swal.fire("Success", "Event created successfully", "success");
      }

      setFormData(initialFormData);
      setEditingId(null);
      refetch();
    } catch (err: any) {
      Swal.fire("Error", err?.message || "Something went wrong", "error");
    }
  };

  const handleEdit = (event: Event) => {
    setFormData(event);
    setEditingId(event.eventId);
  };

  const handleDelete = async (eventId: number) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the event.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await deleteEvent(eventId).unwrap();
        Swal.fire("Deleted!", "Event has been deleted.", "success");
        refetch();
      } catch {
        Swal.fire("Error", "Could not delete event", "error");
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
        <FiPlus /> Manage Events
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required className="input input-bordered" />
        <input name="description" value={formData.description} onChange={handleChange} placeholder="Description" required className="input input-bordered" />
        <input name="venueId" value={formData.venueId} onChange={handleChange} placeholder="Venue ID" type="number" required className="input input-bordered" />
        <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" className="input input-bordered" />
        <input name="eventType" value={formData.eventType} onChange={handleChange} placeholder="Event Type" className="input input-bordered" />
        <input name="accessLevel" value={formData.accessLevel} onChange={handleChange} placeholder="Access Level" className="input input-bordered" />
        <input name="date" type="date" value={formData.date} onChange={handleChange} required className="input input-bordered" />
        <input name="time" type="time" value={formData.time} onChange={handleChange} required className="input input-bordered" />
        <input name="ticketPrice" value={formData.ticketPrice} onChange={handleChange} placeholder="Ticket Price" className="input input-bordered" />
        <input name="ticketsTotal" type="number" value={formData.ticketsTotal} onChange={handleChange} placeholder="Total Tickets" className="input input-bordered" />
        <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Image URL" className="input input-bordered" />

        <button type="submit" className="btn btn-primary col-span-1 md:col-span-2">
          {editingId ? "Update Event" : "Create Event"}
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Venue ID</th>
              <th>Date</th>
              <th>Time</th>
              <th>Price</th>
              <th>Tickets</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event: { eventId: any; title: any; venueId: any; date: any; time: any; ticketPrice: any; ticketsSold: any; ticketsTotal: any; description?: string; category?: string; eventType?: string | undefined; accessLevel?: string | undefined; imageUrl?: string; createdAt?: string; updatedAt?: string; }) => (
              <tr key={event.eventId}>
                <td>{event.title}</td>
                <td>{event.venueId}</td>
                <td>{event.date}</td>
                <td>{event.time}</td>
                <td>KES {event.ticketPrice}</td>
                <td>
                  {event.ticketsSold} / {event.ticketsTotal}
                </td>
                <td className="flex gap-2">
                  <button onClick={() => handleEdit(event)} className="btn btn-sm btn-warning">
                    <FiEdit />
                  </button>
                  <button onClick={() => handleDelete(event.eventId)} className="btn btn-sm btn-error">
                    <FiTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
