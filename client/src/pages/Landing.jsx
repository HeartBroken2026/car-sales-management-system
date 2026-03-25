import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Landing = () => {
  const { toggleTheme } = useTheme();
  const { isAuthenticated } = useAuth();

  return (
    <div style={{ minHeight: '100vh' }}>
      <button id="themeToggle" className="theme-toggle-fixed" onClick={toggleTheme}>
        🌓
      </button>

      <section className="hero">
        <div className="hero-content">
          <h1>Manage Your Fleet<br /><span>With Excellence</span></h1>
          <p>The centralized admin system for inventory management, sales tracking, and customer relations.</p>
          <Link to={isAuthenticated ? '/dashboard' : '/login'} className="btn btn-large">
            Enter Admin Portal
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;
