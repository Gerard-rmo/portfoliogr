import React, { useEffect, useState } from 'react';
import axiosConfig from '../Services/AxiosConfig';

const PhotosPresseManager = () => {
  const [photos, setPhotos] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const res = await axiosConfig.get('/photos?categorie=presse');
      setPhotos(Array.isArray(res.data) ? res.data : res.data.photos || []);
    } catch (err) {
      console.error("Erreur récupération photos presse:", err);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append("imageURL", image);
    formData.append("categorie", "presse");

    try {
      await axiosConfig.post("/photos/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImage(null);
      fetchPhotos();
    } catch (err) {
      console.error('Erreur lors de l\'upload :', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosConfig.delete(`/photos/${id}`);
      fetchPhotos();
    } catch (err) {
      console.error('Erreur lors de la suppression :', err);
    }
  };

  const handleEdit = (photo) => {
    console.log("Édition non implémentée pour :", photo);
  };

  return (
    <div>
      <h2>Gérer les photos de presse</h2>

      <form onSubmit={handleUpload} style={styles.form}>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
        <button type="submit" style={styles.uploadBtn}>Ajouter</button>
      </form>

      <div style={styles.photoGrid}>
        {photos.map(photo => (
          <div key={photo._id} style={styles.photoItem}>
            <img src={photo.imageURL} alt="Presse" style={styles.image} />
            <div style={styles.buttonGroup}>
              <button onClick={() => handleDelete(photo._id)} style={styles.deleteBtn}>Supprimer</button>
              <button onClick={() => handleEdit(photo)} style={styles.editBtn}>Modifier</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  ...sharedStyles()
};

function sharedStyles() {
  return {
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
    },
    editBtn: {
      backgroundColor: '#ffc107',
      color: 'black',
      border: 'none',
      padding: '6px 10px',
      borderRadius: '4px',
      cursor: 'pointer'
    }
  };
}

export default PhotosPresseManager;