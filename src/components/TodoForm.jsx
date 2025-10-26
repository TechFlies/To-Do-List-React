import React, { useState } from 'react';
import { useTodo } from '../contexts/TodoContext';

function TodoForm({ query, setQuery }) {
  const [todo, setTodo] = useState('');
  const [due, setDue] = useState('');
  const { addTodo } = useTodo();

  const add = (e) => {
    e.preventDefault();
    if (!todo.trim()) return;
    addTodo({ todo: todo.trim(), completed: false, due });
    setTodo('');
    setDue('');
  };

  return (
    <form onSubmit={add} className="space-y-4">
      {/* Row 1: Task input + Add button */}
      <div className="flex flex-row gap-4 items-center">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Add a task..."
            className="w-full rounded-full bg-white/10 text-slate-100 placeholder:text-slate-300/70 border border-white/15 pl-12 pr-5 py-4 text-base outline-none focus:ring-4 focus:ring-fuchsia-500/25 focus:border-fuchsia-400 shadow-inner shadow-black/20"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-fuchsia-400 text-lg">📝</span>
        </div>

        <button
          type="submit"
          className="whitespace-nowrap rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-500 hover:from-fuchsia-400 hover:to-cyan-400 active:from-fuchsia-600 active:to-cyan-600 text-white px-6 py-3 text-base font-semibold shadow-md transition focus:outline-none focus:ring-4 focus:ring-fuchsia-500/30"
        >
          ➕ Add Task
        </button>
      </div>

      {/* Row 2: Date-time + Search bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="datetime-local"
            value={due}
            onChange={(e) => setDue(e.target.value)}
            className="w-full rounded-full bg-white/10 text-slate-100 border border-white/15 pl-12 pr-5 py-4 text-base outline-none focus:ring-4 focus:ring-cyan-500/25 focus:border-cyan-400"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 text-lg">📅</span>
        </div>

        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search tasks..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-full bg-white/10 text-slate-100 placeholder:text-slate-300/70 border border-white/15 pl-12 pr-5 py-4 text-base outline-none focus:ring-4 focus:ring-fuchsia-500/25 focus:border-fuchsia-400"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-fuchsia-400 text-lg">🔍</span>
        </div>
      </div>
    </form>
  );
}

export default TodoForm;