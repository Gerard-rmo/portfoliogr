import { useEffect, useState } from 'react';
import axiosConfig from '../Services/AxiosConfig';

const PhotosPresse = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    axiosConfig.get('/api/photos')
      .then(res => setPhotos(res.data))
      .catch(err => console.error("Erreur chargement presse :", err));
  }, []);

  return (
    <div>
      <h1>Photos Presse</h1>
      <div>
        {photos.map((photo, i) => (
          <img key={i} src={photo.url} alt={`Photo ${i}`} style={{ width: '200px', margin: '10px' }} />
        ))}
      </div>
    </div>
  );
};



export default PhotosPresse;

  