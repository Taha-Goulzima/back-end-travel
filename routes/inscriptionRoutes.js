const router = require("express").Router();
const inscriptionController = require("../controllers/inscriptionController");

router.post("/", inscriptionController.createInscription);
router.get("/", inscriptionController.getAllInscriptions);
router.get("/:id", inscriptionController.getInscriptionById);
router.put("/:id", inscriptionController.updateInscription);
router.delete("/:id", inscriptionController.deleteInscription);

module.exports = router;
