import prisma from "../prisma/client.js";
import { v4 as uuidv4 } from "uuid";

const creatNewService = async (req, res) => {
  const ownerId = req.user.id;
  const { name, description, price, pointPrice, duration, category  } = req.body;

  const requiredFields = ["name", "description", "price", "pointPrice", "duration", "category"];
  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).json({ error: `${field} is required` });
    }
  }
  const inHouse = req.body.inHouse || false;

  
  if (typeof price !== "number" || typeof pointPrice !== "number" || typeof duration !== "number") {
    return res.status(400).json({ msg: "Price, pointPrice and duration must be numbers" });
  }
  if (price <= 100 || pointPrice <= 0 || duration <= 0) {
    return res.status(400).json({ msg: "Price must be greater than 100 DA, pointPrice and duration must be greater than 0" });
  }

  const [salon] = await prisma.$queryRaw`SELECT * FROM "Salon" WHERE "ownerId" = ${ownerId}`;
  if (!salon) {
    return res.status(404).json({ error: "Salon not found" });
  }
  const salonId = salon.id;

  const [existingService] = await prisma.$queryRaw`
    SELECT * FROM "Service" WHERE "name" = ${name} AND "salonId" = ${salonId}`;
  if (existingService) {
    return res.status(409).json({ error: "Service already exists for this salon" });
  }

  const [existingCategory] = await prisma.$queryRaw`SELECT * FROM "Category" WHERE "name" = ${category}`;
  if (!existingCategory) {
    return res.status(404).json({ error: "Category not found" });
  }
  const categoryId = existingCategory.id;

  try {
    const newService = await prisma.$queryRaw`
      INSERT INTO "Service" (id, "name", "description", "price", "pointPrice", "duration", "salonId", "createdAt", "updatedAt", "categoryId" , "inHouse")
      VALUES (${uuidv4()}, ${name}, ${description}, ${price}, ${pointPrice}, ${duration}, ${salonId}, NOW(), NOW(), ${categoryId} , ${inHouse})
      RETURNING *`;

    res.status(201).json({ msg: "Service created", data: newService });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateService = async (req, res) => {
  const id = req.params.id;
  const ownerId = req.user.id;
  const { name, description, price, pointPrice, duration, category , inHouse } = req.body;

  const service = await prisma.$queryRaw`SELECT * FROM "Service" WHERE id = ${id}`;
  if (service.length === 0) {
    return res.status(404).json({ error: "Service not found" });
  }

  const salon = await prisma.$queryRaw`SELECT * FROM "Salon" WHERE id = ${service[0].salonId}`;
  if (salon[0].ownerId !== ownerId) {
    return res.status(403).json({ error: "You are not authorized to update this service" });
  }

  const [existingCategory] = await prisma.$queryRaw`SELECT * FROM "Category" WHERE "name" = ${category}`;
  const categoryId = existingCategory ? existingCategory.id : service[0].categoryId;

  try {
    const updatedService = await prisma.$queryRaw`
      UPDATE "Service"
      SET 
        name = COALESCE(${name}, name), 
        description = COALESCE(${description}, description), 
        price = COALESCE(${price}, price), 
        "pointPrice" = COALESCE(${pointPrice}, "pointPrice"), 
        duration = COALESCE(${duration}, duration), 
        "categoryId" = COALESCE(${categoryId}, "categoryId"), 
        "inHouse" = COALESCE(${inHouse}, "inHouse"),
        "updatedAt" = NOW()
      WHERE id = ${id}
      RETURNING *`;
    if (updatedService) {
      res.status(200).json({ msg: "Service updated", data: updatedService });
    } else {
      res.status(404).json({ error: "Service not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteService = async (req, res) => {
  const id = req.params.id;
  const ownerId = req.user.id;

  try {
    const service = await prisma.$queryRaw`SELECT * FROM "Service" WHERE id = ${id}`;
    const salon = await prisma.$queryRaw`SELECT * FROM "Salon" WHERE id = ${service[0].salonId}`;
    if (salon[0].ownerId !== ownerId) {
      return res.status(403).json({ error: "You are not authorized to delete this service" });
    }

    const deletedService = await prisma.$queryRaw`DELETE FROM "Service" WHERE id = ${id} RETURNING *`;
    if (deletedService.length > 0) {
      res.status(200).json({ msg: "Service deleted" });
    } else {
      res.status(404).json({ error: "Service not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllServices = async (req, res) => {
  try {
    const services = await prisma.$queryRaw`SELECT * FROM "Service"`;

    if (services.length === 0) {
      return res.status(404).json({ error: "Services not found" });
    }

    res.status(200).json({ msg: "All services", data: services });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getService = async (req, res) => {
  const id = req.params.id;
  try {
    const [service] = await prisma.$queryRaw`SELECT * FROM "Service" WHERE "id" = ${id}`;
    if (service) {
      res.json(service);
    } else {
      res.status(404).json({ error: "Service not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSalonServices = async (req, res) => {
  try {
    const salonId = req.params.id;
    const salon = await prisma.$queryRaw`SELECT * FROM "Salon" WHERE "id" = ${salonId}`;
    if (!salon) {
      return res.status(404).json({ error: "Salon not found" });
    }
    const services = await prisma.$queryRaw`SELECT * FROM "Service" WHERE "salonId" = ${salonId}`;

    if (services.length === 0) {
      return res.status(200).json({ msg: "No services found for this salon", data: [] });
    }
    for (const service of services) {
      const [category] = await prisma.$queryRaw`SELECT * FROM "Category" WHERE "id" = ${service.categoryId}`;
      service.category = category.name;
    }


    res.status(200).json({ msg: "All services of the salon", data: services });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const AuthgetSalonServices = async (req, res) => {
  try {
    const userId = req.user.id;
    const salon = await prisma.$queryRaw`SELECT * FROM "Salon" WHERE "ownerId" = ${userId}`;
    if (!salon) {
      return res.status(404).json({ error: "Salon not found" });
    }
    const salonId = salon.id;
    const services = await prisma.$queryRaw`SELECT * FROM "Service" WHERE "salonId" = ${salonId}`;
    
    if (services.length === 0) {
      return res.status(200).json({ msg: "No services found for this salon", data: [] });
    }
    for (const service of services) {
      const [category] = await prisma.$queryRaw`SELECT * FROM "Category" WHERE "id" = ${service.categoryId}`;
      service.category = category.name;
    }


    res.status(200).json({ msg: "All services of the salon", data: services });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSalonServicesByCategory = async (req, res) => {
  const { salonId, category } = req.params;
  try {
    const salon = await prisma.$queryRaw`SELECT * FROM "Salon" WHERE "id" = ${salonId}`;
    if (salon.length === 0) {
      return res.status(404).json({ error: "Salon not found" });
    }
    const [existingCategory] = await prisma.$queryRaw`SELECT * FROM "Category" WHERE "name" = ${category}`;
    if (!existingCategory) {
      return res.status(404).json({ error: "Category not found" });
    }
    const categoryId = existingCategory.id;

    const services = await prisma.$queryRaw`
      SELECT * FROM "Service" WHERE "salonId" = ${salonId} AND "categoryId" = ${categoryId}`;

    if (services.length === 0) {
      return res.status(404).json({ error: "Services not found for this category" });
    }

    res.status(200).json({ msg: "Services of the salon by category", data: services });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  creatNewService,
  updateService,
  deleteService,
  getAllServices,
  getService,
  getSalonServices,
  getSalonServicesByCategory,
  AuthgetSalonServices,
};