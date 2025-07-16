// import { FiEdit } from "react-icons/fi";
// import { useSelector } from "react-redux";
// import type { RootState } from "../../app/store";
// import { PuffLoader } from "react-spinners";
// import Swal from "sweetalert2";
// import { bookingApi } from "../../features/api/bookingApi";
// import type { BookingDetails } from "../../types/types";

// export const MyBookings = () => {
//   const { isAuthenticated, user } = useSelector((state: RootState) => state.auth.user);
//   const userId = user?.userId;

//   const [updateBooking] = bookingApi.useCreateBookingMutation();

//   const { data: bookings = [], isLoading, error } = bookingApi.useGetBookingsByUserQuery(userId, {
//     skip: !isAuthenticated,
//   });

//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case "confirmed": return "badge-success";
//       case "canceled": return "badge-error";
//       case "pending": return "badge-warning";
//       default: return "badge-primary";
//     }
//   };

//   const handleCancelBooking = async (bookingId: number) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You want to cancel this booking?",
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonColor: "#2563eb",
//       cancelButtonColor: "#f44336",
//       confirmButtonText: "Yes, cancel it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           const payload = { bookingId, bookingStatus: "canceled" };
//           const res = await updateBooking(payload).unwrap();
//           Swal.fire("Canceled!", res.message, "success");
//         } catch (err) {
//           Swal.fire("Error", "Failed to cancel booking", "error");
//         }
//       }
//     });
//   };

//   return (
//     <>
//       <div className="text-2xl font-bold text-center mb-4 text-blue-500">My Bookings</div>
//       <div className="overflow-x-auto">
//         <table className="table">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Event</th>
//               <th>Date</th>
//               <th>Booked On</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {error ? (
//               <tr><td colSpan={6}>Failed to fetch bookings</td></tr>
//             ) : isLoading ? (
//               <tr><td colSpan={6}><PuffLoader /></td></tr>
//             ) : bookings.length === 0 ? (
//               <tr><td colSpan={6}>No bookings available</td></tr>
//             ) : (
//               bookings.map((booking: BookingDetails) => (
//                 <tr key={booking.bookingId}>
//                   <td>{booking.bookingId}</td>
//                   <td>
//                     <div className="flex items-center gap-3">
//                       <img src={booking.event.image} alt={booking.event.title} className="w-12 h-12 rounded" />
//                       <div>
//                         <div className="font-bold">{booking.event.title}</div>
//                         <div className="text-sm opacity-70">{booking.event.location}</div>
//                       </div>
//                     </div>
//                   </td>
//                   <td>{booking.event.date}</td>
//                   <td>{booking.createdAt}</td>
//                   <td>
//                     <div className={`badge badge-outline ${getStatusBadge(booking.bookingStatus)}`}>
//                       {booking.bookingStatus}
//                     </div>
//                   </td>
//                   <td>
//                     <button className="btn btn-sm btn-outline text-blue-600 hover:text-blue-400"
//                       onClick={() => handleCancelBooking(booking.bookingId)}>
//                       <FiEdit />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };
// import React from 'react';
import { useGetMyBookingsQuery } from '../../features/api/bookingApi';

const MyBookings = () => {
  const { data: bookings, isLoading } = useGetMyBookingsQuery();

  if (isLoading) return <p>Loading your bookings...</p>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
      {bookings?.length === 0 && <p>No bookings yet.</p>}
      {bookings?.map((b) => (
        <div key={b.bookingId} className="p-4 border rounded shadow">
          <p><strong>Event:</strong> {b.event?.name}</p>
          <p><strong>Date:</strong> {b.event?.date}</p>
          <p><strong>Status:</strong> {b.bookingStatus}</p>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;


