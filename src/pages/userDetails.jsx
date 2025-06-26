import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [messages, setMessages] = useState([]);
  const baseApiUrl = import.meta.env.VITE_SERVER_API;

  useEffect(() => {
    // Fetch user profile
    axios
      .get(`${baseApiUrl}/admin/getUser/${userId}`, { withCredentials: true })
      .then((res) => setUser(res.data.user))
      .catch((err) => console.error("User error:", err));

    // Fetch bookings
    axios
      .get(`${baseApiUrl}/admin/getBookedService/${userId}`, {
        withCredentials: true,
      })
      .then((res) => setBookings(res.data.bookedServices))
      .catch((err) => console.error("Booking error:", err));

    // Fetch messages
    axios
      .get(`${baseApiUrl}/admin/getContactMessages/${userId}`, {
        withCredentials: true,
      })
      .then((res) => setMessages(res.data.contactMessages))
      .catch((err) => console.error("Message error:", err));
  }, [userId]);

  if (!user)
    return <div className="p-6 text-center">Loading user details...</div>;

  const profilePicUrl =
    user.profilePic &&
    user.profilePic !== "null" &&
    user.profilePic !== "undefined"
      ? user.profilePic
      : "https://www.w3schools.com/howto/img_avatar.png";

  return (
    <div className="p-6">
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex flex-col items-center">
          <img
            src={profilePicUrl}
            alt="User"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {user.username}
          </h2>
          <p className="text-sm text-gray-500">User ID: {user._id}</p>
        </div>

        <div className="mt-6 space-y-3 text-gray-700">
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
          <p>
            <strong>Last Login:</strong>{" "}
            {user.lastLogin
              ? new Date(user.lastLogin).toLocaleString("en-GB", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true,
                })
              : "N/A"}
          </p>
        </div>
      </div>

      {/* Bookings */}
      <div className="max-w-xl mx-auto mt-8 bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Bookings</h3>
        {Array.isArray(bookings) && bookings.length === 0 ? (
          <p className="text-gray-500">No bookings found.</p>
        ) : (
          <ul className="space-y-4">
            {bookings.map((booking) => (
              <li key={booking._id} className="border p-4 rounded shadow-sm">
                <p>
                  <strong>Service:</strong> {booking.service}
                </p>
                <p>
                  <strong>Status:</strong> {booking.status}
                </p>
                <p>
                  <strong>Address:</strong> {booking.address}
                </p>
                <p>
                  <strong>Phone:</strong> {booking.phone}
                </p>
                <p>
                  <strong>Booked At:</strong>{" "}
                  {new Date(booking.createdAt).toLocaleString("en-GB", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                  })}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

     {/* Messages */}
<div className="max-w-xl mx-auto mt-8 bg-white shadow rounded-lg p-6">
  <h3 className="text-xl font-semibold mb-4 text-center border-b pb-2">Contact Messages</h3>
  {Array.isArray(messages) && messages.length === 0 ? (
    <p className="text-gray-500 text-center">No messages found.</p>
  ) : (
    <ul className="space-y-4">
      {messages.map((msg, index) => (
        <li key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="mb-2">
            <p className="text-sm text-gray-600">
              <strong>Received:</strong>{" "}
              {new Date(msg.createdAt).toLocaleString("en-GB", {
                hour12: true,
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <div className="text-gray-800">
            <p className="mb-1">
            </p>
            <p>
              <strong>Message:</strong> {msg.message}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )}
</div>

    </div>
  );
};

export default UserDetails;
