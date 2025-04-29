import axios from "axios";

const api = axios.create({
  baseURL: "https://leglaiveproduction-1.onrender.com/api/albums",
});

//Obtenir un album par rapport à son id

export const getAlbum = async (id) => {
  const response = await api.get(`/${id}`);
  return response.data;
};

//Obtenir tous les albums.

export const getAllAlbums = async () => {
  const response = await api.get(`/`);
  return response.data;
};

//creer un album.
export const createAlbum = async (albumData) => {
  const formData = new FormData();

  formData.append("title", albumData.title);
  formData.append("summary", albumData.summary);

  if (albumData.image) {
    formData.append("image", albumData.image);
  }
  const response = await api.post(`/register`, formData);
  return response.data;
};

// mettre à jour un album.

export const updateAlbum = async (id, albumData) => {
  const formData = new FormData();
  formData.append("title", albumData.title);
  formData.append("summary", albumData.summary);

  if (albumData.image) {
    formData.append("image", albumData.image);
  }

  const response = await api.put(`/${id}`, formData);
  return response.data;
};

//supprimer un album.
export const deleteAlbum = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};
