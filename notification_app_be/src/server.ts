import { createApp } from "./app";
import { PORT } from "./config/env";
import { Log } from "logging_middleware";

async function bootstrap() {
  const app = createApp();

  app.listen(PORT, () => {
    // Intentionally no-op here; logging uses a token from request context.
    // Server startup is still observable via the /health endpoint.
  });

  console.log(`notification_app_be running on port ${PORT}`);
}

bootstrap().catch((error) => {
  console.error("Failed to start notification_app_be:", error);
  void Log("backend", "fatal", "service", `Server bootstrap failed: ${String(error)}`, process.env.ACCESS_TOKEN ?? "");
  process.exit(1);
});