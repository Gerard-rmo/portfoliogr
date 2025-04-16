import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PhotosSkatesManager = () => {
  const [photos, setPhotos] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3007/api/photos?categorie=skates");
      setPhotos(Array.isArray(res.data) ? res.data : res.data.photos || []);
    } catch (err) {
      console.error('Erreur lors du chargement des photos skates :', err);
      setError("Impossible de charger les photos");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image) return;

    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("imageURL", image);
    formData.append("categorie", "skates");

    try {
      await axios.post("http://localhost:3007/api/photos/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImage(null);
      fetchPhotos();
    } catch (error) {
      console.error("Erreur lors de l'upload :", error);
      setError("Échec de l'upload de la photo");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette photo ?")) {
      return;
    }
    
    try {
      setLoading(true);
      await axios.delete(`http://localhost:3007/api/photos/${id}`);
      fetchPhotos();
    } catch (err) {
      console.error('Erreur lors de la suppression :', err);
      setError("Échec de la suppression de la photo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Gérer les photos de skates</h2>
      
      {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}

      <form onSubmit={handleUpload} style={styles.form}>
        <input 
          type="file" 
          onChange={(e) => setImage(e.target.files[0])} 
          required 
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Chargement..." : "Ajouter"}
        </button>
      </form>

      {loading && <p>Chargement...</p>}

      <div style={styles.photoGrid}>
        {photos.map(photo => (
          <div key={photo._id} style={styles.photoItem}>
            {/* Correction de skate.imageURL à photo.imageURL */}
            <img 
              src={photo.imageURL?.url || photo.imageURL} 
              alt="Skate" 
              style={styles.image} 
            />
            <button 
              onClick={() => handleDelete(photo._id)} 
              style={styles.deleteBtn}
              disabled={loading}
            >
              Supprimer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  form: {
    marginBottom: '20px',
    display: 'flex',
    gap: '10px',
    alignItems: 'center'
  },
  uploadBtn: {
    padding: '8px 16px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  photoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: '20px'
  },
  photoItem: {
    position: 'relative'
  },
  image: {
    width: '100%',
    borderRadius: '8px'
  },
  deleteBtn: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '6px 10px',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default PhotosSkatesManager;