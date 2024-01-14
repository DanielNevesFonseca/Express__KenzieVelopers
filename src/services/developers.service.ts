import { QueryConfig } from "pg";
import { client } from "../database";
import {
  TCreateDeveloper,
  TDeveloper,
  TDeveloperResult,
  TUpdateDeveloper,
} from "../interfaces/developers.interface";
import format from "pg-format";

export const createDeveloperService = async (
  data: TCreateDeveloper
): Promise<TDeveloper> => {
  const queryFormat: string = format(
    `
    INSERT INTO "developers" (%I) VALUES (%L) RETURNING *;
    `,
    Object.keys(data),
    Object.values(data)
  );

  const queryResult: TDeveloperResult = await client.query(queryFormat);

  return queryResult.rows[0];
};

export const readDeveloperService = async (id: string) => {
  const queryString: string = `
    SELECT
	    "dev"."id" AS "developerId",
	    "dev"."name" AS "developerName",
	    "dev"."email" AS "developerEmail",
	    "dev_infos"."developerSince" AS "developerInfoDeveloperSince",
	    "dev_infos"."preferredOS" AS "developerInfoPreferredOS"
    FROM "developers" AS "dev"
    LEFT JOIN "developerInfos" AS "dev_infos"
	    ON "dev"."id" = "dev_infos"."developerId"
        WHERE "dev"."id" = $1
    ;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult = await client.query(queryConfig);

  return queryResult.rows[0];
};

export const readAllDevelopersService = async (): Promise<TDeveloper[]> => {
  const queryString = `
    SELECT * FROM "developers";
  `;

  const queryResult = await client.query(queryString);

  return queryResult.rows;
};

export const updateDeveloperService = async (
  id: string,
  data: TUpdateDeveloper
) => {
  const queryString: string = format(
    `
    UPDATE "developers" SET (%I) = ROW(%L) WHERE "id" = $1 RETURNING *;`,
    Object.keys(data),
    Object.values(data)
  );

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: TDeveloperResult = await client.query(queryConfig);

  return queryResult.rows[0];
};

export const deleteDeveloperService = async (id: string): Promise<void> => {
  const queryString = `DELETE FROM "developers" WHERE "id" = $1;`;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  await client.query(queryConfig);
};
