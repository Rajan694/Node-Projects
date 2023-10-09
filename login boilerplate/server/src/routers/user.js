const express = require("express");

const router = express.Router();
const User = require("../models/user.js");
const auth = require("../middleware/auth.js");

// for user -------------------------------------------------------------

//home screen
router.get("/", (req, res) => {
  res.status(201).json({
    message: "Welcome to the API.",
  });
});
//for signin user
router.post("/users/signin", async (req, res) => {
  const user = new User(req.body);
  try {
    console.log(user);
    // await user.save();
    const token = await user.generateAuthToken();
    console.log(token);
    res.cookie("toke", token, { maxAge: 5000, httpOnly: true });
    res.status(201).send({ token });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//logging in user
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    console.log(user);
    const token = await user.generateAuthToken();
    console.log(token);
    res.cookie("toke", token, { maxAge: 5000, httpOnly: true });
    res.status(201).send({ token });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//logging out user

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.token = "";
    await req.user.save();
    res.clearCookie("toke");
    res.status(201).send("Logged out");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//for getting profile of user from database

router.get("/users/me", auth, async (req, res) => {
  try {
    // console.log(req.cookie("token"));
    res.status(201).send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
});

//for updating user by id
router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();

    // bypasses the validation

    // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    res.send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
});

//for deleting user
router.delete("/users/me", auth, async (req, res) => {
  try {
    const user = await User.deleteOne({ _id: req.user._id });
    res.clearCookie("toke");
    res.status(201).send({ user });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
