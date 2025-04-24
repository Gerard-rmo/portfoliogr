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

      if (editingId) {
        await axiosConfig.put(`/dates/${editingId}`, payload);
        setSuccess('Date mise à jour avec succès');
      } else {
        await axiosConfig.post('/dates/create', payload);
        setSuccess('Date ajoutée avec succès');
      }
      
      setFormData({ date: '', lieu: '' });
      setEditingId(null);
      fetchSalons();
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l\'envoi');
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
    console.log("ID à supprimer :", id); // 🔍 utile pour debug
  
    if (!window.confirm('Supprimer cette date ?')) return;
    try {
      await axiosConfig.delete(`/dates/${id}`);
      setSalons(prev => prev.filter(salon => salon._id !== id));
      setSuccess('Date supprimée');
    } catch (err) {
      setError('Échec de la suppression');
      console.error('Erreur suppression:', err);
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

  if (loading) return <div className="loading">Chargement...</div>;

  console.log("Liste actuelle des salons :", salons);


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
  {salons.map((salon) => (
    <li key={salon._id} className="date-item">
      <div className="date-content">
        <div className="date-info">
          <strong>{formatDate(salon.date)}</strong>
          <p>{salon.lieu}</p>
        </div>
        <div className="date-actions">
          <button onClick={() => handleEdit(salon)} className="edit-btn">Modifier</button>
          <button onClick={() => handleDelete(salon._id)} className="delete-btn-salons">Supprimer</button>
        </div>
      </div>
    </li>
  ))}
</ul>

    </div>
  );
};

export default SalonsManager;
