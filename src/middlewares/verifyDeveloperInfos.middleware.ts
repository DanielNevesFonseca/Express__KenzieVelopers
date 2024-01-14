import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import { TDeveloperInfo } from "../interfaces/developers.interface";
import { client } from "../database";
import AppError from "../errors/App.error";

export const verifyDeveloperInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  const queryString: string = `
    SELECT * FROM "developerInfos" WHERE "developerId" = $1;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult = await client.query(queryConfig);

  if (queryResult.rowCount) {
    throw new AppError("Developer infos already exists.", 409);
  }

  return next();
};

export const verifyPreferredOS = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Object.entries(req.body).forEach(([key, value]) => {
    if (key === "preferredOS") {
      if (value !== "Windows" && value !== "Linux" && value !== "MacOS") {
        throw new AppError("Invalid OS option.", 400);
      }
    }
  });

  return next();
};
