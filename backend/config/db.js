// Importation de la bibliothèque mongoose pour les connexions MongoDB
import mongoose from "mongoose";
// Importation de la bibliothèque dotenv pour les variables d'environnement
import dotenv from "dotenv";
// Chargement des variables d'environnement depuis le fichier .env
dotenv.config();

// Fonction asynchrone pour se connecter à la base de données MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Base de données connectée.");
  } catch (error) {
    console.error("Erreur lors de la connection à la DB", error);
    process.exit(1); // Quitte le processus avec un statut d'échec
  }
};

export default connectDB;
