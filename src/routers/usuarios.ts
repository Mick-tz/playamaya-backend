import { Router } from 'express';
import { userController } from '../controllers/usersController';
import { auth } from '../middleware/auth';

const router = Router();

router.get('/usuarios',  userController.renderIndex);
router.post('/usuarios', userController.addUser);
router.get('/usuarios/:id',  userController.renderUser);
router.post('/usuarios/login', userController.loginUser);
router.delete('/usuarios/me', auth, userController.deleteUser);

module.exports = router;