import { Router } from 'express';
import { body } from "express-validator";
import * as projectController from '../../../controllers/projectController/project.controller.js';
import * as authMiddleware from "../../../middleware/auth.middleware.js";

const router = Router();

// Route to create a new project
router.post("/create-project",
    authMiddleware.authUser,
    body("name").isString().withMessage("Name is required"),
    projectController.createProject);

// To get all projects
router.get("/all-projects", authMiddleware.authUser, projectController.getAllProjects);

export default router;