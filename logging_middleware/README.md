# Logging Middleware

Reusable TypeScript logger for the evaluation service.

## Install

```bash
npm install
```

## Build

```bash
npm run build
```

## Use

```ts
import { Log } from "logging_middleware";

await Log("backend", "info", "service", "Notification API hit", token);
```

## Run the example

Set `ACCESS_TOKEN`, then run:

```bash
npm run demo
```