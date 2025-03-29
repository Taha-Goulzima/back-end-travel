const router = require('express').Router();
const voyageController = require('../controllers/voyageController')
const {specificRole} = require('../middlewares/globalMiddleware')


router.post('/',specificRole(['admin','association']),voyageController.createVoyage)
router.get('/',voyageController.getVoyages)
router.get('/:id',voyageController.getVoyageById)
router.put('/:id',specificRole(['admin','association']),voyageController.updateVoyage)
router.delete('/:id',specificRole(['admin','association']),voyageController.deleteVoyage)


module.exports=router