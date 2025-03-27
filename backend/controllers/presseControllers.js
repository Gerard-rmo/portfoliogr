import Presse from "../models/Presse.js";
import { uploadImage } from "../middleware/uploadMiddleware.js";
import dotenv from "dotenv";
dotenv.config();

export const registerPresse = async (req, res, next) => {
  const { imageURL } = req.body;

  // Ajouter un nouvel article de presse.

  if (!imageURL) {
    return next({
      statusCode: 400,
      message: `Erreur lors du téléchargement.`,
    });
  }
  try {
    const presse = await Presse.create({ imageURL });

    res
      .status(201)
      .json({ message: `L'article de presse a bien été chargée.`, presse });
  } catch (error) {
    next(error);
  }
};

//Sélectionner tous les articles de presse.
export const getAllPresse = async (req, res, next) => {
  try {
    const allPresse = await Presse.find().select();

    res.status(200).json({
      message: `Récupération de tous les articles de presse réussie.`,
      allPresse,
    });
  } catch (error) {
    next(error);
  }
};

//Mise à jour des articles de presse

export const updatePresse = async (req, res, next) => {
  const { id } = req.params;
  const newImageURL = req.body.imageURL;

  try {
    const updatePresse = await Presse.findByIdAndUpdate(
      id,
      { imageURL: newImageURL },
      { new: true }
    );

    if (!updatePresse) {
      return res.status(400).json({ message: "Article de presse non trouvé" });
    }

    res.status(202).json(updatePresse);
  } catch (error) {
    next(error);
  }
};

// Suppression des articles de presse.

export const deletePresse = async (req, res, next) => {
  try {
    await Presse.findByIdAndDelete(req.params.id);

    res
      .status(204)
      .json({ message: "Article de presse supprimé avec succès." });
  } catch (error) {
    next(error);
  }
};
