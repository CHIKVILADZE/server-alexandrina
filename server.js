require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const port = process.env.port || 5000;

// midleware
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.use(express.json());
// Routes //

// create a todo

app.post('/todos', async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const newTodo = await pool.query(
      'INSERT INTO todos (title, description, status) VALUES($1, $2, $3) RETURNING *',
      [title, description, status]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// get all todo

app.get('/todos', async (req, res) => {
  try {
    const allTodos = await pool.query(
      'SELECT * FROM todos ORDER BY created_at DESC'
    );
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a todo

app.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query('SELECT * FROM todos  WHERE todo_id = $1', [
      id,
    ]);
    res.json(todo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// update a todo

app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const updateTodo = await pool.query(
      'UPDATE todos SET title = $1, description = $2, status = $3 WHERE todo_id = $4',
      [title, description, status, id]
    );

    res.json('Todo Updated');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// delete a todo

app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteToto = await pool.query(
      'DELETE FROM todos WHERE todo_id = $1',
      [id]
    );
    res.json('Todo has deleted');
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(port, () => {
  console.log('Server start on port 5000');
});
