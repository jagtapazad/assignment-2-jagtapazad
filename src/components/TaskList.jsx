import TaskItem from './TaskItem.jsx'

// Renders the tasks it is given (already filtered by App), or an empty state
function TaskList({ tasks, emptyMessage, onToggleTask, onDeleteTask }) {
  if (tasks.length === 0) {
    return <p className="empty-state">{emptyMessage}</p>
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleTask={onToggleTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </ul>
  )
}

export default TaskList
