const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { createNewLogFile } = require("../logs/logs");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    createNewLogFile("A non autherized user tried to send a http request to the server")
    res.status(404).send("Access denied. No token provided");
    return;
  }
  try {
    const payload = jwt.verify(token, config.jwtKey);
    req.user = payload;
    next();
  } catch {
    res.status(400).send("invalid token");
  }
};
