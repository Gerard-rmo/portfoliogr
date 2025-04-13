import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo.webp';
import axiosConfig from '../Services/AxiosConfig.js';
import "./Bedetheque.css";

const Bedetheque = () => {
  const navigate = useNavigate();
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    axiosConfig.get('/api/albums')
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : res.data.albums || [];
        setAlbums(data);
      })
      .catch(err => console.error("Erreur chargement albums :", err));
  }, []);

  return (
    <div className="bedetheque-container">
      <img src={logo} alt="Logo du glaive production" className="logo" />
      <p className="bedetheque-title">MA BEDETHEQUE</p>

      <h2 className="section-title"></h2>

      <div className="gallery">
        {albums.map((album) => (
          <div
            key={album._id}
            className="album-card"
            onClick={() => navigate(`/albums/${album._id}`)} // assure-toi que ta route est bien définie côté React Router
          >
           <img src={album.couverture} alt={album.titre} className="cover-image" />
           <p className="album-title">{album.titre}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bedetheque;
