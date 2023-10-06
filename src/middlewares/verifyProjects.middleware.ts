import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import AppError from "../errors/App.error";
import { TProject } from "../interfaces/projects.interface";

export const verifyProjectsDeveloperId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const queryString: string = `SELECT * FROM "developers" WHERE "id" = $1;`;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [req.body.developerId],
  };

  const queryResult = await client.query(queryConfig);

  if (!queryResult.rowCount) {
    throw new AppError("Developer not found.", 404);
  }

  return next();
};

export const verifyProjectId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const queryString: string = `
    SELECT * FROM "projects" WHERE "id" = $1;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [req.params.id],
  };

  const queryResult: QueryResult<TProject> = await client.query(queryConfig);

  if (!queryResult.rowCount) {
    throw new AppError("Project not found.", 404);
  }

  return next();
};
