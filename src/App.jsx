import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]); //fetching old todos

  useEffect(() => {
    // when the compoment load, we are fetching all the todos from BE and updating our todos state, so we can show the existing todos....
    axios
      .get("http://localhost:8080/api/v1/todos")
      .then((response) => setTodos(response.data.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <TodoForm setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
//first it'll allow to become input field and than after  clicking on add it will save and show in new todos list
//ceate an input firld keep it disable once click on update button make input button enable
//heading todod list alnong with date
