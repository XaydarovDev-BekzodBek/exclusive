const { Router } = require("express");
const router = Router();

const controller = require("../controllers/admin.controller");

const middlewares = require("../middlewares");
const { LoginAdminSchema } = require("../validations/admin.validation");

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin api points
 */

/**
 * @swagger
 * /api/admin/login:
 *   post:
 *     summary: Admin login
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: string@gmail.com
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: admin logined
 *       400:
 *         description: bad request
 *       500:
 *         description: Server error
 */

router.post(
  "/admin/login",
  middlewares.verifyValidation(LoginAdminSchema),
  controller.LoginAdmin
);

/**
 * @swagger
 * /api/admin/me:
 *   get:
 *     summary: get admin by token
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: admin found
 *       404:
 *         description: admin not found
 *       500:
 *         descriptin: Server error
 */

router.get("/admin/me", middlewares.verifyToken, controller.GetAdminByToken);

module.exports = router;
