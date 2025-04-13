import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AlbumsManager.css";


const AlbumsManager = () => {
  const [albums, setAlbums] = useState([]);
  const [newAlbum, setNewAlbum] = useState({
    title: "",
    summary: "",
    image: null,
  });

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await axios.get("http://localhost:3007/api/albums");
      if (Array.isArray(response.data)) {
        setAlbums(response.data);
      } else {
        console.error("La réponse n'est pas un tableau d'albums", response.data);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des albums :", error);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setNewAlbum((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", newAlbum.title);
    formData.append("summary", newAlbum.summary);
    if (newAlbum.image) {
      formData.append("image", newAlbum.image);
    }

    try {
      await axios.post("http://localhost:3007/api/albums", formData);
      setNewAlbum({ title: "", summary: "", image: null });
      fetchAlbums();
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'album :", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3007/api/albums/${id}`);
      fetchAlbums();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'album :", error);
    }
  };

  return (
    <div className="albums-container">
      <h2>Gestion des Albums</h2>

      <form onSubmit={handleSubmit} className="album-form" encType="multipart/form-data">
        <input
          type="text"
          name="title"
          value={newAlbum.title}
          onChange={handleChange}
          placeholder="Titre"
          required
        />
        <input
          type="text"
          name="summary"
          value={newAlbum.summary}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          type="file"
          name="image"
          onChange={handleChange}
          accept="image/*"
        />
        <button type="submit">Ajouter</button>
      </form>

      <ul className="album-list">
        {albums.map((album) => (
          <li key={album._id} className="album-item">
            <p>
              <strong>{album.title}</strong> - {album.summary}
            </p>
            {album.imageURL?.url && (
              <img src={album.imageURL.url} alt={album.title} />
            )}
            <button onClick={() => handleDelete(album._id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlbumsManager;

