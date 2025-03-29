const express = require("express");
const router = express.Router();
const avisController = require("../controllers/avis");
const {specificRole} = require('../middlewares/globalMiddleware')


// Ajouter un avis
router.post("/", specificRole(['user']), avisController.createAvis);

// Récupérer tous les avis d'un voyage
router.get("/voyage/:voyageId",specificRole(['admin','association']), avisController.getAvisByVoyage);

// Modifier un avis
router.put("/:id",specificRole(['admin','association']), avisController.updateAvis);

// Supprimer un avis
router.delete("/:id", specificRole(['admin','association']),avisController.deleteAvis);

module.exports = router;
