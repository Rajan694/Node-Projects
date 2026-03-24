import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './routes/user.route';
import loginRouter from './routes/login.route';

const app = express();
dotenv.config({ quiet: true });
const port = process.env.PORT || 5000;
await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017', {
  dbName: 'e-commerce',
});
app.use(express.json());
app.use(loginRouter);
app.use(userRouter);
app.get('/', (req, res) => {
  res.send('Hello Ecommerce!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
