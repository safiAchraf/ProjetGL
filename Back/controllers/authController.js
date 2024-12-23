import prisma from "../prisma/client.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const loginController = async (req, res) => {
  const { email, password } = req.body;
  //search for user in db
  if (!user) {
    return res
      .status(400)
      .json({ message: "No user found with this email", data: null });
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ data: null, message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );

  res
    .cookie("authorization", token, {
      httpOnly: true,
      sameSite: "None",
      secure: process.env.NODE_ENV === "development" ? false : true,
    })
    .json({ data: user, message: "login successfully" });
};


const registerController = async (req, res) => {
  const { username, email, password  , phoneNum } = req.body;
  if (!username || !email || !password || !phoneNum) {
    return res
      .status(400)
      .json({ data: null, message: "All fields are required" });
  }
  //search for user in db to check if user already exists
  // const alreadyExists = await prisma.user.findFirst({
  //   where: {
  //     email,
  //   },
  // });

  if (alreadyExists) {
    return res.status(400).json({ data: null, message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  //create user in db
  

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );

  res
    .cookie("authorization", token, {
      httpOnly: true,
      sameSite: "None",
      secure: process.env.NODE_ENV === "development" ? false : true,
    })
    .json({ data: user, message: "user created successfully" })
    .status(201);
};

const logoutController = (req, res) => {
  res
    .clearCookie("authorization")
    .json({ data: null, message: "Logged out successfully" });
};

export {
  loginController,
  registerController,
  logoutController,
};
