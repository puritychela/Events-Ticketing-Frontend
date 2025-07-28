// features/api/paymentApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Payment } from "../../types/types"; // define this type below

type DarajaPaymentRequest = {
  phone: string;
  amount: number;
  bookingId: number;
};

type DarajaPaymentResponse = {
  message: string;
  checkoutRequestID?: string;
};

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Payments"],
  endpoints: (builder) => ({
    getAllPayments: builder.query<Payment[], void>({
      query: () => "payments",
      providesTags: ["Payments"],
    }),

    getPaymentById: builder.query<Payment, number>({
      query: (id) => `payments/${id}`,
    }),

    createPayment: builder.mutation<Payment, Partial<Payment>>({
      query: (body) => ({
        url: "payments",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Payments"],
    }),

    updatePayment: builder.mutation<Payment, { id: number; data: Partial<Payment> }>({
      query: ({ id, data }) => ({
        url: `payments/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Payments"],
    }),

    deletePayment: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `payments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Payments"],
    }),

    /** 🌐 Call Daraja STK Push */
    payWithDaraja: builder.mutation<DarajaPaymentResponse, DarajaPaymentRequest>({
      query: (paymentData) => ({
        url: "darajaPayments/stkpush",
        method: "POST",
        body: paymentData,
      }),
    }),
  }),
});

export const {
  useGetAllPaymentsQuery,
  useGetPaymentByIdQuery,
  useCreatePaymentMutation,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
  usePayWithDarajaMutation, // ✅ export this
} = paymentApi;
