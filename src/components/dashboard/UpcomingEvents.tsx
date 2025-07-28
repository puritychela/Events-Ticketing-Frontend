import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreateBookingMutation } from "../../features/api/bookingApi";
import type { RootState } from "../../app/store";
import { BrowseEvents } from "../../pages/BrowseEvents"; // Adjust the path as needed

const UpcomingEvents = () => {
  const [createBooking] = useCreateBookingMutation();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const navigate = useNavigate();

  const handleBooking = async (eventId: number, amount: number) => {
    if (!isAuthenticated) {
      alert("Please log in to book an event.");
      return;
    }

    try {
      const bookingPayload = {
        eventId,
        quantity: 1,
      };

      const res = await createBooking(bookingPayload).unwrap();
      const bookingId = res.bookingId;

      navigate("/pay-now", {
        state: {
          bookingId,
          amount,
        },
      });
    } catch (err: any) {
      alert(err?.data?.message || "❌ Booking failed. Please try again.");
    }
  };

  return (
    <div className="px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">🎉 Upcoming Events</h2>
      {/* Reusing BrowseEvents and injecting booking logic */}
      <BrowseEvents onBook={handleBooking} />
    </div>
  );
};

export default UpcomingEvents;
