import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [adminName, setAdminName] = useState();
  const baseApiUrl = import.meta.env.VITE_SERVER_API;

  useEffect(() => {
    axios
      .get(`${baseApiUrl}/admin/me`, { withCredentials: true })
      .then((res) => {
        setAdminName(res.data.adminProfile);
      })
      .catch((err) => {
        console.error("Error fetching adminName:", err);
      });
  }, []);

  return (
    <nav className="bg-white shadow-md px-4 py-3 flex flex-wrap items-center justify-between w-full">
      {/* Left: Logo + Title */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        <img
          src="images/IHMS.png"
          alt="IHMS Logo"
          className="w-8 h-8 sm:w-10 sm:h-10 object-cover rounded-full"
        />
        <span className="text-sm sm:text-xl font-semibold text-gray-800 whitespace-nowrap">
          IHMS Admin Panel
        </span>
      </div>

      {/* Right: Admin User Section */}
      <div className="flex items-center gap-2 sm:gap-3 mt-2 sm:mt-0 flex-shrink-0">
        <span className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">
          Welcome, {adminName?.name || "Admin"}
        </span>
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-bold">
          {adminName?.name ? adminName.name.charAt(0).toUpperCase() : "A"}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
