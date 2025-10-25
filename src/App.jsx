import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {TodoProvider} from "./contexts"
import { useEffect } from 'react'
import { TodoForm, TodoItem } from './components'

function App() {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState('all') // all | active | completed
  const [query, setQuery] = useState('')
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved === 'dark' ? 'dark' : 'neon'
  })

  const addTodo = (todo) => {
    setTodos((prev) => [ {id: Date.now(), ...todo} , ...prev])
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === todo.id ? todo : prevTodo )))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos((prev) => 
      prev.map((prevTodo) => 
        prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo
      )
    )
  }

  const clearCompleted = () => {
    setTodos((prev) => prev.filter(t => !t.completed))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    if (todos && todos.length > 0) {
      setTodos(todos)
    }
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) setTheme(savedTheme)
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    localStorage.setItem('theme', theme)
    // For our custom theme we won't rely on Tailwind's dark class, but keep it for 'dark'
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const filtered = todos.filter(t => {
    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
    return true
  }).filter(t => t.todo.toLowerCase().includes(query.toLowerCase()))

  const activeCount = todos.filter(t => !t.completed).length

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className={`min-h-screen transition-colors py-12 ${
          theme === 'neon'
            ? 'relative text-white'
            : 'bg-slate-950 text-slate-100'
        } flex items-center justify-center`}>
        {theme === 'neon' && (
          <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
            <div className="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-fuchsia-500/25 blur-3xl"/>
            <div className="absolute -bottom-32 -right-24 h-[28rem] w-[28rem] rounded-full bg-cyan-400/25 blur-3xl"/>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[22rem] w-[22rem] rounded-full bg-indigo-500/20 blur-3xl"/>
          </div>
        )}
        <div className="w-full max-w-3xl mx-auto px-4 relative">
          <div className={`relative overflow-hidden ${
              theme === 'neon'
                ? 'rounded-[26px] border border-white/20 bg-slate-900/80 backdrop-blur-2xl shadow-[0_25px_90px_-25px_rgba(236,72,153,.35),0_15px_60px_-30px_rgba(34,211,238,.25)]'
                : 'rounded-2xl border border-white/10 bg-white/5 backdrop-blur shadow-2xl shadow-black/30'
            }`}>
            {theme === 'neon' && (
              <>
                <div className="pointer-events-none absolute inset-0 rounded-[26px] shadow-[inset_0_1px_0_0_rgba(255,255,255,.08)]" />
                <div className="pointer-events-none absolute -top-1 left-0 right-0 h-[3px] bg-gradient-to-r from-fuchsia-400 via-cyan-300 to-indigo-400 opacity-80" />
                <div className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 h-24 w-[80%] rounded-full bg-gradient-to-r from-fuchsia-500/20 via-cyan-400/20 to-indigo-500/20 blur-2xl" />
                <div className="pointer-events-none absolute inset-0 rounded-[26px] ring-1 ring-white/10" />
              </>
            )}
            <header className="px-7 pt-7 pb-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className={`font-extrabold tracking-tight ${theme==='neon' ? 'text-4xl text-white drop-shadow-[0_2px_12px_rgba(59,130,246,.35)]' : 'text-3xl'}`}>To-do List</h1>
                  <p className={`${theme==='neon' ? 'text-white/85' : 'text-slate-300'} text-sm`}>Manage your todos</p>
                </div>
                <button
                  className={`${theme==='neon' ? 'border-white/20 bg-white/10 hover:bg-white/20' : 'border-white/10 bg-white/10 hover:bg-white/20'} inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm border transition`}
                  onClick={() => setTheme(t => t === 'neon' ? 'dark' : 'neon')}
                >
                  {theme === 'neon' ? 'Neon' : 'Dark'}
                </button>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                <div className="flex-1"><TodoForm /></div>
                <div className="relative sm:w-64">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search tasks..."
                    className={`${theme==='neon' ? 'bg-white/5 border-white/30 text-white placeholder:text-white/70' : 'bg-white/10 border-white/10 text-slate-100 placeholder:text-slate-300/60'} w-full rounded-full px-5 py-3 outline-none border focus:ring-4 focus:ring-fuchsia-500/20`}
                  />
                </div>
              </div>
            </header>

            <div className="px-6 pb-6">
              {filtered.length === 0 ? (
                <div className={`${theme==='neon' ? 'border-white/20 bg-white/10 text-white/80' : theme==='dark' ? 'border-white/10 bg-white/5 text-slate-300' : 'border-slate-200 bg-white text-slate-600'} rounded-2xl border p-6 text-center`}>
                  <p className="text-sm">No matching tasks. Add or adjust your filters.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filtered.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} />
                  ))}
                </div>
              )}

              <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <div className={`${theme==='neon' ? 'text-white/80' : 'text-slate-300'} text-sm`}>{activeCount} items left</div>
                <div className="flex items-center gap-2">
                  {['all','active','completed'].map(f => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`${filter === f ? 'bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white border-transparent' : theme==='neon' ? 'border-white/20 bg-white/10 hover:bg-white/20 text-white' : 'border-white/10 bg-white/10 hover:bg-white/20 text-slate-100'} px-3 py-1.5 rounded-full text-sm border transition shadow-sm`}
                    >{f[0].toUpperCase() + f.slice(1)}</button>
                  ))}
                </div>
                <button
                  onClick={clearCompleted}
                  className={`${theme==='neon' ? 'border-rose-400/40 text-rose-300 hover:bg-rose-400/10' : 'border-white/10 text-slate-100 hover:bg-white/10'} px-4 py-2 rounded-full text-sm border transition`}
                >Clear completed</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App