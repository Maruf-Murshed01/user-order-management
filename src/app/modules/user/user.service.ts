import { TUser } from './user.interface';
import { UserOrderModel } from './user.model';

const createUserIntoDB = async (userData: TUser) => {

    if (await UserOrderModel.isUserExists(userData.userId)) {
        throw new Error('User already exists');
    }

    const result = await UserOrderModel.create(userData)




    //instance method implementation start
    // const user = new UserOrderModel(userData);

    // if (await user.isUserExists(userData.userId)) {
    //     throw new Error('User already exists');
    // }
    // const result = await user.save();
    //instance method implementation end

    const result1 = await UserOrderModel.findOne({ userId: userData.userId }).select({ password: 0 });
    return result1;
};

const getAllUsersFromDB = async () => {
    const result = await UserOrderModel.find().select({ username: 1, fullName: 1, age: 1, email: 1, address: 1 });

    return result;
};

const getSingleUserFromDB = async (userId: number) => {

    if (!await UserOrderModel.isUserExists(userId)) {
        throw new Error('User not found');
    }


    const result = await UserOrderModel.findOne({ userId });
    // const result = await UserOrderModel.aggregate([{ $match: { userId: userId } }])
    return result;
};

const deleteUserFromDB = async (userId: number) => {
    const result = await UserOrderModel.updateOne(
        { userId },
        { isActive: false },
    );
    return result;
};

export const userServices = {
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
    deleteUserFromDB,
};