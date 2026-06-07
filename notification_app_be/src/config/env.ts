import dotenv from "dotenv";

dotenv.config();

export const PORT = Number(process.env.PORT ?? 3000);
export const NOTIFICATIONS_API =
  process.env.NOTIFICATIONS_API ??
  "http://4.224.186.213/evaluation-service/notifications";

export function getBearerToken(authorizationHeader?: string): string {
  if (!authorizationHeader) {
    throw new Error("Missing Authorization header");
  }

  const [scheme, token] = authorizationHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    throw new Error("Authorization header must use Bearer token format");
  }

  return token;
}