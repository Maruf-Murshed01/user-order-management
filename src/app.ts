import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './app/modules/user/user.route';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

//application routes;
app.use('/api/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Successfully live this user orders management site',
  });
});

export default app;
