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
  const [showCalendar, setShowCalendar] = useState(false);
  const [isImportant, setIsImportant] = useState(false);

  const handleAddTask = () => {
    if (!task.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      text: task.trim(),
      date,
      completed: false,
      important: isImportant,
      overdue: false,
    };

    onAddTask(newTask);
    setTask('');
    setDate(getLocalDateString());
    setIsImportant(false);
  };

  const handleCalendarToggle = () => {
    setShowCalendar((prevState) => !prevState);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
    setShowCalendar(false);
  };

  return (
    <div className="flex flex-col bg-white shadow-lg p-6 rounded-lg space-y-4 max-w-xl mx-auto relative">
      {/* Input de tarea + botón de importante */}
      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
        <input
          type="text"
          placeholder="Add new task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="flex-1 p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={() => setIsImportant(!isImportant)}
          className={`px-4 text-xl transition duration-200 ${
          isImportant
          ? 'text-yellow-500 bg-yellow-100 rounded-full scale-110'
          : 'text-gray-400 hover:text-yellow-500'
          }`}
          title="Marcar como importante"
          >
          ⭐
        </button>

      </div>

      {/* Selector de fecha */}
      <div className="flex items-center space-x-3 relative">
        <button
          className="text-gray-500 hover:text-blue-500 transition duration-200"
          onClick={handleCalendarToggle}
        >
          <FaRegCalendarAlt size={24} />
        </button>

        {showCalendar && (
          <div className="absolute top-full left-0 mt-2 w-full bg-white shadow-lg rounded-lg z-50">
            <input
              type="date"
              value={date}
              onChange={handleDateChange}
              ref={dateInputRef}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        <span className="text-lg text-gray-600">
          {date === new Date().toISOString().split('T')[0] ? 'Today' : date}
        </span>
      </div>

      {/* Botón para agregar tarea */}
      <button
        onClick={handleAddTask}
        className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center space-x-2"
      >
        <FaPlus />
        <span>Add Task</span>
      </button>
    </div>
  );
};

export default TaskInput;
