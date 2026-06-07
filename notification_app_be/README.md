# notification_app_be

Stage 6 backend for fetching notifications and serving the top 10 by priority.

## Endpoint

`GET /priority`

Headers:

`Authorization: Bearer <access_token>`

## Install

```bash
npm install
```

## Build

```bash
npm run build
```

## Run

```bash
npm start
```

## Response

```json
{
  "count": 10,
  "notifications": []
}
```