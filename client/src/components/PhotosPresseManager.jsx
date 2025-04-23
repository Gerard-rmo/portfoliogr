import React, { useEffect, useState } from 'react';
import axiosConfig from '../Services/AxiosConfig';
import './PhotosPresseManager.css';

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
    formData.append("image", image);
    formData.append("categorie", "presse");

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
    <div className="presse-container">
      <h2 className="presse-title">Gérer les photos de presse</h2>

      <form onSubmit={handleUpload} className="presse-form">
        <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
        <button type="submit" className="upload-btn">Ajouter</button>
      </form>

      <div className="presse-grid">
        {photos.map(photo => (
          <div key={photo._id} className="photo-item">
            <img src={photo.imageURL?.url} alt="Presse" className="photo-img" />
            <div className="button-group">
              <button onClick={() => handleDelete(photo._id)} className="delete-btn">Supprimer</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotosPresseManager;
