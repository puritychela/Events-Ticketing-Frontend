// import React from 'react';
// import { useGetAllUsersQuery } from '../../features/api/userApi';
// import { useGetAllVenuesQuery } from '../../features/api/venueApi';
// import { useGetAllEventsQuery } from '../../features/api/eventsApi';
// import { useGetAllBookingsQuery } from '../../features/api/bookingApi';
// import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
// import { Card, CardContent } from '@/components/ui/Card';

// const COLORS = ['#4ade80', '#facc15', '#f87171']; // Green, Yellow, Red

// const Analytics: React.FC = () => {
//   const { data: users } = useGetAllUsersQuery("");
//   const { data: venues } = useGetAllVenuesQuery("");
//   const { data: events } = useGetAllEventsQuery(undefined);
//   const { data: bookings } = useGetAllBookingsQuery();

//   const confirmedBookings = bookings?.filter(b => b.bookingStatus === 'Confirmed') || [];
//   const pendingBookings = bookings?.filter(b => b.bookingStatus === 'Pending') || [];
//   const cancelledBookings = bookings?.filter(b => b.bookingStatus === 'Cancelled') || [];

//   const revenue = confirmedBookings.reduce((total, booking) => {
//     const price = booking.event?.ticket_price || 0;
//     return total + price;
//   }, 0);

//   const bookingStatusData = [
//     { name: 'Confirmed', value: confirmedBookings.length },
//     { name: 'Pending', value: pendingBookings.length },
//     { name: 'Cancelled', value: cancelledBookings.length },
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
//       {/* Stats Cards */}
//       <Card>
//         <CardContent className="p-4">
//           <h2 className="text-lg font-semibold">Total Users</h2>
//           <p className="text-2xl">{users?.length || 0}</p>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardContent className="p-4">
//           <h2 className="text-lg font-semibold">Total Venues</h2>
//           <p className="text-2xl">{venues?.length || 0}</p>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardContent className="p-4">
//           <h2 className="text-lg font-semibold">Total Events</h2>
//           <p className="text-2xl">{events?.length || 0}</p>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardContent className="p-4">
//           <h2 className="text-lg font-semibold">Total Bookings</h2>
//           <p className="text-2xl">{bookings?.length || 0}</p>
//         </CardContent>
//       </Card>

//       <Card className="md:col-span-2">
//         <CardContent className="p-4">
//           <h2 className="text-lg font-semibold">Total Revenue</h2>
//           <p className="text-3xl text-green-600 font-bold">Ksh {revenue.toLocaleString()}</p>
//         </CardContent>
//       </Card>

//       {/* Booking Status Pie Chart */}
//       <Card className="md:col-span-2">
//         <CardContent className="p-4">
//           <h2 className="text-lg font-semibold mb-4">Booking Status Breakdown</h2>
//           <div className="h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={bookingStatusData}
//                   dataKey="value"
//                   nameKey="name"
//                   outerRadius={100}
//                   fill="#8884d8"
//                   label
//                 >
//                   {bookingStatusData.map((_, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Analytics;




// src/components/AdminDashboard/Analytics.tsx
import React from 'react';
import { useGetAllUsersQuery } from '../../features/api/userApi';
import { useGetAllVenuesQuery } from '../../features/api/venueApi';
import { useGetAllEventsQuery } from '../../features/api/eventsApi';
import { useGetAllBookingsQuery } from '../../features/api/bookingApi';
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
import StatCard from '../ui/StatCard';

const COLORS = ['#4ade80', '#facc15', '#f87171']; // Green, Yellow, Red

const Analytics: React.FC = () => {
  const { data: users } = useGetAllUsersQuery('');
  const { data: venues } = useGetAllVenuesQuery('');
  const { data: events } = useGetAllEventsQuery(undefined);
  const { data: bookings } = useGetAllBookingsQuery();

  const confirmedBookings = bookings?.filter(b => b.bookingStatus === 'Confirmed') || [];
  const pendingBookings = bookings?.filter(b => b.bookingStatus === 'Pending') || [];
  const cancelledBookings = bookings?.filter(b => b.bookingStatus === 'Cancelled') || [];

  const revenue = confirmedBookings.reduce((total, booking) => {
    const price = booking.event?.ticket_price || 0;
    return total + price;
  }, 0);

  const bookingStatusData = [
    { name: 'Confirmed', value: confirmedBookings.length },
    { name: 'Pending', value: pendingBookings.length },
    { name: 'Cancelled', value: cancelledBookings.length },
  ];

  // 🆕 Prepare line chart data: confirmed bookings over time
  const confirmedBookingTrends = confirmedBookings
    .map(b => {
      const date = new Date(b.created_at).toLocaleDateString();
      return { date, count: 1 };
    })
    .reduce((acc, curr) => {
      const existing = acc.find(item => item.date === curr.date);
      if (existing) {
        existing.count += 1;
      } else {
        acc.push(curr);
      }
      return acc;
    }, [] as { date: string; count: number }[]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      {/* Stats Cards */}
      <StatCard title="Total Users" value={users?.length || 0} />
      <StatCard title="Total Venues" value={venues?.length || 0} />
      <StatCard title="Total Events" value={events?.length || 0} />
      <StatCard title="Total Bookings" value={bookings?.length || 0} />

      <StatCard title="Total Revenue" className="md:col-span-2" value={''}>
        <p className="text-3xl text-green-600 font-bold">
          Ksh {revenue.toLocaleString()}
        </p>
      </StatCard>

      {/* Booking Status Pie Chart */}
      <StatCard title="Booking Status Breakdown" className="md:col-span-2" value={''}>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={bookingStatusData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {bookingStatusData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </StatCard>

      {/* 🆕 Line Chart for confirmed booking trends */}
      <StatCard title="Confirmed Bookings Over Time" className="md:col-span-2" value={''}>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={confirmedBookingTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#4ade80" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </StatCard>
    </div>
  );
};

export default Analytics;
