import format from "pg-format";
import {
  TCreateProject,
  TProject,
  TProjectResult,
  TUpdateProjectBody,
} from "../interfaces/projects.interface";
import { client } from "../database";
import { QueryConfig, QueryResult } from "pg";

export const createProjectService = async (data: TCreateProject) => {
  const queryString: string = format(
    `
    INSERT INTO "projects" (%I) VALUES (%L) RETURNING *;`,
    Object.keys(data),
    Object.values(data)
  );

  const queryResult: TProjectResult = await client.query(queryString);
  return queryResult.rows[0];
};

export const readProjectByIdService = async (id: string) => {
  const queryString: string = `
  SELECT 
    "p"."id" AS "projectId",
    "p"."name" AS "projectName",
    "p"."description" AS "projectDescription",
    "p"."repository" AS "projectRepository",
    "p"."startDate" AS "projectStartDate",
    "p"."endDate" AS "projectEndDate",
    "d"."name" AS "projectDeveloperName"
  FROM "developers" AS "d"
  LEFT JOIN "projects" AS "p"
    ON "p"."developerId" = "d"."id"
      WHERE "p"."id" = $1;
`;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const projectObject = await client.query(queryConfig);

  return projectObject.rows[0];
};

export const updateProjectByIdService = async (
  id: string,
  data: TUpdateProjectBody
) => {
  const queryString: string = format(
    `
    UPDATE "projects" SET (%I) = ROW(%L) WHERE "id" = %L RETURNING *;
  `,
    Object.keys(data),
    Object.values(data),
    id
  );

  const queryResult: QueryResult<TProject> = await client.query(queryString);

  return queryResult.rows[0];
};
