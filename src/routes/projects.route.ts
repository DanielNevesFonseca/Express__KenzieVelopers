import { Router } from "express";
import {
  createProjectController,
  readProjectByIdController,
  updateProjectByIdController,
} from "../controllers/projects.controller";
import {
  verifyProjectId,
  verifyProjectsDeveloperId,
} from "../middlewares/verifyProjects.middleware";

export const projectRoutes: Router = Router();

projectRoutes.post("/", verifyProjectsDeveloperId, createProjectController);
projectRoutes.get("/:id", verifyProjectId, readProjectByIdController);
projectRoutes.patch(
  "/:id",
  verifyProjectId,
  verifyProjectsDeveloperId,
  updateProjectByIdController
);
