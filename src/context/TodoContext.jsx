import { createContext, useContext, useMemo, useState } from "react";

const TodoContext = createContext(null);

export function TodoProvider({ children }) {
  const [tasks, setTasks] = useState([
    { id: "task-1", text: "Complete project proposal", completed: false },
    { id: "task-2", text: "Review code changes", completed: false },
    { id: "task-3", text: "Schedule team meeting", completed: false },
  ]);

  const addTask = (text) => {
    setTasks((prev) => [
      ...prev,
      { id: `${Date.now()}-${Math.random()}`, text, completed: false },
    ]);
  };

  const toggleTask = (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const value = useMemo(
    () => ({ tasks, addTask, toggleTask, deleteTask }),
    [tasks]
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export function useTodo() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo must be used within TodoProvider");
  }
  return context;
}

