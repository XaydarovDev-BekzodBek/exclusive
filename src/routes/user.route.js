const { Router } = require("express");
const router = Router();

const Controller = require("../controllers/user.controller");

const { RegisterUserValidation } = require("../validations/user.validation");
const { verifyValidation } = require("../middlewares");

router.post(
  "/user/register",
  verifyValidation(RegisterUserValidation),
  Controller.RegisterUser
);

module.exports = router;
