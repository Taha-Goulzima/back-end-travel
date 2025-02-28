const Avis = require("../model/Avis");
const Voyage = require("../model/Voyage");

/**
 * @description Ajouter un avis sur un voyage
 * @route POST /avis
 */
module.exports.createAvis = async (req, res) => {
    try {
        const { utilisateur, voyage, note, commentaire } = req.body;

        // Vérifier si le voyage existe
        const voyageExist = await Voyage.findById(voyage);
        if (!voyageExist) {
            return res.status(404).json({ message: "Voyage non trouvé." });
        }

        // Créer un nouvel avis
        const newAvis = new Avis({ utilisateur, voyage, note, commentaire });

        // Sauvegarder l'avis
        await newAvis.save();

        res.status(201).json({ message: "Avis ajouté avec succès.", avis: newAvis });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur.", error: error.message });
    }
};

/**
 * @description Récupérer tous les avis d'un voyage
 * @route GET /avis/voyage/:voyageId
 */
module.exports.getAvisByVoyage = async (req, res) => {
    try {
        const { voyageId } = req.params;
        const avisList = await Avis.find({ voyage: voyageId })
            .populate("utilisateur", "nom email");

        res.status(200).json({ avis: avisList });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur.", error: error.message });
    }
};

/**
 * @description Modifier un avis
 * @route PUT /avis/:id
 */
module.exports.updateAvis = async (req, res) => {
    try {
        const { id } = req.params;
        const { note, commentaire } = req.body;

        // Mettre à jour l'avis
        const updatedAvis = await Avis.findByIdAndUpdate(
            id,
            { note, commentaire },
            { new: true, runValidators: true }
        );

        if (!updatedAvis) {
            return res.status(404).json({ message: "Avis non trouvé." });
        }

        res.status(200).json({ message: "Avis mis à jour avec succès.", avis: updatedAvis });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur.", error: error.message });
    }
};

/**
 * @description Supprimer un avis
 * @route DELETE /avis/:id
 */
module.exports.deleteAvis = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedAvis = await Avis.findByIdAndDelete(id);
        if (!deletedAvis) {
            return res.status(404).json({ message: "Avis non trouvé." });
        }

        res.status(200).json({ message: "Avis supprimé avec succès." });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur.", error: error.message });
    }
};
