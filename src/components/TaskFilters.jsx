import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getWeekRangeFromDate, formatDateShort } from '../utils/dateHelpers';
import { FaCalendarAlt } from 'react-icons/fa';

export default function TaskFilters({ selectedWeek, onChangeWeek, activeFilter, onFilterChange}) {
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateChange = (date) => {
    const newWeek = getWeekRangeFromDate(date);
    onChangeWeek(newWeek);
    setShowCalendar(false); // Cierra el calendario después de seleccionar la fecha
  };

  const handleFilterChange = (filter) => {
    onFilterChange(filter === activeFilter ? null : filter);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-md mx-auto space-y-6 relative">
      {/* Título de los filtros */}
      <h2 className="text-2xl font-semibold text-gray-800">Filters</h2>

      {/* Rango de la semana y botón del calendario */}
      <div className="flex justify-between items-center">
        <span className="text-lg text-gray-600">
          Week: {formatDateShort(selectedWeek.monday)} -{' '}
          {formatDateShort(selectedWeek.sunday)}
        </span>
        <button
          onClick={() => setShowCalendar(!showCalendar)}
          className="p-2 rounded-full bg-gray-100 hover:bg-blue-500 transition duration-200"
          aria-label="Toggle calendar"
        >
          <FaCalendarAlt size={20} className="text-gray-600 hover:text-white" />
        </button>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-2 gap-2">
        <button
          className={`py-2 px-4 rounded-md text-white ${activeFilter === 'completed' ? 'bg-blue-500' : 'bg-gray-300'} hover:bg-blue-600`}
          onClick={() => handleFilterChange('completed')}
        >
          Completed
        </button>
        <button
          className={`py-2 px-4 rounded-md text-white ${activeFilter === 'incomplete' ? 'bg-blue-500' : 'bg-gray-300'} hover:bg-blue-600`}
          onClick={() => handleFilterChange('incomplete')}
        >
          Incomplete
        </button>
        <button
          className={`py-2 px-4 rounded-md text-white ${activeFilter === 'important' ? 'bg-blue-500' : 'bg-gray-300'} hover:bg-blue-600`}
          onClick={() => handleFilterChange('important')}
        >
          Important
        </button>
      </div>

      {/* Mostrar el calendario solo si showCalendar es verdadero */}
      {showCalendar && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white shadow-lg rounded-lg p-4 z-50">
          <DatePicker
            selected={new Date(selectedWeek.monday)}
            onChange={handleDateChange}
            inline
            showWeekNumbers
            calendarStartDay={1}
            className="w-full"
          />
        </div>
      )}
    </div>
  );
}
