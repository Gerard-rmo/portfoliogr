import Date from "../models/Date.js";
import dotenv from "dotenv";
dotenv.config();

// Fonction pour enregistrer une nouvelle date de salon

export const registerDate = async (req, res, next) => {
  try {
    const { date, lieu } = req.body;

    if (!date || !lieu) {
      return next({
        statusCode: 400,
        message: `Tous les champs doivent être remplis.`,
      });
    }
    const dates = await Date.create({ date, lieu, });

    res.status(201).json({ message: `L'évènement a bien été créé.`, dates });
  } catch (error) {
    next(error);
  }
};

//Sélectionner toutes les dates.

export const getAllDate = async (req, res, next) => {
  try {
    const allDate = await Date.find().select();
    //Sélectionne toutes les dates.
    res.status(200).json({
      message: `Récupération correcte de toutes les dates de salon.`,
      allDate,
    });
  } catch (error) {
    next(error);
  }
};

// Mise à jour des dates de salon.

export const updateDate = async (req, res, next) => {
  const { id } = req.params;
  const newDate = req.body.date;
  const newLieu = req.body.lieu;

  try {
    const updateDate = await Date.findByIdAndUpdate(
      id,
      { date: newDate, lieu: newLieu },
      { new: true }
    );
    if (!updateDate) {
      return res.status(400).json({ message: `Date de salon non trouvée.` });
    }
    res.status(202).json(updateDate);
  } catch (error) {
    next(error);
  }
};

//Suppression des dates de salon

export const deleteDate = async (req, res, next) => {
  try {
    await Date.findByIdAndDelete(req.params.id);

    res.status(204).json({ message: `Date supprimée avec succès` });
  } catch (error) {
    next(error);
  }
};
