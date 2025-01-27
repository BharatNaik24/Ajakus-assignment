import { useNavigate } from "react-router-dom";
import { deleteUser } from "../api_calls/api";
import { TiPencil } from "react-icons/ti";
import { MdDeleteOutline } from "react-icons/md";
import PropTypes from "prop-types";
import { useState } from "react";

const UserList = ({ users, setUsers }) => {
  const [error, setErrors] = useState(null);

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
      setErrors(null);
    } catch (error) {
      setErrors(error.message);
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          User Management
        </h1>
        {error && (
          <p className="mb-4 p-3 bg-red-100 text-red-600 rounded">{error}</p>
        )}
        <button
          onClick={() => navigate("/add")}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-4"
        >
          Add User
        </button>
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full text-left text-sm text-gray-600">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">First Name</th>
                <th className="px-4 py-2">Last Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Department</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t">
                  <td className="px-4 py-2">{user.id}</td>
                  <td className="px-4 py-2">{user.name.split(" ")[0]}</td>
                  <td className="px-4 py-2">{user.name.split(" ")[1]}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.company.name}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => navigate(`/edit/${user.id}`)}
                      className="text-gray-500 mr-2"
                    >
                      <TiPencil size={25} />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-500"
                    >
                      <MdDeleteOutline size={25} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      company: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  setUsers: PropTypes.func.isRequired,
};
