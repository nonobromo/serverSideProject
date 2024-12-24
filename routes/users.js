const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");

const { User, validateUserSchema } = require("../models/users");

router.post("/", async (req, res) => {
  const { error } = validateUserSchema(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  // Validate System

  let user = await User.findOne({ email: req.body.email });

  if (user) {
    res.status(400).send("User Already Registered to our system");
    return;
  }

  //process

  user = await new User(req.body);
  user.password = await bcrypt.hash(user.password, 12);

  await user.save();

  //response

  res.json(_.pick(user, ["name", "isBusiness", "phone", "email"]));
});

module.exports = router;
