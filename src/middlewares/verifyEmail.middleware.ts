import { NextFunction, Request, Response } from "express";
import { TDeveloperResult } from "../interfaces/developers.interface";
import { client } from "../database";
import AppError from "../errors/App.error";

export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email } = req.body;

  if (!email) return next();

  const queryString: string = `SELECT * FROM "developers" WHERE "email" = $1;`;
  const queryResult: TDeveloperResult = await client.query(queryString, [
    email,
  ]);

  if (queryResult.rowCount) {
    throw new AppError("Email already exists.", 409);
  }

  return next();
};
