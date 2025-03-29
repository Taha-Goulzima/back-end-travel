const router = require('express').Router();
const userController = require('../controllers/userControllers');
const {specificRole} = require('../middlewares/globalMiddleware')



router.post('/register' , userController.registerUser)
router.post('/login',userController.loginUser)
router.get('/',specificRole(['admin','association']),userController.getAllUsers)
router.delete('/:id', specificRole(['admin',]),userController.deleteUser)
router.put('/:id',specificRole(['admin','user']), userController.updateUser )





module.exports=router