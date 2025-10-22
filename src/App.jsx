import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TaskInput from './components/TaskInput';
import TaskFilters from './components/TaskFilters';
import WeekView from './components/WeekView';
import DayDetailModal from './components/DayDetailModal';
import Footer from './components/Footer';
import './App.css';
import './index.css';
import { getWeekRangeFromDate } from './utils/dateHelpers';

function App() {
  const [selectedWeek, setSelectedWeek] = useState(
    getWeekRangeFromDate(new Date())
  );
  const [tasks, setTasks] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);
  const [showTaskInput, setShowTaskInput] = useState(false);


  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const openDayModal = (day) => {
    setSelectedDay(day);
    setIsModalOpen(true);
  };

  const closeDayModal = () => {
    setSelectedDay(null);
    setIsModalOpen(false);
  };

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (id, newText) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="app-container">
      <Header onAddTaskClick={() => setShowTaskInput(!showTaskInput)} />
      {showTaskInput && (
      <TaskInput onAddTask={addTask} />
)}

      <main className="bg-gray-50 text-gray-800 flex-grow container mx-auto px-4 py-6 space-y-6">
        
        <TaskFilters
          selectedWeek={selectedWeek}
          onChangeWeek={setSelectedWeek}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
        <WeekView
          selectedWeek={selectedWeek}
          tasks={tasks}
          activeFilter={activeFilter}
          onDayClick={openDayModal}
        />
        {isModalOpen && (
          <DayDetailModal
            day={selectedDay}
            tasks={tasks.filter((task) => task.date === selectedDay)}
            onClose={closeDayModal}
            onToggleComplete={toggleTaskCompletion}
            onEdit={editTask}
            onDelete={deleteTask}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
