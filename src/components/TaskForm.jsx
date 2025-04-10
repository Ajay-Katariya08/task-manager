import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { TaskContext } from "../context/TaskContext";

const TaskFormModal = ({ show, handleClose, task = null, onSubmit }) => {
  const isEdit = !!task;
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("pending");
  const { addTask } = useContext(TaskContext);

  useEffect(() => {
    if (isEdit) {
      setTitle(task.title);
      setStatus(task.completed ? "completed" : "pending");
    } else {
      setTitle("");
      setStatus("pending");
    }
  }, [task, show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: isEdit ? task.id : Date.now().toString(),
      title,
      completed: status === "completed",
    };

    if (isEdit) {
      onSubmit(newTask);
    } else {
      addTask(newTask);
    }

    handleClose(); // close modal after submit
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? "Edit Task" : "Add New Task"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Task Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </Form.Select>
          </Form.Group>
          <div className="d-grid">
            <Button variant="success" type="submit">
              {isEdit ? "Update Task" : "Add Task"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TaskFormModal;
