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
            message: 'User created successfully',
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
            message: 'Users are retrieved successfully',
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

const getSingleUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const result = await userServices.getSingleUserFromDB(userId);

        res.status(200).json({
            success: true,
            message: 'User is retrieved successfully',
            data: result,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'User doesnt exists',
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
            success: true,
            message: 'User is deleted successfully',
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

export const userControllers = {
    createUser,
    getAllUsers,
    getSingleUser,
    deleteUser,
};
