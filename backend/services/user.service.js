import User from "../models/user.model.js";

export const createUser = async ({ email, password }) => {
  // Validate email and password
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  // Check if the User already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash the Password
  const hashedPassword = await User.hashPassword(password);

  const newUser = new User({
    email,
    password: hashedPassword,
  });

  return await newUser.save();
};
