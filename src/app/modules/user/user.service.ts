import { TUser } from './user.interface';
import { UserOrderModel } from './user.model';

const createUserIntoDB = async (value: TUser) => {
  if (await UserOrderModel.isUserExists(value.userId)) {
    throw new Error('User already exists');
  }
  const result = await UserOrderModel.create(value);

  const result1 = await UserOrderModel.findOne({
    userId: value.userId,
  }).select({ password: 0 });
  return result1;
};

const getAllUsersFromDB = async () => {
  const result = await UserOrderModel.find().select({
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
  });
  return result;
};

const getSingleUserFromDB = async (userId: number) => {
  if (!(await UserOrderModel.isUserExists(userId))) {
    throw new Error('User not found');
  }

  const result = await UserOrderModel.findOne({ userId }).select({
    password: 0,
  });
  return result;
};

const updateSingleUserFromDB = async (userId: number, userData: object) => {
  if (!(await UserOrderModel.isUserExists(userId))) {
    throw new Error('User not found');
  }

  const result = await UserOrderModel.updateOne({ userId }, userData);
  return result;
};

const deleteUserFromDB = async (userId: number) => {
  if (!(await UserOrderModel.isUserExists(userId))) {
    throw new Error('User not found');
  }

  const result = await UserOrderModel.updateOne(
    { userId },
    { isActive: false },
  );
  return result;
};

const updateSingleOrderFromDB = async (userId: number, newOrder: object) => {
  if (!(await UserOrderModel.isUserExists(userId))) {
    throw new Error('User not found');
  }

  const result = await UserOrderModel.findOneAndUpdate(
    { userId },
    { $addToSet: { orders: newOrder } },
    { new: true },
  );
  return result;
};

const getSingleUserOrdersFromDB = async (userId: number) => {
  if (!(await UserOrderModel.isUserExists(userId))) {
    throw new Error('User not found');
  }

  const result = await UserOrderModel.findOne({ userId }).select({ orders: 1 });
  return result;
};

const gettotalOrdersPriceFromDB = async (userId: number) => {
  if (!(await UserOrderModel.isUserExists(userId))) {
    throw new Error('User not found');
  }

  const result = await UserOrderModel.findOne({ userId }).select({ orders: 1 });
  const arr = result?.orders;

  const sum = arr?.reduce((sum, product) => {
    return sum + product.price * product.quantity;
  }, 0);

  return sum?.toFixed(2);
};

export const userServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateSingleUserFromDB,
  deleteUserFromDB,
  updateSingleOrderFromDB,
  getSingleUserOrdersFromDB,
  gettotalOrdersPriceFromDB,
};
