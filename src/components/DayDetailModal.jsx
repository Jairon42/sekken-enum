import React, { useState } from 'react';

export default function DayDetailModal({
  day,
  tasks,
  onClose,
  onToggleComplete,
  onEdit,
  onDelete
}) {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editText, setEditText] = useState("");
  const [originalText, setOriginalText] = useState("");

  const startEditing = (task) => {
    setEditingTaskId(task.id);
    setEditText(task.text);
    setOriginalText(task.text);
  };

  const handleSave = () => {
    if (editText.trim() !== originalText.trim()) {
      onEdit(editingTaskId, editText.trim());
    }
    setEditingTaskId(null);
    setEditText("");
    setOriginalText("");
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>✖</button>
        <h2>Tasks for {day}</h2>

        {tasks.map((task) => (
          <div className="task-item" key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleComplete(task.id)}
            />

            {editingTaskId === task.id ? (
              <>
                <input
                  className="edit-input"
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                {editText.trim() !== originalText.trim() && (
                  <button onClick={handleSave}>💾</button>
                )}
              </>
            ) : (
              <>
                <span className={task.completed ? "completed" : ""}>
                  {task.text}
                </span>
                <button onClick={() => startEditing(task)}>✏️</button>
              </>
            )}

            <button onClick={() => onDelete(task.id)}>🗑️</button>
          </div>
        ))}
      </div>
    </div>
  );
}
