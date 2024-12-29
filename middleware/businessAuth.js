module.exports = async (req, res, next) => {
  const userId = req.user;

  try {
    if (userId.isBusiness || userId.isAdmin) {
      next();
    } else {
      res.status(401).send("Must be a business user or admin");
    }
  } catch (error) {
    res.status(401).send("Must be a business user or admin");
  }
};
