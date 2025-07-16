import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminDashboard from "../pages/AdminDashboard";
import ManageUsers from "../components/AdminDashboard/ManageUsers";
import ManageEvents from "../components/AdminDashboard/ManageEvents";
import { Analytics } from "../components/AdminDashboard/Analytics";
import ManageVenues from "../components/AdminDashboard/ManageVenues";
import ManageSupportTicketing from "../components/AdminDashboard/ManageSupportTicketing";
import AdminUserProfile from "../components/AdminDashboard/AdminUserProfile"; // ✅ Import it
import UserLayout from "../layouts/UserLayout";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="/adminDashboard"
        element={
          <ProtectedRoute adminOnly={true}>
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<ManageUsers />} />
        <Route path="events" element={<ManageEvents />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="venues" element={<ManageVenues />} />
        <Route path="supportTicketing" element={<ManageSupportTicketing />} />
        <Route path="profile" element={<AdminUserProfile />} /> {/* ✅ Add this line */}
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
