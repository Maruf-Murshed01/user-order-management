import express from 'express';
import { userControllers } from './user.controller';
const router = express.Router();

//all user routes
router.post('/', userControllers.createUser);

router.get('/', userControllers.getAllUsers);

router.get('/:userId', userControllers.getSingleUser);

router.put('/:userId', userControllers.updateSingleUser);

router.delete('/:userId', userControllers.deleteUser);

//all order routes
router.put('/:userId/orders', userControllers.orderUpdate);

router.get('/:userId/orders', userControllers.getSingleUserOrders);

router.get('/:userId/orders/total-price', userControllers.totalPrice);

export const userRoutes = router;
