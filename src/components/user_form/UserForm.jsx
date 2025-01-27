import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { addUser, editUser } from "../api_calls/api";
import PropTypes from "prop-types";

const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    department: yup.string().required("Department is required"),
  })
  .required();

const UserForm = ({ users, setUsers }) => {
  const [error, setErrors] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      department: "",
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (id) {
      const userToEdit = users.find((user) => user.id === parseInt(id));
      if (userToEdit) {
        reset({
          name: userToEdit.name,
          email: userToEdit.email,
          department: userToEdit.company.name,
        });
      }
    }
  }, [id, reset, users]);

  const onSubmit = async (data) => {
    try {
      if (id) {
        const updatedUser = {
          id: parseInt(id),
          name: data.name,
          email: data.email,
          company: { name: data.department },
        };
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
          )
        );
        await editUser(id, updatedUser);
      } else {
        const newUser = {
          id: users.length ? Math.max(...users.map((user) => user.id)) + 1 : 1,
          name: data.name,
          email: data.email,
          company: { name: data.department },
        };
        setUsers((prevUsers) => [...prevUsers, newUser]);
        await addUser(newUser);
      }
      setErrors(null);
      navigate("/");
    } catch (err) {
      setErrors("Failed to save user. Please try again.");
      console.error("Failed to save user:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          {id ? "Edit User" : "Add User"}
        </h1>
        {error && (
          <p className="mb-4 p-3 bg-red-100 text-red-600 rounded">{error}</p>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">Name</label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className={`w-full border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } rounded-lg p-2`}
                />
              )}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">
              Email
            </label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="email"
                  className={`w-full border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-lg p-2`}
                />
              )}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">
              Department
            </label>
            <Controller
              name="department"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className={`w-full border ${
                    errors.department ? "border-red-500" : "border-gray-300"
                  } rounded-lg p-2`}
                />
              )}
            />
            {errors.department && (
              <p className="text-red-500 text-sm">
                {errors.department.message}
              </p>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              {id ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;

UserForm.propTypes = {
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
