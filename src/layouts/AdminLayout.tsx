import AdminNavbar from "../components/AdminNavbar";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <>
      <AdminNavbar />
      <Outlet />
    </>
  );
};

export default UserLayout;


