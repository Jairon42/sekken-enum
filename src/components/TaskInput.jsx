import { useState, useRef } from 'react';
import { FaRegCalendarAlt, FaPlus } from 'react-icons/fa';

function getLocalDateString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}


const TaskInput = ({ onAddTask }) => {
  const dateInputRef = useRef(null);
  const [task, setTask] = useState('');
  const [date, setDate] = useState(() => getLocalDateString());

  const handleAddTask = () => {
    if (!task.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      text: task.trim(),
      date,
      completed: false,
      important: false,
      overdue: false,
    };

    onAddTask(newTask);
    setTask('');
    setDate(getLocalDateString());
  };

  return (
    <div className="task-input-container">
      <input
        type="text"
        placeholder="Add a new task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="task-input-text"
      />

      <div className="task-date-selector">
        <button
          className="calendar-toggle"
          onClick={() => dateInputRef.current.showPicker()}
        >
          <FaRegCalendarAlt size={30} />
        </button>
        <input
          type="date"
          className="calendar-input"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          ref={dateInputRef}
          style={{
            position: 'absolute',
            opacity: 0,
            pointerEvents: 'none',
            width: 0,
            height: 0,
          }}
        />
        <span className="date-preview">
          {date === new Date().toISOString().split('T')[0]
            ? 'Today'
            : date}
        </span>
      </div>

      <button className="add-task-button" onClick={handleAddTask}>
        <FaPlus style={{ marginRight: '6px' }} />
        Add
      </button>
    </div>
  );
};

export default TaskInput;
