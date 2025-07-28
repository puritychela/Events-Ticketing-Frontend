// features/api/eventApi.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Event } from '../../types/types';

export const eventsApi = createApi({
  reducerPath: 'eventApi',
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
  tagTypes: ['events', 'event'],
  endpoints: (builder) => ({
    // GET /events with optional filters
    getAllEvents: builder.query({
      query: (filters: Record<string, string> = {}) => {
        const params = new URLSearchParams(filters).toString();
        return `events${params ? `?${params}` : ''}`;
      },
      providesTags: ['events'],
    }),

    // GET /events/:id
    getEventById: builder.query({
      query: (id: number) => `events/${id}`,
      providesTags: (_res, _err, id) => [{ type: 'event', id }],
    }),

    // POST /events
    createEvent: builder.mutation({
      query: (newEvent) => ({
        url: 'events',
        method: 'POST',
        body: newEvent,
      }),
      invalidatesTags: ['events'],
    }),

    // PUT /events/:id
updateEvent: builder.mutation<Event, { eventId: number; updatedData: Partial<Omit<Event, 'eventId' | 'createdAt' | 'updatedAt' | 'ticketsSold'>> }>({
  query: ({ eventId, updatedData }) => ({
    url: `events/${eventId}`,
    method: 'PUT',
    body: updatedData,
  }),
  invalidatesTags: (_res, _err, { eventId }) => [
    { type: 'event', id: eventId },
    'events',
  ],
}),



    // DELETE /events/:id
    deleteEvent: builder.mutation({
      query: (id: number) => ({
        url: `events/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_res, _err, id) => [
        { type: 'event', id },
        'events',
      ],
    }),
  }),
});

export const {
  useGetAllEventsQuery,
  useGetEventByIdQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventsApi;
