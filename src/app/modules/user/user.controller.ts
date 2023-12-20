import { Request, Response } from 'express';
import { userServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
    try {
        const { user: userData } = req.body;
        const result = await userServices.createUserIntoDB(userData);

        res.status(200).json({
            success: true,
            message: 'User created successfully',
            data: result,
        });
    } catch (err) {
        console.log(err);
    }
};


const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await userServices.getAllUsersFromDB()

        res.status(200).json({
            success: true,
            message: 'Users are retrieved successfully',
            data: result,
        });
    } catch (err) {
        console.log(err);
    }
}

const getSingleUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const result = await userServices.getSingleUserFromDB(userId);

        res.status(200).json({
            success: true,
            message: 'User is retrieved successfully',
            data: result,
        });
    } catch (err) {
        console.log(err);
    }
}

export const userControllers = {
    createUser,
    getAllUsers,
    getSingleUser
};
