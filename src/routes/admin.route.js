const { Router } = require("express");
const router = Router();

const controller = require("../controllers/admin.controller");

const middlewares = require("../middlewares");
const {
  LoginAdminSchema,
  UpdateAdminSchema,
  CreateAdminSchema,
} = require("../validations/admin.validation");

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
 * /api/admin/create:
 *   post:
 *     summary: create an admin
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
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
 *       201:
 *         description: admin created
 *       400:
 *         description: bad request
 *       500:
 *         description: Server error
 */
router.post(
  "/admin/create",
  middlewares.verifyValidation(CreateAdminSchema),
  middlewares.verifyToken,
  middlewares.verifySuperAdmin,
  controller.createAdmin
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

router.get(
  "/admin/me",
  middlewares.verifyToken,
  middlewares.verifyAdmin,
  controller.GetAdminByToken
);

/**
 * @swagger
 * /api/admin/list:
 *   get:
 *     summary: list of admin
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: list of admins
 *       401:
 *         description: you are not admin
 *       500:
 *         descriptin: Server error
 */
router.get(
  "/admin/list",
  middlewares.verifyToken,
  middlewares.verifySuperAdmin,
  controller.getAllAdmins
);

/**
 * @swagger
 * /api/admin/update:
 *   put:
 *     summary: Admin update
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
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
 *         description: admin updated
 *       401:
 *         description: you are not admin
 *       404:
 *         description: admin not found
 *       500:
 *         descriptin: Server error
 */
router.put(
  "/admin/update",
  middlewares.verifyValidation(UpdateAdminSchema),
  middlewares.verifyToken,
  middlewares.verifyAdmin,
  controller.updateAdminById
);

/**
 * @swagger
 * /api/admin/delete/{id}:
 *   delete:
 *     summary: delete admin by id
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: admin ID
 *     responses:
 *       200:
 *         description: admin updated
 *       401:
 *         description: you are not admin
 *       404:
 *         description: admin not found
 *       500:
 *         descriptin: Server error
 */

router.delete(
  "/admin/delete/:id",
  middlewares.verifyToken,
  middlewares.verifySuperAdmin,
  controller.deleteAdminById
);

module.exports = router;
