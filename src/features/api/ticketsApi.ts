// src/features/api/ticketApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ticketApi = createApi({
  reducerPath: 'ticketApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api', // Change this to your backend base URL
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token; // If using token auth
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchTicketForBooking: builder.query<any, number>({
      query: (bookingId) => `/tickets/booking/${bookingId}`, // Adjust based on backend route
    }),
  }),
});

export const { useFetchTicketForBookingQuery } = ticketApi;
