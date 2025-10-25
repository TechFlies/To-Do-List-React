import React from 'react'
import { useState } from 'react'
import {useTodo} from "../contexts/TodoContext"

function TodoForm() {
    const [todo, setTodo] = useState("")
    const [due, setDue] = useState("")
    const { addTodo } = useTodo()

    const add = (e) => {
        e.preventDefault()
        if (!todo.trim()) return
        addTodo({ todo: todo.trim(), completed: false, due })
        setTodo("")
        setDue("")
    }
  return (
    <form onSubmit={add} className='flex flex-col sm:flex-row items-stretch gap-2'>
        <div className='relative flex-1 flex gap-2'>
            <input
                type="text"
                placeholder='Add a task...'
                className='w-full rounded-full bg-white/10 text-slate-100 placeholder:text-slate-300/70 border border-white/15 px-6 py-4 text-base md:text-lg outline-none focus:ring-4 focus:ring-fuchsia-500/25 focus:border-fuchsia-400 shadow-inner shadow-black/20'
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />
            <input
                type='datetime-local'
                value={due}
                onChange={(e)=>setDue(e.target.value)}
                className='min-w-[13rem] rounded-full bg-white/10 text-slate-100 border border-white/15 px-5 py-4 text-sm md:text-base outline-none focus:ring-4 focus:ring-cyan-500/25 focus:border-cyan-400'
              />
        </div>
        <button
            type="submit"
            className='inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-500 hover:from-fuchsia-400 hover:to-cyan-400 active:from-fuchsia-600 active:to-cyan-600 text-white px-4 py-2 text-sm md:text-base font-semibold shadow-md transition focus:outline-none focus:ring-4 focus:ring-fuchsia-500/30'
        >
            ➕ Add
        </button>
    </form>
  )
}

export default TodoForm