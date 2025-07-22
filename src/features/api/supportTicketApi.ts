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

    // GET ALL TICKETS (Admin)
    getAllTickets: builder.query({
      query: () => 'support',
      providesTags: ['supportTickets'],
    }),

    // GET TICKET BY ID
    getTicketById: builder.query({
      query: (ticketId: number) => `support/${ticketId}`,
      providesTags: (_res, _err, id) => [{ type: 'supportTicket', id }],
    }),

    // UPDATE TICKET
    updateTicket: builder.mutation({
      query: ({ ticketId, updates }) => ({
        url: `support/${ticketId}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: (_res, _err, { ticketId }) => [
        { type: 'supportTicket', id: ticketId },
        'supportTickets',
      ],
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

// Export hooks
export const {
  useCreateTicketMutation,
  useGetUserTicketsQuery,
  useGetAllTicketsQuery,
  useGetTicketByIdQuery,
  useUpdateTicketMutation,
  useDeleteTicketMutation,
} = supportTicketApi;
