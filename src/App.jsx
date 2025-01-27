import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getUsers } from "./components/api_calls/api";
import UserList from "./components/user_list/UserList";
import UserForm from "./components/user_form/UserForm";

const App = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data);
        setError(null);
      } catch (error) {
        setError("Failed to fetch users. Please refresh the page.");
        console.error("Failed to fetch users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 py-10 px-6">
        {error && (
          <div className="max-w-5xl mx-auto mb-6 p-3 bg-red-100 text-red-600 rounded">
            {error}
          </div>
        )}
        <Routes>
          <Route
            path="/"
            element={<UserList users={users} setUsers={setUsers} />}
          />
          <Route
            path="/add"
            element={<UserForm users={users} setUsers={setUsers} />}
          />
          <Route
            path="/edit/:id"
            element={<UserForm users={users} setUsers={setUsers} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
