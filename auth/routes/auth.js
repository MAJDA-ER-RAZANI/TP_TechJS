const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const router = express.Router();
let loggedInUser = null;

// 🔸 Inscription
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: "Champs manquants" });

  const existing = await User.findOne({ username });
  if (existing)
    return res.status(400).json({ message: "Nom d'utilisateur déjà pris" });

  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashed });
  await user.save();

  res.json({ message: "✅ Utilisateur enregistré avec succès" });
});

// 🔸 Connexion
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) return res.status(401).json({ message: "Utilisateur non trouvé" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Mot de passe incorrect" });

  loggedInUser = user;
  res.json({ message: "✅ Connecté avec succès" });
});

// 🔸 Déconnexion
router.post("/logout", (req, res) => {
  loggedInUser = null;
  res.json({ message: "🚪 Déconnecté avec succès" });
});

// Export
module.exports = { router, loggedInUser };
