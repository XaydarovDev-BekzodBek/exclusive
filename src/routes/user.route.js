const { Router } = require("express");
const router = Router();

const Controller = require("../controllers/user.controller");

const {
  RegisterUserValidation,
  LoginUserValidation,
  UserEditValidation,
} = require("../validations/user.validation");
const { verifyValidation, verifyToken } = require("../middlewares");
/**
 * @swagger
 * tags:
 *   name: User
 *   description: User's api point
 */

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Register user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               identify:
 *                 type: string
 *                 example: string@gmail.com
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server error
 */

router.post(
  "/user/register",
  verifyValidation(RegisterUserValidation),
  Controller.RegisterUser
);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: User login
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identify:
 *                 type: string
 *                 example: string@gmail.com
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logined
 *       400:
 *         description: Invalid User
 *       500:
 *         description: Server error
 */
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