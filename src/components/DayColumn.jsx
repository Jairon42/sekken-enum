import React from 'react';
import TaskItem from './TaskItem';

export default function DayColumn({ day, date, tasks, onDayClick }) {
  return (
    <div
      className="day-column bg-white border border-gray-200 rounded-xl shadow p-4 w-full sm:w-[190px] h-[400px] flex flex-col"
      onClick={() => onDayClick(date)}
    >
      <h3 className="text-blue-800 text-lg font-semibold mb-2 text-center">
        {day} <br />
        <span className="text-sm text-gray-500">{date}</span>
      </h3>
      <div className="border-t border-gray-200 mb-2"></div>
      <ul className="flex-1 overflow-y-auto space-y-2 pr-1">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
}

