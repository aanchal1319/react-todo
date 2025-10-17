import { createContext, useContext, useReducer, useState, useEffect } from "react";


const TodoContext = createContext();


function tasksReducer(todos, action) {
  switch (action.type) {
    case 'added':
      return [...todos, { id: action.id, title: action.title, dis: action.dis, done: false }];
    case 'changed':
      return todos.map(t => (t.id === action.nextTodo.id ? action.nextTodo : t));
    case 'toggled':
      return todos.map(t => (t.id === action.id ? { ...t, done: action.done } : t));
    case 'deleted':
      return todos.filter(t => t.id !== action.id);
    default:
      throw new Error('Unknown action: ' + action.type);
  }
}

let nextId = 0;

export function TodoProvider({ children }) {
  const [todos, dispatch] = useReducer(tasksReducer, [], (initial) => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : initial;
  });

  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  
  function handleAddTodo({ title, dis }) {
    dispatch({ type: "added", id: nextId++, title, dis });
     alert(" Task added successfully!");
  }

  function handleChangeTodo(nextTodo) {
    dispatch({ type: "changed", nextTodo });
       alert("Task updated successfully!");
    setEditingTodo(null);
  }

  function handleToggleTodo(id, done) {
    dispatch({ type: "toggled", id, done });
  }

  function handleDeleteTodo(id) {
    dispatch({ type: "deleted", id });
  }

  const value = {
    todos,
    editingTodo,
    setEditingTodo,
    handleAddTodo,
    handleChangeTodo,
    handleToggleTodo,
    handleDeleteTodo,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}


export function useTodos() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("Error !!!!!");
  }
  return context;
}
