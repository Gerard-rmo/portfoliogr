import Joi from "joi";

// Schéma pour ajouter un album

export const addAlbumSchema = Joi.object({
  title: Joi.string().min(3).max(50).required().messages({
    "string.base": "Le titre doit être une chaîne de caractères.",
    "string.min": "Le titre doit avoir au moins 3 caractères.",
    "string.max": "Le titre doit avoir un maximum de 50 caractères.",
    "any.required": "Le titre est obligatoire.",
  }),

  summary: Joi.string().min(20).max(500).required().messages({
    "string.base": "Le résumé doit être une chaîne de caractères.",
    "string.min": "Le résumé doit avoir au moins 20 caractères.",
    "string.max": "Le résumé doit avoir un maximum de 500 caractères.",
    "any.required": "Le résumé est obligatoire.",
  }),

  imageURL: Joi.string().uri().optional().messages({
    "string.uri": "L'URL de l'image doit être une URL valide.",
  }),
  public_id: Joi.string().optional().messages({
    "string.base": "Le public_id doit être une chaîne de caractères.",
  }),
});

// Schéma pour mettre à jour un album
export const updateAlbumSchema = Joi.object({
  title: Joi.string().min(3).max(50).optional().messages({
    "string.base": "Le titre doit être une chaîne de caractères.",
    "string.min": "Le titre doit avoir au moins 3 caractères.",
    "string.max": "Le titre doit avoir un maximum de 20 caractères.",
  }),
  summary: Joi.string().min(20).max(500).optional().messages({
    "string.base": "Le résumé doit être une chaîne de caractères.",
    "string.min": "Le résumé doit avoir au moins 20 caractères.",
    "string.max": "Le résumé doit avoir un maximum de 500 caractères.",
  }),

  imageURL: Joi.string().uri().optional().messages({
    "string.uri": "L'URL de l'image doit être une URL valide.",
  }),
  public_id: Joi.string().optional().messages({
    "string.base": "Le public_id doit être une chaîne de caractères.",
  }),
});
