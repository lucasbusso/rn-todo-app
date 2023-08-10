import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodo,
  getSharedTodoById,
  getTodosById,
  getUSerById,
  getUserByEmail,
  shareTodo,
  toggleCompleted,
} from "./database";

const app = express();
app.use(express.json());
app.listen(8080, () => {
  console.log("Server running on port 8080");
});
