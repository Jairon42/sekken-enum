import React from 'react';

const TaskItem = ({ task }) => {
  const { text, completed, important, overdue } = task;

  const truncatedText = text.length > 15 ? text.substring(0, 15) + '...' : text;

  let taskClass = 'task-item';
  if (completed) taskClass += ' completed';
  if (important) taskClass += ' important';
  if (overdue) taskClass += ' overdue';

  return (
    <li className={taskClass}>
      {truncatedText}
    </li>
  );
};

export default TaskItem;