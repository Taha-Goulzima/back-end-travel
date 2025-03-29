const router = require("express").Router();
const inscriptionController = require("../controllers/inscriptionController");
const {specificRole} = require('../middlewares/globalMiddleware')


router.post("/", inscriptionController.createInscription);
router.get("/", specificRole(['admin','association']),inscriptionController.getAllInscriptions); //check if logic wach nzid 7ta user???
router.get("/:id", specificRole(['admin','association']),inscriptionController.getInscriptionById);
router.put("/:id", inscriptionController.updateInscription);// check if logic
router.delete("/:id",specificRole(['admin','association']), inscriptionController.deleteInscription);

module.exports = router;
