import { Fragment, useState } from 'react'
import './App.css'
import TaskCounter from './components/TaskCounter.jsx'
import TaskForm from './components/TaskForm.jsx'
import TaskList from './components/TaskList.jsx'
import menuIcon from './assets/menu_icon.png'
import searchIcon from './assets/search_icon.png'
import inboxIcon from './assets/inbox_icon.png'
import calendarIcon from './assets/calendar_icon.png'
import upcomingIcon from './assets/upcoming_icon.png'

// Starting tasks: the five from the Assignment 1 mockup
const INITIAL_TASKS = [
  { id: 1, text: 'Call Mom', completed: false },
  { id: 2, text: 'Buy the new issue of Scientific American', completed: false },
  { id: 3, text: 'Return the textbook to Josie', completed: false },
  { id: 4, text: 'Buy the new album by Rake', completed: false },
  { id: 5, text: 'Buy a gift card for Dad', completed: false },
];

const FILTERS = ['All', 'Active', 'Completed'];

const EMPTY_MESSAGES = {
  All: 'No tasks yet. Add one above.',
  Active: 'No active tasks. Nice work!',
  Completed: 'No completed tasks yet.',
};

function App() {
  // App owns all task data; children get it through props
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [filter, setFilter] = useState('All');

  // ---------- handlers passed down as callback props ----------
  // Each one builds a new array instead of changing the old one
  const handleAddTask = (text) => {
    const newTask = { id: Date.now(), text, completed: false };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleToggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  // ---------- derived values (not stored in state) ----------
  const completedCount = tasks.filter((task) => task.completed).length;
  const activeCount = tasks.length - completedCount;

  const visibleTasks = tasks.filter((task) => {
    if (filter === 'Active') return !task.completed;
    if (filter === 'Completed') return task.completed;
    return true;
  });

  return (
    <div className="app">
      {/* ========== HEADER ========== */}
      <header className="app-header">
        <button type="button" className="menu-button" aria-label="Open menu">
          <img src={menuIcon} alt="" className="icon" />
        </button>

        <form className="quick-find" role="search" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="quick-find-input" className="visually-hidden">Quick find</label>
          <img src={searchIcon} alt="" className="icon" />
          <input type="search" id="quick-find-input" name="q" className="quick-find-input" placeholder="Quick find" />
        </form>

        <TaskCounter total={tasks.length} completed={completedCount} />
      </header>

      {/* ========== LEFT NAVIGATION ========== */}
      <nav className="sidebar" aria-label="Task categories">
        <ul className="sidebar-list">
          <li className="sidebar-item">
            <a href="#inbox" className="sidebar-link is-active" aria-current="page">
              <img src={inboxIcon} alt="" className="icon" />
              <span className="sidebar-label">Inbox</span>
              <span className="task-count">{activeCount}</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a href="#today" className="sidebar-link">
              <img src={calendarIcon} alt="" className="icon" />
              <span className="sidebar-label">Today</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a href="#upcoming" className="sidebar-link">
              <img src={upcomingIcon} alt="" className="icon" />
              <span className="sidebar-label">Upcoming</span>
            </a>
          </li>
        </ul>
      </nav>

      {/* ========== MAIN CONTENT ========== */}
      <main className="main-content">
        <section id="inbox" className="task-section">
          <h1 className="section-title">Inbox</h1>

          <div className="task-filters" role="group" aria-label="Filter tasks">
            {FILTERS.map((name, index) => (
              <Fragment key={name}>
                {index > 0 && <span aria-hidden="true">|</span>}
                <button
                  type="button"
                  className={filter === name ? 'filter-button is-active' : 'filter-button'}
                  aria-pressed={filter === name}
                  onClick={() => setFilter(name)}
                >
                  {name}
                </button>
              </Fragment>
            ))}
          </div>

          <TaskForm onAddTask={handleAddTask} />

          <TaskList
            tasks={visibleTasks}
            emptyMessage={EMPTY_MESSAGES[filter]}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
          />
        </section>
      </main>
    </div>
  )
}

export default App
