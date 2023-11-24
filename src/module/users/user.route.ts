import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/', UserController.createUser);
router.get('/', UserController.allUsers);
router.get('/:userId', UserController.singleUser);
router.patch('/:userId', UserController.updateUser);
router.delete('/:userId', UserController.deleteUser);
router.put('/:userId/orders', UserController.addProductToOrder);


export const UserRoutes = router;