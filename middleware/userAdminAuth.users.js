

module.exports = async (req, res, next) => {
  const userId = req.user;

  console.log(userId._id, req.params.id);
  try {
    if (userId._id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(401).send("Must be the user or admin");
    }
  } catch (error) {
    res.status(401).send("Must be the user or admin");
  }
};
