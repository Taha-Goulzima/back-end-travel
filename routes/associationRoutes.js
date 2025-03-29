const router = require("express").Router();
const associationController = require("../controllers/associationController");
const {specificRole} = require('../middlewares/globalMiddleware')


router.post("/",specificRole(['admin']), associationController.createAssociation);
router.get("/", specificRole(['admin',]),associationController.getAllAssociations);
router.get("/:id", specificRole(['admin']),associationController.getAssociationById);
router.put("/:id", specificRole(['admin','association']),associationController.updateAssociation);// check if logic 
//router.delete("/:id", associationController.deleteAssociation);

// Routes for handling voyages within an association
router.post("/:id/voyages",  specificRole(['admin','association']),associationController.addVoyageToAssociation);
router.delete("/:id/voyages/:voyageId",specificRole(['admin','association']),associationController.removeVoyageFromAssociation); // ✅ Fixed

module.exports = router;
