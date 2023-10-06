import { Request, Response } from "express";
import { TProject, TReadProject } from "../interfaces/projects.interface";
import {
  createProjectService,
  readProjectByIdService,
  updateProjectByIdService,
} from "../services/projects.service";

export const createProjectController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const createdProject: TProject = await createProjectService(req.body);

  return res.status(201).json(createdProject);
};

export const readProjectByIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const foundProject: TReadProject = await readProjectByIdService(
    req.params.id
  );

  return res.status(200).json(foundProject);
};

export const updateProjectByIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const updatedProject: TProject = await updateProjectByIdService(
    req.params.id,
    req.body
  );

  return res.status(200).json(updatedProject);
};
