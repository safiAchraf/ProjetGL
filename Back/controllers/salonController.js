import prisma from "../prisma/client.js";
import { v4 as uuidv4 } from "uuid";

const getAllSalons = async (req, res) => {
  try {
    const salons = await prisma.$queryRaw`SELECT * FROM "Salon"`;
    res.json(salons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSalonById = async (req, res) => {
  const { id } = req.params;
  try {
    const salon = await prisma.$queryRaw`SELECT * FROM "Salon" WHERE "id" = ${id}`;
    if (salon) {
      res.json(salon);
    } else {
      res.status(404).json({ error: "Salon not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createSalon = async (req, res) => {
  const {
    name,
    description,
    address,
    city,
    phoneNumber,
    rating,
    workingHours,
    workingDays,
    pictures,
  } = req.body;
  const ownerId = req.user.id;
  const alreadyExists = await prisma.$queryRaw`
    SELECT * FROM "Salon" WHERE "ownerId" = ${ownerId}`;
  if (alreadyExists.length > 0) {
    return res.status(400).json({ error: "You already have a salon" });
  }
  try {
    const newSalon = await prisma.$queryRaw`
      INSERT INTO "Salon" (id, name, description, address, city, "phoneNumber", "ownerId", rating, "workingHours", "workingDays", "createdAt", "updatedAt")
      VALUES (${uuidv4()}, ${name}, ${description}, ${address}, ${city}, ${phoneNumber}, ${ownerId}, ${rating}, ${workingHours}, ${workingDays}, NOW(), NOW())
      RETURNING *`;
    
    // Insert pictures
    if (pictures && pictures.length > 0) {
      for (const url of pictures) {
        await prisma.$queryRaw`
          INSERT INTO "Picture" (id, url, "salonId", "createdAt", "updatedAt")
          VALUES (${uuidv4()}, ${url}, ${newSalon.id}, NOW(), NOW())`;
      }
    }

    res.status(201).json(newSalon);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateSalon = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    address,
    city,
    phoneNumber,
    rating,
    workingHours,
    workingDays,
  } = req.body;
  const ownerId = req.user.id;
  const salon = await prisma.$queryRaw`SELECT * FROM "Salon" WHERE id = ${id}`;
  if (salon.length === 0) {
    return res.status(404).json({ error: "Salon not found" });
  }
  if (salon[0].ownerId !== ownerId) {
    return res
      .status(403)
      .json({ error: "You are not authorized to update this salon" });
  }

  try {
    const updatedSalon = await prisma.$queryRaw`
      UPDATE "Salon"
      SET 
        name = COALESCE(${name}, name), 
        description = COALESCE(${description}, description), 
        address = COALESCE(${address}, address), 
        city = COALESCE(${city}, city), 
        "phoneNumber" = COALESCE(${phoneNumber}, "phoneNumber"), 
        rating = COALESCE(${rating}, rating), 
        "workingHours" = COALESCE(${workingHours}, "workingHours"), 
        "workingDays" = COALESCE(${workingDays}, "workingDays"), 
        "updatedAt" = NOW()
      WHERE id = ${id}
      RETURNING *`;
    if (updatedSalon) {
      res.json(updatedSalon);
    } else {
      res.status(404).json({ error: "Salon not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteSalon = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedSalon = await prisma.$queryRaw`DELETE FROM "Salon" WHERE id = ${id} RETURNING *`;
    if (deletedSalon) {
      res.json(deletedSalon);
    } else {
      res.status(404).json({ error: "Salon not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getAllSalons, getSalonById, createSalon, updateSalon, deleteSalon };