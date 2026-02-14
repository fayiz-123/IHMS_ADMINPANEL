import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Bookings from "./pages/Bookings";
import UserDetails from "./pages/userDetails";


import Dashboard from "./pages/Dashboard";


function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  if (isLoginPage) return <Login />;

  return (
    <div className="flex flex-col h-screen">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4">
          <Routes>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
             <Route path="/bookings" element={<Bookings />} />
             <Route path="/user/:userId" element={<UserDetails />} />
             
            {/* other routes */}
          </Routes>
        </main>
      </div>
    </div>
  );
}
 

export default App;
