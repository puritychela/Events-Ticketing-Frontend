import { useGetMyBookingsQuery, useUpdateBookingMutation } from "../../features/api/bookingApi";
import { PuffLoader } from "react-spinners";
import { FiEdit } from "react-icons/fi";
import Swal from "sweetalert2";
import type { BookingDetails } from "../../types/types";

const IMAGE_BASE_URL = "http://localhost:5173/uploads"; // Update as needed for production

const MyBookings = () => {
  const { data: bookings = [], isLoading, error } = useGetMyBookingsQuery();
  const [updateBooking] = useUpdateBookingMutation();

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "badge-success";
      case "cancelled":
        return "badge-error";
      case "pending":
        return "badge-warning";
      default:
        return "badge-primary";
    }
  };

  const handleCancelBooking = async (bookingId: number) => {
    Swal.fire({
      title: "Cancel Booking?",
      text: "This will cancel your reservation.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
      confirmButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await updateBooking({
            id: bookingId,
            data: { bookingStatus: "Cancelled" },
          }).unwrap();
          Swal.fire("Cancelled", res.message || "Booking cancelled", "success");
        } catch (err) {
          Swal.fire("Error", "Failed to cancel booking", "error");
        }
      }
    });
  };

  // 🔁 Group by eventId and aggregate quantity & totalAmount
  const groupedBookings = bookings.reduce(
    (acc: Record<number, BookingDetails>, booking: any) => {
      const eventId = booking.eventId;
      const existing = acc[eventId];

      const createdAtStr =
        typeof booking.createdAt === "string"
          ? booking.createdAt
          : new Date(booking.createdAt).toISOString();

      if (existing) {
        existing.quantity += Number(booking.quantity);
        existing.totalAmount += Number(booking.totalAmount);

        if (new Date(createdAtStr) > new Date(existing.createdAt)) {
          existing.bookingStatus = booking.bookingStatus;
          existing.createdAt = createdAtStr;
          existing.bookingId = booking.bookingId;
        }
      } else {
        acc[eventId] = {
          bookingId: booking.bookingId,
          eventId: booking.eventId,
          userId: booking.userId ?? booking.user_id,
          quantity: Number(booking.quantity),
          totalAmount: Number(booking.totalAmount),
          bookingStatus: booking.bookingStatus,
          createdAt: createdAtStr,
          event: {
            name: booking.event?.name ?? "",
            title: booking.event?.title ?? "",
            date: booking.event?.date ?? "",
            location: booking.event?.location ?? "",
            image: booking.event?.image ?? "",
          },
        };
      }

      return acc;
    },
    {}
  );

  const uniqueBookings = Object.values(groupedBookings);

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <PuffLoader color="#3b82f6" />
      </div>
    );
  }

  if (error || !bookings) {
    return <p className="text-red-500 text-center">Failed to load bookings.</p>;
  }

  if (uniqueBookings.length === 0) {
    return <p className="text-center text-gray-600">You have no bookings yet.</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">My Bookings</h1>

      {uniqueBookings.map((b) => {
        const imageName = b.event.image?.trim() || "";
        const validImage =
          imageName && !imageName.includes("undefined")
            ? imageName.startsWith("http")
              ? imageName
              : `${IMAGE_BASE_URL}/${imageName}`
            : "/placeholder.png";

        return (
          <div
            key={b.eventId}
            className="p-4 border rounded-lg shadow hover:shadow-md transition bg-white"
          >
            <div className="flex items-center gap-4 mb-2">
              <img
                src={validImage}
                alt={b.event.title || "Event Image"}
                className="w-24 h-24 rounded object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src !== "/placeholder.png") {
                    target.src = "/placeholder.png";
                  }
                }}
              />
              <div>
                <h2 className="text-xl font-semibold">{b.event.title}</h2>
                <p className="text-sm text-gray-500">{b.event.date}</p>
                <p className="text-sm text-gray-500">{b.event.location}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p><strong>Booking ID:</strong> {b.bookingId}</p>
                <p><strong>Tickets:</strong> {b.quantity}</p>
                <p><strong>Total:</strong> ${b.totalAmount.toFixed(2)}</p>
              </div>
              <div>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={`badge ${getStatusBadge(b.bookingStatus)}`}>
                    {b.bookingStatus}
                  </span>
                </p>
                <p><strong>Booked on:</strong> {new Date(b.createdAt).toLocaleString()}</p>
              </div>
            </div>

            {b.bookingStatus.toLowerCase() !== "cancelled" && (
              <div className="mt-4">
                <button
                  onClick={() => handleCancelBooking(b.bookingId)}
                  className="btn btn-sm btn-outline text-red-500 hover:bg-red-100"
                >
                  <FiEdit className="mr-2" />
                  Cancel Booking
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MyBookings;
