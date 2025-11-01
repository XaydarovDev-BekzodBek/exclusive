const { Router } = require("express");
const router = Router();

const Controller = require("../controllers/user.controller");

const {
  RegisterUserValidation,
  LoginUserValidation,
  UserEditValidation,
} = require("../validations/user.validation");
const { verifyValidation, verifyToken } = require("../middlewares");

router.post(
  "/user/register",
  verifyValidation(RegisterUserValidation),
  Controller.RegisterUser
);

router.post(
  "/user/login",
  verifyValidation(LoginUserValidation),
  Controller.LoginUser
);

router.get("/user/me", verifyToken, Controller.getUserByToken);
router.put(
  "/user/update",
  verifyToken,
  verifyValidation(UserEditValidation),
  Controller.updateUser
);

module.exports = router;