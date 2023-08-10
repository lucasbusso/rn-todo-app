import mysql from "mysql2";
import dotenv from "dotenv";
import { Todo } from "./interfaces";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function getTodosById(id: number): Promise<void> {
  const [rows] = await pool.query(
    `
  SELECT todos.*, shared_todos.shared_with_id
  FROM todos
  LEFT JOIN shared_todos ON todos.id = shared_todos.todo_id 
  WHERE todos.user_id = ? OR shared_todos.shared_with_id = ?`,
    [id, id]
  );

  return rows;
}

export async function getTodo(id: number): Promise<Todo> {
  const [rows] = await pool.query(`SELECT * FROM todos WHERE id = ?`, [id]);
  return rows[0];
}

export async function getSharedTodoById(id: number): Promise<void> {
  const [rows] = await pool.query(`SELECT * FROM shared_todos WHERE id = ?`, [
    id,
  ]);
  return rows[0];
}

export async function getUSerById(id: number): Promise<void> {
  const [rows] = await pool.query(`SELECT * FROM users WHERE id =?`, [id]);
  return rows[0];
}

export async function getUserByEmail(email: string): Promise<void> {
  const [rows] = await pool.query(`SELECT * FROM users WHERE email =?`, [
    email,
  ]);
  return rows[0];
}

export async function createTodo(
  user_id: number,
  title: string
): Promise<Todo> {
  const [result] = await pool.query(
    `INSERT INTO todos (id, title) VALUES (?,?)`,
    [user_id, title]
  );
  const todoID = result.insertId;
  return getTodo(todoID);
}

export async function deleteTodo(id: number): Promise<void> {
  const [result] = await pool.query(
    `
    DELETE FROM todos WHERE id = ?`,
    [id]
  );
  return result;
}

export async function toggleCompleted(id: number, value: boolean) {
  const newValue = value === true ? "TRUE" : "FALSE";
  const [result] = await pool.query(
    `UPDATE todos SET completed = ${newValue} WHERE id = ?`,
    [id]
  );
  return result;
}

export async function shareTodo(
  todo_id: number,
  user_id: number,
  shared_with_id: number
): Promise<void> {
  const [result] = await pool.query(
    `
    INSERT INTO shared_todos (todo_id, user_id, shared_with_id) VALUES (?,?,?)`,
    [todo_id, user_id, shared_with_id]
  );
  return result.insertId;
}
