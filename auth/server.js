const express = require("express");
const mongoose = require("mongoose");
const { router: authRoutes } = require("./routes/auth");
const bookRoutes = require("./routes/books");

const app = express();
app.use(express.json());

// Connexion MongoDB
mongoose
  .connect("mongodb://localhost:27017/express", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connecté à MongoDB"))
  .catch((err) => console.error("Erreur MongoDB:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

// Lancer le serveur
app.listen(3000, () => console.log("🚀 Serveur démarré sur http://localhost:3000"));
