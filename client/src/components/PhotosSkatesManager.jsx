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
      const res = await axios.get("http://localhost:3007/api/photos?categorie=skate");
      setPhotos(Array.isArray(res.data) ? res.data : res.data.photos || []);
    } catch (err) {
      console.error('Erreur chargement:', err);
      setError("Impossible de charger les photos");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image) return;
  
    const formData = new FormData();
    formData.append("image", image);
    formData.append("categorie", "skate");
  
    try {
      await axios.post("http://localhost:3007/api/photos", formData, { // 
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImage(null);
      fetchPhotos();
    } catch (error) {
      console.error("Upload error:", error.response?.data || error.message);
      setError("Échec de l'upload");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette photo ?")) return;
    
    try {
      setLoading(true);
      await axios.delete(`http://localhost:3007/api/photos/${id}`);
      fetchPhotos();
    } catch (err) {
      console.error('Erreur suppression:', err);
      setError("Échec de la suppression");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Gérer les photos de skates</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}

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

      <div style={styles.photoGrid}>
        {photos.map(photo => (
          <div key={photo._id} style={styles.photoItem}>
            <img src={photo.imageURL?.url} alt="Skate" style={styles.image} />
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
    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
    gap: '15px'
  },
  photoItem: {
    position: 'relative'
  },
  image: {
    width: '100%',
    borderRadius: '8px'
  },
  buttonGroup: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
  },
  deleteBtn: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '6px 10px',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default PhotosSkatesManager;