import axios from "axios";

export const createTodo = async (title) => {
  const payload = {
    title,
    description: "test",
  };
  const newTodo = await axios
    .post(`${import.meta.env.VITE_BACKEND_URL}`, payload)
    .then((response) => response.data.data) //object
    .catch((error) => console.error("[API ERROR]: creating new todo:", error));
  return newTodo;
};

export const toggleTodo = async (todoId) => {
  //Update todos state in BE
  const updatedTodo = await axios
    .patch(`${import.meta.env.VITE_BACKEND_URL}/toggle/status/${todoId}`)
    .then((response) => response.data.data)
    .catch((error) => console.error("[API ERROR]: toggle todo:", error));
  return updatedTodo;
};

export const getUpdatedTodo = async (selectedTodo) => {
  // createing the updated payload for api
  const payload = {
    title: selectedTodo.title,
    description: selectedTodo.description,
  };
  // saving the todo in BE
  const updatedTodo = await axios
    .patch(`${import.meta.env.VITE_BACKEND_URL}/${selectedTodo._id}`, payload)
    .then((response) => response.data.data)
    .catch((error) => console.error("[API ERROR]: updating todo:", error));

  return updatedTodo;
};

export const deleteTodo = async (todoId) => {
  await axios
    .delete(`${import.meta.env.VITE_BACKEND_URL}/${todoId}`)
    .catch((error) => console.error("[API ERROR]: deleting  todo:", error));
};
export const getAllTodos = async () => {
  const allTodos = await axios
    .get(import.meta.env.VITE_BACKEND_URL)
    .then((response) => response.data.data)
    .catch((error) => console.error("[API ERROR]: fetching all todos:", error));
  return allTodos;
};
