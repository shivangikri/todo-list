const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const todoModel = require("./models/todoitem");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(
    process.env.DB_URI,
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB: " + err);
  });

app.get("/", (req, res) => {
  todoModel
    .find()
    .then((todos) => {
      res.json(todos);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/deleteitem", (req, res) => {
  todoModel
    .deleteOne({ text: req.body.item_text })
    .then(() => {
      res.json({ message: "Todo Deleted" });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/additem", (req, res) => {
  todoModel
    .create({
      text: req.body.text,
    })
    .then(() => {
      res.json({ message: "Todo Added" });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(9000, () => {
  console.log("Server started on port 9000");
});
