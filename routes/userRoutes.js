const router = require('express').Router();
const userController = require('../controllers/userControllers');


router.post('/register' , userController.registerUser)
router.post('/login',userController.loginUser)
router.get('/',userController.getAllUsers)
router.delete('/:id', userController.deleteUser)
router.put('/:id', userController.updateUser )





module.exports=router