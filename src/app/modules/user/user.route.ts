import express from 'express';
import { userControllers } from './user.controller';
const router = express.Router();

router.post('/users', userControllers.createUser);

router.get('/users', userControllers.getAllUsers);

router.get('/users/:userId', userControllers.getSingleUser);

router.put('/users/:userId', userControllers.updateSingleUser)

router.delete('/users/:userId', userControllers.deleteUser);



export const userRoutes = router;
