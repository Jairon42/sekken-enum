import React from 'react';
import TaskItem from './TaskItem';

export default function DayColumn({ day, date, tasks, onDayClick }) {
  return (
    <div className="day-column" onClick={() => onDayClick(date)}>
      <h3>{day} ({date})</h3>
      <div className="divider"></div>
      <ul className="task-list">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
}