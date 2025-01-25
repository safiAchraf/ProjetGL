import prisma from "../prisma/client.js";
import { v4 as uuidv4 } from "uuid";

const getAllSalons = async (req, res) => {
  try {
    const salons = await prisma.$queryRaw`SELECT * FROM "Salon"`;
    const pictures = await prisma.$queryRaw`SELECT * FROM "Picture"`;
    for (const salon of salons) {
      salon.pictures = pictures.filter((picture) => picture.salonId === salon.id);
    }
    res.json({message: "All salons", data: salons});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSalonById = async (req, res) => {
  const { id } = req.params;
  try {
    const [salon] = await prisma.$queryRaw`SELECT * FROM "Salon" WHERE "id" = ${id}`;
    const pictures = await prisma.$queryRaw`SELECT * FROM "Picture" WHERE "salonId" = ${id}`;
    salon.pictures = pictures;
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
    pictures,
  } = req.body;
  const ownerId = req.user.id;
  if (!name || !address || !city || !phoneNumber || !description) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const alreadyExists = await prisma.$queryRaw`
    SELECT * FROM "Salon" WHERE "ownerId" = ${ownerId}`;
  if (alreadyExists.length > 0) {
    return res.status(400).json({ error: "You already have a salon" });
  }
  try {
    const [newSalon] = await prisma.$queryRaw`
      INSERT INTO "Salon" (id, name, description, address, city, "phoneNumber", "ownerId", "createdAt", "updatedAt" , rating)
      VALUES (${uuidv4()}, ${name}, ${description}, ${address}, ${city}, ${phoneNumber}, ${ownerId}, NOW(), NOW() , 0)
      RETURNING *`;
      console.log(newSalon);
    
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
    if (deletedSalon.length > 0) {
      res.json({ message: "Salon deleted successfully" });
    } else {
      res.status(404).json({ error: "Salon not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addSalonPictures = async (req, res) => {
  const { id } = req.params;
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
  const {pictures} = req.body;
  try {
    for (const url of pictures) {
      await prisma.$queryRaw`
        INSERT INTO "Picture" (id, url, "salonId", "createdAt", "updatedAt")
        VALUES (${uuidv4()}, ${url}, ${id}, NOW(), NOW())`;
    }
    res.json({ message: "Pictures added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteSalonPicture = async (req, res) => {
  const { pictureId } = req.params;
  const ownerId = req.user.id;
  const picture = await prisma.$queryRaw`SELECT * FROM "Picture" WHERE id = ${pictureId}`;
  if (picture.length === 0) {
    return res.status(404).json({ error: "Picture not found" });
  }
  const salon = await prisma.$queryRaw`SELECT * FROM "Salon" WHERE id = ${picture[0].salonId}`;
  if (salon.length === 0) {
    return res.status(404).json({ error: "Salon not found" });
  }
  if (salon[0].ownerId !== ownerId) {
    return res
      .status(403)
      .json({ error: "You are not authorized to update this salon" });
  }
  try {
    await prisma.$queryRaw`DELETE FROM "Picture" WHERE id = ${pictureId}`;
    res.json({ message: "Picture deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  
}

const userHaveSalon = async (req, res) => {
  const ownerId = req.user.id;
  const alreadyExists = await prisma.$queryRaw`
    SELECT * FROM "Salon" WHERE "ownerId" = ${ownerId}`;
  if (alreadyExists.length > 0) {
    return res.json({ message: "You already have a salon", data: true });
  }
  return res.json({ message: "You don't have a salon", data: false });
};




export { getAllSalons, getSalonById, createSalon, updateSalon, deleteSalon , addSalonPictures, deleteSalonPicture , userHaveSalon};