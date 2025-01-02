import userModel from "../../models/user.model.js";
import * as userService from "../../services/user.service.js";
import { validationResult } from "express-validator";
import redisClient from "../../services/redis.service.js";

// Create User
export const createUserContoller = async (req, res) => {
  console.log("Request Body:", req.body);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()[0].msg,
      status: false,
      code: 400,
      data: null,
    });
  }

  try {
    const user = await userService.createUser(req.body);

    // Generate JWT token for creating New User
    const token = await user.generateJWT();

    // Remove the password from the user object (i.e. Password will not be shown to the frontend object)
    delete user._doc.password;

    res.status(201).json({
      message: "User created successfully",
      status: true,
      code: 201,
      data: user,
      token,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: error.message || "Internal server error",
      status: false,
      code: 500,
      data: null,
    });
  }
};

// Login User
export const loginUserContoller = async (req, res) => {
  console.log("Request Body:", req.body);

  // Using Express-Validator middleware
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()[0].msg,
      status: false,
      code: 400,
      data: null,
    });
  }
  try {
    const { email, password } = req.body;

    // Find User by email
    const user = await userModel.findOne({ email }).select("+password");

    // Check the User's Credentials
    if (!user) {
      return res.status(401).json({
        message: "Invalid Credentials",
        status: false,
        code: 401,
        data: null,
      });
    }

    // Compare the Password
    const isMatch = await user.isValidPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Credentials",
        status: false,
        code: 401,
        data: null,
      });
    }

    // Generate JWT token for login the User
    const token = await user.generateJWT();

    // Remove the password from the user object (i.e. Password will not be shown to the frontend object)
    delete user._doc.password;

    res.status(200).json({
      message: "User logged in successfully",
      status: true,
      code: 200,
      data: user,
      token,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message || "Internal server error",
      status: false,
      code: 500,
      data: null,
    });
  }
};

// Profile Controller Request Handler
export const profileController = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized User: No user data found" });
    }
    res.status(200).json({ user: req.user });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
};

// Logout User
export const logoutController = async(req,res) => {
  try {
    // Find the token from where you want to logout
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    
    // Now set the token to redis (Blacklisting the token)
    redisClient.set(token, 'logout', 'EX', 60 * 60 * 24);
    
    res.status(200).json({
      message: "User logged out successfully", 
      status: true,
      code: 200,
      data: null,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message || "Internal server error",
      status: false,
      code: 500,
      data: null,
    });
  }
}