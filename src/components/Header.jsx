import { FaUserCircle } from 'react-icons/fa';
import { MdCalendarToday } from 'react-icons/md';

const Header = () => {
  return (
    <header className="app-header">
      <div className="logo">
        <MdCalendarToday size={24} />
        <span className="app-name">To-Do Planner</span>
      </div>
      <div className="header-actions">
        <button className="icon-button" aria-label="Profile">
          <FaUserCircle size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;