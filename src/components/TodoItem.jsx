import React, { useState } from 'react';
import { useTodo } from '../contexts/TodoContext';

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  const [localDue, setLocalDue] = useState(todo.due || '');

  const { updateTodo, deleteTodo, toggleComplete } = useTodo();

  const displayTextClass = todo.completed
    ? 'line-through text-slate-400'
    : isTodoEditable
    ? 'text-current'
    : 'text-black font-bold';

  const editTodo = () => {
    const next = todoMsg.trim();
    if (!next) return;
    updateTodo(todo.id, { ...todo, todo: next, due: localDue });
    setIsTodoEditable(false);
  };

  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };

  return (
    <div
      className={`group flex items-center gap-3 rounded-xl border border-white/10 bg-gradient-to-r from-white/5 to-white/3 px-4 py-3 shadow-[0_10px_30px_rgba(2,6,23,0.5)] transition-transform duration-200 hover:scale-[1.01] ${
        todo.completed ? 'opacity-60' : ''
      }`}
    >
      {/* Checkbox */}
      <input
        type="checkbox"
        className="cursor-pointer h-5 w-5 rounded-md border-white/20 bg-white/10 text-emerald-500 focus:ring-emerald-500/30 transition"
        checked={todo.completed}
        onChange={toggleCompleted}
      />

      {/* Task Content */}
      <div className="flex-1">
        <input
          type="text"
          className={`w-full bg-transparent placeholder:text-slate-200/70 outline-none rounded-md px-2 py-1 border transition ${
            isTodoEditable ? 'border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-500/20' : 'border-transparent'
          } ${displayTextClass}`}
          value={todoMsg}
          onChange={(e) => setTodoMsg(e.target.value)}
          readOnly={!isTodoEditable}
        />

        {/* Due Date */}
        {todo.due && !isTodoEditable && (
          <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
            <span>📅</span>
            <span>Due: {new Date(todo.due).toLocaleString()}</span>
          </div>
        )}

        {/* Editable Due Date */}
        {isTodoEditable && (
          <div className="mt-2">
            <input
              type="datetime-local"
              value={localDue}
              onChange={(e) => setLocalDue(e.target.value)}
              className="rounded-full bg-white/10 text-slate-400 border border-white/15 px-3 py-1.5 outline-none focus:ring-2 focus:ring-cyan-500/25 focus:border-cyan-400 text-xs w-full"
            />
          </div>
        )}
      </div>

      {/* Edit/Save Button */}
      <button
        className="inline-flex w-10 h-10 rounded-full text-sm border border-transparent justify-center items-center bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white shrink-0 hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-fuchsia-400/30"
        onClick={() => {
          if (todo.completed) return;
          if (isTodoEditable) {
            editTodo();
          } else setIsTodoEditable((prev) => !prev);
        }}
        disabled={todo.completed}
        aria-label={isTodoEditable ? 'Save' : 'Edit'}
      >
        {isTodoEditable ? '💾' : '✏️'}
      </button>

      {/* Delete Button */}
      <button
        className="inline-flex w-10 h-10 rounded-full text-sm border border-transparent justify-center items-center bg-rose-500/90 text-white hover:scale-105 transition-transform shrink-0 focus:outline-none focus:ring-2 focus:ring-rose-400/30"
        onClick={() => deleteTodo(todo.id)}
        aria-label="Delete"
      >
        🗑️
      </button>
    </div>
  );
}

export default TodoItem;