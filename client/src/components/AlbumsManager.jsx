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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await axios.get("https://leglaiveproduction-1.onrender.com/api/albums");
      if (response.data && response.data.allAlbum) {
        setAlbums(response.data.allAlbum);
      } else {
        console.error("La réponse n'est pas un tableau d'albums", response.data);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des albums :", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setNewAlbum((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append("title", newAlbum.title);
    formData.append("summary", newAlbum.summary);
    if (newAlbum.image) {
      formData.append("imageURL", newAlbum.image);
    }

    try {
      await axios.post("https://leglaiveproduction-1.onrender.com/api/albums/create", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setNewAlbum({ title: "", summary: "", image: null });
      // Actualiser la liste après ajout
      fetchAlbums();
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'album :", error);
      setError("Échec de l'ajout de l'album");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet album ?")) {
      return;
    }
    
    try {
      setLoading(true);
      await axios.delete(`https://leglaiveproduction-1.onrender.com/api/albums/${id}`);
      // Actualiser la liste après suppression
      fetchAlbums();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'album :", error);
      setError("Échec de la suppression de l'album");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="albums-container">
      <h2>Gestion des Albums</h2>
      
      {error && <div className="error-message">{error}</div>}

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
        <button type="submit" disabled={loading}>
          {loading ? "Chargement..." : "Ajouter"}
        </button>
      </form>

      {loading && <p>Chargement des albums...</p>}
      
      <ul className="album-list">
        {albums.map((album) => (
          <li key={album._id} className="album-item">
            <p>
              <strong>{album.title}</strong> - {album.summary}
            </p>
            {album.imageURL?.url && (
              <img 
                src={album.imageURL.url} 
                alt={album.title} 
                style={{ maxWidth: "200px", maxHeight: "150px" }}
              />
            )}
            <button 
              onClick={() => handleDelete(album._id)}
              disabled={loading}
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlbumsManager;