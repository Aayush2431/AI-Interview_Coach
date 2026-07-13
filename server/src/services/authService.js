import User from "../models/User.js";

export const registerService = async (userData) => {
  const { name, email, password } = userData;

  if (!name || !email || !password) {
    throw new Error("All fields are required.");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists.");
  }

  const newUser = await User.create({
    name,
    email,
    password,
  });

  return {
    success: true,
    message: "User registered successfully.",
    data: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    },
  };
};

export const loginService = async (credentials) => {
  return {
    success: true,
    message: "Login service executed successfully.",
    data: credentials,
  };
};