import { Log, type Level } from "../../../src/logger";

type FrontendPackageName =
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

export async function logFrontend(
  level: Level,
  pkg: FrontendPackageName,
  message: string,
  token: string | null
): Promise<void> {
  if (!token) {
    return;
  }

  try {
    await Log("frontend", level, pkg, message, token);
  } catch {
    // Logging should never block the UI flow.
  }
}