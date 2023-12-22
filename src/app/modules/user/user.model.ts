import { Schema, model } from 'mongoose';
import {
    TFullAddress,
    TName,
    TOrder,
    TUser,
    UserModel,
    userMethods,
} from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const nameSchema = new Schema<TName>({
    firstName: {
        type: String,
        trim: true,
        required: [true, 'firstName is required'],
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, 'lastName is required'],
    },
});

const addressSchema = new Schema<TFullAddress>({
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

const orderSchema = new Schema<TOrder>({
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

const userSchema = new Schema<TUser, UserModel>({
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
        required: [true, 'fullName is required'],
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
        required: [true, 'address is required'],
    },
    orders: {
        type: [orderSchema],
    },
});

userSchema.pre('save', async function (next) {
    // console.log(this, 'pre hook: we will save the data')
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bycrypt_salt_rounds),
    );
    next();
});

//post middleware svae
userSchema.post('save', function (doc, next) {
    // doc.password = ''



    // console.log(doc)
    next();
    // console.log(this, 'post hook: we saved our data')
});


//query middleware
userSchema.pre('find', function (next) {
    // console.log(this)
    this.find({ isActive: { $ne: false } });
    next();
});

//query middleware
userSchema.pre('findOne', function (next) {
    // console.log(this)
    this.find({ isActive: { $ne: false } });
    next();
});

userSchema.pre('aggregate', function (next) {
    // console.log(this)
    this.pipeline().unshift({ $match: { isActive: { $ne: false } } });
    next();
});

//creating a custom static method
userSchema.statics.isUserExists = async function (userId: number) {
    const existingUser = await UserOrderModel.findOne({ userId })

    return existingUser;
}


//creating a instance method
// userSchema.methods.isUserExists = async function (userId: number) {
//     const existingUser = await UserOrderModel.findOne({ userId: userId });
//     return existingUser;
// };

export const UserOrderModel = model<TUser, UserModel>('UserOrder', userSchema);
