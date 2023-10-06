import { NextFunction, Request, Response } from "express";
import {
  TDeveloper,
  TDeveloperResult,
} from "../interfaces/developers.interface";
import { client } from "../database";
import AppError from "../errors/App.error";

export const verifyDeveloperId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  const queryString: string = `SELECT * FROM "developers" WHERE "id" = $1;`;

  const queryResult: TDeveloperResult = await client.query(queryString, [id]);

  if (!queryResult.rowCount) {
    throw new AppError("Developer not found.", 404);
  }

  const foundClient: TDeveloper = queryResult.rows[0];

  res.locals = { ...res.locals, foundClient };

  return next();
};
