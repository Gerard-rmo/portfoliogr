import axios from "axios";

const REACT_APP_API_URL = import.meta.env.VITE_REACT_APP_API_URL; // Assure-toi que ta variable commence bien par VITE_

const api = axios.create({
  baseURL: `${REACT_APP_API_URL}/api/dates`,
});

// Obtenir une date par son ID
export const getDateById = async (id) => {
  const response = await api.get(`/${id}`);
  return response.data;
};

// Créer une date
export const registerDate = async (dateData) => {
  const formData = new FormData();
  formData.append("lieu", dateData.lieu);
  formData.append("date", dateData.date);

  const response = await api.post("/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Mettre à jour une date
export const updateDate = async (id, updatedData) => {
  const response = await api.put(`/${id}`, updatedData);
  return response.data;
};

// Supprimer une date
export const deleteDate = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};
