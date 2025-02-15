\c todo_db;

CREATE TABLE IF NOT EXISTS users (
                                     id SERIAL PRIMARY KEY,
                                     username TEXT UNIQUE NOT NULL,
                                     password_hash TEXT NOT NULL,
                                     created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    status BOOLEAN DEFAULT FALSE,
    priority INT DEFAULT 1 CHECK (priority >= 1 AND priority <= 3),
    due_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);
