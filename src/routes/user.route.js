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

/**
 * @swagger
 * /api/user/me:
 *   get:
 *     summary: get user by id
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: success
 *       404:
 *         description: not found
 *       500:
 *         description: server error
 */
router.get("/user/me", verifyToken, Controller.getUserByToken);

/**
 * @swagger
 * /api/user/update:
 *   put:
 *     summary: update user by id
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *                 example: string@gmail.com
 *               phone:
 *                 type: string
 *                 example: +998990010203
 *               address:
 *                 type: string
 *               current_password:
 *                 type: string
 *               new_password:
 *                 type: string
 *                 example: 1234
 *     responses:
 *       200:
 *         description: user updated
 *       400:
 *         description: invalid inputs
 *       404:
 *         description: not found
 *       500:
 *         description: server error
 */
router.put(
  "/user/update",
  verifyToken,
  verifyValidation(UserEditValidation),
  Controller.updateUser
);

module.exports = router;
