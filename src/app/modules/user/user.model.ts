import { Schema, model } from 'mongoose';
import { FullAddress, Name, Order, User } from './user.interface';

const nameSchema = new Schema<Name>({
  firstName: {
    type: String,
    required: [true, 'firstName is required'],
  },
  lastName: {
    type: String,
    unique: true,
    required: [true, 'lastName is required'],
  },
});

const addressSchema = new Schema<FullAddress>({
  street: {
    type: String,
    required: [true, 'street is required'],
  },
  city: {
    type: String,
    required: [true, 'city is required'],
  },
  country: {
    type: String,
    required: [true, 'country is required'],
  },
});

const orderSchema = new Schema<Order>({
  productName: {
    type: String,
    required: [true, 'product name is required'],
  },
  price: {
    type: Number,
    required: [true, 'price is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'quantity is required'],
  },
});

const userSchema = new Schema<User>({
  userId: {
    type: Number,
    unique: true,
    required: [true, 'usedId is required'],
  },
  username: {
    type: String,
    unique: true,
    required: [true, 'username is required'],
  },
  password: {
    type: String,
    required: [true, 'password is required'],
  },
  fullName: {
    type: nameSchema,
  },
  age: {
    type: Number,
    required: [true, 'age is required'],
  },
  email: {
    type: String,
    required: [true, 'email is required'],
  },
  isActive: {
    type: Boolean,
    required: [true, 'isActive is required'],
  },
  hobbies: {
    type: [String],
    required: [true, 'hobbies is required'],
  },
  address: {
    type: addressSchema,
  },
  orders: [orderSchema],
});

export const UserOrderModel = model<User>('UserOrder', userSchema);
