import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

async function connectToDatabase() {
  try {
    await prismaClient.$connect();
    console.log("Connected to the database successfully.");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
}

connectToDatabase();

export default prismaClient;
