const { User } = require("../models/users");

module.exports = async (req, res, next) => {
  console.log(req.user);
  if (!req.user.isAdmin) {
    res.status(400).send("Must be an Admin type user");
    return;
  }
  try {
    next();
  } catch {
    res.status(401).send("No auth");
  }
};
