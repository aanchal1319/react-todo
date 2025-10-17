import { useState ,useContext} from 'react';
import { useNavigate } from "react-router-dom";
import { useTodos } from './context/todoContext';
import TaskItem from './TaskItem';


export default function TaskList(){
const { todos, handleToggleTodo, handleDeleteTodo, setEditingTodo } = useTodos();
const navigate = useNavigate();

if (todos.length === 0) {
  return <p className="text-black">No todos yet..</p>;
}

return (
  <ul>
    {todos.map((todo) => (
      <li key={todo.id}>
        <TaskItem
          todo={todo}
          onToggle={handleToggleTodo}
          onDelete={handleDeleteTodo}
          onEdit={(t) => {
            setEditingTodo(t);
            navigate(`/${t.id}/editTask`);
          }}
        />
      </li>
    ))}
  </ul>
);
}

