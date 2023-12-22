import Joi from 'joi';

const nameValidationSchema = Joi.object({
  firstName: Joi.string().trim().required().messages({
    'string.empty': 'First name is required',
  }),
  lastName: Joi.string().trim().required().messages({
    'string.empty': 'Last name is required',
  }),
});

const addressValidationSchema = Joi.object({
  street: Joi.string().required().messages({
    'string.empty': 'Street is required',
  }),
  city: Joi.string().required().messages({
    'string.empty': 'City is required',
  }),
  country: Joi.string().required().messages({
    'string.empty': 'Country is required',
  }),
});

const orderValidationSchema = Joi.object({
  productName: Joi.string().required().messages({
    'string.empty': 'Product name is required',
  }),
  price: Joi.number().required().messages({
    'number.base': 'Price must be a number',
    'number.empty': 'Price is required',
  }),
  quantity: Joi.number().required().messages({
    'number.base': 'Quantity must be a number',
    'number.empty': 'Quantity is required',
  }),
});

const userValidationSchema = Joi.object({
  userId: Joi.number().required().messages({
    'number.base': 'User ID must be a number',
    'number.empty': 'User ID is required',
  }),
  username: Joi.string().required().messages({
    'string.empty': 'Username is required',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required',
  }),
  fullName: nameValidationSchema.required(),
  age: Joi.number().required().messages({
    'number.base': 'Age must be a number',
    'number.empty': 'Age is required',
  }),
  email: Joi.string().required().email().messages({
    'string.empty': 'Email is required',
    'string.email': 'Invalid email format',
  }),
  isActive: Joi.boolean().required().messages({
    'boolean.base': 'isActive must be a boolean',
    'boolean.empty': 'isActive is required',
  }),
  hobbies: Joi.array().items(Joi.string()).required().messages({
    'array.base': 'Hobbies must be an array',
    'array.empty': 'Hobbies is required',
  }),
  address: addressValidationSchema.required(),
  orders: Joi.array().items(orderValidationSchema).messages({
    'array.base': 'Orders must be an array',
  }),
});

export default userValidationSchema;
