import Album from "../models/Album.js";
import { v2 as cloudinary } from "cloudinary";
import { unlinkSync } from "fs";
import dotenv from "dotenv";
dotenv.config();

// Fonction pour ajouter les albums.

export const createAlbum = async (req, res, next) => {
  // destructurer les données du corps de la requête.

  try {
    const { title, summary } = req.body;

    //Créer un nouvel album.

    if (!title || !summary) {
      return next({
        statusCode: 400,
        message: "Tous les champs doivent être remplis.",
      });
    }
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
    const album = await Album.create({
      title,
      imageURL: { public_id: result.public_id, url: result.secure_url }, // URL sécurisée de l'image sur Cloudinary
      summary,
    });
    res.status(201).json({ message: "Album créé avec succès.", album });
  } catch (error) {
    next(error);
  }
};

// Sélectionner tous les albums.

export const getAllAlbum = async (req, res, next) => {
  try {
    const allAlbum = await Album.find().select();
    //Sélectionne tous les albums.
    res.staus(200).json({
      message: `Récupération de tous les albums.`,
      allAlbum,
    });
  } catch (error) {
    next(error);
  }
};

//Mise à jour des données des albums.

export const updateAlbum = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "visuels",
        resource_type: "image",
      });
      unlinkSync(req.file.path);
      const updateData = {
        title: req.body.title,
        imageURL: { public_id: result.public_id, url: result.secure_url },
        summary: req.body.summary,
      };
      const updateAlbum = await Album.findByIdAndUpdate(id, updateData, {
        new: true,
      });

      if (!updateAlbum) {
        return res.status(400).json({ message: `Album non trouvé.` });
      }
      return res
        .status(202)
        .json({ message: `Album mis à jour.`, album: updateAlbum });
    } else {
      const updateData = {
        title: req.body.title,
        summary: req.body.summary,
      };
      const updateAlbum = await Album.findByIdAndUpdate(id, updateData, {
        new: true,
      });
      if (!updateAlbum) {
        return res.status(400).json({ message: `Album non trouvé.` });
      }
      return res
        .status(202)
        .json({ message: `Album mis à jour.`, album: updateAlbum });
    }
  } catch (error) {
    console.error(error);

    return next(error);
  }
};

// Suppression des données de l'album

export const deleteAlbum = async (req, res, next) => {
  try {
    const album = await Album.findById(req.params.id);
    if (!album) {
      return res.status(404).json({ message: `Album non trouvé.` });
    }
    await Album.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: `Album supprimé avec succès.` });
  } catch (error) {
    next(error);
  }
};
