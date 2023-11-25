import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { UserRoutes } from './module/users/user.route';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// App routes
app.use('/api/users', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Assignment 2!',
    data: null,
  });
});
export default app;
