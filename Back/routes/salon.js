import express from "express";
import { getAllSalons, getSalonById, createSalon, updateSalon, deleteSalon, addSalonPictures, deleteSalonPicture , userHaveSalon } from "../controllers/salonController.js";

const router = express.Router();

/**
 * @swagger
 * /api/salons:
 *   get:
 *     summary: Get all salons
 *     responses:
 *       200:
 *         description: All salons retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       address:
 *                         type: string
 *                       city:
 *                         type: string
 *                       phoneNumber:
 *                         type: string
 *                       rating:
 *                         type: number
 *                       pictures:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                             url:
 *                               type: string
 *       404:
 *         description: No salons found
 */
router.get("/", getAllSalons);
router.get("/userHaveSalon", userHaveSalon);

/**
 * @swagger
 * /api/salons/pictures/{pictureId}:
 *   delete:
 *     summary: Delete a salon picture
 *     parameters:
 *       - in: path
 *         name: pictureId
 *         required: true
 *         schema:
 *           type: string
 *         description: The picture ID
 *     responses:
 *       200:
 *         description: Picture deleted successfully
 *       404:
 *         description: Picture not found
 *       403:
 *         description: Unauthorized to delete this picture
 */
router.delete("/pictures/:pictureId", deleteSalonPicture);

/**
 * @swagger
 * /api/salons/{id}:
 *   get:
 *     summary: Get a salon by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The salon ID
 *     responses:
 *       200:
 *         description: Salon retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 address:
 *                   type: string
 *                 city:
 *                   type: string
 *                 phoneNumber:
 *                   type: string
 *                 rating:
 *                   type: number
 *                 pictures:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       url:
 *                         type: string
 *       404:
 *         description: Salon not found
 */
router.get("/:id", getSalonById);

/**
 * @swagger
 * /api/salons:
 *   post:
 *     summary: Create a new salon
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               pictures:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Salon created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 address:
 *                   type: string
 *                 city:
 *                   type: string
 *                 phoneNumber:
 *                   type: string
 *                 rating:
 *                   type: number
 *                 pictures:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       url:
 *                         type: string
 *       400:
 *         description: Missing required fields
 *       409:
 *         description: Salon already exists
 */
router.post("/", createSalon);

/**
 * @swagger
 * /api/salons/{id}:
 *   put:
 *     summary: Update a salon
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The salon ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *     responses:
 *       200:
 *         description: Salon updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 address:
 *                   type: string
 *                 city:
 *                   type: string
 *                 phoneNumber:
 *                   type: string
 *                 rating:
 *                   type: number
 *                 pictures:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       url:
 *                         type: string
 *       404:
 *         description: Salon not found
 *       403:
 *         description: Unauthorized to update this salon
 */
router.put("/", updateSalon);

/**
 * @swagger
 * /api/salons/{id}:
 *   delete:
 *     summary: Delete a salon
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The salon ID
 *     responses:
 *       200:
 *         description: Salon deleted successfully
 *       404:
 *         description: Salon not found
 */
router.delete("/", deleteSalon);

/**
 * @swagger
 * /api/salons/{id}/pictures:
 *   post:
 *     summary: Add pictures to a salon
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The salon ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pictures:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Pictures added successfully
 *       404:
 *         description: Salon not found
 *       403:
 *         description: Unauthorized to add pictures to this salon
 */
router.post("/pictures", addSalonPictures);


export default router;