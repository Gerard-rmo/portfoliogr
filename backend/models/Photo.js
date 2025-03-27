import mongoose from "mongoose";

//Creation du schéma de données pour les photos des salons

const PhotoSchema = new mongoose.Schema(
  {
    imageURL: {
      public_id: String,
      url: String,
    },
  },
  { timestamps: true }
);

// Exportation du modèle de données pour les photos des salons.

export default mongoose.model("Photo", PhotoSchema);
