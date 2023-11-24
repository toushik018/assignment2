import { z } from 'zod';


const orderValidationSchema = z.object({
  productName: z.string(),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
});

const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string().min(3).max(20, { message: "Must be 5 or more characters long"}),
  password: z.string().min(8, { message: "Must be 8 or more characters long" }),
  fullName: z.object({
    firstName: z.string(),
    lastName: z.string(),
  }),
  age: z.number().positive().int(),
  email: z.string().email(),
  isActive: z.enum(['active', 'inactive']),
  hobbies: z.array(z.string()),
  address: z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
  }),
  orders: z.array(orderValidationSchema).optional(),
});

export default userValidationSchema;
