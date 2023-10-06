import { Request, Response } from "express";
import { createDeveloperInfoService } from "../services/developerInfos.service";

export const createDeveloperInfoController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newDeveloperInfo = await createDeveloperInfoService(
    req.params.id,
    req.body
  );

  return res.status(201).json(newDeveloperInfo);
};
