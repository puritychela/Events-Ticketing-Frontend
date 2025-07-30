import React from 'react';
import {
  useGetAllUsersQuery
} from '../../features/api/userApi';
import {
  useGetAllVenuesQuery
} from '../../features/api/venueApi';
import {
  useGetAllEventsQuery
} from '../../features/api/eventsApi';
import {
  useGetAllBookingsQuery
} from '../../features/api/bookingApi';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

const COLORS = ['#4ade80', '#facc15', '#f87171']; // Green, Yellow, Red

const Analytics: React.FC = () => {
  const { data: users } = useGetAllUsersQuery('');
  const { data: venues } = useGetAllVenuesQuery('');
  const { data: events } = useGetAllEventsQuery(undefined);
  const { data: bookings } = useGetAllBookingsQuery();

  const confirmed = bookings?.filter(b => b.bookingStatus === 'Confirmed') || [];
  const pending = bookings?.filter(b => b.bookingStatus === 'Pending') || [];
  const cancelled = bookings?.filter(b => b.bookingStatus === 'Cancelled') || [];

  const revenue = confirmed.reduce((total, booking) => {
    const price = booking.event?.ticket_price || 0;
    return total + price;
  }, 0);

  const bookingStatusData = [
    { name: 'Confirmed', value: confirmed.length },
    { name: 'Pending', value: pending.length },
    { name: 'Cancelled', value: cancelled.length },
  ];

  const confirmedTrends = confirmed
    .map(b => ({
      date: new Date(b.created_at).toLocaleDateString(),
      count: 1,
    }))
    .reduce((acc, curr) => {
      const existing = acc.find(i => i.date === curr.date);
      if (existing) existing.count += 1;
      else acc.push(curr);
      return acc;
    }, [] as { date: string; count: number }[]);

  return (
    <div className="p-6 space-y-6">
      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-indigo-100 text-indigo-900 rounded-2xl p-6 shadow">
          <h3 className="text-md font-semibold">Users</h3>
          <p className="text-3xl font-bold mt-2">{users?.length || 0}</p>
        </div>

        <div className="bg-rose-100 text-rose-900 rounded-2xl p-6 shadow">
          <h3 className="text-md font-semibold">Venues</h3>
          <p className="text-3xl font-bold mt-2">{venues?.length || 0}</p>
        </div>

        <div className="bg-amber-100 text-amber-900 rounded-2xl p-6 shadow">
          <h3 className="text-md font-semibold">Events</h3>
          <p className="text-3xl font-bold mt-2">{events?.length || 0}</p>
        </div>

        <div className="bg-cyan-100 text-cyan-900 rounded-2xl p-6 shadow">
          <h3 className="text-md font-semibold">Bookings</h3>
          <p className="text-3xl font-bold mt-2">{bookings?.length || 0}</p>
        </div>

        <div className="bg-emerald-100 text-emerald-900 rounded-2xl p-6 shadow col-span-1 sm:col-span-2 lg:col-span-1">
          <h3 className="text-md font-semibold">Revenue</h3>
          <p className="text-3xl font-bold mt-2">Ksh {revenue.toLocaleString()}</p>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h2 className="text-lg font-semibold mb-4">Booking Status Breakdown</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={bookingStatusData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {bookingStatusData.map((_, idx) => (
                  <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Line Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h2 className="text-lg font-semibold mb-4">Confirmed Bookings Over Time</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={confirmedTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#4ade80"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
