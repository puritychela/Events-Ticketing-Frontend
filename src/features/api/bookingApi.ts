import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../../app/store'; // Adjust path as needed
import type { ReactNode } from 'react';

// Define types if needed
interface Booking {
  totalAmount: ReactNode;
  createdAt: string | number | Date;
  message: string;
  quantity: ReactNode;
  amount: number;
  created_at: string | number | Date;
  bookingId: number;
  event: any;
  bookingStatus: string;
  id: number;
  eventId: number;
  user_id: number;
  status: string;
  // Add other relevant fields
}

interface CreateBookingPayload {
  eventId: number;
  quantity: number;
  // Add other booking creation fields
}

export const bookingApi = createApi({
  reducerPath: 'bookingApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.token || localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Bookings'],
  endpoints: (builder) => ({
    // 🟢 Create booking
    createBooking: builder.mutation<Booking, CreateBookingPayload>({
      query: (bookingPayload) => ({
        url: '/bookings',
        method: 'POST',
        body: bookingPayload,
      }),
      invalidatesTags: ['Bookings'],
    }),

    // 🔵 Get all bookings (Admin)
    getAllBookings: builder.query<Booking[], void>({
      query: () => '/bookings',
      providesTags: ['Bookings'],
    }),

    // 🔵 Get my bookings (User)
    getMyBookings: builder.query<Booking[], void>({
      query: () => '/bookings/user/me',
      providesTags: ['Bookings'],
    }),

    // 🔵 Get booking by ID
    getBookingById: builder.query<Booking, number>({
      query: (id) => `/bookings/${id}`,
      providesTags: (_result, _err, id) => [{ type: 'Bookings', id }],
    }),

    // 🟡 Update booking
    updateBooking: builder.mutation<Booking, { id: number; data: Partial<Booking> }>({
      query: ({ id, data }) => ({
        url: `/bookings/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _err, { id }) => [{ type: 'Bookings', id }],
    }),

    // 🔴 Delete booking
    deleteBooking: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `/bookings/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _err, id) => [{ type: 'Bookings', id }],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetAllBookingsQuery,
  useGetMyBookingsQuery,
  useGetBookingByIdQuery,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
} = bookingApi;
