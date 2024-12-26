const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");

const { User, validateUserSchema } = require("../models/users");
const adminAuth = require("../middleware/adminAuth")

const authMW = require("../middleware/auth");
const userAuth = require("../middleware/userAuth");


router.put("/:id", [authMW, userAuth, adminAuth], async (req,res) =>{
  const { error } = validateUserSchema(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const user = await User.findOneAndUpdate({_id: req.params.id}, req.body, {returnDocument: "after"})
res.send(user)


})

router.get("/allUsers", [authMW, adminAuth], async (req, res) =>{
  const users = await User.find();

  res.json(users)
})

router.get("/:id", [authMW, adminAuth], async(req, res) =>{
    res.json(await User.findById({_id: req.params.id, user_id: req.user._id}, {password: 0}))
})

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

  res.json(_.pick(user, ["name", "isBusiness", "phone", "email", "_id"]));
});

module.exports = router;
