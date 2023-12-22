import express from 'express';
import { userControllers } from './user.controller';
const router = express.Router();

//all user routes
router.post('/users', userControllers.createUser);

router.get('/users', userControllers.getAllUsers);

router.get('/users/:userId', userControllers.getSingleUser);

router.put('/users/:userId', userControllers.updateSingleUser);

router.delete('/users/:userId', userControllers.deleteUser);

//all order routes
router.put('/users/:userId/orders', userControllers.orderUpdate);

router.get('/users/:userId/orders', userControllers.getSingleUserOrders);

router.get('/users/:userId/orders/total-price', userControllers.totalPrice);

export const userRoutes = router;
