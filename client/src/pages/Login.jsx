import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isAuthenticated, loading } = useAuth();
  const { toggleTheme } = useTheme();
  const navigate = useNavigate();

  // Redirect if already logged in
  if (isAuthenticated) {
    navigate('/dashboard', { replace: true });
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login(email, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', position: 'relative' }}>
      <button
        id="themeToggle"
        onClick={toggleTheme}
        style={{
          position: 'absolute', top: '1rem', right: '1rem',
          background: 'none', border: 'none', fontSize: '1.5rem',
          cursor: 'pointer', color: 'var(--text-muted)'
        }}
      >
        🌓
      </button>

      <div className="card" style={{ width: '100%', maxWidth: '400px', padding: '2.5rem', borderColor: 'var(--primary)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div className="logo" style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: 800 }}>
            CAR<span style={{ color: 'var(--primary)' }}>SALES</span>
          </div>
          <h2>Admin Portal</h2>
          <p style={{ fontSize: '0.9rem' }}>Authorized personnel only</p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(239,68,68,0.1)', color: 'var(--danger)',
            padding: '0.75rem', borderRadius: 'var(--radius-sm)',
            marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Email</label>
            <input
              type="email"
              id="email"
              required
              placeholder="admin@stellar.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Password</label>
            <input
              type="password"
              id="password"
              required
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn" style={{ width: '100%', marginBottom: '1.5rem' }} disabled={loading}>
            {loading ? 'Signing in...' : 'Secure Login'}
          </button>

          <div style={{
            textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-dim)',
            padding: '1rem', background: 'rgba(255,255,255,0.03)',
            borderRadius: 'var(--radius-sm)'
          }}>
            <p>Default credentials:</p>
            <p style={{ color: 'var(--text-muted)' }}>admin@stellar.com / admin123</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
