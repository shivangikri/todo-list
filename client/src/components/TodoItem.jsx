import React from "react";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import "./TodoItem.css";
import Axios from "axios";
import CloseIcon from "@mui/icons-material/Close";

function TodoItem(props) {
  const [visible, setVisible] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [remove_class, setRemoveClass] = useState("");

  const changeOpacity = () => {
    setIsCompleted(!isCompleted);
  };

  const removeTodo = () => {
    Axios.post("http://localhost:9000/deleteitem", {
      item_text: props.todo_item,
    })
      .then((res) => {
        console.log("Delete Success");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    visible && (
      <div className={`Item ${remove_class}`} style={{ display: "flex" }}>
        <h1
          style={{
            opacity: isCompleted ? "30%" : "100%",
            textDecoration: isCompleted ? "line-through" : "none",
            transition: "opacity 0.8s ease-in-out",
          }}
        >
          {props.todo_item}
        </h1>
        <div className="buttons">
          <button className="done-btn" onClick={changeOpacity}>
            {isCompleted ? <CloseIcon /> : <DoneIcon />}
          </button>
          <button
            className="delete-btn"
            onClick={() => {
              setRemoveClass("remove");
              removeTodo();
              setTimeout(() => {
                setVisible(false);
              }, 500);
            }}
          >
            <DeleteIcon />
          </button>
        </div>
      </div>
    )
  );
}
export default TodoItem;
