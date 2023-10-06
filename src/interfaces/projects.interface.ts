import { QueryResult } from "pg";

export type TProject = {
  id: number;
  name: string;
  description: string;
  repository: string;
  startDate: Date;
  endDate: Date | null;
  developerId: number | null;
};

export type TCreateProject = Omit<TProject, "id">;

export type TProjectResult = QueryResult<TProject>;

export type TReadProject = {
  projectId: number;
  projectName: string;
  projectDescription: string;
  projectRepository: string;
  projectStartDate: Date;
  projectEndDate: Date | null;
  projectDeveloperName: string;
};

export type TReadProjectResult = QueryResult<TReadProject>;

export type TUpdateProjectBody = Partial<Omit<TProject, "id">>;
