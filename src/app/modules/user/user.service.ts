import { User } from './user.interface';
import { UserOrderModel } from './user.model';

const createUserIntoDB = async (user: User) => {
    const result = await UserOrderModel.create(user);
    return result;
};

const getAllUsersFromDB = async () => {
    const result = await UserOrderModel.find();
    return result;
}

const getSingleUserFromDB = async (userId: number) => {
    const result = await UserOrderModel.find({ userId });
    return result;
}

export const userServices = {
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUserFromDB
};
