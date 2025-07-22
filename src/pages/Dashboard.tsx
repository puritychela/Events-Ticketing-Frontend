

import { Outlet, NavLink } from 'react-router-dom';
import Footer from '../components/Footer';

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-base-100 text-gray-800">

      {/* Main Section: Sidebar + Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-blue-100 p-6 shadow-lg hidden md:block">
          <h2 className="text-xl font-bold mb-6 text-purple-700">User Dashboard</h2>
          <nav className="flex flex-col gap-4">
            <NavLink
              to="bookings"
              className={({ isActive }) =>
                `btn btn-sm ${isActive ? 'btn-primary' : 'btn-ghost'}`
              }
            >
              My Bookings
            </NavLink>
            <NavLink
              to="upcoming"
              className={({ isActive }) =>
                `btn btn-sm ${isActive ? 'btn-primary' : 'btn-ghost'}`
              }
            >
              Upcoming Events
            </NavLink>
            <NavLink
              to="profile"
              className={({ isActive }) =>
                `btn btn-sm ${isActive ? 'btn-primary' : 'btn-ghost'}`
              }
            >
              Profile Settings
            </NavLink>
            <NavLink
              to="support"
              className={({ isActive }) =>
                `btn btn-sm ${isActive ? 'btn-primary' : 'btn-ghost'}`
              }
            >
              Support
            </NavLink>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-white shadow-inner rounded-lg">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;
