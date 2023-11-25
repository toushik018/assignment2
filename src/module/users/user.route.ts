import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/', UserController.createUser);
router.get('/', UserController.allUsers);
router.get('/:userId', UserController.singleUser);
router.patch('/:userId', UserController.updateUser);
router.delete('/:userId', UserController.deleteUser);
router.put('/:userId/orders', UserController.addProductToOrder);
router.get('/:userId/orders', UserController.ordersForSpecificUser);
router.get('/:userId/orders/total-price', UserController.calculatePrice);

export const UserRoutes = router;
