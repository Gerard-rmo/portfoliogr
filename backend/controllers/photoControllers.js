import Photo from "../models/Photo.js";
import { uploadImage } from "../middleware/uploadMiddleware.js";
import dotenv from "dotenv";
dotenv.config();

export const registerPhoto = async (req, res, next) => {
  const { imageURL } = req.body;

  // Ajouter une nouvelle image

  if (!imageURL) {
    return next({
      statusCode: 400,
      message: `Erreur lors du téléchargement.`,
    });
  }
  try {
    const photo = await Photo.create({ imageURL });

    res.status(201).json({ message: `La photo a bien été chargée.`, photo });
  } catch (error) {
    next(error);
  }
};

//Sélectionner toutes les photos.

export const getAllPhoto = async (req, res, next) => {
  try {
    const allPhoto = await Photo.find().select();

    res.status(200).json({
      message: `Récupération de toutes les photos réussie.`,
      allPhoto,
    });
  } catch (error) {
    next(error);
  }
};

//Mise à jour des photos

export const updatePhoto = async (req, res, next) => {
  const { id } = req.params;
  const newImageURL = req.body.imageURL;

  try {
    const updatePhoto = await Photo.findByIdAndUpdate(
      id,
      { imageURL: newImageURL },
      { new: true }
    );

    if (!updatePhoto) {
      return res.status(400).json({ message: "Photo non trouvée" });
    }

    res.status(202).json(updatePhoto);
  } catch (error) {
    next(error);
  }
};

// Suppression des photos.

export const deletePhoto = async (req, res, next) => {
  try {
    await Photo.findByIdAndDelete(req.params.id);

    res.status(204).json({ message: "Photo supprimée avec succès." });
  } catch (error) {
    next(error);
  }
};
