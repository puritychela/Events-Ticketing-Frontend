import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const supportTicketApi = createApi({
  reducerPath: 'supportTicketApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['supportTickets', 'supportTicket'],
  endpoints: (builder) => ({
    // CREATE TICKET
    createTicket: builder.mutation({
      query: (ticket) => ({
        url: 'support',
        method: 'POST',
        body: ticket,
      }),
      invalidatesTags: ['supportTickets'],
    }),

    // GET USER TICKETS
    getUserTickets: builder.query({
      query: (userId: number) => `support/user/${userId}`,
      providesTags: ['supportTickets'],
    }),

    // DELETE TICKET
    deleteTicket: builder.mutation({
      query: (ticketId: number) => ({
        url: `support/${ticketId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['supportTickets'],
    }),
  }),
});

export const {
  useCreateTicketMutation,
  useGetUserTicketsQuery,
  useDeleteTicketMutation,
} = supportTicketApi;
