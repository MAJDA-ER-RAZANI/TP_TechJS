const express = require("express");
const { loggedInUser } = require("./auth");

const router = express.Router();

// Exemple de section livres accessible uniquement si connecté
router.get("/", (req, res) => {
  if (!loggedInUser)
    return res.status(403).json({ message: "⛔ Accès refusé. Connectez-vous d'abord." });

  res.json([
    { title: "Le Petit Prince", author: "Antoine de Saint-Exupéry" },
    { title: "1984", author: "George Orwell" },
  ]);
});

module.exports = router;
