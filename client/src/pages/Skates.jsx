import { useEffect, useState } from 'react';
import api from '../services/api';

const Skates = () => {
  const [skates, setSkates] = useState([]);

  useEffect(() => {
    api.get('/photos')
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
