// routes/PublicRoutes.tsx
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import { Register } from "../pages/Register";
import { Login } from "../pages/Login";
import Contact from "../pages/Contact";
import About from "../pages/About";
import { BrowseEvents } from "../pages/BrowseEvents";
import PayNowPage from "../pages/PayNowPage"; // <-- Make sure this exists
import TicketPage from "../pages/TicketPage"; // <-- Make sure this exists
import PublicLayout from "../Layouts/PublicLayout";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<BrowseEvents />} />
        <Route path="/pay-now" element={<PayNowPage />} />
        <Route path="/ticket" element={<TicketPage />} />
      </Route>
    </Routes>
  );
};

export default PublicRoutes;
