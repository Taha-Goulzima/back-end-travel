const router = require('express').Router();
const voyageController = require('../controllers/voyageController')
const valideToken = require('../middlewares/authMiddleware');


router.post('/',valideToken,voyageController.createVoyage)
router.get('/',voyageController.getVoyages)
router.get('/:id',voyageController.getVoyageById)
router.put('/:id',valideToken,voyageController.updateVoyage)
router.delete('/:id',valideToken,voyageController.deleteVoyage)





module.exports=router