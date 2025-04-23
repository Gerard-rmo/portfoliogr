import React, { useState, useEffect } from 'react';
import axiosConfig from '../Services/AxiosConfig';
import './SalonsManager.css';

const SalonsManager = () => {
  const [salons, setSalons] = useState([]);
  const [formData, setFormData] = useState({ date: '', lieu: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchSalons();
  }, []);

  const fetchSalons = async () => {
    setLoading(true);
    try {
      const res = await axiosConfig.get('/dates');
      setSalons(res.data);
    } catch (err) {
      setError('Failed to load dates');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const payload = {
        ...formData,
        date: new Date(formData.date).toISOString()
      };

      let response;
      if (editingId) {
        response = await axiosConfig.put(`/dates/${editingId}`, payload);
        setSuccess('Date updated successfully');
      } else {
        response = await axiosConfig.post('/dates', payload);
        setSuccess('Date added successfully');
      }
      
      setFormData({ date: '', lieu: '' });
      setEditingId(null);
      fetchSalons();
    } catch (err) {
      setError(err.response?.data?.message || 'Submission failed');
      console.error('Submit error:', err);
    }
  };

  const handleEdit = (salon) => {
    setFormData({
      date: salon.date.split('T')[0],
      lieu: salon.lieu
    });
    setEditingId(salon._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this date?')) return;
    
    try {
      await axiosConfig.delete(`/dates/${id}`);
      setSalons(prev => prev.filter(s => s._id !== id));
      setSuccess('Date deleted');
    } catch (err) {
      setError('Failed to delete');
      console.error('Delete error:', err);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="salons-manager">
    <h2 className="salons-title">GESTION DES DATES DE SALONS</h2>
    
    {error && <div className="error-message">{error}</div>}
    {success && <div className="success-message">{success}</div>}
  
    <form onSubmit={handleSubmit} className="salons-form">
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
        placeholder="Lieu"
        value={formData.lieu}
        onChange={handleChange}
        required
      />
      <button type="submit" className="submit-btn">
        {editingId ? 'Mettre à jour' : 'Ajouter'} date de salon
      </button>
      {editingId && (
        <button type="button" onClick={() => setEditingId(null)} className="cancel-btn">
          Annuler
        </button>
      )}
    </form>
  
    <ul className="dates-list">
      {salons.map(salon => (
        <li key={salon._id} className="date-item">
          <div className="date-info">
            <strong>{formatDate(salon.date)}</strong>
            <p><strong>{salon.lieu}</strong></p>
          </div>
          <div className="date-actions">
            <button onClick={() => handleEdit(salon)} className="edit-btn">Modifier</button>
            <button onClick={() => handleDelete(salon._id)} className="delete-btn">Supprimer</button>
          </div>
        </li>
      ))}
    </ul>
  </div>
  
  );
};

export default SalonsManager;
