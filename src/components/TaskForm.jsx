import { useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useTodos } from './context/todoContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function AddTodo() {
  const { id } = useParams();
  const { todos, handleAddTodo, handleChangeTodo,setEditingTodo } = useTodos();
  const navigate = useNavigate();

  const editingTodo = id ? todos.find(t => t.id === parseInt(id)) : null;

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, "Title must be at least 3 characters")
      .required("Title is required"),
    dis: Yup.string()
      .min(5, "Description must be at least 5 characters")
      .required("Description is required"),
  });


  const formik = useFormik({
    initialValues: {
      title: editingTodo ? editingTodo.title : '',
      dis: editingTodo ? editingTodo.dis : '',
    },
    enableReinitialize: true, 
    validationSchema,
    onSubmit: (values) => {
      if (editingTodo) {
        handleChangeTodo({ id: editingTodo.id, ...values });
      } else {
        handleAddTodo(values);
      }
      navigate("/taskList");
    },
  });

  return (
    <section className="items-center p-10 flex gap-5 bg-sky-200 border border-sky-300 rounded-lg flex-col">
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 w-[15rem]">
        <div className="flex flex-col">
          <input
            className="h-10 p-4 bg-white text-black rounded-md border border-gray-300"
            placeholder="Enter Title"
            id="title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.title && formik.errors.title && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.title}</p>
          )}
        </div>

        <div className="flex flex-col">
          <textarea
            className="p-3 bg-white text-black rounded-md border border-gray-300"
            placeholder="Enter Description"
            id="dis"
            name="dis"
            value={formik.values.dis}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.dis && formik.errors.dis && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.dis}</p>
          )}
        </div>


        <button
          type="submit"
          className="bg-sky-600 text-white h-10 rounded-md hover:bg-sky-700"
        >
          {editingTodo ? "Save" : "Add"}
          
        </button>{editingTodo && <button type='button' onClick={() => {
          setEditingTodo(null);
          navigate("/taskList");
        }}>Cancel Changes</button>}
      </form>
    </section>
  );
}
