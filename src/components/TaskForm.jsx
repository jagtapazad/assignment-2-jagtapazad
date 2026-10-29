import { useState } from 'react'

// Controlled input: the text lives in local state, App only hears about real tasks
function TaskForm({ onAddTask }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    // Empty or whitespace-only input adds nothing
    if (!trimmed) {
      return;
    }
    onAddTask(trimmed);
    setText('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label htmlFor="new-task-input" className="visually-hidden">New task</label>
      <input
        type="text"
        id="new-task-input"
        className="task-input"
        placeholder="Add a task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="add-button">Add task</button>
    </form>
  )
}

export default TaskForm
