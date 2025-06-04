import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQurey, setSeacrhQuery] = useState("");
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

  const filterUsers = users.filter(
    (user) =>
      user.username?.toLowerCase().includes(searchQurey.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQurey.toLowerCase()) ||
      user._id?.toLowerCase().includes(searchQurey.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <h1 className="text-xl sm:text-2xl font-semibold mb-6">
        Recently Logged-in Users
      </h1>

      <div className="mb-4 flex items-center space-x-2 sm:max-w-sm">
        <input
          type="text"
          value={searchQurey}
          onChange={(e) => setSeacrhQuery(e.target.value)}
          placeholder="Search by Name, Email or User ID"
          className="flex-grow px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => setSeacrhQuery("")}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
          Clear
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : filterUsers.length === 0 ? (
        <p className="text-gray-500">No users match your search.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="py-3 px-2 sm:px-4 text-left text-sm sm:text-base whitespace-nowrap">
                  Sl.No
                </th>
                <th className="py-3 px-2 sm:px-4 text-left text-sm sm:text-base whitespace-nowrap">
                  User ID
                </th>
                <th className="py-3 px-2 sm:px-4 text-left text-sm sm:text-base whitespace-nowrap">
                  Name
                </th>
                <th className="py-3 px-2 sm:px-4 text-left text-sm sm:text-base whitespace-nowrap">
                  Email
                </th>
                <th className="py-3 px-2 sm:px-4 text-left text-sm sm:text-base whitespace-nowrap">
                  Last Login
                </th>
              </tr>
            </thead>
            <tbody>
              {filterUsers.map((user, index) => (
                <tr key={user._id} className="border-t hover:bg-gray-50">
                  <td className="py-2 px-2 sm:px-4 text-sm sm:text-base">
                    {index + 1}
                  </td>
                  <td className="py-2 px-2 sm:px-4 text-sm sm:text-base">
                    {user._id}
                  </td>
                  <td className="py-2 px-2 sm:px-4 text-sm sm:text-base">
                    {user.username}
                  </td>
                  <td className="py-2 px-2 sm:px-4 text-sm sm:text-base break-all">
                    {user.email}
                  </td>
                  <td className="py-2 px-2 sm:px-4 text-sm sm:text-base whitespace-nowrap">
                    {user.lastLogin ? (
                      <div className="inline-block text-left">
                        <div>
                          {new Date(user.lastLogin).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </div>
                        <div className="text-center text-gray-600">
                          {new Date(user.lastLogin).toLocaleTimeString(
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
                      <span className="text-red-500 ml-6">N/A</span>
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
