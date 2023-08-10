CREATE DATABASE todo_app;
USE todo_app;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255)
);

CREATE TABLE todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    completed BOOLEAN DEFAULT false,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE 
);

CREATE TABLE shared_todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    todo_id INT,
    shared_with_id INT,
    user_id INT,
    FOREIGN KEY (todo_id) REFERENCES todos(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (shared_with_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert test users
INSERT INTO users (name, email, password) VALUES('Lucas', 'lucas@gmail.com', 'root');
INSERT INTO users (name, email, password) VALUES('Ezequiel', 'ezequiel@gmail.com', 'root');

-- Insert test todos
INSERT INTO todos (title, user_id) 
VALUES
('Jugar a la play', 1),
('Pasear al perro', 1),
('Cocinar', 1),
('Estudiar matematica', 2),
('Hacer la tarea', 2),
('Bañarse', 2);

-- Share some of the todos
INSERT INTO shared_todos (todo_id, user_id, shared_with_id) 
VALUES (1, 1, 2);

-- Select todos including shared todos by id
SELECT todos.*, shared_todos.shared_with_id
FROM todos
LEFT JOIN shared_todos ON todos.id = shared_todos.shared_with_id
WHERE todos.user_id = 2 OR shared_todos.shared_with_id = 2;