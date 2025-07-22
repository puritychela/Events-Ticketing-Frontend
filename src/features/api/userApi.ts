import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
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
  tagTypes: ['users', 'user'],
  endpoints: (builder) => ({
    // LOGIN
    loginUser: builder.mutation({
      query: (userLoginCredentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: userLoginCredentials,
      }),
    }),

    // REGISTER
    registerUser: builder.mutation({
      query: (userRegisterPayload) => ({
        url: 'auth/register',
        method: 'POST',
        body: userRegisterPayload,
      }),
    }),

    // CREATE USER (Admin-side create)
    createUser: builder.mutation({
      query: (newUserData) => ({
        url: 'users',
        method: 'POST',
        body: newUserData,
      }),
      invalidatesTags: ['users'],
    }),

    // GET USER BY ID
    getUserById: builder.query({
      query: (userId: number) => `users/${userId}`,
      providesTags: (_result, _error, userId) => [{ type: 'user', id: userId }],
    }),

    // ✅ GET ALL USERS (renamed hook)
    getAllUsers: builder.query({
      query: () => 'users',
      providesTags: ['users'],
    }),

    // UPDATE USER
    updateUserProfile: builder.mutation({
      query: ({ userId, data }) => ({
        url: `users/${userId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { userId }) => [
        { type: 'user', id: userId },
        'users',
      ],
    }),

    // DELETE USER
    deleteUserProfile: builder.mutation({
      query: (userId: number) => ({
        url: `users/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, userId) => [
        { type: 'user', id: userId },
        'users',
      ],
    }),
  }),
});

// ✅ Export hooks (renamed `useGetAllUsersQuery`)
export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useCreateUserMutation,
  useGetUserByIdQuery,
  useGetAllUsersQuery, // renamed
  useUpdateUserProfileMutation,
  useDeleteUserProfileMutation,
} = userApi;
