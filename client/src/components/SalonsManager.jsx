import React, { useState, useEffect } from 'react';
import axiosConfig from '../Services/AxiosConfig';

const SalonsManager = () => {
  const [salons, setSalons] = useState([]);
  const [formData, setFormData] = useState({ date: '', lieu: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchSalons();
  }, []);

  const fetchSalons = async () => {
    try {
      const res = await axiosConfig.get('/dates');
      setSalons(res.data);
    } catch (err) {
      console.error('Erreur lors du chargement des salons :', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.date || !formData.lieu) return;

    try {
      if (editingId) {
        await axiosConfig.put(`http://localhost:3007/api/dates/${editingId}`, formData);
      } else {
        await axiosConfig.post('http://localhost:3007/api/dates', formData);
      }

      setFormData({ date: '', lieu: '' });
      setEditingId(null);
      fetchSalons();
    } catch (err) {
      console.error('Erreur lors de la soumission :', err);
    }
  };

  const handleEdit = (salon) => {
    setFormData({ date: salon.date, lieu: salon.lieu });
    setEditingId(salon._id);
  };

  const handleDelete = async (id) => {
    try {
      await axiosConfig.delete(`/dates/${id}`);
      fetchSalons();
    } catch (err) {
      console.error('Erreur lors de la suppression :', err);
    }
  };

  return (
    <div>
      <h2>Gérer les dates de salons</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lieu"
          placeholder="lieu"
          value={formData.lieu}
          onChange={handleChange}
          required
        />
        <button type="submit" style={styles.submitBtn}>
          {editingId ? 'Modifier' : 'Ajouter'}
        </button>
      </form>

      <ul style={styles.list}>
        {salons.map(salon => (
          <li key={salon._id} style={styles.listItem}>
            <span>{salon.date} - {salon.lieu}</span>
            <div style={styles.btnGroup}>
              <button onClick={() => handleEdit(salon)} style={styles.editBtn}>Modifier</button>
              <button onClick={() => handleDelete(salon._id)} style={styles.deleteBtn}>Supprimer</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  form: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    alignItems: 'center'
  },
  submitBtn: {
    padding: '8px 16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  list: {
    listStyle: 'none',
    padding: 0
  },
  listItem: {
    padding: '10px',
    backgroundColor: '#f8f9fa',
    marginBottom: '10px',
    borderRadius: '6px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  btnGroup: {
    display: 'flex',
    gap: '10px'
  },
  editBtn: {
    backgroundColor: '#ffc107',
    color: '#000',
    border: 'none',
    padding: '6px 10px',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  deleteBtn: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '6px 10px',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default SalonsManager;
