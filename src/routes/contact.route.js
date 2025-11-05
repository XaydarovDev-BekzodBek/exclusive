const { Router } = require("express");
const router = Router();

const Controller = require("../controllers/contact.controller");

const middlewares = require("../middlewares");
const { CreateContactSchema } = require("../validations/contact.validation");

/**
 * @swagger
 * tags:
 *   name: Contact
 *   description: Contact api point
 */

/**
 * @swagger
 * /api/contact/create:
 *   post:
 *     summary: create a contact
 *     tags: [Contact]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 example: string@gmail.com
 *               phone:
 *                 type: string
 *                 example: +998990010203
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: created
 *       400:
 *         description: invalid input or inputs
 *       500:
 *         description: server error
 */

router.post(
  "/contact/create",
  middlewares.verifyValidation(CreateContactSchema),
  middlewares.verifyToken,
  Controller.createContact
);

/**
 * @swagger
 * /api/contact/get_all:
 *   get:
 *     summary: get list of contacts
 *     tags: [Contact]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: list of contacts
 *       401:
 *         description: you are not admin
 *       500:
 *         description: server error
 */

router.get(
  "/contact/get_all",
  middlewares.verifyToken,
  middlewares.verifyAdmin,
  Controller.getAllContacts
);

module.exports = router;
