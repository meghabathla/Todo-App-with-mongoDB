import axios from "axios";

export const createTodo = async (title) => {
  const payload = {
    title,
    description: "test",
  };
  const response = await axios.post(
    "http://localhost:8080/api/v1/todos",
    payload
  );
  const newTodo = response.data.data; //object
  return newTodo;
};

export const toggleTodo = async (todoId) => {
  //Update todos state in BE
  const updatedTodo = await axios
    .patch(`http://localhost:8080/api/v1/todos/toggle/status/${todoId}`)
    .then((res) => res.data.data);
  return updatedTodo;
};
