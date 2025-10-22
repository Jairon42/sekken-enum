export default function AppFooter() {
  return (
    <footer className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-8 mt-12">
      <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-6">
        {/* Branding */}
        <div className="text-xl font-bold tracking-wide">
          WeeklyPlanner <span className="text-yellow-300">📅</span>
        </div>

        {/* Navegación */}
        <nav className="flex gap-6 text-sm font-medium">
          <a href="#" className="hover:text-yellow-300 transition duration-200">Inicio</a>
          <a href="#" className="hover:text-yellow-300 transition duration-200">Sobre</a>
          <a href="#" className="hover:text-yellow-300 transition duration-200">Contacto</a>
        </nav>

        {/* Copyright */}
        <div className="text-xs text-white/80 text-center sm:text-right">
          © {new Date().getFullYear()} WeeklyPlanner. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
