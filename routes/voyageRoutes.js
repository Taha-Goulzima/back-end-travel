const router = require('express').Router();
const voyageController = require('../controllers/voyageController')


router.post('/',voyageController.createVoyage)
router.get('/',voyageController.getVoyages)
router.get('/:id',voyageController.getVoyageById)
router.put('/:id',voyageController.updateVoyage)
router.delete('/:id',voyageController.deleteVoyage)




 
module.exports=router