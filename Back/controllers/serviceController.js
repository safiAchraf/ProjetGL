import prisma from "../prisma/client.js";
import { v4 as uuidv4 } from "uuid";

const creatNewService = async (req, res)=>{
  const salonId = req.params.id
  const ownerId = req.user.id;
  const {name , description , price, pointPrice, duration, categoryId} = req.body

  if (
    !name || 
    !description ||  
    !price || 
    !pointPrice || 
    !duration || 
    !categoryId 
  ){
    return res.status(400).json({ msg: "Missing required fields" });
  }

  const salon = await prisma.$queryRaw`SELECT * FROM "Salon" WHERE id = ${salonId}`
  if (salon[0].ownerId !== ownerId) {
    return res
      .status(403)
      .json({ error: "You are not authorized to create this service" });
  }


  const [existingService] = await prisma.$queryRaw`
  SELECT * FROM "Service" WHERE "name" = ${name} AND "salonId" = ${salonId}`
  if(existingService) {
    return res.status(409).json({ error : "service already excists for this salon"})
  }

  try{
    const newService = await prisma.$queryRaw`
    INSERT INTO "Service" (id, "name", "description", "price", "pointPrice", "duration", "salon", "createdAt", "updatedAt", "category", "bookings")
    VALUES (${uuidv4()}, ${name}, ${description}, ${price}, ${pointPrice}, ${duration}, ${salonId}, NOW(), NOW(), ${categoryId}, Null)
    RETURNING *`

    res.status(201).json({ msg : "service created", data:newService})
  }catch (error){
    res.status(500).json({error : error.message})
  }
}


const updateService = async (req, res)=>{
  const id = req.params.id
  const ownerId = req.user.id;
  const {
    name, 
    description, 
    price, 
    pointPrice, 
    duration, 
    salonId, 
    categoryId, 
    bookings
  } = req.body;
  const service = await prisma.$queryRaw`SELECT * FROM "Service" WHERE id = ${id}`;
  if (service.length === 0) {
    return res.status(404).json({ error: "Service not found" });
  }

  const salon = await prisma.$queryRaw`SELECT * FROM "Salon" WHERE id = ${service.salon}`
  if (salon[0].ownerId !== ownerId) {
    return res
      .status(403)
      .json({ error: "You are not authorized to update this service" });
  }


  try {
    const updatedService = await prisma.$queryRaw`
      UPDATE "Service"
      SET 
        name = COALESCE(${name}, name), 
        description = COALESCE(${description}, description), 
        price = COALESCE(${price}, price), 
        pointPrice = COALESCE(${pointPrice}, pointPrice), 
        duration = COALESCE(${duration}, duration), 
        salon = COALESCE(${salonId}, salon), 
        "updatedAt" = NOW()
        category = COALESCE(${categoryId}, category), 
        bookings = COALESCE(${bookings}, bookings) 
      WHERE id = ${id}
      RETURNING *`;
    if (updatedService) {
      res.status(200).json({msg : "service updated", data : updatedService});
    } else {
      res.status(404).json({ error: "Service not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}



const deleteService = async (req, res) => {
  const id = req.params.id
  const ownerId = req.user.id;

  try {
    const service = await prisma.$queryRaw`SELECT * FROM "Service" WHERE id = ${id}`
    const salon = await prisma.$queryRaw`SELECT * FROM "Salon" WHERE id = ${service.salon}`
    if (salon[0].ownerId !== ownerId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this service" });
    }
  
    const deletedService = await prisma.$queryRaw`DELETE FROM "Service" WHERE id = ${id} RETURNING *`
    if (deletedService.length > 0) {
      res.status(200).json({ msg: "Service deleted" })
    } else {
      res.status(404).json({ error: "Service not found" })
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}



const getAllServices = async (req, res) => {
  try {
    const services = await prisma.$queryRaw`SELECT * FROM "Service"`

    if(services.length===0){
      return res.status(404).json({ error: "services not found" })
    }

    res.status(200).json({msg: "All services", data: services})
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}



const getService = async (req, res) => {
  const id = req.params.id
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
}


const getSalonServices = async (req, res) => {
  try {
    const salonId = req.params.id
    const salon = await prisma.$queryRaw`SELECT * FROM "Salon" WHERE "id" = ${salonId}`
    if(salon.length===0){
      return res.status(404).json({ error: "salon not found" })
    }
    const services = await prisma.$queryRaw`SELECT * FROM "Service" WHERE "salon" = ${salonId}`

    if(services.length===0){
      return res.status(404).json({ error: "services not found" })
    }

    res.status(200).json({msg: "All services of the salon", data: services})
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}



export {
  creatNewService,
  updateService,
  deleteService,
  getAllServices,
  getService,
  getSalonServices
}