// One task: checkbox, text, delete button
function TaskItem({ task, onToggleTask, onDeleteTask }) {
  const checkboxId = `task-${task.id}`;

  return (
    <li className={task.completed ? 'task-item is-completed' : 'task-item'}>
      <input
        type="checkbox"
        id={checkboxId}
        className="task-checkbox"
        checked={task.completed}
        onChange={() => onToggleTask(task.id)}
      />
      <label htmlFor={checkboxId} className="task-label">{task.text}</label>
      <button
        type="button"
        className="delete-button"
        aria-label={`Delete "${task.text}"`}
        onClick={() => onDeleteTask(task.id)}
      >
        &times;
      </button>
      <hr className="task-divider" />
    </li>
  )
}

export default TaskItem
