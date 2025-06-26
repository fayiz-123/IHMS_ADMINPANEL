import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQurey, setSeacrhQuery] = useState("");
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();
  const baseApiUrl = import.meta.env.VITE_SERVER_API;

  // Initial fetch
  useEffect(() => {
    fetchAllBookings();
  }, []);

  const fetchAllBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${baseApiUrl}/admin/bookedServices`, {
        withCredentials: true,
      });
      setBookings(res.data.allBookings);
      setLoading(false);
    } catch (err) {
      if (err.response?.status === 403) {
        alert("Session expired. Please log in again.");
        navigate("/"); // or use navigate() if using react-router
      } else {
        console.error("Error fetching Bookings:", err);
      }
      setLoading(false);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const res = await axios.get(`${baseApiUrl}/admin/getUsers`, {
        withCredentials: true,
      });
      setAllUsers(res.data.allUsers);
      setShowUserModal(true);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const fetchUserBookings = async (userId) => {
    setLoading(true);
    setSelectedUser(userId);
    try {
      const res = await axios.get(
        `${baseApiUrl}/admin/getUserServices/${userId}`,
        {
          withCredentials: true,
        }
      );
      setBookings(res.data.userServices || []);
      setShowUserModal(false);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching user bookings:", err);
      setLoading(false);
    }
  };

  const filterBookings = bookings.filter(
    (booking) =>
      booking.name?.toLowerCase().includes(searchQurey.toLowerCase()) ||
      booking.email?.toLowerCase().includes(searchQurey.toLowerCase()) ||
      booking.service?.toLowerCase().includes(searchQurey.toLowerCase()) ||
      booking.userId?.toLowerCase().includes(searchQurey.toLowerCase()) ||
      booking._id?.toLowerCase().includes(searchQurey.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 relative">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold">
          {selectedUser ? "User's Bookings" : "Recent Bookings"}
        </h1>

        <div className="mb-4 flex items-center space-x-2 sm:max-w-sm">
          <input
            type="text"
            value={searchQurey}
            onChange={(e) => setSeacrhQuery(e.target.value)}
            placeholder="Search by Name, Email, User ID, Booking ID or Service"
            className="flex-grow px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => setSeacrhQuery("")}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Clear
          </button>
        </div>

        <div className="flex space-x-2">
          {selectedUser && (
            <button
              onClick={() => {
                setSelectedUser(null);
                fetchAllBookings();
              }}
              className="px-4 py-2 bg-gray-600 text-white text-sm rounded hover:bg-gray-700"
            >
              Back to All Bookings
            </button>
          )}

          {!selectedUser && (
            <button
              onClick={fetchAllUsers}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
            >
              View Users
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : bookings.length === 0 ? (
        <p className="text-gray-500">No bookings found.</p>
      ) : filterBookings.length === 0 ? (
        <p className="text-gray-500">No bookings match your search.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="py-3 px-4 text-left">Sl.No</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">
                  User ID,Email ID <br /> & Service ID
                </th>
                <th className="py-3 px-4 text-left">Service</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {filterBookings.map((booking, index) => (
                <tr key={booking._id} className="border-t hover:bg-gray-50">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{booking.name}</td>
                  <td className="py-2 px-4 text-xs text-gray-600">
                    User_ID :- {booking.userId},<br />
                    email:- {booking.email},<br />
                    Booking_ID :- {booking._id}
                  </td>
                  <td className="py-2 px-4 capitalize">{booking.service}</td>
                  <td className="py-2 px-4 whitespace-nowrap">
                    {booking.createdAt ? (
                      <div className="inline-block text-left">
                        <div>
                          {new Date(booking.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </div>
                        <div className="text-center text-gray-600">
                          {new Date(booking.createdAt).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true,
                            }
                          )}
                        </div>
                      </div>
                    ) : (
                      "N/A"
                    )}
                  </td>

                  <td className="py-2 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        booking.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : booking.status === "Booked"
                          ? "bg-blue-100 text-blue-700"
                          : booking.status === "Confirmed"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* USER MODAL */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-md p-6 w-full max-w-md max-h-[80vh] overflow-y-auto shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Select a User</h2>
              <button
                className="text-gray-600 hover:text-gray-800"
                onClick={() => setShowUserModal(false)}
              >
                ✕
              </button>
            </div>
            <ul>
              {allUsers.map((user) => (
                <li key={user._id} className="mb-2">
                  <button
                    onClick={() => fetchUserBookings(user._id)}
                    className="w-full text-left px-3 py-2 bg-gray-100 hover:bg-blue-100 rounded"
                  >
                    {user.username} ({user.email})
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;
