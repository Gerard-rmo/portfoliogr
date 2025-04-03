# Backend - Documentation

Ce projet est un backend Node.js utilisant Express, avec une connexion à une base de données et des services comme Cloudinary pour le stockage d'images d'une application de bandes dessinées.

## Déploiement

Le projet est déployé sur Render : [Voir le site](https://leglaiveproduction.onrender.com)

## Prérequis

- Node.js (v16+ recommandé)
- MongoDB (local ou distant)
- Un compte Cloudinary (si stockage d'images requis)

## Installation

1. Cloner le dépôt :

   ```sh
   git clone https://gerardromero66-admin@bitbucket.org/gerardromero66/leglaiveproduction.git
   cd backend
   ```

2. Installer les dépendances :

   ```sh
   npm install
   ```

3. Créer un fichier `.env` en vous basant sur `.env.example` et remplir les variables d'environnement.

## Lancement du projet

### En mode production

```sh
npm start
```

## Structure du projet

```
backend/
├── config/            # Configuration (DB, Cloudinary, Logger)
├── controllers/       # Logique des routes
├── models/            # Modèles Mongoose
├── routes/            # Routes Express
├── middleware/        # Middleware personnalisés
├── app.js             # Point d'entrée principal
└── package.json       # Fichier de configuration npm
```

## API - Routes principales

### Albums

- `GET /albums` : Récupère tous les albums
- `POST /albums/create` : Ajoute un nouvel album
- `DELETE /albums/:id` : Supprime un album

### Dates

- `GET /dates` : Récupère toutes les dates
- `POST /dates/create` : Ajoute une nouvelle date
- `PUT /dates/:id` : Met à jour une date existante
- `DELETE /dates/:id` : Supprime une date

### Photos

- `GET /photos` : Récupère toutes les photos
- `POST /photos/create` : Ajoute une nouvelle photo
- `PUT /photos/:id` : Met à jour une photo existante
- `DELETE /photos/:id` : Supprime une photo

### Utilisateurs

- `POST /users/register` : Inscription d'un utilisateur
- `POST /users/login` : Connexion d'un utilisateur
- `PUT /users/:id` : Mise à jour d'un utilisateur
- `DELETE /users/:id` : Suppression d'un utilisateur

---
