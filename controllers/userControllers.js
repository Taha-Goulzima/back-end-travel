const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const{ generateToken,deCoderToken} = require("../config/jwt");


/**
 * @description creer un compte
 * @router /user/register
 * @method POST
 */
module.exports.registerUser = async (req, res) => {
  try {
    const { nom, email, phone, role, password } = req.body;

    // Vérifier si tous les champs sont remplis
    if (!nom || !email || !phone || !password) {
      return res
        .status(400)
        .json({ message: "Il faut remplir tous les champs" });
    }
console.log(password)
    // Vérifier si l'utilisateur existe déjà
    const userExist = await User.findOne({
      $or: [{ email }, { phone }, { nom }],
    });

    if (userExist) {
      if (userExist.email === email) {
        return res
          .status(400)
          .json({ message: `L'email ${email} existe déjà` });
      }
      if (userExist.phone === phone) {
        return res
          .status(400)
          .json({ message: `Le numéro de téléphone ${phone} existe déjà` });
      }
      if (userExist.nom === nom) {
        return res.status(400).json({ message: `Le nom ${nom} existe déjà` });
      }
    }

    // Hasher le mot de passe

    // Créer un nouvel utilisateur avec le rôle spécifié ou par défaut
    const newUser = new User( {
      email,
      phone,
      nom,
      password: password,
      role: role || "user",
    });
    await newUser.save()
    console.log(newUser)
    return res.status(201).json({ user: newUser });
  } catch (error) {
    console.error("⛔ Error Creating User:", error);
    return res.status(500).json({ error: "Error creating user" });
  }
};

/**
 * @description se connecter
 * @router /user/login
 * @method POST
 */
module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log(user);
    if (!user)
      return res.status(401).json({ error: "Invalid email or password" });

      const isMatch = await user.matchPassword(password);
    console.log(isMatch)
    if (!isMatch)
      return res.status(401).json({ error: "Invalid email or password" });

     
      const userResponse = {
        _id: user._id,
        nom: user.nom,
        email: user.email,
        phone: user.phone,
        role: user.role,

      };
  
    const token = generateToken(userResponse);
    // Send user info along with token
    
    return res.status(200).json({
      token,
      user: userResponse,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * @description recuperrer tous les utilisateurs
 * @route /user/
 * @method GET
 */
module.exports.getAllUsers = async (req, res) => {
  try {
    const token = req.header("Authorization");
    console.log(token);
    const deCoded = await deCoderToken(token.replace("Bearer ", ""))
    if (deCoded.user.role !== "admin") {
      return res.status(403).json({ message: "Vous n'êtes pas autorisé" });
    }

    const users = await User.find().select("-password");
   return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * @description supprimer un utilisateur
 * @route /user/:id
 * @method DELETE
 */
module.exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Vérifier si l'utilisateur est admin ou supprime son propre compte
    if (req.user.role !== "admin" && req.user._id.toString() !== id) {
      return res.status(403).json({ message: "Vous n'êtes pas autorisé" });
    }

    const deleteUser = await User.findByIdAndDelete(id);
    if (!deleteUser) {
      return res.status(404).json({ message: "L'utilisateur n'existe pas" });
    }

    return res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
     return res.status(500).json({ message: error.message });
  }
};

/**
 * @description modifier le profil d'un utilisateur
 * @router /user/:id
 * @method PUT
 */
module.exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
   
    // Empêcher la modification du rôle sauf pour les admins
    if (updateData.role && req.user.role !== "admin") {
      delete updateData.role;
    }

    const editUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!editUser) {
      return res.status(404).json({ message: "L'utilisateur n'existe pas" });
    }

    return  res.status(200).json({ user: editUser });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
   return res.status(500).json({ message: error.message });
  }
};
