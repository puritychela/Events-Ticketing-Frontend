import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store"; // adjust path if needed

const UserNavbar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth); // get logged-in user

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="w-full bg-gray-900 text-white shadow-md">
      <div className="navbar px-4 max-w-full flex justify-between items-center">
        <Link to="/user/dashboard" className="text-xl font-bold text-blue-300">
          🎟️ My Dashboard
        </Link>

        <div className="flex items-center gap-4">
          <span className="hidden md:inline text-green-400 text-sm font-medium">
            👋 Hi, {user?.firstname}
          </span>

          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar flex items-center gap-2">
              <FaUserCircle className="text-2xl" />
            </div>
            <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 text-black rounded-box w-48">
              <li>
                <Link to="/user/profile" className="flex items-center gap-2">
                  <FaUser /> Profile
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="flex items-center gap-2">
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
