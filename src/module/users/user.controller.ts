/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { UserServices } from './user.service';
import userValidationSchema from './user.validation';
import { z } from 'zod';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    // Data validation using zod
    const validationData = userValidationSchema.parse(user);

    const result = await UserServices.createUserIntoDB(validationData);
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      const Error = err.format();
      res.status(400).json({
        success: false,
        message: 'Validation error',
        error: Error,
      });
    } else {
      res.status(500).json({
        success: false,
        message: err.message || 'Something went wrong',
        error: err,
      });
    }
  }
};

// All users

const allUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.allUsers();
    res.status(200).json({
      success: true,
      message: 'Users Retrived successfully',
      data: result,
    });
  } catch (err: any) {
    if (err.message === 'User not found') {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error: err,
      });
    }
  }
};

// Single user

const singleUser = async (req: Request, res: Response) => {
  try {
    const userIdParam = req.params.userId;
    const userId = Number(userIdParam);

    const result = await UserServices.singleUser(userId);

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    if (err.message === 'User not found') {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error: err,
      });
    }
  }
};

// Update user's controller
const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const userData = req.body;
    const result = await UserServices.updateUser(userId, userData);

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

// Delete user's controller
const deleteUser = async (req: Request, res: Response) => {
  try {
    const userIdParam = req.params.userId;
    const userId = Number(userIdParam);
    await UserServices.deleteUser(userId);
    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: null,
    });
  } catch (err: any) {
    if (err.status) {
      res.status(err.status).json({
        success: false,
        message: err.message,
        error: err.error,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error: err,
      });
    }
  }
};

// Order's controller

const addProductToOrder = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const { orderData } = req.body;

    await UserServices.addProductToOrder(userId, orderData);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (err: any) {
    if (err.status) {
      res.status(err.status).json({
        success: false,
        message: err.message,
        error: err.error,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error: err,
      });
    }
  }
};

// Orders for specific user
const ordersForSpecificUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const orders = await UserServices.ordersForSpecificUser(userId);

    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: orders,
    });
  } catch (err: any) {
    if (err.message === 'User not found') {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    } else {
      res.status(500).json({
        success: false,
        message: err.message || 'Something went wrong',
        error: err,
      });
    }
  }
};

// Calculate the price for a specific user of orders

const calculatePrice = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const totalPrice = await UserServices.calculatePrice(userId);

    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: { totalPrice },
    });
  } catch (err: any) {
    if (err.message === 'User not found') {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    } else {
      res.status(500).json({
        success: false,
        message: err.message || 'Something went wrong',
        error: err,
      });
    }
  }
};

export const UserController = {
  createUser,
  allUsers,
  singleUser,
  updateUser,
  deleteUser,
  addProductToOrder,
  ordersForSpecificUser,
  calculatePrice,
};
