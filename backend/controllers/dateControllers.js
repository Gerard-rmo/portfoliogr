import SalonDate from "../models/Date.js";
import dotenv from "dotenv";
dotenv.config();

export const registerDate = async (req, res, next) => {
  try {
    const { date, lieu } = req.body;
    
    if (!date || !lieu) {
      return res.status(400).json({ 
        success: false,
        message: 'Date et lieu necessaires' 
      });
    }

    const newDate = await SalonDate.create({ 
      date,
      lieu 
    });

    res.status(201).json({
      success: true,
      date: newDate
    });
  } catch (error) {
    console.error('Creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

export const getAllDate = async (req, res, next) => {
  try {
    const dates = await SalonDate.find().sort({ date: 1 });
    res.status(200).json(dates);
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des dates'
    });
  }
};

export const updateDate = async (req, res, next) => {
  try {
    const updated = await SalonDate.findByIdAndUpdate(
      req.params.id,
      { date: req.body.date, lieu: req.body.lieu },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour de la date'
    });
  }
};

export const deleteDate = async (req, res, next) => {
  try {
    await SalonDate.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression de la date'
    });
  }
};
