process.on("uncaughtException", function (err) {
  console.error(err.name, err.message);
  console.log("uncaughtException occurs, shutting down");

  process.exit(1);
});
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
  console.error("Unhandled Rejection at:", promise);

  process.exit(1);
});

require("./db/mongoose.js");
const UserRouter = require("../src/routers/user");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorHandler = require("./middleware/handleerror");
const app = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: [process.env.frontend_url, process.env.backend_url],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(UserRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
