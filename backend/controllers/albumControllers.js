import Album from "../models/Album.js";
import { uploadImage } from "../middleware/uploadMiddleware.js";
import dotenv from "dotenv";
dotenv.config();

// Fonction pour ajouter les albums.

export const registerAlbum = async (req, res, next) => {
  // destructurer les données du corps de la requête.
  const { title, imageURL, summary } = req.body;

  //Créer un nouvel album.

  if (!title || !imageURL || !summary) {
    return next({
      statusCode: 400,
      message: "Tous les champs doivent être remplis",
    });
  }
  try {
    const album = await Album.create({ title, imageURL, summary });
    res.status(201).json({ message: `L'album a bien été créé.`, album });
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
  const newTitle = req.body.title;
  const newImageURL = req.body.imageURL;
  const newSummary = req.body.summary;

  try {
    const updateAlbum = await Album.findByIdAndUpdate(
      id,
      { title: newTitle, imageURL: newImageURL, summary: newSummary },
      { new: true }
    );
    if (!updateAlbum) {
      return res.status(400).json({ message: `Album non trouvé` });
    }
    res.status(202).json(updateAlbum);
  } catch (error) {
    next(error);
  }
};

// Suppression des données de l'album

export const deleteAlbum = async (req, res, next) => {
  try {
    await Album.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: `Album supprimé avec succès.` });
  } catch (error) {
    next(error);
  }
};
