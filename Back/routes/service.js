import express from "express";
import {
  creatNewService,
  updateService,
  deleteService,
  getAllServices,
  getService,
  getSalonServices,
  getSalonServicesByCategory
} from "../controllers/serviceController.js";

const router = express.Router();

/**
 * @swagger
 * /api/services:
 *   get:
 *     summary: Get all services
 *     responses:
 *       200:
 *         description: All services retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
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
 *                       price:
 *                         type: number
 *                       pointPrice:
 *                         type: number
 *                       duration:
 *                         type: number
 *                       salonId:
 *                         type: string
 *                       categoryId:
 *                         type: string
 *                       inHouse:
 *                         type: boolean
 *       404:
 *         description: No services found
 */
router.get("/", getAllServices);

/**
 * @swagger
 * /api/services:
 *   post:
 *     summary: Create a new service
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
 *               price:
 *                 type: number
 *               pointPrice:
 *                 type: number
 *               duration:
 *                 type: number
 *               category:
 *                 type: string
 *               inHouse:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Service created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 *                     price:
 *                       type: number
 *                     pointPrice:
 *                       type: number
 *                     duration:
 *                       type: number
 *                     salonId:
 *                       type: string
 *                     categoryId:
 *                       type: string
 *                     inHouse:
 *                       type: boolean
 *       400:
 *         description: Missing required fields
 *       409:
 *         description: Service already exists for this salon
 */
router.post("/", creatNewService);

/**
 * @swagger
 * /api/services/salon/{salonId}/category/{category}:
 *   get:
 *     summary: Get all services for a salon by category
 *     parameters:
 *       - in: path
 *         name: salonId
 *         required: true
 *         schema:
 *           type: string
 *         description: The salon ID
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *         description: The category name
 *     responses:
 *       200:
 *         description: All services for the salon by category retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
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
 *                       price:
 *                         type: number
 *                       pointPrice:
 *                         type: number
 *                       duration:
 *                         type: number
 *                       salonId:
 *                         type: string
 *                       categoryId:
 *                         type: string
 *                       inHouse:
 *                         type: boolean
 *       404:
 *         description: Salon or category not found, or no services found for this category
 */
router.get("/salon/:salonId/category/:category", getSalonServicesByCategory);

/**
 * @swagger
 * /api/services/salon/{id}:
 *   get:
 *     summary: Get all services for a salon
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The salon ID
 *     responses:
 *       200:
 *         description: All services for the salon retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
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
 *                       price:
 *                         type: number
 *                       pointPrice:
 *                         type: number
 *                       duration:
 *                         type: number
 *                       salonId:
 *                         type: string
 *                       categoryId:
 *                         type: string
 *                       inHouse:
 *                         type: boolean
 *       404:
 *         description: Salon not found or no services found for this salon
 */
router.get("/salon", getSalonServices);

/**
 * @swagger
 * /api/services/{id}:
 *   put:
 *     summary: Update a service
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The service ID
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
 *               price:
 *                 type: number
 *               pointPrice:
 *                 type: number
 *               duration:
 *                 type: number
 *               category:
 *                 type: string
 *               inHouse:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Service updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 *                     price:
 *                       type: number
 *                     pointPrice:
 *                       type: number
 *                     duration:
 *                       type: number
 *                     salonId:
 *                       type: string
 *                     categoryId:
 *                       type: string
 *                     inHouse:
 *                       type: boolean
 *       404:
 *         description: Service not found
 *       403:
 *         description: Unauthorized to update this service
 */
router.put("/:id", updateService);

/**
 * @swagger
 * /api/services/{id}:
 *   delete:
 *     summary: Delete a service
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The service ID
 *     responses:
 *       200:
 *         description: Service deleted successfully
 *       404:
 *         description: Service not found
 *       403:
 *         description: Unauthorized to delete this service
 */
router.delete("/:id", deleteService);

/**
 * @swagger
 * /api/services/{id}:
 *   get:
 *     summary: Get a service by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The service ID
 *     responses:
 *       200:
 *         description: Service retrieved successfully
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
 *                 price:
 *                   type: number
 *                 pointPrice:
 *                   type: number
 *                 duration:
 *                   type: number
 *                 salonId:
 *                   type: string
 *                 categoryId:
 *                   type: string
 *                 inHouse:
 *                   type: boolean
 *       404:
 *         description: Service not found
 */
router.get("/:id", getService);

export default router;