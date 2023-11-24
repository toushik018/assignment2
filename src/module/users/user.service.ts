import { TOrder, TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (userData: TUser) => {
    // const result = await User.create(user);

    const user = new User(userData);
    if (await user.isUserExist(userData.userId)) {
        throw new Error("User already exists")
    }

    const result = await user.save();
    return result;
}

// Get all users
const allUsers = async () => {
    const result = await User.find().select('-_id username fullName age email address');
    return result;
}

// Get single user
const singleUser = async (userId: number) => {
    const result = await User.findOne({ userId }).select('-_id');

    if (!result) {
        throw new Error("User not found");
    }
    return result;
}

// Update users 

const updateUser = async (userId: number, userData: Partial<TUser>): Promise<TUser | null> => {
    const result = await User.findOneAndUpdate({ userId: userId }, userData, {
        new: true,
        runValidators: true,
    });

    if (!result) {
        throw new Error("User not found");
    }

    return result;
};



// Delete user

const deleteUser = async (userId: number) => {
    const result = await User.findOneAndDelete({ userId });

    if (!result) {
        throw new Error("User not found");
    }
    return result;
}



// For adding new orders

const addProductToOrder = async (userId: number, orderData: TOrder): Promise<TUser | null> => {
    const user = await User.findOne({ userId });

    if (!user) {
        throw { 
            status: 404,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!",
            },
        };
    }

    // Check if the user has 'orders' array, if not, create it
    if (!user.orders) {
        user.orders = [];
    }

    // Add the product to the user's order
    user.orders.push({ ...orderData });

    const result = await user.save();
    return result;
};



export const UserServices = {
    createUserIntoDB,
    allUsers,
    singleUser,
    updateUser,
    deleteUser,
    addProductToOrder
}