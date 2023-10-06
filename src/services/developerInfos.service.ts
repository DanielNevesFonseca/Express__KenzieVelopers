import { QueryConfig } from "pg";
import { client } from "../database";
import {
  TCreateDeveloperInfo,
  TDeveloperInfo,
} from "../interfaces/developers.interface";

export const createDeveloperInfoService = async (
  id: string,
  data: TCreateDeveloperInfo
): Promise<TDeveloperInfo> => {
  const queryString: string = `
    INSERT INTO "developerInfos" ("developerSince", "preferredOS", "developerId")
    VALUES ($1, $2, $3) RETURNING *;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [data.developerSince, data.preferredOS, id],
  };

  const queryResult = await client.query(queryConfig);

  return queryResult.rows[0];
};
