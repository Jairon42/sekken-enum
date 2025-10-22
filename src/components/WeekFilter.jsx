import React, { useState, useEffect } from 'react';
import { getWeekRangeFromDate, formatDateShort } from '../utils/dateHelpers';

export default function WeekFilter({ selectedWeek, onChangeWeek }) {
  const [weekOptions, setWeekOptions] = useState([]);

  useEffect(() => {
    const weeks = [];
    const today = new Date();

    for (let i = 0; i < 4; i++) {
      const baseDate = new Date();
      baseDate.setDate(today.getDate() + i * 7);
      const { monday, sunday } = getWeekRangeFromDate(baseDate);
      weeks.push({
        label: `Week ${i + 1}: ${formatDateShort(monday)} - ${formatDateShort(sunday)}`,
        value: { monday, sunday },
      });
    }

    setWeekOptions(weeks);
  }, []);

  return (
    <div className="week-selector">
      <label>Showing: </label>
      <select
        value={formatDateShort(selectedWeek.monday)}
        onChange={(e) => {
          const week = weekOptions.find(
            (w) => formatDateShort(w.value.monday) === e.target.value
          );
          onChangeWeek(week.value);
        }}
      >
        {weekOptions.map((week, index) => (
          <option key={index} value={formatDateShort(week.value.monday)}>
            {week.label}
          </option>
        ))}
      </select>

      {/* Opcional: botón para calendario */}
      <button
        className="calendar-button"
        onClick={() => alert('Open calendar (coming soon)')}
      >
        📅
      </button>
    </div>
  );
}
