const { createNewLogFile } = require("../logs/logs");

module.exports = async (req, res, next) => {
  const userId = req.user;
  console.log(userId);
  try {
    if (userId.isBusiness || userId.isAdmin) {
      next();
    } else {
      createNewLogFile(
        `user: ${req.user._id} which is not a business user tried to create a business card`
      );
      res.status(401).send("Must be a business user or admin");
    }
  } catch (error) {
    res.status(400).send("Bad Request");
  }
};
