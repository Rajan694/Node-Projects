import express from 'express';
import dotenv from 'dotenv';

const app = express();
dotenv.config({ quiet: true });
const port = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello Ecommerce!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
