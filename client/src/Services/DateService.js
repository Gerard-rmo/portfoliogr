import axiosConfig from "./AxiosConfig";

// Obtenir une date par son ID
export const getDateById = async (id) => {
  const response = await axiosConfig.get(`/${id}`);
  return response.data;
};

// Créer une date
export const registerDate = async (dateData) => {
  const formData = new FormData();
  formData.append("lieu", dateData.lieu);
  formData.append("date", dateData.date);

  const response = await axiosConfig.post("/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Mettre à jour une date
export const updateDate = async (id, updatedData) => {
  const response = await axiosConfig.put(`/${id}`, updatedData);
  return response.data;
};

// Supprimer une date
export const deleteDate = async (id) => {
  const response = await axiosConfig.delete(`/${id}`);
  return response.data;
};
