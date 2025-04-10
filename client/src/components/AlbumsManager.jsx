import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AlbumsManager = () => {
  const [albums, setAlbums] = useState([]); // Renommer la variable d'état en "albums"
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const res = await axios.get('http://localhost:3007/api/albums');
      // Vérifie que la réponse contient un tableau d'albums
      setAlbums(Array.isArray(res.data) ? res.data : res.data.albums || []);
    } catch (err) {
      console.error('Erreur lors de la récupération des albums:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('summary', summary);
    if (image) formData.append('image', image);

    try {
      if (editingId) {
        await axios.put(`http://localhost:3007/api/albums/${editingId}`, formData);
      } else {
        await axios.post('http://localhost:3007/api/albums', formData);
      }
      resetForm();
      fetchAlbums();
    } catch (err) {
      console.error('Erreur création/modification album:', err);
    }
  };

  const resetForm = () => {
    setTitle('');
    setSummary('');
    setImage(null);
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3007/api/albums/${id}`);
    fetchAlbums();
  };

  const handleEdit = (album) => {
    setTitle(album.title);
    setSummary(album.summary);
    setEditingId(album._id);
  };

  return (
    <div>
      <h2>Albums</h2>
      <form onSubmit={handleSubmit}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titre" required />
        <input value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Résumé" required />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button type="submit">{editingId ? "Modifier" : "Ajouter"}</button>
      </form>

      <ul>
        {albums.length > 0 ? ( // Vérifie si albums est non vide avant de tenter de mapper
          albums.map((album) => (
            <li key={album._id}>
              <strong>{album.title}</strong> - {album.summary}
              <button onClick={() => handleEdit(album)}>Modifier</button>
              <button onClick={() => handleDelete(album._id)}>Supprimer</button>
            </li>
          ))
        ) : (
          <li>Aucun album trouvé.</li>
        )}
      </ul>
    </div>
  );
};

export default AlbumsManager;
