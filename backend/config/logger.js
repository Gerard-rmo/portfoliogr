import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    // Combinaison des formats de logs
    winston.format.timestamp(), // Ajouter une date et heure pour chaque log
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(), // Afficher les logs dans la console
    new winston.transports.File({ filename: "logs/all.log" }), // Enregistrer les logs dans un fichier
  ],
});

export default logger;
