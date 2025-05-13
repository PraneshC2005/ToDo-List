import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [editingId, setEditingId] = useState(null);

  const API_BASE = 'http://localhost:3000';

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get(`${API_BASE}/todos`);
    setTodos(res.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`${API_BASE}/todos/${editingId}`, formData);
      setEditingId(null);
    } else {
      await axios.post(`${API_BASE}/todos`, formData);
    }
    setFormData({ title: '', description: '' });
    fetchTodos();
  };

  const handleEdit = (todo) => {
    setFormData({ title: todo.title, description: todo.description });
    setEditingId(todo._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_BASE}/todos/${id}`);
    fetchTodos();
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <button type="submit">{editingId ? 'Update' : 'Add'} Todo</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo._id} className="todo-item">
            <div>
              <strong>{todo.title}</strong> - {todo.description}
            </div>
            <div>
              <button onClick={() => handleEdit(todo)}>Edit</button>
              <button onClick={() => handleDelete(todo._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
