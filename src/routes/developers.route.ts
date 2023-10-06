import { Router } from "express";
import {
  createDeveloperController,
  deleteDeveloperController,
  readAllDevelopersController,
  readDeveloperController,
  updateDeveloperController,
} from "../controllers/developers.controller";
import { verifyEmail } from "../middlewares/verifyEmail.middleware";
import { verifyDeveloperId } from "../middlewares/verifyDeveloperId.middleware";
import {
  verifyDeveloperInfo,
  verifyPreferredOS,
} from "../middlewares/verifyDeveloperInfos.middleware";
import { createDeveloperInfoController } from "../controllers/developerInfos.controller";

export const developersRoutes: Router = Router();

developersRoutes.post("/", verifyEmail, createDeveloperController);
developersRoutes.get("/", readAllDevelopersController);

developersRoutes.use("/:id", verifyDeveloperId);

developersRoutes.get("/:id", readDeveloperController);
developersRoutes.patch("/:id", verifyEmail, updateDeveloperController);
developersRoutes.delete("/:id", deleteDeveloperController);
developersRoutes.post(
  "/:id/infos",
  verifyPreferredOS,
  verifyDeveloperInfo,
  createDeveloperInfoController
);
