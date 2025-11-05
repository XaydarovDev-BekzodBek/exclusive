const { JWT_SECRET } = require("../constants/process.constants");
const jwt = require("jsonwebtoken");
const { AdminModel } = require("../models");

exports.verifyValidation = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }
  if (
    req.body.identify &&
    (!req.body.identify.includes("@") || req.body.identify.length < 9)
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Email or phone invalid" });
  }
  next();
};

exports.verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ");
  if (!token?.["1"]) {
    return res.status(403).json({ message: "No token provided!" });
  }
  jwt.verify(token[1], JWT_SECRET, async (error, use) => {
    if (error) {
      return res.status(500).json({ success: false, message: error });
    }
    req.use = use.data;
    next();
  });
};

exports.verifyAdmin = async (req, res, next) => {
  try {
    const admin = await AdminModel.findById(req.use.id);
    if (!admin) {
      return res
        .status(401)
        .json({ success: false, message: "you are not admin" });
    }
    req.admin = admin;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};
