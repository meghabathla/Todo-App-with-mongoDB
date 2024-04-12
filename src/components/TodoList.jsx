import React, { useState } from "react";
import axios from "axios";
import { toggleTodo } from "../helpers/actions";

const TodoList = ({ todos, setTodos }) => {
  const [selectedTodo, setSelectedTodo] = useState(null);
  // updatedTodo is called when click on update todo or save todo
  const updateTodo = async (todo) => {
    if (selectedTodo?._id) {
      // If selectedTodo is present
      if (selectedTodo._id === todo._id) {
        // currentTodo id should match with selectedTodo id then we save the todo...
        try {
          // createing the updated payload for api
          const payload = {
            title: selectedTodo.title,
            description: selectedTodo.description,
          };
          // saving the todo in BE
          const response = await axios.patch(
            `http://localhost:8080/api/v1/todos/${selectedTodo._id}`,
            payload
          );
          const currentUpdatedTodo = response.data.data;
          // Saving the updated todo from BE to our local state..
          setTodos((previousTodos) => {
            const updatedTodos = previousTodos.map((todo) =>
              todo._id === currentUpdatedTodo._id ? currentUpdatedTodo : todo
            );
            return updatedTodos;
          });
        } catch (error) {
          console.log("Error updating data:", error);
        }
        // Once todo is updated and save, reset the selectedTodo
        setSelectedTodo(null); // unselect
      } else {
        // if SelectedTodo d doesn't match with currentTodo id then, selected the currentTodo instead...
        setSelectedTodo(todo);
      }
    } else {
      // If no todo is selected, just select the currrent todo....
      setSelectedTodo(todo); // select
    }
  };

  const removeTodo = async (todoId) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/todos/${todoId}`);

      setTodos((currentTodos) =>
        currentTodos.filter((todo) => todo._id !== todoId)
      );
    } catch (error) {
      console.log("Error removing data:", error);
    }
  };
  const handleToggle = async (todoId) => {
    const updatedTodo = toggleTodo(todoId);
    // Updating todos status in local todos state...
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo._id === todoId ? updatedTodo : todo))
    );
  };
  return (
    <div className="bg-blue-100 ">
      {todos.map((todo) => {
        const isSelected = selectedTodo ? selectedTodo._id === todo._id : false;
        return (
          <div key={todo._id}>
            <input
              type="checkbox"
              checked={todo.isComplete}
              onChange={() => handleToggle(todo._id)}
              className="p-2 m-2"
            />
            {isSelected ? (
              <input
                type="text"
                value={selectedTodo.title} //how todo is become selectedTodo?
                className="p-2 m-4 bg-blue-200"
                onChange={(e) => {
                  // When there is a selectedTodo only then we show this input box
                  // Update the title of selectedTodo.title onChange of this input....
                  setSelectedTodo((prevState) => {
                    return {
                      ...prevState,
                      title: e.target.value,
                    };
                  });
                }}
              />
            ) : (
              <span>{todo.title}</span>
            )}

            <button
              onClick={() => updateTodo(todo)}
              className="p-2 m-2 bg-blue-300"
            >
              {isSelected ? "Save" : "Update"} todo
            </button>
            <button
              onClick={() => removeTodo(todo._id)}
              className="p-2 m-2  bg-blue-300"
            >
              🗑️
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;
