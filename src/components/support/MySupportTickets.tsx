import {
  useGetUserTicketsQuery,
  useDeleteTicketMutation,
} from "../../features/api/supportTicketApi";

interface SupportTicket {
  ticketId: number;
  userId: number;
  subject: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const getStatusBadgeClass = (status: string) => {
  switch (status.toLowerCase()) {
    case "resolved":
      return "badge-success"; // green
    case "pending":
      return "badge-warning"; // yellow
    case "closed":
      return "badge-error"; // red
    case "open":
    default:
      return "badge-info"; // blue
  }
};

const MySupportTickets = ({ userId }: { userId: number }) => {
  const { data: tickets = [], isLoading } = useGetUserTicketsQuery(userId);
  const [deleteTicket] = useDeleteTicketMutation();

  if (isLoading) return <p>Loading your support tickets...</p>;

  return (
    <div className="space-y-4">
      {tickets.length === 0 ? (
        <p className="text-gray-500">No support tickets found.</p>
      ) : (
        tickets.map((ticket: SupportTicket) => (
          <div key={ticket.ticketId} className="border p-4 rounded shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">{ticket.subject}</h3>
                <p className="text-sm text-gray-700">{ticket.description}</p>
                <div className="mt-2">
                  <span className={`badge ${getStatusBadgeClass(ticket.status)}`}>
                    {ticket.status}
                  </span>
                </div>
              </div>
              <button
                className="btn btn-sm btn-error"
                onClick={() => deleteTicket(ticket.ticketId)}
              >
                Delete
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Created: {new Date(ticket.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default MySupportTickets;
