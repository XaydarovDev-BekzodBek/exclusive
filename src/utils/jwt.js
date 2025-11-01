const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../constants/process.constants");

exports.createToken = (data) => {
  return jwt.sign({ data }, JWT_SECRET, { expiresIn: "7d" });
};