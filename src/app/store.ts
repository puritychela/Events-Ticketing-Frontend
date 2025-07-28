import { configureStore } from '@reduxjs/toolkit';
import { eventsApi } from '../features/api/eventsApi';
import authReducer from '../features/auth/authSlice';
import { bookingApi } from "../features/api/bookingApi";
import { userApi } from '../features/api/userApi';
import { supportTicketApi } from '../features/api/supportTicketApi';
import { venueApi } from '../features/api/venueApi';
import { paymentApi } from '../features/api/paymentApi';
import { ticketApi } from '../features/api/ticketsApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer, // ✅ Add authApi reducer
    [userApi.reducerPath]: userApi.reducer,
    [supportTicketApi.reducerPath]:supportTicketApi.reducer,
    [venueApi.reducerPath]:venueApi.reducer,
    [paymentApi.reducerPath]:paymentApi.reducer,
    [ticketApi.reducerPath]:ticketApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(eventsApi.middleware,bookingApi.middleware,userApi.middleware,supportTicketApi.middleware,venueApi.middleware,paymentApi.middleware,ticketApi.middleware)
      
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


