const router = require('express').Router();
const userController = require('../controllers/userControllers');
const valideToken = require('../middlewares/authMiddleware');


router.post('/register' , userController.registerUser)
router.post('/login',userController.loginUser)
router.get('/',valideToken, userController.getAllUsers)
router.delete('/:id',valideToken, userController.deleteUser)
router.put('/:id',valideToken, userController.editProfile)





module.exports=router