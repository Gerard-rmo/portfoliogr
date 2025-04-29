import axios from "axios";

const api = axios.create({
  baseURL: "https://leglaiveproduction-1.onrender.com/api/photos",
});

// Obtenir une photo par rapport à son ID
export const getPhoto = async (id) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de la photo :", error);
    throw error;
  }
};

// Obtenir toutes les photos
export const getAllPhotos = async () => {
  const response = await api.get("");
  return response.data;
};

// Créer une photo
export const createPhoto = async (photoData) => {
  const formData = new FormData();

  if (photoData.image) {
    formData.append("image", photoData.image);
  }

  const response = await api.post("/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Mettre à jour une photo
export const updatePhoto = async (id, updatedData) => {
  const formData = new FormData();

  if (updatedData.image) {
    formData.append("image", updatedData.image);
  }
  if (updatedData.titre) {
    formData.append("titre", updatedData.titre);
  }
  if (updatedData.description) {
    formData.append("description", updatedData.description);
  }

  const response = await api.put(`/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Supprimer une photo
export const deletePhoto = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};
