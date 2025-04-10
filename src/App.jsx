import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import Register from "./pages/Register";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>; // or a spinner
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/tasks" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <Tasks />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
