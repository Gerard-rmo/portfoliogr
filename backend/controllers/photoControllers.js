import Photo from "../models/Photo.js";
import { v2 as cloudinary } from "cloudinary";
import { unlinkSync } from "fs";
import dotenv from "dotenv";
dotenv.config();

// Fonction pour ajouter les photos.

export const createPhoto = async (req, res, next) => {
  // destructurer les données du corps de la requête.

  try {
    const { categorie } = req.body;

    // Vérification si une photo a bien été téléchargée
    if (!req.file || !categorie) {
      return next({
        statusCode: 400,
        message: "Image et catégorie requises.",
      });
    }
    //Téléchargement de la photo vers Cloudinary

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "visuels", // Spécifie le dossier sur Cloudinary
      resource_type: "image", // Type de fichier à uploader
    });

    // Supprimer le fichier local après le téléchargement
    FileSystem.unlinkSync(req.file.path);

    // Créer une nouvelle photo dans la base de données
    const photo = await Photo.create({
      imageURL: { public_id: result.public_id, url: result.secure_url }, // URL sécurisée de l'image sur Cloudinary
    });
    res.status(201).json({ message: "Photo créée avec succès.", photo });
  } catch (error) {
    next(error);
  }
};

// Sélectionner toutes les photos.

export const getAllPhotos = async (req, res, next) => {
  try {
    const { categorie } = req.query;
    const photos = categorie
      ? await Photo.find({ categorie })
      : await Photo.find();
    //Sélectionne toutes les photos.
    res.status(200).json({
      message: `Récupération de toutes les photos.`,
      photos,
    });
  } catch (error) {
    next(error);
  }
};

//Mise à jour des photos

export const updatePhoto = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { categorie } = req.body;

    const photo = await Photo.findById(id);
    if (!photo) return res.status(404).json({ message: "Photo non trouvée" });

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "visuels",
        resource_type: "image",
      });
      FileSystem.unlinkSync(req.file.path);
      const updateData = {
        imageURL: { public_id: result.public_id, url: result.secure_url },
      };
      if (categorie) {
        photo.categorie = categorie;
      }

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
