import { PrismaClient } from "@prisma/client";

let prismaClient;

if (!global.prismaClient) {
  global.prismaClient = new PrismaClient();
}

prismaClient = global.prismaClient;

async function connectToDatabase() {
  try {
    await prismaClient.$connect();
    console.log("Connected to the database successfully.");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1); 
  }
}

connectToDatabase();

process.on('SIGINT', async () => {
  await prismaClient.$disconnect();
  console.log("Disconnected from the database.");
  process.exit(0);
});

export default prismaClient;
