import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Users from "./pages/Users";
import Login from "./pages/Login";

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
            <Route path="/users" element={<Users />} />
            {/* other routes */}
          </Routes>
        </main>
      </div>
    </div>
  );
}
 

export default App;
