const express = require("express");
const router = express.Router();
const avisController = require("../controllers/avis");

// Ajouter un avis
router.post("/", avisController.createAvis);

// Récupérer tous les avis d'un voyage
router.get("/voyage/:voyageId", avisController.getAvisByVoyage);

// Modifier un avis
router.put("/:id", avisController.updateAvis);

// Supprimer un avis
router.delete("/:id", avisController.deleteAvis);

module.exports = router;
