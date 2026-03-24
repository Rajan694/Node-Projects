import express from 'express';
import dotenv from 'dotenv';
import taskRouter from './routes/task.route';
import userRouter from './routes/user.route';
import { errorMiddleware } from './middlewares/error.middleware';
import { initializeRedisClient } from './middlewares/redis';
dotenv.config({ quiet: true });

const initializeExpressServer = async () => {
  try {
    const app = express();
    const port = process.env.PORT || 5000;
    app.use(express.json());
    await initializeRedisClient();
    app.use(taskRouter);
    app.use(userRouter);
    // Centralized error handling middleware
    app.use(errorMiddleware);

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (e) {
    console.error(e);
  }
};

initializeExpressServer();
