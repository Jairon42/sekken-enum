import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getWeekRangeFromDate, formatDateShort } from "../utils/dateHelpers";
import { FaCalendarAlt } from 'react-icons/fa';

  export default function TaskFilters({ selectedWeek, onChangeWeek }) {
  const [activeFilter, setActiveFilter] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateChange = (date) => {
    const newWeek = getWeekRangeFromDate(date);
    onChangeWeek(newWeek);
    setShowCalendar(false);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter === activeFilter ? null : filter);
  };

  return (
    <>
      <div className="task-filters">
        <h2>Filters</h2>
        <div className="week-label-calendar">
          <span className="current-week-label">
            Week: {formatDateShort(selectedWeek.monday)} - {formatDateShort(selectedWeek.sunday)}
          </span>
          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className="calendar-button"
          >
            <FaCalendarAlt size={20} />
          </button>
        </div>

        <div className="filters">
          <button
            className={activeFilter === "completed" ? "active" : ""}
            onClick={() => handleFilterChange("completed")}
          >
            Completed
          </button>
          <button
            className={activeFilter === "incomplete" ? "active" : ""}
            onClick={() => handleFilterChange("incomplete")}
          >
            Incomplete
          </button>
          <button
            className={activeFilter === "important" ? "active" : ""}
            onClick={() => handleFilterChange("important")}
          >
            Important
          </button>
          <button
            className={activeFilter === "past" ? "active" : ""}
            onClick={() => handleFilterChange("past")}
          >
            Past
          </button>
        </div>
      </div>

      {showCalendar && (
        <div className="datepicker-absolute">
          <DatePicker
            selected={new Date(selectedWeek.monday)}
            onChange={handleDateChange}
            inline
            showWeekNumbers
            calendarStartDay={1}
          />
        </div>
      )}
    </>
  );
}
