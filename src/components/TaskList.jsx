import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import React, { useContext, useState } from "react";
import {
  Button,
  Form,
  Pagination,
  Spinner,
  ButtonGroup,
  OverlayTrigger,
  Tooltip,
  Row,
  Col,
} from "react-bootstrap";
import { TaskContext } from "../context/TaskContext";
import TaskFormModal from "./TaskForm";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaFilter,
  FaCheck,
  FaClock,
  FaListUl,
} from "react-icons/fa";

const TaskList = () => {
  const {
    tasks,
    deleteTask,
    updateTask,
    loading,
    setFilter,
    currentPage,
    setCurrentPage,
    totalPages,
    reorderTasks,
    filter,
  } = useContext(TaskContext);

  const [editTask, setEditTask] = useState(null);
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleEdit = (task) => {
    setEditTask(task);
    setShow(true);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    reorderTasks(result.source.index, result.destination.index);
  };

  if (loading)
    return <Spinner animation="border" className="d-block mx-auto mt-5" />;

  return (
    <div className="mt-4 px-2 px-sm-4">
      <Row className="align-items-center mb-4 g-3">
        <Col xs={12} md={8} className="order-2 order-md-1">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-start gap-2">
            <ButtonGroup className="flex-wrap ">
              <Button
                variant={`outline-secondary ${filter==="all" ? 'active' : ''}`}
                onClick={() => setFilter("all")}
              >
                <FaListUl className="me-1 mb-1" />
                All
              </Button>
              <Button
                variant={`outline-success ${filter==="completed" ? 'active' : ''}`}
                onClick={() => setFilter("completed")}
              >
                <FaCheck className="me-1" />
                Completed
              </Button>
              <Button
                variant={`outline-warning ${filter==="pending" ? 'active' : ''}`}
                onClick={() => setFilter("pending")}
              >
                <FaClock className="me-1" />
                Pending
              </Button>
            </ButtonGroup>
          </div>
        </Col>
        <Col xs={12} md={4} className="text-md-end text-center order-1 order-md-2">
          <Button variant="primary" onClick={() => setShowModal(true)}>
            <FaPlus className="me-1" /> Add Task
          </Button>
        </Col>
      </Row>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <ul
              className="list-group shadow-sm rounded"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {tasks.map((task, index) => (
                <Draggable
                  key={task.id}
                  draggableId={task.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <li
                      className={`list-group-item d-flex  flex-row justify-content-between align-items-start align-items-sm-center gap-2 ${
                        task.completed ? "bg-light text-muted" : ""
                      }`}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Form.Check
                        type="checkbox"
                        label={
                            <span className={task.completed ? "text-decoration-line-through" : ""}>
                              {task.title}
                            </span>
                          }
                        checked={task.completed}
                        className="flex-grow-1"
                        onChange={() =>
                          updateTask({ ...task, completed: !task.completed })
                        }
                      />
                      <div className="d-flex gap-2">
                        <OverlayTrigger
                          placement="top"
                          overlay={<Tooltip>Edit Task</Tooltip>}
                        >
                          <Button
                            size="sm"
                            variant="outline-primary"
                            onClick={() => handleEdit(task)}
                          >
                            <FaEdit />
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          placement="top"
                          overlay={<Tooltip>Delete Task</Tooltip>}
                        >
                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() => deleteTask(task.id)}
                          >
                            <FaTrash />
                          </Button>
                        </OverlayTrigger>
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>

      {totalPages > 1 && (
        <Pagination className="mt-4 justify-content-center">
          {Array.from({ length: totalPages }, (_, idx) => (
            <Pagination.Item
              key={idx + 1}
              active={idx + 1 === currentPage}
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      )}

      {/* Add Modal */}
      <TaskFormModal show={showModal} handleClose={() => setShowModal(false)} />

      {/* Edit Modal */}
      <TaskFormModal
        show={show}
        handleClose={() => setShow(false)}
        task={editTask}
        onSubmit={(updated) => {
          updateTask(updated);
          setShow(false);
        }}
      />
    </div>
  );
};

export default TaskList;
