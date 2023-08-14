import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import {
  getTodo,
  shareTodo,
  deleteTodo,
  getTodosById,
  createTodo,
  toggleCompleted,
  getUserByEmail,
  getUSerById,
  getSharedTodoById,
} from "./database";

dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.json());

const corsOptions = {
  origin: process.env.FE_DOMAIN,
  methods: ["POST", "GET"],
  credentials: true,
};
app.use(cors(corsOptions));

app.listen(8080, () => {
  console.log("Server running on port 8080");
});

app.get("/todos/:id", async (req, res) => {
  const todos = await getTodosById(req.params.id);
  res.status(200).send(todos);
});

app.get("/todos/shared_todos/:id", async (req, res) => {
  const todo = await getSharedTodoById(req.params.id);
  const author = await getUSerById(todo.user_id);
  const shared_with = await getUSerById(todo.get_shared_with);
  res.status(200).send({ author, shared_with });
});

app.get("/users/:id", async (req, res) => {
  const user = await getUSerById(req.params.id);
  res.status(200).send(user);
});

app.put("/todos/:id", async (req, res) => {
  const value = req.body;
  const todo = await toggleCompleted(req.params.id, value);
  res.status(200).send(todo);
});

app.delete("/todos/:id", async (req, res) => {
  await deleteTodo(req.params.id);
  res.send({ message: "Successfully deleted" });
});

app.post("/todos/shared_todos", async (req, res) => {
  const { todo_id, user_id, email } = req.body;
  const userToShare = await getUserByEmail(email);
  const sharedTodo = await shareTodo(todo_id, user_id, userToShare.id);
  res.status(201).send(sharedTodo);
});

app.post("/todos", async (req, res) => {
  const { user_id, title } = req.body;
  const todo = await createTodo(user_id, title);
  res.status(201).send(todo);
});
