// features/api/venueApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const venueApi = createApi({
  reducerPath: 'venueApi',
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
  tagTypes: ['venues', 'venue'],
  endpoints: (builder) => ({
    // GET ALL VENUES
    getAllVenues: builder.query({
      query: () => 'venues',
      providesTags: ['venues'],
    }),

    // GET VENUE BY ID
    getVenueById: builder.query({
      query: (venueId: number) => `venues/${venueId}`,
      providesTags: (_result, _error, venueId) => [{ type: 'venue', id: venueId }],
    }),

    // CREATE VENUE
    createVenue: builder.mutation({
      query: (venueData) => ({
        url: 'venues',
        method: 'POST',
        body: venueData,
      }),
      invalidatesTags: ['venues'],
    }),

    // UPDATE VENUE
    updateVenue: builder.mutation({
      query: ({ venueId, data }) => ({
        url: `venues/${venueId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { venueId }) => [
        { type: 'venue', id: venueId },
        'venues',
      ],
    }),

    // DELETE VENUE
    deleteVenue: builder.mutation({
      query: (venueId: number) => ({
        url: `venues/${venueId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, venueId) => [
        { type: 'venue', id: venueId },
        'venues',
      ],
    }),
  }),
});

// ✅ Export hooks
export const {
  useGetAllVenuesQuery,
  useGetVenueByIdQuery,
  useCreateVenueMutation,
  useUpdateVenueMutation,
  useDeleteVenueMutation,
} = venueApi;
