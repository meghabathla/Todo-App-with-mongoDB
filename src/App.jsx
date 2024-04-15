import { useEffect, useState } from "react";
import { getAllTodos } from "./helpers/actions";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]); //fetching old todos

  useEffect(() => {
    // when the compoment load, we are fetching all the todos from BE and updating our todos state, so we can show the existing todos....
    // IIFE
    (async () => {
      const fetchedTodos = await getAllTodos();
      setTodos(fetchedTodos);
    })();
  }, []);

  return (
    <div>
      <TodoForm setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
