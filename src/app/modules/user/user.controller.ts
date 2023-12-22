import { Request, Response } from 'express';
import { userServices } from './user.service';
import userValidationSchema from './user.validation';
import { number } from 'joi';

const createUser = async (req: Request, res: Response) => {
    try {
        const { user: userData } = req.body;

        const { error, value } = userValidationSchema.validate(userData);
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

const getSingleUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const result = await userServices.getSingleUserFromDB(userId);

        res.status(200).json({
            success: true,
            message: 'User fetched successfully!',
            data: result,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            "message": "User not found",
            "error": {
                "code": 404,
                "description": "User not found!"
            }
        });
    }
};

const updateSingleUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const { user: userData } = req.body;

        // console.log(user);

        const result = await userServices.updateSingleUserFromDB(userId, userData);


        res.status(200).json({
            success: true,
            message: 'User updated successfully!',
            data: userData,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            "message": "User not found",
            "error": {
                "code": 404,
                "description": "User not found!"
            }
        });
    }
};

const deleteUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const result = await userServices.deleteUserFromDB(userId);

        res.status(200).json({
            "success": true,
            "message": "User deleted successfully!",
            "data": null
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            "message": "User not found",
            "error": {
                "code": 404,
                "description": "User not found!"
            }
        });
    }
};


// //order controllers
const orderUpdate = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const { newOrder } = req.body;

        // console.log(user);

        const result = await userServices.updateSingleOrderFromDB(userId, newOrder);


        res.status(200).json({
            "success": true,
            "message": "Order created successfully!",
            "data": null
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            "message": "User not found",
            "error": {
                "code": 404,
                "description": "User not found!"
            }
        });
    }
};

const getSingleUserOrders = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const result = await userServices.getSingleUserOrdersFromDB(userId);

        res.status(200).json({
            success: true,
            message: 'User fetched successfully!',
            data: result,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            "message": "User not found",
            "error": {
                "code": 404,
                "description": "User not found!"
            }
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
    getSingleUserOrders

};
