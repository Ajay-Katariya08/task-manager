import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) fetchTasks();
  }, [user]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/todos?_limit=20"
      );
      setTasks(res.data);
    } catch (err) {
      console.error("fetch task eror", err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (task) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
    };
    try {
      await axios.post("https://jsonplaceholder.typicode.com/todos", newTask);
    } catch (err) {
      console.log("Api post fail", err);
    }
    setTasks((prev) => [newTask, ...prev]);
  };

  const updateTask = async (task) => {
    try {
      await axios.put(
        `https://jsonplaceholder.typicode.com/todos/${task.id}`,
        task
      );
    } catch (err) {
      console.log("put fail", err);
    }

    setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    } catch (err) {
      console.log("delete fail", err);
    }
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const reorderTasks = (startIndex, endIndex) => {
    const result = Array.from(tasks);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setTasks(result);
  };

  const filteredTasks =
    filter === "completed"
      ? tasks.filter((t) => t.completed)
      : filter === "pending"
      ? tasks.filter((t) => !t.completed)
      : tasks;

  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage
  );

  return (
    <TaskContext.Provider
      value={{
        tasks: paginatedTasks,
        allTasks: tasks,
        loading,
        addTask,
        updateTask,
        deleteTask,
        setFilter,
        filter,
        currentPage,
        setCurrentPage,
        totalPages: Math.ceil(filteredTasks.length / tasksPerPage),
        reorderTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
