import { z } from 'zod';

const orderValidationSchema = z.object({
  productName: z.string(),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
});

export const userValidationSchema = z.object({
  userId: z.number(),
  username: z
    .string()
    .min(3)
    .max(20, { message: 'Must be 5 or more characters long' }),
  password: z.string().min(8, { message: 'Must be 8 or more characters long' }),
  fullName: z.object({
    firstName: z.string(),
    lastName: z.string(),
  }),
  age: z.number().positive().int(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
  }),
  orders: z.array(orderValidationSchema).optional(),
});


// For update 
export const updateUserValidationSchema = z.object({
  username: z.string().min(3).max(20, { message: 'Must be 5 or more characters long' }).optional(),
  password: z.string().min(8, { message: 'Must be 8 or more characters long' }).optional(),
  fullName: z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
  }),
  age: z.number().positive().int().optional(),
  email: z.string().email().optional(),
  isActive: z.boolean().optional(),
  hobbies: z.array(z.string()).optional(),
  address: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
  }),
  orders: z.array(orderValidationSchema).optional(),
});





