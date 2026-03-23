import express from 'express';
import dotenv from 'dotenv';
import taskRouter from './routes/task.route';
import userRouter from './routes/user.route';
import { errorMiddleware } from './middlewares/error.middleware';

const app = express();
dotenv.config({ quiet: true });
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(taskRouter);
app.use(userRouter);

// Centralized error handling middleware
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
