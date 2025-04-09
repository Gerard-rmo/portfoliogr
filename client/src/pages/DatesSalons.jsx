import { useEffect, useState } from 'react';
import api from '../services/api';

const DatesSalons = () => {
  const [salons, setSalons] = useState([]);

  useEffect(() => {
    api.get('/salons')
      .then(response => setSalons(response.data))
      .catch(error => console.error("Erreur chargement salons :", error));
  }, []);

  return (
    <div>
      <h1>Salons à venir</h1>
      <ul>
        {salons.map((salon, index) => (
          <li key={index}>{salon.date} - {salon.lieu}</li>
        ))}
      </ul>
    </div>
  );
};

export default DatesSalons;

  