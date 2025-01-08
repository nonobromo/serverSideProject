const { createNewLogFile } = require("../logs/logs");
const { User } = require("../models/users");

module.exports = async (req, res, next) => {
  const userId = req.user;

  const user = await User.findById(req.params.id);
  const userEmail = await User.findOne({email: req.body.email})
  try {
    if (!user) {
      res.status(404).send("User not found");
      return;
    }

    if(userEmail){
      res.status(400).send("a user is already registred with this email")
      return
    }
    console.log(req.params.id);
    if (userId._id.toString() === req.params.id) {
      next();
    } else {
      createNewLogFile(
        `A User with the id of: ${req.user._id} \n tried to edit the user with the id of: \n ${req.params.id}`
      );
      res.status(401).send("Must be the registered user");
    }
  } catch (error) {
    res.status(400).send("Bad Request");
  }
};
