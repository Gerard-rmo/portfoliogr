import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo.webp';
import axiosConfig from '../Services/AxiosConfig.js';
import "./Bedetheque.css";

const Bedetheque = () => {
  const navigate = useNavigate();
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    axiosConfig.get('/albums') // '/api/albums'
      .then(res => {
        // aU CAS IL RECOIT UN OBJET OU UN TABLEAU
        const data = Array.isArray(res.data) 
          ? res.data 
          : res.data.albums || res.data.allAlbum || [];
        setAlbums(data);
      })
      .catch(err => console.error("Erreur chargement albums :", err));
  }, []);

  return (
    <div className="bedetheque-container">
      <img src={logo} alt="Logo du glaive production" className="logo" />
      <p className="bedetheque-title">MA BEDETHEQUE</p>

      <h2 className="section-title">Ma prefere</h2>

      <div className="gallery">
        {albums.map((album) => (
          <div
            key={album._id}
            className="album-card"
            onClick={() => navigate(`/albums/${album._id}`)}
          >
           <img 
             src={album.imageURL?.url || album.couverture} 
             alt={album.titre || album.title} 
             className="cover-image" 
           />
           <p className="album-title">{album.titre || album.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bedetheque;
