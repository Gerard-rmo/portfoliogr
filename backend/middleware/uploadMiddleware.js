// On importe la bibliothèque multer pour gérer les téléchargements de fichiers.
import multer from "multer";
// On importe le module fs pour interagir avec le système de fichiers.
import fs from "fs";

// Définir le répertoire où les fichiers seront téléchargés
const uploadDir = "uploads";

// Vérifie si le répertoire d'upload existe. S'il n'existe pas, il est créé.
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Création du répertoire 'upload', avec l'option 'recursive' pour créer tous les répertoires nécessaires.
}

// Configuration améliorée du stockage Multer pour les fichiers téléchargés
const storage = multer.diskStorage({
  // Fonction de destination pour spécifier le répertoire où le fichier sera enregistré
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Le fichier sera enregistré dans le répertoire 'upload'
  },

  // Fonction pour définir le nom du fichier téléchargé
  filename: function (req, file, cb) {
    // Création d'un suffixe unique pour éviter les conflits de nommage
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // Le nom du fichier sera le suffixe unique suivi du nom original du fichier
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

// Fonction de filtrage des fichiers pour ne permettre que les images
const fileFilter = (req, file, cb) => {
  // Liste des types MIME autorisés (images JPEG, PNG, et WEBP)
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
  // Vérifie si le type MIME du fichier correspond aux types autorisés
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Si le type est autorisé, on accepte le fichier
  } else {
    cb(new Error("Le fichier doit être une image (JPEG, PNG, WEBP)"), false); // Sinon, on rejette le fichier avec un message d'erreur
  }
};

// Configuration de Multer avec les limites et le filtre de fichier
const upload = multer({
  storage: storage, // Utilisation de la configuration de stockage définie plus haut
  fileFilter: fileFilter, // Application du filtre pour les types de fichiers
  limits: {
    fileSize: 5 * 1024 * 1024, // Limite de taille du fichier à 5 Mo
  },
});

// Exportation de la fonction de téléchargement pour l'utiliser ailleurs dans l'application
export { upload };
