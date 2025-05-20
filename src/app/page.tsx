"use client"

import { useState } from 'react';
import styles from '../styles/Home.module.css';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

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

        <ul className={styles.todoList}>
          {todos.map(todo => (
              <li key={todo.id} className={todo.completed ? styles.done : ''}>
                <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
                <button onClick={() => deleteTodo(todo.id)}>❌</button>
              </li>
          ))}
        </ul>
      </div>
  );
}
