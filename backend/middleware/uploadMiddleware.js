import cloudinary from "../config/cloudinary.js";

export const uploadImage = async (file) => {
  // vérification de type de ficher
  const allowedType = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/jpg",
    "audio/mp3",
    "audio/ogg",
  ];

  if (!allowedType.includes(file.mimetype)) {
    throw new Error("Le fichier doit être une image (JPEG, PNG..)");
  }

  // vérificatiion de la taille de l'image (limit a 5 mo par exemple )

  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    throw new Error(`L'image doit  etre inferieur a 5 mo `);
  }

  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath);
    return result.secure_url;
  } catch (error) {
    throw new Error(
      `Erreur lors de l'upload de l'image sur cloudinary ${error.message}`
    );
  }
};
