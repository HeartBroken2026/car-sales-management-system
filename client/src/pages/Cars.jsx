import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import API from '../services/api';

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('Sedan');
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const fetchCars = async () => {
    try {
      const params = {};
      if (search) params.search = search;
      if (typeFilter !== 'all') params.type = typeFilter;
      const { data } = await API.get('/cars', { params });
      setCars(data);
    } catch (err) {
      console.error('Failed to fetch cars', err);
    }
  };

  useEffect(() => {
    fetchCars();
  }, [search, typeFilter]);

  const addCar = async () => {
    if (!make || !model || !price) return alert('Fill all fields');
    try {
      await API.post('/cars', { make, model, price: Number(price), type });
      setMake('');
      setModel('');
      setPrice('');
      fetchCars();
    } catch (err) {
      alert('Failed to add car');
    }
  };

  const deleteCar = async (id) => {
    try {
      await API.delete(`/cars/${id}`);
      fetchCars();
    } catch (err) {
      alert('Failed to delete car');
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        <div className="top-bar">
          <div>
            <h2>Inventory Management</h2>
            <p>Manage fleet and showroom items</p>
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', alignItems: 'end' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Make</label>
              <input type="text" placeholder="e.g. BMW" value={make} onChange={(e) => setMake(e.target.value)} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Model</label>
              <input type="text" placeholder="e.g. M3" value={model} onChange={(e) => setModel(e.target.value)} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Price</label>
              <input type="number" placeholder="e.g. 85000" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Type</label>
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Sport">Sport</option>
                <option value="Electric">Electric</option>
              </select>
            </div>
            <div>
              <button onClick={addCar} className="btn" style={{ width: '100%' }}>Add Vehicle</button>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <h3>Showroom Floor</h3>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input
              type="text"
              placeholder="Search..."
              style={{ width: '200px' }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select style={{ width: '150px' }} value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="all">All Types</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Sport">Sport</option>
              <option value="Electric">Electric</option>
            </select>
          </div>
        </div>

        <div className="car-grid" id="carGrid">
          {cars.map((car, index) => (
            <div className="car-card" key={car._id} style={{ animationDelay: `${index * 0.1}s`, animation: 'fadeIn 0.5s ease backwards' }}>
              <div className="img-container">
                <span className="badge">{car.year}</span>
                <img src={car.img} alt={`${car.make} ${car.model}`} />
              </div>
              <div className="car-details">
                <small>{car.type}</small>
                <h3>{car.make} {car.model}</h3>
                <p className="price">${car.price.toLocaleString()}</p>
                <div className="action-group">
                  <button className="btn" style={{ flex: 1, fontSize: '0.9rem' }}>View Details</button>
                  <button className="btn-delete" onClick={() => deleteCar(car._id)} aria-label="Delete">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Cars;
