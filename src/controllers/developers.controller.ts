// Apenas o retorno final da request
import { Request, Response } from "express";
import {
  IReadFullDeveloperInfo,
  TDeveloper,
  TUpdateDeveloper,
} from "../interfaces/developers.interface";
import {
  createDeveloperService,
  deleteDeveloperService,
  readAllDevelopersService,
  readDeveloperService,
  updateDeveloperService,
} from "../services/developers.service";

export const createDeveloperController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const developer: TDeveloper = await createDeveloperService(req.body);

  return res.status(201).json(developer);
};

export const readDeveloperController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const developerFullInfo: IReadFullDeveloperInfo = await readDeveloperService(
    req.params.id
  );
  return res.status(200).json(developerFullInfo);
};

export const readAllDevelopersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const developersArray: TDeveloper[] | any = await readAllDevelopersService();

  return res.status(200).json(developersArray);
};

export const updateDeveloperController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const updatedDeveloper: TDeveloper = await updateDeveloperService(
    req.params.id,
    req.body
  );

  return res.status(200).json(updatedDeveloper);
};

export const deleteDeveloperController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  await deleteDeveloperService(req.params.id);

  return res.status(204).json();
};
