import React from 'react';
import DayColumn from './DayColumn';

export default function WeekView({ selectedWeek, tasks, activeFilter, onDayClick }) {
  const startDate = new Date(selectedWeek.monday);

  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() + i
    );

    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    const formattedDate = date.toISOString().split('T')[0];

    return { name: dayName, date: formattedDate };
  });

  return (
    <section className="week-view flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:justify-center px-4">
      {days.map((day) => {
        let dayTasks = tasks.filter((task) => task.date === day.date);

        if (activeFilter === 'completed') {
          dayTasks = dayTasks.filter((task) => task.completed);
        } else if (activeFilter === 'incomplete') {
          dayTasks = dayTasks.filter((task) => !task.completed);
        } else if (activeFilter === 'important') {
          dayTasks = dayTasks.filter((task) => task.important);
        }
        return (
          <DayColumn
            key={day.date}
            day={day.name}
            date={day.date}
            tasks={dayTasks}
            onDayClick={onDayClick}
          />
        );
      })}
    </section>
  );
}
