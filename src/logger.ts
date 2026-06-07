import axios from "axios";

const LOG_API = "http://4.224.186.213/evaluation-service/logs";

export type Stack = "backend" | "frontend";

export type Level = "debug" | "info" | "warn" | "error" | "fatal";

type BackendPackage =
  | "cache"
  | "controller"
  | "cron_job"
  | "db"
  | "domain"
  | "handler"
  | "repository"
  | "route"
  | "service";

type FrontendPackage =
  | "api"
  | "component"
  | "hook"
  | "page"
  | "state"
  | "style";

type CommonPackage =
  | "auth"
  | "config"
  | "middleware"
  | "utils";

export type PackageName = BackendPackage | FrontendPackage | CommonPackage;

type PackageForStack<TStack extends Stack> = TStack extends "backend"
  ? BackendPackage | CommonPackage
  : FrontendPackage | CommonPackage;

type LogResponse = {
  logID?: string;
  message?: string;
  [key: string]: unknown;
};

export async function Log<TStack extends Stack>(
  stack: TStack,
  level: Level,
  pkg: PackageForStack<TStack>,
  message: string,
  token: string
): Promise<LogResponse | undefined> {
  try {
    const response = await axios.post<LogResponse>(
      LOG_API,
      {
        stack,
        level,
        package: pkg,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Logger Error:", error);
  }
}