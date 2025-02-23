const Association = require("../model/Association");
const Voyage = require("../model/Voyage");

/**
 * @description Créer une nouvelle association
 * @route POST /association
 */
module.exports.createAssociation = async (req, res) => {
  try {
    const { nom, description, photo, email, phone } = req.body;

    // Vérifier que tous les champs sont remplis
    if (!nom || !description || !photo || !email || !phone) {
      return res.status(400).json({ message: "Tous les champs sont obligatoires." });
    }

    // Vérifier si l'email ou le téléphone existe déjà
    const existingAssociation = await Association.findOne({ 
      $or: [{ email }, { phone }] 
    });

    if (existingAssociation) {
      return res.status(400).json({ message: "Email ou numéro de téléphone déjà utilisé." });
    }

    // Créer une nouvelle association
    const newAssociation = await Association.create({
      nom,
      description,
      photo,
      email,
      phone
    });

    res.status(201).json({ message: "Association créée avec succès", association: newAssociation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @description Récupérer toutes les associations
 * @route GET /association
 */
module.exports.getAllAssociations = async (req, res) => {
  try {
    const associations = await Association.find().populate("voyages"); // Inclure les voyages liés
    res.status(200).json({ associations });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @description Récupérer une association par son ID
 * @route GET /association/:id
 */
module.exports.getAssociationById = async (req, res) => {
  try {
    const { id } = req.params;
    const association = await Association.findById(id).populate("voyages");

    if (!association) {
      return res.status(404).json({ message: "Association non trouvée." });
    }

    res.status(200).json({ association });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
/**
 * @description Add a voyage to an association
 * @route POST /association/:id/voyages
 */
module.exports.addVoyageToAssociation = async (req, res) => {
    try {
      const { id } = req.params; // Association ID
      const { voyageId } = req.body; // Voyage ID
  
      // Check if the association exists
      const association = await Association.findById(id);
      if (!association) {
        return res.status(404).json({ message: "Association not found." });
      }
  
      // Check if the voyage exists
      const voyage = await Voyage.findById(voyageId);
      if (!voyage) {
        return res.status(404).json({ message: "Voyage not found." });
      }
  
      // Check if the voyage is already linked
      if (association.voyages.includes(voyageId)) {
        return res.status(400).json({ message: "Voyage already added to this association." });
      }
  
      // Add the voyage to the association
      association.voyages.push(voyageId);
      await association.save();
  
      res.status(200).json({ message: "Voyage added successfully.", association });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
/**
 * @description Modifier une association
 * @route PUT /association/:id
 */
module.exports.updateAssociation = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, description, photo, email, phone } = req.body;

    const updatedAssociation = await Association.findByIdAndUpdate(
      id,
      { nom, description, photo, email, phone },
      { new: true, runValidators: true }
    );

    if (!updatedAssociation) {
      return res.status(404).json({ message: "Association non trouvée." });
    }

    res.status(200).json({ message: "Association mise à jour avec succès", association: updatedAssociation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
/**
 * @description Remove a voyage from an association
 * @route DELETE /association/:id/voyages/:voyageId
 */
module.exports.removeVoyageFromAssociation = async (req, res) => {
    try {
        const { id, voyageId } = req.params;

        // Find the association
        const association = await Association.findById(id);
        if (!association) {
            return res.status(404).json({ message: "Association not found." });
        }

        // Remove the voyage from the list
        association.voyages = association.voyages.filter(v => v.toString() !== voyageId);
        await association.save();

        res.status(200).json({ message: "Voyage removed successfully.", association });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

