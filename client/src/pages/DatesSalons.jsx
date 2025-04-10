import { useEffect, useState } from 'react';
import axiosConfig from '../Services/AxiosConfig';

const DatesSalons = () => {
  const [salons, setSalons] = useState([]);

  useEffect(() => {
    axiosConfig.get('/api/dates')
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

  