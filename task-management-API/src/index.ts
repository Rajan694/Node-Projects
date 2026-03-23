import { Request, Response } from 'express';
import express from 'express';
import dotenv from 'dotenv';
import taskRouter from './routes/task.route';

const app = express();
dotenv.config({ quiet: true });
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(taskRouter);

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
