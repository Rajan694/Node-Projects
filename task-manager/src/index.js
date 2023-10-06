require("./db/mongoose.js");
const express = require("express");
const UserRouter = require("../src/routers/user");
const TaskRouter = require("../src/routers/task");
const app = express();
const port = process.env.PORT;

//use of middleware

//function to stop all operations under maintenance
// app.use((req, res, next) => {
// const method = ["GET", "POST", "PUT", "DELETE", "PATCH"];
// if (method.includes(req.method)) {
//   res.status(504).send(`Method ${req.method} not allowed`);
// }

//or
// res.status(504).send("Method not allowed");
// });
app.use(express.static("public"));
app.use(express.json());
app.use(UserRouter);
app.use(TaskRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//-----------------------------------------------------------HASHING
// const bcrypt = require("bcryptjs");

// const myFunction = async () => {
//   const password = "123";
//   const hashes = await bcrypt.hashSync(password, 8);
//   console.log(password, hashes);

//   const ismatch = await bcrypt.compareSync("123", hashes);
//   console.log(ismatch);
// };

// myFunction();

//-------------------------------------------------------------JWT
// const jwt = require("jsonwebtoken");

// const myFunction = async () => {
//   const token = jwt.sign({ _id: "abc123" }, "this is rajan", {
//     expiresIn: "5 minutes",
//   });
//   console.log(token);

//   const data = jwt.verify(token, "this is rajan");    //secret key

//   console.log(data);
// };
// myFunction();
