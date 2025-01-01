import { Router } from "express";
import * as userController from "../../controllers/userController/user.controller.js";
import { body } from "express-validator";
import * as authMiddleware from "../../middleware/auth.middleware.js";

const router = Router();

router.post("/register",
    body("email").isEmail().withMessage("Email must be a valid email address"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"), 
    userController.createUserContoller);

router.post("/login", 
    body("email").isEmail().withMessage("Email must be a valid email address"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"), 
    userController.loginUserContoller);

router.get("/profile", authMiddleware.authUser, userController.profileController);

router.get("/logout", authMiddleware.authUser, userController.logoutController);

export default router;