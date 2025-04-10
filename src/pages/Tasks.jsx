import React, { useContext } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { FaSignOutAlt } from "react-icons/fa";
import TaskList from "../components/TaskList";
import { AuthContext } from "../context/AuthContext";

const Tasks = () => {
  const { logout } = useContext(AuthContext);

  return (
    <Container className="py-4">
      {/* Header */}
      <div className="d-flex  flex-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <div className="d-flex align-items-center gap-2">
          <h2 className="mb-0">Task Manager</h2>
        </div>

        <Button variant="outline-danger" onClick={logout}>
          <FaSignOutAlt className="me-2" />
          Logout
        </Button>
      </div>

  
          <TaskList />
     
    </Container>
  );
};

export default Tasks;
