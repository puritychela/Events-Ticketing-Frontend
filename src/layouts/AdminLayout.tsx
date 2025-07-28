// import AdminNavbar from "../components/AdminNavbar";
// import { Outlet } from "react-router-dom";

// const AdminLayout = () => {
//   return (
//     <>
//       <AdminNavbar />
//       <Outlet />
//     </>
//   );
// };

// export default AdminLayout;


import { Outlet, NavLink } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';
import Footer from '../components/Footer';

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-base-100 text-gray-800">
      <AdminNavbar />

      <div className="flex flex-1">
        {/* Static Sidebar */}
        <aside className="w-64 bg-purple-100 p-6 shadow-lg hidden md:block">
          <h2 className="text-xl font-bold mb-6 text-purple-700">Admin Dashboard</h2>
          <nav className="flex flex-col gap-4">
            <NavLink
              to="users"
              className={({ isActive }) =>
                `btn btn-sm ${isActive ? 'btn-primary' : 'btn-ghost'}`
              }
            >
              Manage Users
            </NavLink>

            <NavLink
              to="profile"
              className={({ isActive }) =>
                `btn btn-sm ${isActive ? 'btn-primary' : 'btn-ghost'}`
              }
            >
              Admin Profile
            </NavLink>

            <NavLink
              to="events"
              className={({ isActive }) =>
                `btn btn-sm ${isActive ? 'btn-primary' : 'btn-ghost'}`
              }
            >
              Manage Events
            </NavLink>

            <NavLink
              to="venues"
              className={({ isActive }) =>
                `btn btn-sm ${isActive ? 'btn-primary' : 'btn-ghost'}`
              }
            >
              Manage Venues
            </NavLink>

            <NavLink
              to="supportTicketing"
              className={({ isActive }) =>
                `btn btn-sm ${isActive ? 'btn-primary' : 'btn-ghost'}`
              }
            >
              Support Tickets
            </NavLink>
            <NavLink
              to="ManagePayments"
              className={({ isActive }) =>
                `btn btn-sm ${isActive ? 'btn-primary' : 'btn-ghost'}`
              }
            >
              Manage Payments
            </NavLink>

            <NavLink
              to="analytics"
              className={({ isActive }) =>
                `btn btn-sm ${isActive ? 'btn-primary' : 'btn-ghost'}`
              }
            >
              Analytics
            </NavLink>
          </nav>
        </aside>

        {/* Main content rendered here */}
        <main className="flex-1 p-6 bg-white shadow-inner rounded-lg">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default AdminLayout;



