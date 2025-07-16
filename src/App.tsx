// App.tsx
import { BrowserRouter as Router } from "react-router-dom";
import PublicRoutes from "./routes/PublicRoutes";
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";

function App() {
  return (
    <Router>
      <PublicRoutes />
      <UserRoutes />
      <AdminRoutes />
    </Router>
  );
}

export default App;
