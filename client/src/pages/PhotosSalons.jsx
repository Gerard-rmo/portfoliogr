import { useEffect, useState } from 'react';
import axiosConfig from '../Services/AxiosConfig.js';

const PhotosSalons = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    axiosConfig.get('/api/photos')
      .then(res => setPhotos(res.data))
      .catch(err => console.error("Erreur chargement photos salons :", err));
  }, []);

  return (
    <div>
      <h1>Photos Salons</h1>
      <div>
        {photos.map((photo, i) => (
          <img key={i} src={photo.url} alt={`Salon ${i}`} style={{ width: '200px', margin: '10px' }} />
        ))}
      </div>
    </div>
  );
};

export default PhotosSalons;

  