// src/api/eventsApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const eventsApi = createApi({
  reducerPath: 'eventsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // GET /api/events – fetch all events (public or protected)
    getAllEvents: builder.query({
      query: () => '/events',
    }),

    // GET /api/events/:id – fetch event by ID
    getEventById: builder.query({
      query: (id: number) => `/events/${id}`,
    }),
  }),
});

export const {
  useGetAllEventsQuery,
  useGetEventByIdQuery,
} = eventsApi;
