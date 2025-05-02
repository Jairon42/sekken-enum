import React from 'react';
import DayColumn from "./DayColumn";

export default function WeekView({ selectedWeek, tasks, onDayClick }) {
  const startDate = new Date(selectedWeek.monday);

  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i);

    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    const formattedDate = date.toISOString().split('T')[0];

    return { name: dayName, date: formattedDate };
  });

  return (
    <section className="week-view">
      {days.map((day) => {
        const dayTasks = tasks.filter(task => task.date === day.date);
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
