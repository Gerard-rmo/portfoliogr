import { useEffect, useState } from 'react';
import logo from '../assets/logo.webp';
import axiosConfig from "../Services/AxiosConfig";
import './DatesSalons.css';

const Salons = () => {
  const [salons, setSalons] = useState([]);

  useEffect(() => {
    axiosConfig.get('/api/photos')
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : res.data.photos || [];
        setSalons(data);
      })
      .catch(err => console.error("Erreur chargement salons :", err));
  }, []);

  return (
    <div className="salons-container">
     <img src={logo} alt="Logo du glaive production" className="logo" />
           <p className="bedetheque-title">MES DATES DE SALONS</p>
      <ul className="salons-list">
        {salons.map((salon, index) => (
          <li key={index} className="salon-item">
            <h3>{salon.nom || "Nom indisponible"}</h3>
            <img
              src={salon.imageURL?.url || salon.url}
              alt={salon.nom || "salon"}
              className="salon-image"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Salons;



  