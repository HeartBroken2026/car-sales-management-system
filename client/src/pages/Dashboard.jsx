import { useState, useEffect, useCallback, useRef } from 'react';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ totalCars: 0, carsSold: 0, totalCustomers: 0 });
  const [displayStats, setDisplayStats] = useState({ totalCars: 0, carsSold: 0, totalCustomers: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await API.get('/dashboard/stats');
        setStats(data);
      } catch (err) {
        console.error('Failed to fetch stats', err);
      }
    };
    fetchStats();
  }, []);

  // Animate counting up
  useEffect(() => {
    const duration = 800;
    const start = performance.now();
    const startValues = { ...displayStats };

    const animate = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplayStats({
        totalCars: Math.floor(progress * (stats.totalCars - startValues.totalCars) + startValues.totalCars),
        carsSold: Math.floor(progress * (stats.carsSold - startValues.carsSold) + startValues.carsSold),
        totalCustomers: Math.floor(progress * (stats.totalCustomers - startValues.totalCustomers) + startValues.totalCustomers),
      });
      if (progress < 1) requestAnimationFrame(animate);
      else setDisplayStats(stats);
    };

    requestAnimationFrame(animate);
  }, [stats]);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        <div className="top-bar">
          <div>
            <h2>Overview</h2>
            <p>Welcome back, <strong id="userName" style={{ color: 'var(--primary)' }}>{user?.name || 'Admin'}</strong></p>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-header">
              <div>
                <div className="stat-value" id="totalCars">{displayStats.totalCars}</div>
                <div className="stat-label">Total Cars</div>
              </div>
              <div className="stat-icon bg-blue">🚗</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <div>
                <div className="stat-value" id="carsSold">{displayStats.carsSold}</div>
                <div className="stat-label">Cars Sold</div>
              </div>
              <div className="stat-icon bg-green">✅</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <div>
                <div className="stat-value" id="totalCustomers">{displayStats.totalCustomers}</div>
                <div className="stat-label">Active Customers</div>
              </div>
              <div className="stat-icon bg-purple">👤</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
