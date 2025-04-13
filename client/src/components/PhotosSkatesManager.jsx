import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PhotosSkatesManager = () => {
  const [photos, setPhotos] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const res = await axios.get("http://localhost:3007/api/photos?categorie=skates");
      setPhotos(res.data);
    } catch (err) {
      console.error('Erreur lors du chargement des photos skates :', err);
    }
  };

   const handleUpload = async (e) => {
    e.preventDefault();
    if (!image) return;

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
      console.error("Erreur lors de l’upload :", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3007/api/photos/${id}`);
      fetchPhotos();
    } catch (err) {
      console.error('Erreur lors de la suppression :', err);
    }
  };

  return (
    <div>
       <h2>Gérer les photos de skates</h2>

<form onSubmit={handleUpload} style={styles.form}>
<input type="file" onChange={(e) => setImage(e.target.files[0])} required />
<button type="submit">Ajouter</button>
</form>

<div style={styles.photoGrid}>
  {photos.map(photo => (
    <div key={photo._id} style={styles.photoItem}>
      <img src={skate.imageURL} alt="Skate" style={styles.image} />
      <button onClick={() => handleDelete(photo._id)} style={styles.deleteBtn}>Supprimer</button>
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
