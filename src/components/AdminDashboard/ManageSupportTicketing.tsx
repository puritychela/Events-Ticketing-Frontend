import {
  useGetAllTicketsQuery,
  useUpdateTicketMutation,
  useDeleteTicketMutation,
  useCreateTicketMutation,
} from "../../features/api/supportTicketApi";
import { useState, type FormEvent } from "react";
import Swal from "sweetalert2";
import { FiTrash2, FiEdit, FiPlus } from "react-icons/fi";

type Ticket = {
  ticketId: number;
  userId: number;
  subject: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

const statusOptions = ["Open", "In Progress", "Resolved", "Closed"];

export const ManageTickets = () => {
  const { data: tickets, isLoading, refetch } = useGetAllTicketsQuery({});
  const [createTicket] = useCreateTicketMutation();
  const [updateTicket] = useUpdateTicketMutation();
  const [deleteTicket] = useDeleteTicketMutation();

  const [editingTicketId, setEditingTicketId] = useState<number | null>(null);
  const [statusUpdate, setStatusUpdate] = useState("");

  const [newTicket, setNewTicket] = useState({
    userId: 0,
    subject: "",
    description: "",
    status: "Open",
  });

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    const { userId, subject, description, status } = newTicket;

    if (!userId || !subject || !description || !status) {
      Swal.fire("Validation", "All fields are required", "warning");
      return;
    }

    try {
      await createTicket(newTicket).unwrap();
      Swal.fire("Success", "Support ticket created", "success");
      setNewTicket({ userId: 0, subject: "", description: "", status: "Open" });
      refetch();
    } catch (err) {
      Swal.fire("Error", "Failed to create ticket", "error");
    }
  };

  const handleStatusChange = async (ticketId: number) => {
    try {
      await updateTicket({ ticketId, updates: { status: statusUpdate } }).unwrap();
      Swal.fire("Updated", "Ticket status updated", "success");
      setEditingTicketId(null);
    } catch (err) {
      Swal.fire("Error", "Could not update ticket", "error");
    }
  };

  const handleDelete = async (ticketId: number) => {
    const confirm = await Swal.fire({
      title: "Delete Ticket?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (confirm.isConfirmed) {
      await deleteTicket(ticketId).unwrap();
      Swal.fire("Deleted", "Ticket removed successfully", "success");
      refetch();
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Support Ticket Management</h2>

      {/* Ticket Creation Form */}
      <form onSubmit={handleCreate} className="bg-base-100 shadow p-4 mb-6 rounded space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <FiPlus /> Create New Ticket
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="number"
            className="input input-bordered"
            placeholder="User ID"
            value={newTicket.userId}
            onChange={(e) => setNewTicket({ ...newTicket, userId: Number(e.target.value) })}
            required
          />
          <input
            type="text"
            className="input input-bordered"
            placeholder="Subject"
            value={newTicket.subject}
            onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
            required
          />
          <input
            type="text"
            className="input input-bordered"
            placeholder="Description"
            value={newTicket.description}
            onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
            required
          />
          <select
            className="select select-bordered"
            value={newTicket.status}
            onChange={(e) => setNewTicket({ ...newTicket, status: e.target.value })}
            required
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Submit Ticket</button>
      </form>

      {/* Ticket List Table */}
      {isLoading ? (
        <p>Loading tickets...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Subject</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets?.map((ticket: Ticket) => (
                <tr key={ticket.ticketId}>
                  <td>{ticket.ticketId}</td>
                  <td>{ticket.userId}</td>
                  <td>{ticket.subject}</td>
                  <td>
                    {editingTicketId === ticket.ticketId ? (
                      <div className="flex items-center gap-2">
                        <select
                          className="select select-bordered select-sm"
                          value={statusUpdate}
                          onChange={(e) => setStatusUpdate(e.target.value)}
                        >
                          <option value="">Choose</option>
                          {statusOptions.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => handleStatusChange(ticket.ticketId)}
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <span className="badge badge-outline">{ticket.status}</span>
                    )}
                  </td>
                  <td>{new Date(ticket.createdAt).toLocaleDateString()}</td>
                  <td className="flex gap-2">
                    <button
                      className="btn btn-xs btn-info"
                      onClick={() => {
                        setEditingTicketId(ticket.ticketId);
                        setStatusUpdate(ticket.status);
                      }}
                    >
                      <FiEdit />
                    </button>
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => handleDelete(ticket.ticketId)}
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
