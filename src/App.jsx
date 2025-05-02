import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import TaskInput from "./components/TaskInput";
import TaskFilters from "./components/TaskFilters";
import WeekView from "./components/WeekView";
import DayDetailModal from "./components/DayDetailModal";
import Footer from "./components/Footer";
import "./App.css";
import { getWeekRangeFromDate } from "./utils/dateHelpers";

function App() {
  const [selectedWeek, setSelectedWeek] = useState(getWeekRangeFromDate(new Date()));
  const [tasks, setTasks] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ Cargar tareas desde localStorage al iniciar
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // ✅ Guardar tareas en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
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
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const editTask = (id, newText) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: newText } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="app-container">
      <Header />
      <main>
        <TaskInput onAddTask={addTask} />
        <TaskFilters
          selectedWeek={selectedWeek}
          onChangeWeek={setSelectedWeek}
        />
        <WeekView selectedWeek={selectedWeek} tasks={tasks} onDayClick={openDayModal} />
        {isModalOpen && (
          <DayDetailModal
            day={selectedDay}
            tasks={tasks.filter(task => task.date === selectedDay)}
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
