const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "dev"; // Better to move this to environment variables

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
    const passwordHash = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur avec le rôle spécifié ou par défaut
    const newUser = await User.create({
      email,
      phone,
      nom,
      password: passwordHash,
      role: role || "user",
    });

    // Retirer le mot de passe de la réponse
    const userResponse = newUser.toObject();
    delete userResponse.password;

    res.status(201).json({ newUser: userResponse });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: messages.join(", ") });
    }

    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      const fieldMap = {
        email: "L'email",
        phone: "Le numéro de téléphone",
        nom: "Le nom",
      };
      return res.status(400).json({
        message: `${fieldMap[field]} existe déjà`,
      });
    }

    res.status(500).json({ message: error.message });
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

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Il faut remplir tous les champs" });
    }

    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res
        .status(400)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    const isPassword = await bcrypt.compare(password, userExist.password);
    if (!isPassword) {
      return res
        .status(400)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    const token = jwt.sign(
      {
        _id: userExist._id,
        role: userExist.role,
      },
      JWT_SECRET,
      { expiresIn: "4h" }
    );

    // Send user info along with token
    const userResponse = userExist.toObject();
    delete userResponse.password;

    res.status(200).json({
      token,
      user: userResponse,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @description recuperrer tous les utilisateurs
 * @route /user/
 * @method GET
 */
module.exports.getAllUsers = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Vous n'êtes pas autorisé" });
    }

    const users = await User.find().select("-password");
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
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

    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @description modifier le profil d'un utilisateur
 * @router /user/:id
 * @method PUT
 */
module.exports.editProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // Vérifier si l'utilisateur est admin ou modifie son propre profil
    if (req.user.role !== "admin" && req.user._id.toString() !== id) {
      return res.status(403).json({ message: "Vous n'êtes pas autorisé" });
    }

    // Si le mot de passe est fourni, le hasher
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

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

    res.status(200).json({ user: editUser });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};
