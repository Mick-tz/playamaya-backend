import { Router } from 'express';
import { userController } from '../controllers/usersController'

const router = Router();

router.get('/usuarios',  userController.renderIndex)
router.post('/usuarios', userController.addUser)
router.get('/usuarios/:id',  userController.renderUser)

module.exports = router;