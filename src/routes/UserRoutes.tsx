// routes/UserRoutes.tsx
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import Dashboard from "../pages/Dashboard";
import MyBookings from "../components/dashboard/MyBookings";
import UpcomingEvents from "../components/dashboard/UpcomingEvents";
import ProfileSettings from "../components/dashboard/UserProfile";
import Support from "../components/dashboard/Support";
import UserLayout from "../Layouts/UserLayout";

const UserRoutes = () => {
  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <UserLayout /> {/* 🟢 This is now the layout route with sidebar */}
          </ProtectedRoute>
        }
      >
        {/* 🧩 These render inside <Outlet /> in UserLayout */}
        <Route index element={<Dashboard />} />
        <Route path="bookings" element={<MyBookings />} />
        <Route path="upcoming" element={<UpcomingEvents />} />
        <Route path="profile" element={<ProfileSettings />} />
        <Route path="support" element={<Support />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
