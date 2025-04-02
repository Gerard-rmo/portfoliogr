import Photo from "../models/Photo.js";
import { v2 as cloudinary } from "cloudinary";
import { unlinkSync } from "fs";
import dotenv from "dotenv";
dotenv.config();

// Fonction pour ajouter les photos.

export const createPhoto = async (req, res, next) => {
  // destructurer les données du corps de la requête.

  try {
    // Vérification si un fichier a bien été téléchargé
    if (!req.file) {
      return next({
        statusCode: 400,
        message: "Aucune image n'a été téléchargée.",
      });
    }
    //Téléchargement de l'image vers Cloudinary

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "visuels", // Spécifie le dossier sur Cloudinary
      resource_type: "image", // Type de fichier à uploader
    });
    console.log(result);
    // Supprimer le fichier local après le téléchargement
    unlinkSync(req.file.path);

    // Créer un nouvel album dans la base de données
    const photo = await Photo.create({
      imageURL: { public_id: result.public_id, url: result.secure_url }, // URL sécurisée de l'image sur Cloudinary
    });
    res.status(201).json({ message: "Photo créée avec succès.", photo });
  } catch (error) {
    next(error);
  }
};

// Sélectionner tous les photos.

export const getAllPhotos = async (req, res, next) => {
  try {
    const allPhotos = await Photo.find().select();
    //Sélectionne toutes les photos.
    res.staus(200).json({
      message: `Récupération de toutes les photos.`,
      allPhotos,
    });
  } catch (error) {
    next(error);
  }
};

//Mise à jour des photos

export const updatePhoto = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "visuels",
        resource_type: "image",
      });
      unlinkSync(req.file.path);
      const updateData = {
        imageURL: { public_id: result.public_id, url: result.secure_url },
      };
      const updatePhoto = await Photo.findByIdAndUpdate(id, updateData, {
        new: true,
      });

      if (!updatePhoto) {
        return res.status(400).json({ message: `Photo non trouvée.` });
      }
      return res
        .status(202)
        .json({ message: `Photo mise à jour.`, photo: updatePhoto });
    }
  } catch (error) {
    console.error(error);

    return next(error);
  }
};

// Suppression des photos.

export const deletePhoto = async (req, res, next) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) {
      return res.status(404).json({ message: `Photo non trouvée.` });
    }
    await Photo.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: `Photo supprimée avec succès.` });
  } catch (error) {
    next(error);
  }
};
