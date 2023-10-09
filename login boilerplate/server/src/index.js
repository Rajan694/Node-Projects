require("./db/mongoose.js");
const UserRouter = require("../src/routers/user");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const port = process.env.PORT;

// app.use(express.static("public"));
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(UserRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
