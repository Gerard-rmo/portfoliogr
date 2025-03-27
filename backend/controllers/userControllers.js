import User from "../models/User.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// Fonction pour créer un utilisateur.

export const registerUser = async (req, res, next) => {
  //destructurer les données du corps de la requête.

  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return next({
      statusCode: 400,
      message: "Tous les champs sont obligatoires.",
    });
  }
  try {
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ message: `L'utilisateur a bien été créé.`, user });
  } catch (error) {
    next(error);
  }
};

//Mise à jour des données utilisateur.

export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const newName = req.body.name;
  const newPassword = req.body.password;

  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      { name: newName, password: newPassword },
      { new: true }
    );

    if (!updateUser) {
      return res.status(400).json({ message: `Utilisateur non trouvé.` });
    }
    res.status(202).json(updateUser);
  } catch (error) {
    next(error);
  }
};

//Suppression des données

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: `Utilisateur supprimé avec succès.` });
  } catch (error) {
    next(error);
  }
};

// Fonction pour se connecter

// Générer un token JWT
const generateToken = async (_id) => {
  const token = JWT.sign({ _id }, JWT_SECRET, { expiresIn: "2d" });
  return token;
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userLogin = await User.findOne({ email });

    // Vérifie si l'utilisateur existe
    if (!userLogin) {
      return res.status(401).json({ message: "L'utilisateur n'existe pas" });
    }

    // Comparaison du mot de passe fourni avec le mot de passe haché

    const isMatch = await bcrypt.compare(password, userLogin.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: `Email ou mot de passe incorrect` });
    }

    // Générer un token si les informations sont correctes
    const token = await generateToken(userLogin._id);

    // Envoi du token dans un cookie sécurisé
    res.cookie("jwt", token, {
      httpOnly: true, // Le cookie ne sera pas accessible via JavaScript
      secure: process.env.NODE_ENV === "production", // S'assurer que le cookie est envoyé sur HTTPS en production
    });

    // Réponse avec succès
    res.status(200).json({
      success: true,
      message: "L'utilisateur s'est connecté avec succès",
      userLogin,
      token,
    });
  } catch (error) {
    // Gestion des erreurs
    next(error);
  }
};
