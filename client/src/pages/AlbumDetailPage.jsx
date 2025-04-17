import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosConfig from '../Services/AxiosConfig';

const AlbumDetailPage = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosConfig.get(`/albums/${id}`)
      .then(res => {
        console.log("Album data:", res.data);
        setAlbum(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erreur lors du chargement de l'album :", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (!album) return <p>Album introuvable</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{album.title}</h1>
      <img 
        src={album.imageURL?.url} 
        alt={album.title} 
        style={styles.cover} 
        onError={(e) => {
          e.target.src = 'path/to/default/image.jpg'; 
        }}
      />
      <p style={styles.summary}>{album.summary}</p>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '40px',
    backgroundColor: '#f3f3f3',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#444',
    marginBottom: '20px',
  },
  cover: {
    maxWidth: '300px',
    width: '100%',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    marginBottom: '20px',
  },
  summary: {
    maxWidth: '700px',
    margin: '0 auto',
    fontSize: '18px',
    lineHeight: '1.6',
    color: '#333',
    fontFamily: "'Verdana', serif",
  },
};

export default AlbumDetailPage;