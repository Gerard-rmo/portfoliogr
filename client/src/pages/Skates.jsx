import { useEffect, useState } from 'react';
import axiosConfig from "../Services/AxiosConfig";

const Skates = () => {
  const [skates, setSkates] = useState([]);

  useEffect(() => {
    axiosConfig.get('/api/photos')
      .then(res => setSkates(res.data))
      .catch(err => console.error("Erreur chargement skates :", err));
  }, []);

  return (
    <div>
      <h1>Planches de skate</h1>
      <ul>
        {skates.map((skate, index) => (
          <li key={index}>
            <h3>{skate.nom}</h3>
            <img src={skate.imageUrl} alt={skate.nom} style={{ width: '200px' }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Skates;
