const { createNewLogFile } = require("../logs/logs");
const { User } = require("../models/users");

module.exports = async (req, res, next) => {
  console.log(req.user);
  if (!req.user.isAdmin) {
    res.status(400).send("Must be an Admin type user");
    createNewLogFile(
      `A Non admin type user tried to fetch all users \n user id: ${req.user._id}`
    );
    return;
  }
  try {
    next();
  } catch {
    res.status(400).send("Bad Request");
  }
};
