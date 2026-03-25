import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Sidebar = () => {
  const { logout } = useAuth();
  const { toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">STELLAR<span>MOTORS</span></div>
      </div>

      <nav>
        <NavLink className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} to="/dashboard">
          Dashboard
        </NavLink>
        <NavLink className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} to="/cars">
          Cars Inventory
        </NavLink>
        <NavLink className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} to="/customers">
          Customers
        </NavLink>
      </nav>

      <div className="logout-wrapper">
        <button id="themeToggle" className="theme-toggle-btn" onClick={toggleTheme}>
          <span>🌓</span> Switch Theme
        </button>
        <a className="nav-item" href="#" onClick={handleLogout} style={{ marginTop: '0.5rem' }}>
          Logout
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
