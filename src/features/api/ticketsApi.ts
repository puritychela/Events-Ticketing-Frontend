// features/api/ticketApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ticketApi = createApi({
  reducerPath: 'ticketApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMyTickets: builder.query({
      query: () => '/tickets/my-tickets',
    }),
  }),
});

export const { useGetMyTicketsQuery } = ticketApi;

