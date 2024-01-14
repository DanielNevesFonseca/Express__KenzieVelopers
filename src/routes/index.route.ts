import { Router } from "express";
import { developersRoutes } from "./developers.route";
import { projectRoutes } from "./projects.route";

export const routes: Router = Router();

routes.use("/developers", developersRoutes);
routes.use("/projects", projectRoutes);
