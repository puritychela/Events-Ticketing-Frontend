// // utils/groupBookings.ts
// import type { TBookingSelect } from "../types/types"; // adjust path

// export const groupBookingsByEvent = (bookings: TBookingSelect[]) => {
//   const grouped: Record<number, TBookingSelect> = {};

//   bookings.forEach((booking) => {
//     const eventId = booking.eventId;
//     if (grouped[eventId]) {
//       // Sum quantity and totalAmount
//       grouped[eventId].quantity += booking.quantity;
//       grouped[eventId].totalAmount =
//         Number(grouped[eventId].totalAmount) + Number(booking.totalAmount);
//     } else {
//       grouped[eventId] = { ...booking }; // Clone first occurrence
//     }
//   });

//   return Object.values(grouped);
// };
