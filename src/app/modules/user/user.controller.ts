import { Request, Response } from 'express';
import { userServices } from './user.service';
import userValidationSchema from './user.validation';

//all user controllers

//create a new user
const createUser = async (req: Request, res: Response) => {
    try {
        const user = req.body;

        const { error, value } = userValidationSchema.validate(user);
        const result = await userServices.createUserIntoDB(value);

        if (error) {
            res.status(200).json({
                success: false,
                message: 'Something went wrong',
                error: error.details,
            });
        }

        res.status(200).json({
            success: true,
            message: 'User created successfully!',
            data: result,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'User already exists',
            data: err,
        });
    }
};

//get all users
const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await userServices.getAllUsersFromDB();

        res.status(200).json({
            success: true,
            message: 'Users fetched successfully!',
            data: result,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            data: err,
        });
    }
};

//get just a single user through id
const getSingleUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const result = await userServices.getSingleUserFromDB(Number(userId));

        res.status(200).json({
            success: true,
            message: 'User fetched successfully!',
            data: result,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
};

//update user data
const updateSingleUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const user = req.body;

        const result = await userServices.updateSingleUserFromDB(Number(userId), user);

        res.status(200).json({
            success: true,
            message: 'User updated successfully!',
            data: user,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
};

//delete a single user
const deleteUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const result = await userServices.deleteUserFromDB(Number(userId));

        res.status(200).json({
            success: true,
            message: 'User deleted successfully!',
            data: null,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
};

//order controllers
//update a order
const orderUpdate = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const newOrder = req.body;

        const result = await userServices.updateSingleOrderFromDB(Number(userId), newOrder);

        res.status(200).json({
            success: true,
            message: 'Order created successfully!',
            data: null,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
};

//get all orders from a single user
const getSingleUserOrders = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const result = await userServices.getSingleUserOrdersFromDB(Number(userId));

        res.status(200).json({
            success: true,
            message: 'User fetched successfully!',
            data: result,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
};

//get total price from a single user
const totalPrice = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const result = await userServices.gettotalOrdersPriceFromDB(Number(userId));

        res.status(200).json({
            success: true,
            message: 'Total price calculated successfully!',
            data: {
                totalPrice: result,
            },
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
};

export const userControllers = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateSingleUser,
    deleteUser,
    orderUpdate,
    getSingleUserOrders,
    totalPrice,
};
