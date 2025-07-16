import MainNavbar from "../components/MainNavbar";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <>
      <MainNavbar />
      <Outlet />
    </>
  );
};

export default PublicLayout;
