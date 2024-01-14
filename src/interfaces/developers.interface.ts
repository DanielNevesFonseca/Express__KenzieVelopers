import { QueryResult } from "pg";

export type TDeveloper = {
  id: number;
  name: string;
  email: string;
};

export type TCreateDeveloper = Omit<TDeveloper, "id">;

export type TDeveloperResult = QueryResult<TDeveloper>;

export interface IReadFullDeveloperInfo {
  developerId: number;
  developerName: string;
  developerEmail: string;
  developerInfoDeveloperSince: Date | null;
  developerInfoPreferredOS: string | null;
}

export type TUpdateDeveloper = Partial<TCreateDeveloper>;

export type TDeveloperInfo = {
  id: number;
  developerSince: Date;
  preferredOS: "Windows" | "Linux" | "MacOS";
  developerId: number;
};

export type TCreateDeveloperInfo = Omit<TDeveloperInfo, "id" | "developerId">;
