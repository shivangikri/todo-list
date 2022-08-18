import React from "react";
import AddIcon from "@mui/icons-material/Add";
import TodoItem from "./components/TodoItem";
import { useState, useEffect } from "react";
import Axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:9000/").then((res) => {
      setTodos(res.data);
    });
  }, []);

  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = () => {
    if (text !== "") {
      Axios.post("http://localhost:9000/additem", { text }).then((res) => {
        setTodos([...todos, res.data]);
        setText("");
      });
      window.location.reload();
    } else {
      toast.error("Please Enter Non-Empty Text..", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  return (
    <div className="App">
      <div className="header">
        <h1>To Do List</h1>
      </div>
      <div className="todo-form">
        <input
          type="text"
          placeholder="Add Todo..."
          onChange={handleChange}
          value={text}
        />
        <button onClick={handleSubmit}>
          <AddIcon />
        </button>
      </div>
      <div className="todo-items">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo_item={todo.text} />
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
