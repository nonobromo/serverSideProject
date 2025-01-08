const { createNewLogFile } = require("../logs/logs");

module.exports = async (req, res, next) => {
  const userId = req.user;

  try {
    if (userId._id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      createNewLogFile(
        `The user with the id ${req.user._id} tried to fetch another users profile with the id of ${req.params.id}`
      );
      res.status(401).send("Must be the user or admin");
    }
  } catch (error) {
    res.status(400).send("Bad Request");
  }
};
