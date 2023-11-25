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
    const result = await User.findOne({ userId }).select('-_id -orders -__v');

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
        select: '-_id -orders -__v'
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
        throw {
            status: 404,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!",
            },
        };
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

    if (!user.orders) {
        user.orders = [];
    }

    user.orders.push({ ...orderData });

    const result = await user.save();
    return result;
};


// Orders for specific users

const ordersForSpecificUser = async (userId: number): Promise<TOrder[] | null> => {
    const user = await User.findOne({ userId });

    if (!user) {
        throw new Error('User not found');
    }

    return user?.orders || null;
}



// Calculate the price for a specific user of orders

const calculatePrice = async (userId: number): Promise<number | null> => {
    const user = await User.findOne({ userId });
    if (!user) {
        throw new Error('User not found');
    }

    const orders = await User.aggregate([
        {
            $match: {
                userId: userId,
            },
        },
        {
            $unwind: {
                path: "$orders",
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $group: {
                _id: "$userId",
                totalPrice: {
                    $sum: {
                        $multiply: [
                            { $ifNull: ["$orders.price", 0] },
                            { $ifNull: ["$orders.quantity", 0] },
                        ],
                    },
                },
            },
        },
    ]);

    if (orders.length === 0 || orders[0].totalPrice === undefined) {

        return 0;
    }

    return orders[0].totalPrice;
};




export const UserServices = {
    createUserIntoDB,
    allUsers,
    singleUser,
    updateUser,
    deleteUser,
    addProductToOrder,
    ordersForSpecificUser,
    calculatePrice
}