import axios from "axios";

const LOG_API = "http://4.224.186.213/evaluation-service/logs";

export type Stack = "backend" | "frontend";

export type Level = "debug" | "info" | "warn" | "error" | "fatal";

export type PackageName =
  | "cache"
  | "controller"
  | "cron_job"
  | "db"
  | "domain"
  | "handler"
  | "repository"
  | "route"
  | "service"
  | "api"
  | "component"
  | "hook"
  | "page"
  | "state"
  | "style"
  | "auth"
  | "config"
  | "middleware"
  | "utils";

type LogResponse = {
  logID?: string;
  message?: string;
  [key: string]: unknown;
};

export async function Log(
  stack: Stack,
  level: Level,
  pkg: PackageName,
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