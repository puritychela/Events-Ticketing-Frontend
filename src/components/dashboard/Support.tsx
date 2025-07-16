import SubmitTicketForm from "./../support/SubmitTicketForm";
import MySupportTickets from "./../support/MySupportTickets";
import { getUserFromToken } from "../../utils/decodeToken"; // 👈 use your utility

const Support = () => {
  const user = getUserFromToken(); // 🔐 Decode user from JWT token
  const userId = user?.userId;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Support Center</h2>
      {userId !== undefined && <SubmitTicketForm userId={userId} />}
      <hr className="my-6" />
      <h3 className="text-xl font-semibold mb-2">My Tickets</h3>
      {userId !== undefined && <MySupportTickets userId={userId} />}
    </div>
  );
};

export default Support;

