import { BrowserRouter, Routes, Route, Link ,Navigate} from "react-router-dom";
import { TodoProvider } from "./components/context/todoContext";
import AddTodo from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";


export default function App() {
  return (
    <BrowserRouter>
      <TodoProvider>
        <section className="flex flex-col gap-8 items-center mt-6">
          <Routes>
  
            <Route path="/" element={<Navigate to="/taskList" />} />

            <Route
              path="/taskList"
              element={
                <>
                  <Link to="/addTask">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">
                      Add Task
                    </button>
                  </Link>
                  <TaskList />
                </>
              }
            />

            <Route
              path="/addTask"
              element={
                <>
                  <Link to="/taskList">
                    <button className="bg-green-500 text-white px-4 py-2 rounded">
                      Task List
                    </button>
                  </Link>
                  <AddTodo />
                </>
              }
            />

            <Route path="/:id/editTask" element={<AddTodo />} />
          </Routes>
        </section>
      </TodoProvider>
    </BrowserRouter>
  );
}