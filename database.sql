CREATE TABLE todo (
    todo_id SERIAL PRIMARY KEY,
    title VARCHAR(50),
    description VARCHAR(255),
    status VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

