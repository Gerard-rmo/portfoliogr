import { useEffect, useState } from 'react';
import axiosConfig from "../Services/AxiosConfig";
import logo from '../assets/logo.webp';
import './PhotosSalons.css';

const PhotosSalons = () => {
  const [photosSalons, setPhotosSalons] = useState([]);

  useEffect(() => {
    axiosConfig.get('/api/photos') 
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : res.data.photos || [];
        const salonsOnly = data.filter(photo => photo.categorie === "salon");
        setPhotosSalons(salonsOnly);
      })
      .catch(err => console.error("Erreur chargement photos salons :", err));
  }, []);

  return (
    <div className="photos-salons-container">
      <img src={logo} alt="Logo du glaive production" className="logo" />
            <p className="bedetheque-title">MES PHOTOS DE SALONS</p>
      <ul className="photo-list">
        {photosSalons.map((photo, index) => (
          <li key={index} className="photo-item">
            <img src={photo.imageURL?.url || photo.url} alt={`Salon ${index}`} className="photo" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PhotosSalons;


  