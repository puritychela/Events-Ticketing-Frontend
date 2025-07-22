import type { ReactNode } from "react";

export type Event = {
  eventId: number;
  title: string;
  description: string;
  venueId: number;
  category: string;
  eventType?: string;
  accessLevel?: string;
  date: string;
  time: string;
  ticketPrice: string;
  ticketsTotal: number;
  ticketsSold: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
};

export interface AuthState {
  user: null | any;
  token: string | null;
  isAuthenticated: boolean;
  userType: string | null;
}

export interface BookingDetails {
  bookingId: number;
  eventId: number;
  userId: number;
  quantity: number;
  totalAmount: number;
  bookingStatus: string;
  createdAt: string;
  event: {
    name: ReactNode;
    title: string;
    date: string;
    location: string;
    image: string;
  };
}

export interface Users {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
  updatedAt: string;
  profileUrl?: string;
}
// types/paymentTypes.ts
export interface Payment {
  paymentId: number;
  bookingId: number;
  amount: string;
  paymentStatus: "Pending" | "Completed" | "Failed" | "Refunded";
  paymentMethod: string;
  transactionId: string;
  paymentDate: string;
  createdAt: string;
  updatedAt: string;
}
