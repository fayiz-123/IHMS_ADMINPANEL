import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaClipboardList, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <FaTachometerAlt size={18} /> },
    { name: 'Users', path: '/admin/users', icon: <FaUsers size={18} /> },
    { name: 'Bookings', path: '/admin/bookings', icon: <FaClipboardList size={18} /> },
    { name: 'Logout', path: '/logout', icon: <FaSignOutAlt size={18} /> },
  ];

  return (
    <div className="h-screen w-64 bg-white shadow-md border-r flex flex-col">
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 ${
                isActive ? 'bg-gray-200 font-semibold' : ''
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
