import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaClipboardList,
  FaSignOutAlt,
} from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";

const Sidebar = () => {
  const baseApiUrl = import.meta.env.VITE_SERVER_API;
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout!",
      cancelButtonText: "No, stay logged in",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.post(
            `${baseApiUrl}/admin/logout`,
            {},
            { withCredentials: true }
          );
          navigate("/");
          
        } catch (error) {
          console.error("Logout failed:", error);
        }
      }
    });
  };

  return (
    <div
      className="
        h-full w-16 sm:w-36 bg-white shadow-md border-r
        flex flex-col items-center sm:items-start
        transition-all duration-300 ease-in-out
        overflow-y-auto
      "
    >
      <nav className="flex-1 px-2 py-4 space-y-2 w-full">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-2 py-2 rounded-md text-gray-700 hover:bg-gray-100 w-full ${
              isActive ? "bg-gray-200 font-semibold" : ""
            }`
          }
        >
          <FaTachometerAlt size={18} />
          <span className="truncate hidden sm:inline">Dashboard</span>
        </NavLink>

        <NavLink
          to="/users"
          className={({ isActive }) =>
            `flex items-center gap-3 px-2 py-2 rounded-md text-gray-700 hover:bg-gray-100 w-full ${
              isActive ? "bg-gray-200 font-semibold" : ""
            }`
          }
        >
          <FaUsers size={18} />
          <span className="truncate hidden sm:inline">Users</span>
        </NavLink>

        <NavLink
          to="/admin/bookings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-2 py-2 rounded-md text-gray-700 hover:bg-gray-100 w-full ${
              isActive ? "bg-gray-200 font-semibold" : ""
            }`
          }
        >
          <FaClipboardList size={18} />
          <span className="truncate hidden sm:inline">Bookings</span>
        </NavLink>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-2 py-2 rounded-md text-gray-700 hover:bg-gray-100 w-full text-left cursor-pointer"
        >
          <FaSignOutAlt size={18} />
          <span className="truncate hidden sm:inline">Logout</span>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
