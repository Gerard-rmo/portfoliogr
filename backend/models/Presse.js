import mongoose from "mongoose";

// Création du schéma de données pour les articles de presse.

const PresseSchema = new mongoose.Schema(
  {
    imageURL: {
      public_id: String,
      url: String,
    },
  },
  { timestamps: true }
);

// Exportation du modèle de données pour les articles de presse

export default mongoose.model("Presse", PresseSchema);
