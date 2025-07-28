// src/services/userApi.ts
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
    // 🔐 LOGIN
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    // 🔐 REGISTER
    registerUser: builder.mutation({
      query: (payload) => ({
        url: 'auth/register',
        method: 'POST',
        body: payload,
      }),
    }),

    // 🧑‍💻 CREATE USER (Admin)
    createUser: builder.mutation({
      query: (newUser) => ({
        url: 'users',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: ['users'],
    }),

    // 📥 GET USER BY ID
    getUserById: builder.query({
      query: (userId: number | string) => `users/${userId}`,
      providesTags: (_result, _error, userId) => [{ type: 'user', id: userId }],
    }),

    // 📋 GET ALL USERS
    getAllUsers: builder.query({
      query: () => 'users',
      providesTags: ['users'],
    }),

    // 🛠️ UPDATE USER (Admin or profile)
    updateUserProfile: builder.mutation({
      query: ({ userId, ...patch }) => ({
        url: `users/${userId}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: ['users'],
    }),

    // 🖼️ UPDATE PROFILE PICTURE
    updateProfilePicture: builder.mutation({
      query: ({ userId, formData }) => ({
        url: `users/${userId}/profile_picture`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: (_result, _error, { userId }) => [
        { type: 'user', id: userId },
        'users',
      ],
    }),

    // 🗑️ DELETE USER
    deleteUserProfile: builder.mutation({
      query: (userId: number | string) => ({
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

// ✅ Export RTK hooks
export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useCreateUserMutation,
  useGetUserByIdQuery,
  useGetAllUsersQuery,
  useUpdateUserProfileMutation,
  useUpdateProfilePictureMutation, // 👈 new
  useDeleteUserProfileMutation,
} = userApi;
