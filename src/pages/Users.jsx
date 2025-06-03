import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseApiUrl = import.meta.env.VITE_SERVER_API;

  useEffect(() => {
    axios
      .get(`${baseApiUrl}/admin/getUsers`, { withCredentials: true })
      .then((res) => {
        setUsers(res.data.allUsers);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <h1 className="text-xl sm:text-2xl font-semibold mb-6">
        Recently Logged-in Users
      </h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="py-3 px-2 sm:px-4 text-left text-sm sm:text-base whitespace-nowrap">Sl.No</th>
                <th className="py-3 px-2 sm:px-4 text-left text-sm sm:text-base whitespace-nowrap">Name</th>
                <th className="py-3 px-2 sm:px-4 text-left text-sm sm:text-base whitespace-nowrap">Email</th>
                <th className="py-3 px-2 sm:px-4 text-left text-sm sm:text-base whitespace-nowrap">Last Login</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user,index) => (
                <tr key={user._id} className="border-t hover:bg-gray-50">
                  <td className="py-2 px-2 sm:px-4 text-sm sm:text-base">{index+1}</td>
                  <td className="py-2 px-2 sm:px-4 text-sm sm:text-base">{user.username}</td>
                  <td className="py-2 px-2 sm:px-4 text-sm sm:text-base break-all">{user.email}</td>
                  <td className="py-2 px-2 sm:px-4 text-sm sm:text-base whitespace-nowrap">
                    {user.lastLogin ? (
                      new Date(user.lastLogin)
                        .toLocaleString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })
                        .replace(",", "")
                    ) : (
                      <span className="text-red-500">N/A</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Users;
