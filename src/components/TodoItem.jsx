import React from 'react'
import { useState } from 'react'
import { useTodo } from '../contexts/TodoContext'

function TodoItem({todo}) {
    const [isTodoEditable, setIsTodoEditable] = useState(false)
    const [todoMsg, setTodoMsg] = useState(todo.todo)
    const [localDue, setLocalDue] = useState(todo.due || '')

    const {updateTodo, deleteTodo, toggleComplete} = useTodo()

    const editTodo = () => {
        const next = todoMsg.trim()
        if (!next) return
        updateTodo(todo.id, {...todo, todo: next, due: localDue})
        setIsTodoEditable(false)
    }

    const toggleCompleted = () => {
        toggleComplete(todo.id)
    }

  return (
    <div
      className={`group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 shadow-lg shadow-black/20 transition ${todo.completed ? 'opacity-70' : ''}`}
    >
        <input type="checkbox" 
          className='cursor-pointer h-5 w-5 rounded-md border-white/20 bg-white/10 text-emerald-500 focus:ring-emerald-500/30'
          checked={todo.completed}
          onChange={toggleCompleted}
        />
        <div className='flex-1'>
          <input type="text" 
            className={`w-full bg-transparent text-slate-100 placeholder:text-slate-400/70 outline-none rounded-md px-2 py-1 border ${isTodoEditable ? 'border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-500/20' : 'border-transparent'} ${todo.completed ? 'line-through text-slate-400' : ''}`}
            value={todoMsg}
            onChange={(e) => setTodoMsg(e.target.value)}
            readOnly={!isTodoEditable}
          />
          {todo.due && !isTodoEditable && (
            <div className='text-xs text-slate-300/80 mt-1'>Due: {new Date(todo.due).toLocaleString()}</div>
          )}
          {isTodoEditable && (
            <div className='mt-2'>
              <input
                type='datetime-local'
                value={localDue}
                onChange={(e)=>setLocalDue(e.target.value)}
                className='rounded-full bg-white/10 text-slate-100 border border-white/15 px-3 py-1.5 outline-none focus:ring-2 focus:ring-cyan-500/25 focus:border-cyan-400 text-xs'
              />
            </div>
          )}
        </div>
        <button
          className='inline-flex w-10 h-10 rounded-full text-sm border border-white/15 justify-center items-center bg-gradient-to-r from-fuchsia-500/80 to-cyan-500/80 hover:from-fuchsia-500 hover:to-cyan-500 active:from-fuchsia-600 active:to-cyan-600 text-white shrink-0 disabled:opacity-40 transition focus:outline-none focus:ring-2 focus:ring-fuchsia-400/30'
          onClick={() => {
            if (todo.completed) return
            if (isTodoEditable) {
                editTodo()
            } else setIsTodoEditable((prev) => !prev)
          }}
          disabled={todo.completed}
          aria-label={isTodoEditable ? 'Save' : 'Edit'}
        >{isTodoEditable ? '💾' : '✏️'}</button>
        <button
          className='inline-flex w-10 h-10 rounded-full text-sm border border-white/15 justify-center items-center bg-white/10 hover:bg-rose-500/20 active:bg-rose-500/25 hover:border-rose-400 shrink-0 transition focus:outline-none focus:ring-2 focus:ring-rose-400/30'
          onClick={() => deleteTodo(todo.id)}
          aria-label='Delete'
        >🗑️</button>
    </div>
  )
}

export default TodoItem