import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUsers, FaClipboardList, FaCheckCircle, FaSpinner } from "react-icons/fa";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    activeBookings: 0,
    recentBookings: []
  });
  const [loading, setLoading] = useState(true);
  const baseApiUrl = import.meta.env.VITE_SERVER_API;

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch Users and Bookings in parallel
      const [usersRes, bookingsRes] = await Promise.all([
        axios.get(`${baseApiUrl}/admin/getUsers`, { withCredentials: true }),
        axios.get(`${baseApiUrl}/admin/bookedServices`, { withCredentials: true })
      ]);

      const users = usersRes.data.allUsers || [];
      const bookings = bookingsRes.data.allBookings || [];

      // Calculate stats
      const totalUsers = users.length;
      const totalBookings = bookings.length;
      const activeBookings = bookings.filter(b => b.status === "booked" || b.status === "Confirmed").length;
      
      // Get 5 most recent bookings
      const recentBookings = [...bookings]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

      setStats({
        totalUsers,
        totalBookings,
        activeBookings,
        recentBookings
      });

    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 flex items-center">
          <div className="rounded-full bg-blue-100 p-3 mr-4">
            <FaUsers className="text-blue-600 text-xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Users</p>
            <h3 className="text-2xl font-bold text-gray-800">{stats.totalUsers}</h3>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 flex items-center">
          <div className="rounded-full bg-green-100 p-3 mr-4">
            <FaClipboardList className="text-green-600 text-xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Bookings</p>
            <h3 className="text-2xl font-bold text-gray-800">{stats.totalBookings}</h3>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 flex items-center">
          <div className="rounded-full bg-yellow-100 p-3 mr-4">
            <FaCheckCircle className="text-yellow-600 text-xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Active Bookings</p>
            <h3 className="text-2xl font-bold text-gray-800">{stats.activeBookings}</h3>
          </div>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Recent Bookings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium text-sm">
              <tr>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Service</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {stats.recentBookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{booking.name}</div>
                    <div className="text-xs text-gray-500">{booking.email}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 capitalize">{booking.service}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        booking.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : booking.status === "Booked" || booking.status === "booked"
                          ? "bg-blue-100 text-blue-700"
                          : booking.status === "Confirmed"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {booking.status === "booked" ? "Booked" : booking.status}
                    </span>
                  </td>
                </tr>
              ))}
              {stats.recentBookings.length === 0 && (
                 <tr>
                   <td colSpan="4" className="px-6 py-4 text-center text-gray-500">No recent bookings found</td>
                 </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
