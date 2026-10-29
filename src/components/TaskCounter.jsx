import checkIcon from '../assets/check_icon.png'

// Header stats in "total/completed" form, always for all tasks
function TaskCounter({ total, completed }) {
  return (
    <p className="task-counter">
      <img src={checkIcon} alt="Completed tasks" className="icon" />
      {total}/{completed}
    </p>
  )
}

export default TaskCounter
