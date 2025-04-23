import React, { useEffect, useState } from 'react';
import axiosConfig from '../Services/AxiosConfig';
import './PhotosSalonsManager.css';

const PhotosSalonsManager = () => {
  const [photos, setPhotos] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const res = await axiosConfig.get('/photos?categorie=salon');
      setPhotos(Array.isArray(res.data) ? res.data : res.data.photos || []);
    } catch (err) {
      console.error("Erreur récupération photos salons:", err);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);
    formData.append("categorie", "salon");

    try {
      await axiosConfig.post("/photos", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImage(null);
      fetchPhotos();
    } catch (err) {
      console.error('Upload error:', err.response?.data || err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosConfig.delete(`/photos/${id}`);
      fetchPhotos();
    } catch (err) {
      console.error('Erreur suppression:', err);
    }
  };

  return (
    <div className="salons-container">
      <h2 className="salons-title">Gérer les photos des salons</h2>
      <form onSubmit={handleUpload} className="salons-form">
        <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
        <button type="submit" className="upload-btn">Ajouter</button>
      </form>

      <div className="photo-grid">
        {photos.map(photo => (
          <div key={photo._id} className="photo-item">
            <img src={photo.imageURL?.url} alt="Salon" className="photo-img" />
            <div className="photo-buttons">
              <button onClick={() => handleDelete(photo._id)} className="delete-btn">Supprimer</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotosSalonsManager;
