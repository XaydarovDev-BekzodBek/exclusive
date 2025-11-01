const { JWT_SECRET } = require("../constants/process.constants");
const jwt = require("jsonwebtoken")

exports.verifyValidation = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }
  next();
};

exports.verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ message: "No token provided!" });
  }
  jwt.verify(token, JWT_SECRET, async (error, use) => {
    if (error) {
      return res.status(500).json({ success: false, message: error });
    }
    req.use = use.data
    next();
  });
};
