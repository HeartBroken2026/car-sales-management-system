import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import API from '../services/api';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [cars, setCars] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCar, setSelectedCar] = useState('');

  const fetchCustomers = async () => {
    try {
      const { data } = await API.get('/customers');
      setCustomers(data);
    } catch (err) {
      console.error('Failed to fetch customers', err);
    }
  };

  const fetchCars = async () => {
    try {
      const { data } = await API.get('/cars');
      setCars(data);
      if (data.length > 0) setSelectedCar(`${data[0].make} ${data[0].model}`);
    } catch (err) {
      console.error('Failed to fetch cars', err);
    }
  };

  useEffect(() => {
    fetchCustomers();
    fetchCars();
  }, []);

  const addCustomer = async () => {
    if (!name || !phone || !selectedCar) {
      alert('Fill all fields');
      return;
    }

    try {
      await API.post('/customers', { name, phone, car: selectedCar });
      setName('');
      setPhone('');
      fetchCustomers();
    } catch (err) {
      alert('Failed to add customer');
    }
  };

  const markSold = async (id) => {
    try {
      await API.patch(`/customers/${id}/sold`);
      fetchCustomers();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        <div className="top-bar">
          <div>
            <h2>Sales &amp; Customers</h2>
            <p>Track leads and closed deals</p>
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '1.5rem' }}>Register New Interest</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', alignItems: 'end' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Customer Name</label>
              <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Phone Number</label>
              <input type="text" placeholder="+1 234 567 8900" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Interested Vehicle</label>
              <select value={selectedCar} onChange={(e) => setSelectedCar(e.target.value)}>
                {cars.length === 0 ? (
                  <option>No cars available</option>
                ) : (
                  cars.map((car) => (
                    <option key={car._id} value={`${car.make} ${car.model}`}>
                      {car.make} {car.model}
                    </option>
                  ))
                )}
              </select>
            </div>
            <div>
              <button onClick={addCustomer} className="btn" style={{ width: '100%' }}>Create Lead</button>
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>Vehicle</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="salesTable">
              {customers.map((cust) => (
                <tr key={cust._id}>
                  <td>{cust.name}</td>
                  <td>{cust.phone}</td>
                  <td>{cust.car}</td>
                  <td>{cust.status}</td>
                  <td>
                    {cust.status === 'Pending' ? (
                      <button className="btn" onClick={() => markSold(cust._id)}>Mark Sold</button>
                    ) : (
                      '—'
                    )}
                  </td>
                </tr>
              ))}
              {customers.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', color: 'var(--text-dim)', padding: '2rem' }}>
                    No customers yet. Create a lead above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Customers;
