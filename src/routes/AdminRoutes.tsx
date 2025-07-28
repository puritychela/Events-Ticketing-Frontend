import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

// Layout
import AdminLayout from "../Layouts/AdminLayout";

// Admin Pages
import AdminDashboard from "../pages/AdminDashboard";
import ManageUsers from "../components/AdminDashboard/ManageUsers";
import ManageEvents from "../components/AdminDashboard/ManageEvents";
import Analytics from "../components/AdminDashboard/Analytics";
import  { ManagePayments } from "../components/AdminDashboard/ManagePayment";
import { ManageVenues } from "../components/AdminDashboard/ManageVenues";
import { ManageTickets } from "../components/AdminDashboard/ManageSupportTicketing";
import AdminUserProfile from "../components/AdminDashboard/AdminUserProfile";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="/adminDashboard"
        element={
          <ProtectedRoute adminOnly={true}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<ManageUsers />} />
        <Route path="events" element={<ManageEvents />} />
        <Route path="venues" element={<ManageVenues />} />
        <Route path="supportTicketing" element={<ManageTickets />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="ManagePayments" element={<ManagePayments />} />
        <Route path="profile" element={<AdminUserProfile />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
