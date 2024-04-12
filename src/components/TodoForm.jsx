import React, { useState } from "react"; //React default export, useState named export
import { createTodo } from "../helpers/actions";

const TodoForm = ({ setTodos }) => {
  const [title, setTitle] = useState("");

  const addNewTodo = async (e) => {
    e.preventDefault();
    try {
      const newTodo = createTodo(title);

      if (newTodo?._id) {
        setTodos((currentTodos) => [newTodo, ...currentTodos]); // adding new todo(which is an object) in todos array
        setTitle(""); //clearing input field
      }
    } catch (error) {
      console.log("Error posting data:", error);
    }
  };

  return (
    <form className="bg-blue-200" onSubmit={addNewTodo}>
      <div className="p-4 m-2">
        <input
          type="text"
          placeholder="Add Task..."
          value={title}
          className="w-3/12 px-2 py-2 m-2 bg-blue-100 border-2 border-slate-100"
          onChange={(e) => setTitle(e.target.value)} // what do e.target.value do? how it works basically
        />

        <button
          type="submit"
          className="p-2 m-2  bg-blue-400  border-2 border-slate-100 "
        >
          Add Todo
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
