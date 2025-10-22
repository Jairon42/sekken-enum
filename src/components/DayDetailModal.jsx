import React, { useState } from 'react';

export default function DayDetailModal({
  day,
  tasks,
  onClose,
  onToggleComplete,
  onEdit,
  onDelete,
}) {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editText, setEditText] = useState('');
  const [originalText, setOriginalText] = useState('');

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
    setEditText('');
    setOriginalText('');
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
          onClick={onClose}
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">Tasks for {day}</h2>

        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
          {tasks.map((task) => (
            <div
              className={`flex items-center justify-between bg-gray-50 border rounded-lg p-3 ${
                task.important ? 'bg-yellow-100 border-yellow-500' : ''
              }`}
              key={task.id}
            >
              {/* Task info */}
              <div className="flex items-center gap-2 flex-1">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => onToggleComplete(task.id)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />

                {editingTaskId === task.id ? (
                  <input
                    className="flex-1 px-2 py-1 border rounded-md text-sm"
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                ) : (
                  <span
                    className={`flex-1 text-sm ${
                      task.completed ? 'line-through text-gray-400' : ''
                    }`}
                  >
                    {task.text}
                  </span>
                )}
              </div>

              {/* Edit and Delete buttons */}
              <div className="flex items-center gap-1 ml-2">
                {editingTaskId === task.id ? (
                  editText.trim() !== originalText.trim() && (
                    <button
                      onClick={handleSave}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                  )
                ) : (
                  <button
                    onClick={() => startEditing(task)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                )}

                <button
                  onClick={() => onDelete(task.id)}
                  className="bg-gray-200 hover:bg-gray-300 text-red-700 px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
