const { Card } = require("../models/cards");

module.exports = async (req, res, next) => {
  const userId = req.user;

  const card = await Card.find({ user_id: req.user._id });

  console.log(userId.isAdmin);
  try {
    if (userId._id === card[0].user_id.toString() || userId.isAdmin) {
      next();
    } else {
      res.status(401).send("Must be the user or admin");
    }
  } catch (error) {
    res.status(401).send("Must be the user or admin");
  }
};
