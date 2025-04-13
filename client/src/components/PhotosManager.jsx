import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PhotosManager = () => {
  const [photos, setPhotos] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const res = await axios.get('http://localhost:3007/api/photos');
      setPhotos(Array.isArray(res.data) ? res.data : res.data.photos || []);
    } catch (err) {
      console.error('Erreur récupération photos:', err);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (image) formData.append('imageURL', image); // Change image to imageURL

    try {
      await axios.post('http://localhost:3007/api/photos', formData);
      setImage(null);
      fetchPhotos();
    } catch (err) {
      console.error('Erreur upload photo:', err);
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3007/api/photos/${id}`);
    fetchPhotos();
  };

  return (
    <div>
      <h2>Photos</h2>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
        <button type="submit">Ajouter</button>
      </form>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {photos.map(photo => (
          <div key={photo._id} style={{ position: 'relative' }}>
            {/* Utilisation de imageURL.url */}
            {photo.imageURL?.url && <img src={photo.imageURL.url} alt="Photo" style={{ width: '200px' }} />}
            <button onClick={() => handleDelete(photo._id)} style={{ position: 'absolute', top: 0, right: 0 }}>X</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotosManager;

