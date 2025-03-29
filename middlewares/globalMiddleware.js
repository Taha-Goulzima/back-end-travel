const getRoleFromToken = require("../config/jwt");
exports.allRoles = (req, res, next) => {
  try {
    const token = req.headers("Authorization");
    if (!token) return res.status(401).json({ error: "Token not exist" });
    const role = getRoleFromToken(token.replace("Bearer ", ""));
    if (role) next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
exports.onlyAdmin = (req, res, next) => {
  try {
    const token = req.headers("Authorization");
    if (!token) return res.status(401).json({ error: "Token not exist" });
    const role = getRoleFromToken(token.replace("Bearer ", ""));
    if (role == "admin") next();
    else return res.status(403).json({ message: "Unauthorized to access" });
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
exports.onlyAssociation = (req, res, next) => {
  try {
    const token = req.headers("Authorization");
    if (!token) return res.status(401).json({ error: "Token not exist" });
    const role = getRoleFromToken(token.replace("Bearer ", ""));
    if (role == "association") next();
    else return res.status(403).json({ message: "Unauthorized to access" });
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
exports.onlyUser = (req, res, next) => {
  try {
    if (!token) return res.status(401).json({ error: "Token not exist" });
    const role = getRoleFromToken(token.replace("Bearer ", ""));
    if (role == "user") next();
    else return res.status(403).json({ message: "Unauthorized to access" });
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
exports.specificRole = (roles) => (req, res, next) => {
  try {
    if (!token) return res.status(401).json({ error: "Token not exist" });
    const role = getRoleFromToken(token.replace("Bearer ", ""));
    if (roles.includes(role)) next();
    else return res.status(403).json({ message: "Unauthorized to access" });
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
