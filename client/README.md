# Frontend - Application Bande Dessinée

Ce dossier contient la partie **frontend** de l'application de gestion de bande dessinée. Il est développé avec **React** et utilise **Vite** pour un bundling rapide et moderne.

Accès à l'application via http://localhost:5173.

## 📁 Structure globale du projet

client/ ├── index.html
├── .env
├── package.json
├── vite.config.js
├── public/
├── src/ │
├── components/ # Composants réutilisables (UI, formulaires, etc.) │
├── pages/ # Pages principales de l'application (Accueil, Détails, etc.) │
├── services/ # Fonctions Axios pour communication avec le backend │
├── routes/ # Définition des routes React │
└── App.jsx # Composant racine

## 📁 Détail du dossier `src/`

src/
├── components/ │
├── AlbumCard.jsx │
├── Navbar.jsx │
└── ...
├── pages/ │
├── Accueil.jsx │
├── Bedetheque.jsx │
├── AlbumDetailPage.jsx │
└── ...
├── services/ │
├── albumService.js │
├── photoService.js │
└── dateService.js
├── routes/ │
└── AppRoutes.jsx
├── App.jsx

## ⚙️ Technologies principales

- **React** : Construction de l’interface utilisateur.
- **React Router DOM** : Navigation entre les pages.
- **Axios** : Requêtes HTTP vers le backend.
- **Vite** : Serveur de développement moderne.
- **CSS classique** : Pour le style (pas de Tailwind).

## 🚀 Lancement du projet

1. Cloner le dépôt et naviguer dans le dossier `client`.
2. Installer les dépendances :

```bash
npm install

Créer un fichier .env à la racine avec :

env
Copier le code
VITE_API_URL=http://localhost:3007/api
Lancer le serveur de développement :

bash
Copier le code
npm run dev
```
