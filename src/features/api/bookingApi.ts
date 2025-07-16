import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../../app/store'; // adjust path to your store

export const bookingApi = createApi({
  reducerPath: 'bookingApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.token || localStorage.getItem('token'); // check both sources
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (bookingPayload) => ({
        url: '/bookings',
        method: 'POST',
        body: bookingPayload,
      }),
    }),
    getMyBookings: builder.query({
      query: () => '/bookings/user/me',
    }),
  }),
});

export const { useCreateBookingMutation, useGetMyBookingsQuery } = bookingApi;
