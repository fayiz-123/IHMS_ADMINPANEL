import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-4 py-3 flex items-center justify-between w-full">
      {/* Left: Logo + Title */}
      <div className="flex items-center gap-3">
        <img src="images/IHMS.png" alt="IHMS Logo" className="w-10 h-10 object-cover rounded-full" />
        <span className="text-xl font-semibold text-gray-800">IHMS Admin Panel</span>
      </div>

      {/* Right: Admin User Section */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600 hidden sm:block">Welcome, Admin</span>
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-bold">
          A
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
