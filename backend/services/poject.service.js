import projectModel from "../models/project.model.js";


export const createProjectService = async ({
    name, userId
}) => { 
    if (!name) {
        throw new Error("Name is required");
    }
    if(!userId) {
        throw new Error("User is required");
    }

    const project = new projectModel.create({
        name,
        users: [userId]
    });
}