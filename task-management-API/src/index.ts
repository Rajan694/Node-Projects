import { Request, Response } from 'express';
import express from 'express';
import dotenv from 'dotenv';

const app = express();
dotenv.config({ quiet: true });
const port = process.env.PORT || 5000;

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
