"use client"

import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // Load todos from localStorage on first render
  useEffect(() => {
    const stored = localStorage.getItem('todos');
    if (stored) {
      setTodos(JSON.parse(stored));
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim() === '') return;

    setTodos([
      ...todos,
      { id: Date.now(), text: input.trim(), completed: false }
    ]);
    setInput('');
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearAll = () => {
    if (confirm("Are you sure you want to delete all todos?")) {
      setTodos([]);
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all'
  });


  return (
      <div className={styles.container}>
        <h1>Next.js Todo App</h1>

        <div className={styles.inputGroup}>
          <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter a todo"
          />
          <button onClick={addTodo}>Add</button>
        </div>

        <div className={styles.filters}>
          <button onClick={() => setFilter('all')} className={filter === 'all' ? styles.activeFilter : ''}>All</button>
          <button onClick={() => setFilter('active')} className={filter === 'active' ? styles.activeFilter : ''}>Active</button>
          <button onClick={() => setFilter('completed')} className={filter === 'completed' ? styles.activeFilter : ''}>Completed</button>
        </div>

        <ul className={styles.todoList}>
          {filteredTodos.map(todo => (
              <li key={todo.id} className={todo.completed ? styles.done : ''}>
                <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
                <button onClick={() => deleteTodo(todo.id)}>❌</button>
              </li>
          ))}
        </ul>

        <button onClick={clearAll} className={styles.clearButton}>
          Clear All Todos
        </button>

      </div>
  );
}
