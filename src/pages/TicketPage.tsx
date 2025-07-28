import { useLocation } from 'react-router-dom';
import { useFetchTicketForBookingQuery } from '../features/api/ticketsApi'; // assume exists

const TicketPage = () => {
const { state } = useLocation(); // contains bookingId
const { data: ticket, isLoading } = useFetchTicketForBookingQuery(state.bookingId);

if (isLoading) return <p>Loading ticket...</p>;
if (!ticket) return <p>No ticket found.</p>;


  return (
    <div className="max-w-lg mx-auto p-8 border rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-4">Your Ticket</h2>
      <p><strong>Event:</strong> {ticket.eventName}</p>
      <p><strong>Date:</strong> {ticket.date}</p>
      <p><strong>Venue:</strong> {ticket.venue}</p>
      <p><strong>Booking ID:</strong> {ticket.bookingId}</p>
      <p><strong>Seat:</strong> {ticket.seatNumber}</p>
      <div className="mt-4 text-green-600 font-bold">✔ Paid via M-Pesa</div>
    </div>
  );
};

export default TicketPage;
