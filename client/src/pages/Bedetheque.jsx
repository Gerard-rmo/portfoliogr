import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo.webp';
// import ima from '../assets/pres.webp';
import axiosConfig from '../Services/AxiosConfig.js';

const Bedetheque = () => {
  const navigate = useNavigate();
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    axiosConfig.get('/api/albums')
      .then(res => setAlbums(res.data))
      .catch(err => console.error("Erreur chargement albums :", err));
  }, []);

  return (
    <div style={styles.container}>
      <img src={logo} alt="Logo du glaive production" style={styles.logo} />
      <p style={styles.p}>MA BEDETHEQUE</p>
      {/* <img src={ima} alt="Présentation de l'auteur" style={styles.logo} /> */}

      <h2 style={styles.h2}>Nos Albums</h2>

      <div style={styles.gallery}>
        {albums.map((album) => (
          <div
            key={album._id}
            style={styles.albumCard}
            onClick={() => navigate(`/api/albums/${album._id}`)}
          >
            <img src={album.couverture} alt={album.titre} style={styles.coverImage} />
            <p style={styles.albumTitle}>{album.titre}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: '20px 0',
    maxWidth: '100%',
    margin: '0 auto',
    background: "linear-gradient(90deg, rgba(238, 203, 43, 0.94) 30%, rgba(239, 245, 81, 0.91) 67%, rgb(37, 152, 247) 100%)",
  },
  logo: {
    width: '280px',
    maxWidth: '300px',
    height: 'auto',
    marginBottom: '5px',
  },
  p: {
    fontFamily: "'Verdana', serif",
    fontSize: '20px',
    fontWeight: 'bold',
    color: 'brown',
    lineHeight: '1.6',
    margin: '20px auto',
    padding: '10px',
    maxWidth: '800px',
    textShadow: '1px 10px 5px rgb(226, 99, 20)',
  },
  h2: {
    fontFamily: "'Verdana', serif",
    color: '#222',
    margin: '30px 0 15px',
  },
  gallery: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
    padding: '20px',
  },
  albumCard: {
    cursor: 'pointer',
    width: '180px',
    textAlign: 'center',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)',
    padding: '10px',
    transition: 'transform 0.3s ease',
  },
  coverImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '6px',
  },
  albumTitle: {
    marginTop: '10px',
    fontWeight: 'bold',
    fontFamily: "'Verdana', serif",
    fontSize: '14px',
  },
};

export default Bedetheque;

