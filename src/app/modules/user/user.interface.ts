import { Model } from 'mongoose';

export type TName = {
  firstName: string;
  lastName: string;
};

export type TFullAddress = {
  street: string;
  city: string;
  country: string;
};

export type TOrder = {
  productName: string;
  price: number;
  quantity: number;
};

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: TName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TFullAddress;
  orders?: TOrder[];
};

//using static
export interface UserModel extends Model<TUser> {
  isUserExists(userId: number): Promise<TUser | null>;
}
