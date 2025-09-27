import { useState } from 'react';
import '../assets/todo.css';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    
    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false
    };
    
    setTodos([...todos, newTodo]);
    setInput('');
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h1>Todo List</h1>
      </div>
      
      <form onSubmit={addTodo} className="input-section">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task..."
        />
        <button type="submit">Add Task</button>
      </form>

      <ul className="todo-list">
        {todos.map(todo => (
          <li 
            key={todo.id} 
            className={`todo-item ${todo.completed ? 'completed' : ''}`}
          >
            <span className="todo-text">{todo.text}</span>
            <div className="todo-actions">
              <button
                className="complete-btn"
                onClick={() => toggleComplete(todo.id)}
              >
                {todo.completed ? '↩️' : '✓'}
              </button>
              <button
                className="delete-btn"
                onClick={() => deleteTodo(todo.id)}
              >
                ✕
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;