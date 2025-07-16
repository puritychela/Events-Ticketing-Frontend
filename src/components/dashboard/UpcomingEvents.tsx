import { useSelector } from "react-redux";
import { useGetAllEventsQuery } from "../../features/api/eventsApi";
import { useCreateBookingMutation } from "../../features/api/bookingApi";
import type { RootState } from "../../app/store";

interface Event {
  eventId: number;
  title: string;
  description: string;
  date: string;
  time: string;
  ticketPrice: string;
  imageUrl?: string;
}

const UpcomingEvents = () => {
  const { data: events, isLoading } = useGetAllEventsQuery("");
  const [createBooking] = useCreateBookingMutation();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const handleBooking = async (eventId: number) => {
    if (!isAuthenticated) {
      alert("Please log in to book an event.");
      return;
    }

    try {
      await createBooking({ eventId, quantity: 1 }).unwrap();
      alert("🎉 Booking successful!");
    } catch (err: any) {
      alert(err?.data?.message || "❌ Booking failed. Please try again.");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
      {isLoading ? (
        <p>Loading events...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events?.map((event: Event) => (
            <div
              key={event.eventId}
              className="border p-4 shadow-md rounded-lg bg-white"
            >
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <p className="mb-2 text-gray-600">{event.description}</p>
              <p className="text-sm text-gray-500">
                📅 {event.date} | 🕒 {event.time}
              </p>
              <p className="text-sm text-gray-700 mb-3">
                💰 KES {event.ticketPrice}
              </p>
              <button
                onClick={() => handleBooking(event.eventId)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingEvents;
