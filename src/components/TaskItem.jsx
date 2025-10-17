import { useNavigate } from "react-router-dom";


export default function TaskItem({ todo, onToggle, onDelete, onEdit }) {
  const navigate = useNavigate();

  const handleDelete = () => {
    const confirmed = window.confirm(`Do you really want to delete "${todo.title}"?`);
    if (confirmed) {
      onDelete(todo.id);
      alert("Task deleted successfully!");
    } else {
      navigate("/taskList");
    }
  };

  return (
    <div className="flex gap-4 p-4 items-center border border-red-300 text-black justify-evenly">
      <input
        type="checkbox"
        checked={todo.done}
        onChange={(e) => onToggle(todo.id, e.target.checked)}
      />
      {todo.title}
      <br />
      {todo.dis}
      <button
        className="bg-black text-white h-9 p-2"
        onClick={() => onEdit(todo)}
      >
        Edit
      </button>
      <button
        className="bg-red-600 text-white h-9 p-2"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
}