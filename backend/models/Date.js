import mongoose from "mongoose";

// Création du schéma de données pour les dates de salon

const DateSchema = new mongoose.Schema({
  date: {
    type: String,
    trim: true,
    required: true,
  },
  lieu: {
    type: String,
    trim: true,
    required: true,
  },
});

// Exportation du modèle de données pour les dates de salon.

export default mongoose.model("Date", DateSchema);
