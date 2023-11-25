import { Schema, model } from 'mongoose';
import {
  TUser,
  TUserAdress,
  TUserName,
  UserMethods,
  UserModel,
} from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../app/config';

const UserNameSchema = new Schema<TUserName>(
  {
    firstName: { type: String, required: [true, 'First name is required'] },
    lastName: { type: String, required: [true, 'Last name is required'] },
  },
  { _id: false },
);

const UserAdressSchema = new Schema<TUserAdress>(
  {
    street: { type: String, required: [true, 'Street is required'] },
    city: { type: String, required: [true, 'City is required'] },
    country: { type: String, required: [true, 'Country is required'] },
  },
  { _id: false },
);

const OrderSchema = new Schema(
  {
    productName: { type: String },
    price: { type: Number },
    quantity: { type: Number },
  },
  { _id: false },
);

const userSchema = new Schema<TUser, UserModel, UserMethods>({
  userId: {
    type: Number,
    required: [true, 'User ID is required'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
  },
  password: { type: String, required: [true, 'Password is required'] },
  fullName: {
    type: UserNameSchema,
    required: true,
  },
  age: { type: Number, required: [true, 'Age is required'] },
  email: { type: String, required: [true, 'Email is required'], unique: true },
  isActive: {
    type: Boolean,
    required: [true, 'Status is required'],
  },
  hobbies: { type: [String], default: [] },
  address: {
    type: UserAdressSchema,
    required: true,
  },
  orders: {
    type: [OrderSchema],
    default: [],
  },
});

// Pre and post save hook
userSchema.pre('save', async function (next) {
  // Generate a salt
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.becrypt_salt));
  next();
});

userSchema.post('save', function (doc, next) {
  next();
});

userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

userSchema.methods.isUserExist = async function (userId: number) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

export const User = model<TUser, UserModel>('User', userSchema);
