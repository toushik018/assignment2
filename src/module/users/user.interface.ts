import { Model } from "mongoose";

export type TUserName = {
    firstName: string;
    lastName: string;
};

export type TUserAdress = {
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
    fullName: TUserName;
    age: number;
    email: string;
    isActive: 'active' | 'inactive';
    hobbies: string[];
    address: TUserAdress;
    orders?: TOrder[] | undefined;

};


// instance methods
export type UserMethods = {
    isUserExist(userId: number): Promise<TUser | null>
}

export type UserModel = Model<TUser, Record<string, never>, UserMethods>;