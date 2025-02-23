const Voyage = require('../model/Voyage');

// Récupérer tous les voyages
exports.getVoyages = async (req, res) => {
    try {
        const voyages = await Voyage.find();
        res.status(200).json(voyages);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err });
    }
};

//  Récupérer un voyage par ID
exports.getVoyageById = async (req, res) => {
    try {
        const voyage = await Voyage.findById(req.params.id);
        if (!voyage) return res.status(404).json({ message: 'Voyage non trouvé' });
        res.status(200).json(voyage);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err });
    }
};

//  Créer un voyage
exports.createVoyage = async (req, res) => {
    try {
        const voyage = new Voyage(req.body);
        await voyage.save();
        res.status(201).json({ message: 'Voyage créé avec succès', voyage });
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la création', error: err });
    }
};

//  Modifier un voyage
exports.updateVoyage = async (req, res) => {
    try {
        const voyage = await Voyage.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!voyage) return res.status(404).json({ message: 'Voyage non trouvé' });
        res.status(200).json({ message: 'Voyage mis à jour', voyage });
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err });
    }
};

//  Supprimer un voyage
exports.deleteVoyage = async (req, res) => {
    try {
        const voyage = await Voyage.findByIdAndDelete(req.params.id);
        if (!voyage) return res.status(404).json({ message: 'Voyage non trouvé' });
        res.status(200).json({ message: 'Voyage supprimé' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err });
    }
};
