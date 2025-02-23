const router = require("express").Router();
const associationController = require("../controllers/associationController");

router.post("/", associationController.createAssociation);
router.get("/", associationController.getAllAssociations);
router.get("/:id", associationController.getAssociationById);
router.put("/:id", associationController.updateAssociation);
//router.delete("/:id", associationController.deleteAssociation);

// Routes for handling voyages within an association
router.post("/:id/voyages", associationController.addVoyageToAssociation);
router.delete("/:id/voyages/:voyageId", associationController.removeVoyageFromAssociation); // ✅ Fixed

module.exports = router;
