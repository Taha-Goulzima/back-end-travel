const jwt = require("jsonwebtoken");

const JWT_SECRET = "dev"; // Mets ça dans une variable d'environnement !

module.exports = (req, res, next) => {
  const authHeader = req.header("Authorization");
  
  if (!authHeader) {
    return res.status(401).json({ message: "vous n'êtes pas connecté" });
  }

  const token = authHeader.split(" ")[1]; // Le token doit être sous format "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "vous n'êtes pas connecté" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Ajoute l'utilisateur à la requête pour pouvoir l'utiliser dans les contrôleurs
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalide ou expiré" });
  }
};
