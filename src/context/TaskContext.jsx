import React, { createContext, useState, useEffect, useContext, useMemo, useCallback } from "react";
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

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://jsonplaceholder.typicode.com/todos?_limit=20");
      setTasks(res.data);
    } catch (err) {
      console.error("fetch task error", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addTask = useCallback(async (task) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
    };
    try {
      await axios.post("https://jsonplaceholder.typicode.com/todos", newTask);
    } catch (err) {
      console.log("API post fail", err);
    }
    setTasks((prev) => [newTask, ...prev]);
  }, []);

  const updateTask = useCallback(async (task) => {
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/todos/${task.id}`, task);
    } catch (err) {
      console.log("PUT fail", err);
    }
    setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
  }, []);

  const deleteTask = useCallback(async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    } catch (err) {
      console.log("DELETE fail", err);
    }
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const reorderTasks = useCallback((startIndex, endIndex) => {
    setTasks((prev) => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  }, []);

  const filteredTasks = useMemo(() => {
    if (filter === "completed") return tasks.filter((t) => t.completed);
    if (filter === "pending") return tasks.filter((t) => !t.completed);
    return tasks;
  }, [tasks, filter]);

  const paginatedTasks = useMemo(() => {
    const start = (currentPage - 1) * tasksPerPage;
    const end = currentPage * tasksPerPage;
    return filteredTasks.slice(start, end);
  }, [filteredTasks, currentPage]);

  const totalPages = useMemo(() => Math.ceil(filteredTasks.length / tasksPerPage), [filteredTasks]);

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
        totalPages,
        reorderTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
