import { FiCalendar, FiUser, FiHelpCircle } from "react-icons/fi";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-2xl font-semibold text-blue-700">
        👋 Welcome back, User!
        <p className="text-base text-gray-500 font-normal mt-1">
          Here's a summary of your recent activity and upcoming events.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-100 p-6 rounded-2xl shadow-md">
          <h3 className="text-lg font-bold text-blue-700 mb-2 flex items-center gap-2">
            <FiUser className="text-blue-700" />
            Total Bookings
          </h3>
          <p className="text-3xl font-semibold text-blue-900">12</p>
        </div>
        <div className="bg-purple-100 p-6 rounded-2xl shadow-md">
          <h3 className="text-lg font-bold text-purple-700 mb-2 flex items-center gap-2">
            <FiCalendar className="text-purple-700" />
            Upcoming Events
          </h3>
          <p className="text-3xl font-semibold text-purple-900">3</p>
        </div>
        <div className="bg-green-100 p-6 rounded-2xl shadow-md">
          <h3 className="text-lg font-bold text-green-700 mb-2 flex items-center gap-2">
            <FiHelpCircle className="text-green-700" />
            Support Tickets
          </h3>
          <p className="text-3xl font-semibold text-green-900">1 Open</p>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white shadow rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-blue-700">Recent Bookings</h2>
          <Link
            to="/dashboard/bookings"
            className="text-sm text-blue-600 hover:underline"
          >
            View All
          </Link>
        </div>
        <ul className="space-y-4">
          <li className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-700">🎤 Music Fiesta 2025</span>
            <span className="text-sm text-gray-500">July 30, 2025</span>
          </li>
          <li className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-700">🎬 Film Night Gala</span>
            <span className="text-sm text-gray-500">August 2, 2025</span>
          </li>
          <li className="flex justify-between items-center">
            <span className="text-gray-700">📚 Tech Expo Conference</span>
            <span className="text-sm text-gray-500">August 10, 2025</span>
          </li>
        </ul>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/dashboard/upcoming"
          className="bg-blue-500 text-white p-4 rounded-xl flex items-center gap-4 hover:bg-blue-600 transition"
        >
          <FiCalendar className="text-2xl" />
          <span>View Upcoming Events</span>
        </Link>

        <Link
          to="/dashboard/support"
          className="bg-green-500 text-white p-4 rounded-xl flex items-center gap-4 hover:bg-green-600 transition"
        >
          <FiHelpCircle className="text-2xl" />
          <span>Contact Support</span>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
