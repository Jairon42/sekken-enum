export default function Header({onAddTaskClick}) {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo / Título */}
        <h1 className="text-2xl font-bold text-blue-600 tracking-tight">
          Weekly Planner
        </h1>

        {/* Navegación */}
        <nav className="hidden sm:flex gap-6 text-gray-700 font-medium">
          <button className="hover:text-blue-600 transition">Home</button>
          <button className="hover:text-blue-600 transition">Stats</button>
          <button className="hover:text-blue-600 transition">Settings</button>
        </nav>

        {/* Botón o iconos opcionales */}
        <div className="flex items-center gap-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition hidden sm:block"
          onClick={onAddTaskClick}
          >
            Add Task
          </button>
          {/* Menú para móviles */}
          <button className="sm:hidden text-gray-600 hover:text-blue-600"
          onClick={onAddTaskClick}
          >
            Add
          </button>
        </div>
      </div>
    </header>
  );
}
