import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SalonsManager = () => {
  const [salons, setSalons] = useState([]);
  const [date, setDate] = useState('');
  const [lieu, setLieu] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchSalons();
  }, []);

  const fetchSalons = async () => {
    const res = await axios.get('http://localhost:3007/api/dates');
    setSalons(Array.isArray(res.data) ? res.data : res.data.salons);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:3007/api/dates/${editingId}`, { date, lieu });
      } else {
        await axios.post('http://localhost:3007/api/dates', { date, lieu });
      }
      resetForm();
      fetchSalons();
    } catch (err) {
      console.error('Erreur:', err);
    }
  };

  const resetForm = () => {
    setDate('');
    setLieu('');
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3007/api/dates/${id}`);
    fetchSalons();
  };

  const handleEdit = (salon) => {
    setDate(salon.date);
    setLieu(salon.lieu);
    setEditingId(salon._id);
  };

  return (
    <div>
      <h2>Salons</h2>
      <form onSubmit={handleSubmit}>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <input type="text" value={lieu} onChange={(e) => setLieu(e.target.value)} placeholder="Lieu" required />
        <button type="submit">{editingId ? 'Modifier' : 'Ajouter'}</button>
      </form>

      <ul>
        {salons.map((salon) => (
          <li key={salon._id}>
            <strong>{salon.date}</strong> - {salon.lieu}
            <button onClick={() => handleEdit(salon)}>Modifier</button>
            <button onClick={() => handleDelete(salon._id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SalonsManager;
