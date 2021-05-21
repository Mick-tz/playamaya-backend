import { Router } from 'express';
import { userController } from '../controllers/usersController';
import { auth } from '../middleware/auth';

const router = Router();

// GET
router.get('/usuarios',  userController.renderIndex);
router.get('/usuarios/:id',  userController.renderUser);
// POST
router.post('/usuarios/login', userController.loginUser);
router.post('/usuarios/logout', userController.logoutUser);
router.post('/usuarios', userController.addUser);
// PATCH
router.patch('/usuarios/me', auth, userController.patchUser);
// DELETE
router.delete('/usuarios/me', auth, userController.deleteUser);

module.exports = router;