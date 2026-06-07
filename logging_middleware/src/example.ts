import { Log } from "./logger";

async function main() {
  const token = process.env.ACCESS_TOKEN;

  if (!token) {
    throw new Error("ACCESS_TOKEN is required to run the logger example");
  }

  const response = await Log(
    "backend",
    "info",
    "service",
    "Logger example executed successfully",
    token
  );

  console.log(response);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});