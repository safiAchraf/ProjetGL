import prisma from "../prisma/client.js";

export const getUser = async (req, res) => {
  try {
    const [user] = await prisma.$queryRaw`
      SELECT * FROM "User" WHERE id = ${req.params.id}
    `;
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { name, email, phoneNum } = req.body;
    const [user] = await prisma.$queryRaw`
      UPDATE "User"
      SET name = ${name}, email = ${email}, "phoneNumber" = ${phoneNum}, "updatedAt" = now()
      WHERE id = ${req.params.id}
      RETURNING *
    `;
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const [user] = await prisma.$queryRaw`
      DELETE FROM "User" WHERE id = ${req.params.id}
      RETURNING *
    `;
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};